/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-25 15:25:45
 * @LastEditTime: 2020-09-27 11:24:52
 * @LastEditors: 蒋承志
 */
import http from '@/utils/http';
import { handleWebStorage } from '@/utils/base'

const accessToken: string = handleWebStorage.getLocalData('access_token');
const tokenType:  string = handleWebStorage.getLocalData('token_type');

export const getPhonecode = async (data: any) => {
  return http(`/api/auth/verificationcode/${data.phone}`, {
    method: 'get'
  })
  // .then( res => {
  //   return res;
  // })
  // .catch( err => {
  //   return false
  // });
}

// export function getPhonecode(data: any) {
//   return http.get('/api/auth/verificationcode/' + data.phone)
// }
export const getVcode = async (data: any) => {
  return http('/api/auth/graphicalcode', {
    method: 'get',
    data: data
  })
}
export const accountLogin = async (data: any) => {
  return http.post('/api/auth/oauth/login', {
    method: 'post',
    data: data,
    requestType: 'form'
  });
}
export const phoneLogin = async (data: any) => {
  return http.post('/api/auth/oauth/login', {
    method: 'post',
    data: data,
    requestType: 'form'
  });
}
export const userInfo = async () => {
  return http('/api/auth/tenant/info', {
    method: 'get',
    headers: {
      Authorization: handleWebStorage.getLocalData('token_type') + handleWebStorage.getLocalData('access_token')
    }
  })
}
export const userBaseInfo = async () => {
  return http('/api/portal/uc/user/base-info', {
    method: 'get',
    headers: {
      Authorization: handleWebStorage.getLocalData('token_type') + handleWebStorage.getLocalData('access_token')
    }
  })
}
export const getPermission = async () => {
  return http('/api/portal/uc/user/portal/permission', {
    method: 'get',
    headers: {
      Authorization: handleWebStorage.getLocalData('token_type') + handleWebStorage.getLocalData('access_token')
    }
  })
}

//   //   http.get('/api/qaChatList', {
//   //     params: {
//   //       value: this.state.labelScreenVal
//   //     }
//   //   }).then((res: any) => {
//   //     this.setState({
//   //       labelList: res.labelList
//   //     })
//   //   }).catch( (e: any) => {
//   //   })
