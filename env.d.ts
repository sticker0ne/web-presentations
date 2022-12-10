/// <reference types="vite/client" />
interface ImportMetaEnv {
  APP_SUPABASE_URL: string;
  APP_SUPABASE_ANON_KEY: string;
  APP_APARTMENT_IMAGE_LINK_PREFIX: string;
  APP_APARTMENT_PDF_LINK_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
