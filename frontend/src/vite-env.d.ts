/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STYTCH_PUBLIC_TOKEN: string;
  readonly VITE_STYTCH_ORGANIZATION_SLUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
