interface matchedRoutes {
  matchedRoutes: any[]
}
export function onRouteChange({ matchedRoutes }: matchedRoutes) {
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}
// import { createLogger } from 'redux-logger';
// import { message } from 'antd';
// export const dva = {
//   config: {
//     // onAction: createLogger(),
//     onError(e: Error) {
//       message.error(e.message, 3);
//     },
//   },
// };
