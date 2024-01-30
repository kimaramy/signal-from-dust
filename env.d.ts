declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly NEXT_PUBLIC_SEOUL_OPENAPI_TOKEN: string;
    readonly NEXT_PUBLIC_SEOUL_OPENAPI_ORIGIN: string;
  }
}
