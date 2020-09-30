/*
 * @Author: 蒋承志
 * @Description: 常见问题
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-29 17:21:56
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './component.less';
import { Pagination } from 'antd';
import http from '@/utils/http';
import { getCommonQa } from '@/servers/qaHome';

interface CommonQaProps{
  getQa: Function
}

class CommonQa extends Component<CommonQaProps> {
  constructor(props: CommonQaProps){
    super(props)
  }
  state = {
    qaList: [],
    loading: false,
    total: 0,
    pageIndex: 1,
    pageSize: 10
  }

  // 所有的组件（包括子组件）在render执行完之后立即调用，并且只会被调用一次。
  // 组件已经初始化完成
  // DOM树渲染完成
  // Tip: 建议在此请求数据
  componentDidMount() {
    this.getQaList();
  }
  // props的数据发生改变的时候触发，在该函数内部this.props.属性还没有发生变化，但是可以通过第一个参数nextProps获取到修改之后的props属性
  // 在props被改变时被触发，初始化render时不调用。
  // 旧的属性还是可以通过this.props来获取，在这里通过调用this.setState()来更新你的组件状态。
  // Tip1: 某些情况下，props没变也会触发该钩子函数，需要在方法里手动判断一下this.props和nextProps是否相同，不相同了才执行我的更新方法。
  // Tip2：该函数一般用来更新依赖props的状态
  componentWillReceiveProps(nextProps: any) {
  }
  // 组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）
  // 在函数内部state和props还未改变，新的props和state在两个参数内
  // 发生重渲染时，在render()函数调用前被调用的函数，当函数返回false时候，阻止接下来的render()函数的调用，阻止组件重渲染，而返回true时，组件照常重渲染。
  // 该方法并不会在初始化渲染或当使用forceUpdate()时被调用。
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return true;
  }

  // shouldComponentUpdate返回true或者调用forceUpdate之后，componentWillUpdate会被调用。
  // 数据修改，接着执行render
  componentWillUpdate(nextProps: any, nextState: any) {
  }

  // 触发时间: update发生的时候，在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法
  // 该函数在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给componentDidUpdate()。
  // getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
  //   return true;
  // }

  componentDidUpdate(prevProps: any, prevState: any) {
      // 数据修改成功，组件更新完成后调用
      // 除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate。
      // 通过prevProps和prevState访问修改之前的props和state
  }

  componentWillUnmount() {
      // 在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的DOM元素。
  }

  componentDidCatch(error: any, info: any) {
      // 该函数称为错误边界，捕捉发生在子组件树中任意地方的JavaScript错误，打印错误日志，并且显示回退的用户界面。
      // Tip：错误边界只捕捉树中发生在它们之下组件里的错误。一个错误边界并不能捕捉它自己内部的错误。
  }

  /**
   * @Description: 获取qa列表数据
   * @return {type}
   * @Author: 蒋承志
   */
  async getQaList() {
    this.setState({
      loading: true
    })
    const data = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize
    };
    const res = await getCommonQa(data);
    console.log('res :>> ', res);
    this.setState({
      qaList: res.result.result,
      total: res.result.total,
      loading: false
    })
  }
  pageChange(v: number) {
    this.setState({
      pageIndex: v
    }, () => {
      this.getQaList();
    })
  }
  render() {
    const { qaList, pageIndex, pageSize, total } : any = this.state;
    console.log('qaList124123412341234 :>> ', qaList);
    return (
      <div className="commonQa">
        <div className="dataList">
          {
            qaList.length > 0 && qaList.map((v: any, i: number) => {
              return (
                <div className="dataItem" key={v.docId} onClick={() => this.props.getQa(v)}>
                  <div className="ind">{i + (pageIndex - 1) * pageSize + 1}.</div>
                  <div className="info text-ellipsis">{v.docName}</div>
                </div>
              )
            })
          }
        </div>
        <Pagination size="small" total={total} showSizeChanger={false} onChange={(v) => this.pageChange(v)} />
      </div>
    );
  }
}
export default CommonQa;