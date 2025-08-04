import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, platform, scheduledAt, userId } = body

    if (!content || !platform || !userId) {
      return NextResponse.json(
        { error: 'Contenu, plateforme et utilisateur requis' },
        { status: 400 }
      )
    }

    // Vérifier les limites de caractères
    const maxLength = platform === 'twitter' ? 280 : 3000
    if (content.length > maxLength) {
      return NextResponse.json(
        { error: `Le contenu dépasse la limite de ${maxLength} caractères` },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        content,
        platform,
        scheduled_at: scheduledAt,
        status: scheduledAt ? 'scheduled' : 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('Erreur lors de la création du post:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création du post' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const platform = searchParams.get('platform')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    let query = supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (platform) {
      query = query.eq('platform', platform)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erreur lors de la récupération des posts:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des posts' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
} 