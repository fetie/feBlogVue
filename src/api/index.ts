import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/articles/find',
        method: 'get',
        params: params
    })
}

export function fetchArticle(params) {
    return request({
        url: `/articles/find/${params.id}`,
        method: 'get',
    })
}

export function fetchFocus() {
    return request({
        url: '/focus/list',
        method: 'get',
        params: {}
    })
}

export function fetchCategory() {
    return request({
        url: '/categories/find',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: '/friends',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: '/socials/',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: '/sites/',
        method: 'get',
        params: {}
    })
}

export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}

export function articleView(params) {
    return request({
        url: '/articles/view',
        method: 'post',
        data:params
    })
}

export function leaveMessage(params) {
    return request({
        url: '/messages',
        method: 'post',
        data:params
    })
}