import type { State } from './state'
import type { siteInfo, socialsList } from '@/api/types'

export interface Mutations<S = State> {
  SET_LOADING(state: S, v: boolean): void
  SET_SOCIALS(state: S, v: socialsList): void
  SET_SITE_INFO(state: S, v: siteInfo): void
  GET_RUNTIME_INTERVAL(state: S): void
}
