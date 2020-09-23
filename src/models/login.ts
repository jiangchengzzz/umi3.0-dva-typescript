/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-23 17:39:10
 * @LastEditTime: 2020-09-23 17:48:14
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
    save: ImmerReducer<LoginModelState>;
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
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    // 启用 immer 之后
    save(state, action) {
      state.name = action.payload.name;
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