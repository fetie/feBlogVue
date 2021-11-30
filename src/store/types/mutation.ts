import { State } from './state'
import {socialsList,siteInfo} from '@/api/types'

export type Mutations<S = State> = {
  SET_LOADING(state: S, v: boolean): void
  SET_SOCIALS(state: S, v: socialsList): void
  SET_SITE_INFO(state: S, v: siteInfo): void
  GET_RUNTIME_INTERVAL(state: S): void
}