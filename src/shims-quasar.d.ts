declare module 'quasar/wrappers' {
  import { Router } from 'vue-router';

  export function route<T = unknown>(
    callback: (params: { store?: T; ssrContext?: unknown }) => Router
  ): typeof callback;

  export function boot<T = unknown>(
    callback: (params: { app: unknown; router: Router; store?: T; ssrContext?: unknown }) => void
  ): typeof callback;

  export function configure(callback: (ctx: unknown) => unknown): typeof callback;
}
