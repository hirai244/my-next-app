export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          created_at: string;
          id: number;
          job_id: number;
          status: Database["public"]["Enums"]["CREATE TYPE app_status AS ENUM"];
          student_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          job_id: number;
          status: Database["public"]["Enums"]["CREATE TYPE app_status AS ENUM"];
          student_id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          job_id?: number;
          status?: Database["public"]["Enums"]["CREATE TYPE app_status AS ENUM"];
          student_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
      farmers: {
        Row: {
          created_at: string | null;
          description: string | null;
          email: string;
          farm_name: string;
          id: string;
          location: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          email: string;
          farm_name: string;
          id: string;
          location: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          email?: string;
          farm_name?: string;
          id?: string;
          location?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          address_line1: string;
          city: string;
          created_at: string;
          current_member: number;
          date: string;
          email: string;
          end: string;
          farmer_id: string;
          id: number;
          member: number;
          notes: string | null;
          photo_url: string | null;
          prefecture: string;
          range_end: string;
          range_start: string;
          start: string;
          status: Database["public"]["Enums"]["CREATE TYPE job_status AS ENUM"];
          title: string;
          work_details: string;
          zip_code: string;
        };
        Insert: {
          address_line1: string;
          city: string;
          created_at?: string;
          current_member: number;
          date: string;
          email: string;
          end: string;
          farmer_id?: string;
          id?: number;
          member: number;
          notes?: string | null;
          photo_url?: string | null;
          prefecture: string;
          range_end: string;
          range_start: string;
          start: string;
          status: Database["public"]["Enums"]["CREATE TYPE job_status AS ENUM"];
          title: string;
          work_details: string;
          zip_code: string;
        };
        Update: {
          address_line1?: string;
          city?: string;
          created_at?: string;
          current_member?: number;
          date?: string;
          email?: string;
          end?: string;
          farmer_id?: string;
          id?: number;
          member?: number;
          notes?: string | null;
          photo_url?: string | null;
          prefecture?: string;
          range_end?: string;
          range_start?: string;
          start?: string;
          status?: Database["public"]["Enums"]["CREATE TYPE job_status AS ENUM"];
          title?: string;
          work_details?: string;
          zip_code?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string | null;
          id: string;
          role: string;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          role: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: string;
        };
        Relationships: [];
      };
      students: {
        Row: {
          bio: string | null;
          created_at: string | null;
          email: string;
          full_name: string;
          id: string;
          location: string;
          university: string;
        };
        Insert: {
          bio?: string | null;
          created_at?: string | null;
          email: string;
          full_name: string;
          id?: string;
          location: string;
          university: string;
        };
        Update: {
          bio?: string | null;
          created_at?: string | null;
          email?: string;
          full_name?: string;
          id?: string;
          location?: string;
          university?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      "CREATE TYPE app_status AS ENUM":
        | "pending"
        | "accepted"
        | "rejected"
        | "withdrawn";
      "CREATE TYPE job_status AS ENUM":
        | "draft"
        | "active"
        | "closed"
        | "expired";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      "CREATE TYPE app_status AS ENUM": [
        "pending",
        "accepted",
        "rejected",
        "withdawn",
      ],
      "CREATE TYPE job_status AS ENUM": [
        "draft",
        "active",
        "closed",
        "expired",
      ],
    },
  },
} as const;
