/*
 * @Author: 蒋承志
 * @Description: 我的收藏问题
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-09 17:49:55
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './component.less';
import { Pagination } from 'antd';
import { getFavoriteList } from '@/servers/qaHome';


interface qaType{
}

class FavoriteQa extends Component {
  constructor(props: any){
    super(props)
  }
  state = {
    favoriteList: [],
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
    this.getFavoriteList();
  }
    /**
   * @Description: 获取qa列表数据
   * @return {type}
   * @Author: 蒋承志
   */
  async getFavoriteList() {
    this.setState({
      loading: true
    })
    const data = {
      docType: '',
      keyWord: '',
      orderBy: '1',
      pageIndex: this.state.pageIndex,
      pageSize: 10
    }
    const res: any = await getFavoriteList(data);
    const resData: any = res.result;
    this.setState({
      loading: false,
      favoriteList: resData.result,
      total: resData.total,
    })
  }
  itemClick(data: any) {
    let url = '/detail/lawsRegulations';
    switch (String(data.docType)) {
      case '1':
        url = '/detail/manageStandard';
        break;
      case '2':
        url = '/detail/formProve';
        break;
      case '3':
        url = '/detail/lawsRegulations';
        break;
      case '4':
        url = '/detail/policyExplain';
        break;
      case '5':
        url = '/detail/ratepayingServeStandard';
        break;
      case '6':
        url = '/detail/inspectStandard';
        break;
      case '7':
        url = '/detail/fanLawsRegulations';
        break;
      case '8':
        url = '/detail/referCase';
        break;
      case '9':
        url = '/term/detail';
        break;
      default:
        break;
    }
    window.open(`/#${url}?id=${data.docId}&type=${data.docType}${data.docType === '6' ? `&version=${data.docVersion}` : ''}`, '_blank');
  }
  pageChange(v: number) {
    this.setState({
      pageIndex: v
    }, () => {
      this.getFavoriteList();
    })
  }
  render() {
    const { favoriteList, pageIndex, pageSize, total } : any = this.state
    return (
      <div className="myFavorite">
        <div className="dataList">
          {
            favoriteList.map((v: any, i: number) => {
              return (
                <div className="dataItem" key={v.docId} onClick={() => this.itemClick(v)}>
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
export default FavoriteQa;