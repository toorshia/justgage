/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'justgage' {
  export class JustGage {
    constructor(config: any)
    refresh(value: number, max?: number, min?: number, label?: string): void
    update(config: any): void
    destroy(): void
  }
  export const VERSION: string
}
