/// <reference types="astro/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.astro' {
  const component: any;
  export default component;
}