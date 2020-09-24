/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-23 17:39:10
 * @LastEditTime: 2020-09-24 19:17:38
 * @LastEditors: 蒋承志
 */
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface LoginModelState {
  modelVisble: boolean;
  name: string;
}
export interface LoginModelType {
  namespace: 'Login';
  state: LoginModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<LoginModelState>;
    // 启用 immer 之后
    changeVisble: ImmerReducer<LoginModelState>;
  };
  subscriptions: { setup: Subscription };
}
const LoginModel: LoginModelType = {
  namespace: 'Login',
  state: {
    modelVisble: false,
    name: '',
  },
  effects: {
    *query({ payload }, { call, put }) {
    },
  },
  reducers: {
    changeVisble(state,{payload}){
			return {...state,...payload}
		}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};
export default LoginModel;