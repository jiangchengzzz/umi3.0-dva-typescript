/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-16 11:37:11
 * @LastEditTime: 2020-09-22 17:31:51
 * @LastEditors: 蒋承志
 */
declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module "wangeditor";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
