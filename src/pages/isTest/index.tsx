import React, {Component} from "react";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";
import "./index.less";

class IsTest extends Component {
  constructor(props: any){
    super(props)
  }
  componentWillMount() {
    // 组件挂载到DOM前调用
  }
  render() {
    return (
      <div className="App">
        <h1>我就是测试配置式裤头</h1>
      </div>
    );
  }
}
export default IsTest;