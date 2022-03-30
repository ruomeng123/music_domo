import request from '@/utils/request'

export const hotSearch = () => request({
  url: '/search/hot'
})

export const searchResultList = params => request({
  url: '/cloudsearch',
  params
})