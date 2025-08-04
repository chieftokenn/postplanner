import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Fonction pour publier sur LinkedIn
async function publishToLinkedIn(content: string, accessToken: string) {
  try {
    // Note: Cette implémentation nécessite l'API LinkedIn Marketing Developer Platform
    // Vous devrez configurer une application LinkedIn et obtenir les permissions appropriées
    
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: 'urn:li:person:{PERSON_ID}', // À remplacer par l'ID de la personne
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la publication sur LinkedIn:', error)
    throw error
  }
}

// Fonction pour publier sur Twitter
async function publishToTwitter(content: string, accessToken: string) {
  try {
    // Note: Cette implémentation nécessite l'API Twitter v2
    // Vous devrez configurer une application Twitter et obtenir les permissions appropriées
    
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: content
      })
    })

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la publication sur Twitter:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, platform } = body

    if (!postId || !platform) {
      return NextResponse.json(
        { error: 'ID du post et plateforme requis' },
        { status: 400 }
      )
    }

    // Récupérer le post depuis la base de données
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (postError || !post) {
      return NextResponse.json(
        { error: 'Post non trouvé' },
        { status: 404 }
      )
    }

    // Récupérer les tokens d'accès de l'utilisateur
    const { data: connections, error: connectionsError } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', post.user_id)
      .eq('platform', platform)

    if (connectionsError || !connections || connections.length === 0) {
      return NextResponse.json(
        { error: `Aucune connexion ${platform} trouvée` },
        { status: 404 }
      )
    }

    const connection = connections[0]
    let publishResult

    // Publier selon la plateforme
    if (platform === 'linkedin') {
      publishResult = await publishToLinkedIn(post.content, connection.access_token)
    } else if (platform === 'twitter') {
      publishResult = await publishToTwitter(post.content, connection.access_token)
    } else {
      return NextResponse.json(
        { error: 'Plateforme non supportée' },
        { status: 400 }
      )
    }

    // Mettre à jour le statut du post
    const { error: updateError } = await supabase
      .from('posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)

    if (updateError) {
      console.error('Erreur lors de la mise à jour du post:', updateError)
    }

    return NextResponse.json({
      success: true,
      data: publishResult
    })

  } catch (error) {
    console.error('Erreur lors de la publication:', error)
    
    // Mettre à jour le statut du post en cas d'échec
    try {
      await supabase
        .from('posts')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', body?.postId)
    } catch (updateError) {
      console.error('Erreur lors de la mise à jour du statut:', updateError)
    }

    return NextResponse.json(
      { error: 'Erreur lors de la publication' },
      { status: 500 }
    )
  }
} 