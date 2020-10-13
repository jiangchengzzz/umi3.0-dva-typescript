/*
 * @Author: 蒋承志
 * @Description: 封装的请求
 * @Date: 2020-09-21 11:16:42
 * @LastEditTime: 2020-10-13 15:39:54
 * @LastEditors: 蒋承志
 */
import { extend, RequestOptionsInit } from 'umi-request';
import { message, notification } from 'antd';

import { handleWebStorage } from '@/utils/base';
let header: any = handleWebStorage.getLocalData('token_type') ? {
  Authorization: handleWebStorage.getLocalData('token_type') + handleWebStorage.getLocalData('access_token')
} : {}


type Map = {
    [key: number]: string;
};

/**
 * @Description: 提示没有权限引导登录
 * @return {type}
 * @Author: 蒋承志
 */


const codeMessage : Map= {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any)  => {
  const { response } = error
  if( response ) {
    const { status, url } = response
    if( status > 400 ) {
      if (status === 401) {
        message.warning('您的登录已过期，若想继续获取很好的服务请重新登录');
        handleWebStorage.removeLocalData('token_type');
        handleWebStorage.removeLocalData('access_token');
        window.location.reload();
      }
    } else {
      notification.error({
        message: `Network Error!`,
        description: error.data.message ? error.data.message : error.data ,
      });
    }
  }

  throw error; // If throw. The error will continue to be thrown. // 可用于 catch 回调
};

/**
 * 配置request请求时的默认参数
 */
const http = extend({
  timeout: 300000,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
http.interceptors.request.use((url, options: RequestOptionsInit) => {
  header = handleWebStorage.getLocalData('token_type') ? {
    Authorization: handleWebStorage.getLocalData('token_type') + handleWebStorage.getLocalData('access_token')
  } : {}
  options.headers = Object.assign(header, options.headers)
  return {
    url,
    options,
  };
});

// response拦截器, 处理response
http.interceptors.response.use(async (response: any) => {
  let data;
  if (response.headers.get('codeKey')) {
    data = await response.blob();
  } else {
    data = await response.clone().json();
  }
  if(response.status === 200) {
    if (response.headers.get('codeKey')) {
      return {
        img: data,
        codeKey: response.headers.get('codeKey')
      };
    } else {
      return data;
    }
    // if(data.code !== '1000') {
    //   notification.error({
    //     message: '操作失败',
    //     description: data.msg,
    //     duration: 2,
    //   });
    //   return false
    // }
    // return  data.data;
  } else if (response.status === 401) {
  } else {
  }
  return  response;
});

export default http;