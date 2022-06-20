import type { siteInfo, socialsList } from '@/api/types/index'

export interface State {
  loading: boolean
  runTimeInterval: string
  socials: socialsList
  websiteInfo: siteInfo
}
