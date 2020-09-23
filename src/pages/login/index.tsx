import React, {Component} from "react";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";

console.log(888888)
class Login extends Component {
  constructor(props: any){
    super(props)
  }
  componentWillMount() {
    // 组件挂载到DOM前调用
  }
  render() {
    return (
      <div className="App">
        <h1>antd version: {version}</h1>
        <DatePicker />
        <Button type="primary" style={{ marginLeft: 8 }}>
          login
        </Button>
      </div>
    );
  }
}
export default Login;