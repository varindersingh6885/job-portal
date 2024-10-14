export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          created_at: string
          id: number
          name: string
          state_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          state_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          state_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cities_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          id: number
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string
        }
        Update: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          city_id: number | null
          company_id: number | null
          country_id: number | null
          created_at: string
          description: string | null
          id: number
          max_experience: number | null
          max_salary: number | null
          min_experience: number | null
          min_salary: number | null
          state_id: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          city_id?: number | null
          company_id?: number | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          max_experience?: number | null
          max_salary?: number | null
          min_experience?: number | null
          min_salary?: number | null
          state_id?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          city_id?: number | null
          company_id?: number | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          max_experience?: number | null
          max_salary?: number | null
          min_experience?: number | null
          min_salary?: number | null
          state_id?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      states: {
        Row: {
          country_id: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          country_id: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          country_id?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "states_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          city_id: number | null
          country_id: number | null
          created_at: string
          expected_salary: number | null
          experience: number | null
          first_name: string | null
          github_username: string | null
          id: number
          last_name: string | null
          profile_description: string | null
          resume_url: string | null
          state_id: number | null
          user_id: string | null
        }
        Insert: {
          city_id?: number | null
          country_id?: number | null
          created_at?: string
          expected_salary?: number | null
          experience?: number | null
          first_name?: string | null
          github_username?: string | null
          id?: number
          last_name?: string | null
          profile_description?: string | null
          resume_url?: string | null
          state_id?: number | null
          user_id?: string | null
        }
        Update: {
          city_id?: number | null
          country_id?: number | null
          created_at?: string
          expected_salary?: number | null
          experience?: number | null
          first_name?: string | null
          github_username?: string | null
          id?: number
          last_name?: string | null
          profile_description?: string | null
          resume_url?: string | null
          state_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email_id: string
          id: number
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_id: string
          id?: number
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_id?: string
          id?: number
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
