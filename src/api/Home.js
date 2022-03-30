import request from '@/utils/request'

// 首页：推荐歌单数据请求
export const recommendMusic = params => request({
  url: '/personalized',
  params,
})

// 最新音乐数据请求
export const newMusic = params => request({
  url: '/personalized/newsong',
  params
})