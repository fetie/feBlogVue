import type { State } from './state'
import type { siteInfo, socialsList } from '@/api/types'

export interface Getters {
  loading(state: State): boolean
  runTimeInterval(state: State): string | undefined
  notice(state: State): string | undefined
  socials(state: State): socialsList | undefined
  websiteInfo(state: State): siteInfo | undefined
}
