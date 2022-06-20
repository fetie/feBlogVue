export interface articleData {
  content: string
  createTime: number
  updateTime: number
  title: string
  author: string
  sort: number
  viewNum: number
  banner: string[]
  _id: string
}
export interface articleList {
  page: number
  pageSize: number
  count: number
  data: articleData[]
}

export type categoriesList = {
  title: string
  _id: string
}[]

export type friendsList = {
  desc: string
  siteName: string
  path: string
  _id: string
}[]

export interface messageList {
  content: string
  email: string
}

export interface siteInfo {
  id: number
  desc: string
  notice: string
  domain: string
  name: string
  slogan: string
  avatar: string
  _id: string
}

export type socialsList = {
  href: string
  color: string
  icon: string
  title: string
  _id: string
}[]

export interface userInfo {
  roles: string[]
  desc: string
  avatar: string
  pwd: string
  name: string
  _id: string
}
