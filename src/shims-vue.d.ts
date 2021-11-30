/*declare module '*.vue' {
  import { FunctionalComponent, defineComponent } from 'vue'
  const component:ReturnType<typeof defineComponent> | FunctionalComponent
  export default component
}*/


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}