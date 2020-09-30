/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-27 11:43:51
 * @LastEditTime: 2020-09-30 11:25:34
 * @LastEditors: 蒋承志
 */

import http from '@/utils/http';

// 选择问题类别
export const getQaType = async (data: any) => {
  return http('/api/qa/type', {
    method: 'post',
    data: data
  })
}

// 通过id获取问答
export const getQaDetail = async (data: any) => {
  return http('/api/qa/recommend/detail', {
    method: 'post',
    data: data
  })
}
// 获取问答对话
export const getQa = async (data: any) => {
  return http('/api/qa', {
    method: 'post',
    data: data
  })
}
// 获取常见问题
export const getCommonQa = async (data: any) => {
  return http('/api/qa/recommend', {
    method: 'get',
    data: data
  })
}
// 获取热门标签
export const getLabel = async (data: any) => {
  return http('/api/qa/hot/label', {
    method: 'get',
    data: data
  })
}
// 获取相关案例
export const getCase = async (data: any) => {
  return http('/api/qa/recommend/case', {
    method: 'get',
    data: data
  })
}
// 标记是否已解决
export const setSolveType = async (data: any) => {
  return http('/api/qa/mark', {
    method: 'post',
    data: data
  })
}
// 标记是否已解决
export const getRecord = async (data: any) => {
  return http('/api/qa/record', {
    method: 'get',
    data: data
  })
}