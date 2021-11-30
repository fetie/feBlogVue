import { Commit } from 'vuex'
import { State } from './state'
import {socialsList,siteInfo} from '@/api/types'

export interface Actions {
  setLoading(
    { commit }: { commit: Commit; state: State },
    v: boolean
  ): void
  initComputeTime(
    { commit }: { commit: Commit; state: State }
  ): void
  getSiteInfo({ commit }: { commit: Commit; state: State }): Promise<siteInfo|null>
  getSocials({
    commit
  }: {
    commit: Commit
    state: State
  }): Promise<socialsList>
}
