import { State } from './state'
import {socialsList,siteInfo} from '@/api/types'

export type Getters = {
  loading(state: State): boolean
  runTimeInterval(state: State): string | undefined
  notice(state: State): string | undefined
  socials(state: State): socialsList | undefined
  websiteInfo(state: State): siteInfo | undefined
}

