import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          scheduled_at: string
          published_at: string | null
          status: 'draft' | 'scheduled' | 'published' | 'failed'
          platform: 'linkedin' | 'twitter'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          scheduled_at: string
          published_at?: string | null
          status?: 'draft' | 'scheduled' | 'published' | 'failed'
          platform: 'linkedin' | 'twitter'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          scheduled_at?: string
          published_at?: string | null
          status?: 'draft' | 'scheduled' | 'published' | 'failed'
          platform?: 'linkedin' | 'twitter'
          created_at?: string
          updated_at?: string
        }
      }
      user_connections: {
        Row: {
          id: string
          user_id: string
          platform: 'linkedin' | 'twitter'
          access_token: string
          refresh_token: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: 'linkedin' | 'twitter'
          access_token: string
          refresh_token?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: 'linkedin' | 'twitter'
          access_token?: string
          refresh_token?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 