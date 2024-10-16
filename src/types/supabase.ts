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
      applications: {
        Row: {
          candidate_id: string | null
          candidate_note: string | null
          created_at: string
          expected_salary: number | null
          id: number
          job_id: number | null
          manual_application: boolean | null
          profile_id: number | null
          resume_name: string | null
          resume_url: string | null
          status: Database["public"]["Enums"]["application_status"] | null
        }
        Insert: {
          candidate_id?: string | null
          candidate_note?: string | null
          created_at?: string
          expected_salary?: number | null
          id?: number
          job_id?: number | null
          manual_application?: boolean | null
          profile_id?: number | null
          resume_name?: string | null
          resume_url?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
        }
        Update: {
          candidate_id?: string | null
          candidate_note?: string | null
          created_at?: string
          expected_salary?: number | null
          id?: number
          job_id?: number | null
          manual_application?: boolean | null
          profile_id?: number | null
          resume_name?: string | null
          resume_url?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      job_skills: {
        Row: {
          created_at: string
          job_id: number
          skill_id: number
        }
        Insert: {
          created_at?: string
          job_id: number
          skill_id: number
        }
        Update: {
          created_at?: string
          job_id?: number
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          city_id: number
          company_id: number
          contact_email: string | null
          contact_number: string | null
          country_id: number
          created_at: string
          description: string
          description_document_name: string
          description_document_url: string
          id: number
          is_open: boolean
          max_experience: number
          max_salary: number
          min_experience: number
          min_salary: number
          state_id: number
          title: string
          user_id: string
          work_mode: Database["public"]["Enums"]["work_mode"]
        }
        Insert: {
          city_id: number
          company_id: number
          contact_email?: string | null
          contact_number?: string | null
          country_id: number
          created_at?: string
          description: string
          description_document_name: string
          description_document_url: string
          id?: number
          is_open?: boolean
          max_experience: number
          max_salary: number
          min_experience: number
          min_salary: number
          state_id: number
          title: string
          user_id?: string
          work_mode: Database["public"]["Enums"]["work_mode"]
        }
        Update: {
          city_id?: number
          company_id?: number
          contact_email?: string | null
          contact_number?: string | null
          country_id?: number
          created_at?: string
          description?: string
          description_document_name?: string
          description_document_url?: string
          id?: number
          is_open?: boolean
          max_experience?: number
          max_salary?: number
          min_experience?: number
          min_salary?: number
          state_id?: number
          title?: string
          user_id?: string
          work_mode?: Database["public"]["Enums"]["work_mode"]
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
      user_profile_skills: {
        Row: {
          created_at: string
          id: number
          skill_id: number | null
          user_id: string | null
          user_profile_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          skill_id?: number | null
          user_id?: string | null
          user_profile_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          skill_id?: number | null
          user_id?: string | null
          user_profile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profile_skills_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          city_id: number | null
          country_id: number | null
          created_at: string
          email: string | null
          expected_salary: number | null
          experience: number | null
          first_name: string | null
          github_username: string | null
          id: number
          last_name: string | null
          phone_number: string | null
          profile_description: string | null
          resume_name: string | null
          resume_url: string | null
          state_id: number | null
          user_id: string
        }
        Insert: {
          city_id?: number | null
          country_id?: number | null
          created_at?: string
          email?: string | null
          expected_salary?: number | null
          experience?: number | null
          first_name?: string | null
          github_username?: string | null
          id?: number
          last_name?: string | null
          phone_number?: string | null
          profile_description?: string | null
          resume_name?: string | null
          resume_url?: string | null
          state_id?: number | null
          user_id?: string
        }
        Update: {
          city_id?: number | null
          country_id?: number | null
          created_at?: string
          email?: string | null
          expected_salary?: number | null
          experience?: number | null
          first_name?: string | null
          github_username?: string | null
          id?: number
          last_name?: string | null
          phone_number?: string | null
          profile_description?: string | null
          resume_name?: string | null
          resume_url?: string | null
          state_id?: number | null
          user_id?: string
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
      application_status: "applied" | "interviewing" | "hired" | "rejected"
      work_mode: "remote" | "hybrid" | "onsite"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
