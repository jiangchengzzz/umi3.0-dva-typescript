/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-21 10:45:43
 * @LastEditTime: 2020-09-21 17:28:33
 * @LastEditors: 蒋承志
 */
export default {
  // 获取问答列表
  'GET /api/common/qaList': {
    code: '1000',
    msg: '',
    result: {
      pageIndex: 1,
      pageSize: 10,
      total: 1000,
      qaList: [
        {
          id: '1234123412',
          info: '房地产公司购买景区年卡，赠送给买房业主。'
        },
        {
          id: '12341212',
          info: '房地产公司购买景区年卡，房地产公司购买景区年卡，赠送给买房业主。'
        },
        {
          id: '34134',
          info: '房地产公司购买景区年卡，赠送给买房地产公司购买景区年卡，房地产公司购买景区年卡，主。'
        },
        {
          id: '452',
          info: '公司购买景区年卡，赠送给买房业主。'
        },
        {
          id: '12341216623412',
          info: '公司购买景区年卡，赠送给买房业主。'
        },
        {
          id: '7351423',
          info: '区年卡，赠送给买房业主。'
        },
        {
          id: '256324',
          info: '房地产公司购买景区年景区年卡，赠送给买房业主。'
        },
        {
          id: '237er523453421',
          info: '房地产公司购买景区年卡，赠送给买买景区年卡，赠送给买买景区年卡，赠送给买房业主。'
        },
        {
          id: '135612623',
          info: '房地产买景区年卡，赠送给买房业主。'
        },
        {
          id: '123412341234523422',
          info: '房12312312312购买景区年卡，赠送给买房业主。'
        }
      ],
    }
  },
  // 获取问答列表
  'GET /api/labelList': {
    code: '1000',
    msg: '',
    result: {
      labelList: [
        {
          id: '1234123412',
          name: '房地产利息'
        },
        {
          id: '12341212',
          name: '子女教育'
        },
        {
          id: '34134',
          name: '增值税加计折扣'
        },
        {
          id: '452',
          name: '房地产利息啊啊啊'
        },
        {
          id: '12341216623412',
          name: '房地产'
        }
      ],
    }
  },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
}