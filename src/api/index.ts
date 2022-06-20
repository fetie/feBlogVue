import request from '../utils/request'
import type {
  articleData,
  articleList,
  categoriesList,
  friendsList,
  messageList,
  siteInfo,
  socialsList,
} from './types/index'

export function fetchList(params: { page: number; title: string | string[] }) {
  return request<articleList>({
    url: '/articles/find',
    method: 'get',
    params,
  })
}

export function fetchArticle(params: { id: number | string | string[] }) {
  return request<articleData>({
    url: `/articles/find/${params.id}`,
    method: 'get',
  })
}

export function fetchCategory() {
  return request<categoriesList>({
    url: '/categories/find',
    method: 'get',
    params: {},
  })
}

export function fetchFriend() {
  return request<friendsList>({
    url: '/friends',
    method: 'get',
    params: {},
  })
}

export function fetchSocial() {
  return request<socialsList>({
    url: '/socials/',
    method: 'get',
    params: {},
  })
}

export function fetchSiteInfo() {
  return request<siteInfo>({
    url: '/sites/',
    method: 'get',
    params: {},
  })
}

export function articleView(params: { id: number | string | string[] }) {
  return request<articleData>({
    url: '/articles/view',
    method: 'post',
    data: params,
  })
}

export function leaveMessage(params: messageList) {
  return request<messageList[]>({
    url: '/messages',
    method: 'post',
    data: params,
  })
}
