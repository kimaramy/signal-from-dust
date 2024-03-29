declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly SEOUL_OPENAPI_URL: string;
    readonly SEOUL_OPENAPI_KEY: string;
  }
}
