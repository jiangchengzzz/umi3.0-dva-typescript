import BasicLayout from './basicLayout/index';
import React, { Component } from 'react';
import { Redirect} from 'umi';

const Layout: any = (props: any) => {
  const { children, loading, location: { pathname = '/' }, route: { routes }, } = props;
  if (pathname === '/') {
    return <Redirect to="/home" />
  }
  return <BasicLayout>{children}</BasicLayout>;
};
export default Layout;
