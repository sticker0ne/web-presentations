export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: {
          id: number
          title: string
          price: number
          position: string
          type: string
          imageFileName: string | null
          presentationFileName: string | null
        }
        Insert: {
          id?: number
          title?: string
          price?: number
          position?: string
          type: string
          imageFileName?: string | null
          presentationFileName?: string | null
        }
        Update: {
          id?: number
          title?: string
          price?: number
          position?: string
          type?: string
          imageFileName?: string | null
          presentationFileName?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
