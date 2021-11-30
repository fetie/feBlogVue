import {socialsList,siteInfo} from '@/api/types/index'

export interface State {
  loading: boolean,
  runTimeInterval: string,
  socials: socialsList,
  websiteInfo: siteInfo,
}