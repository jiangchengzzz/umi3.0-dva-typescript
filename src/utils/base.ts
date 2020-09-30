/*
 * @Descripttion: 公共处理方法
 * @Author: 王小杰
 * @Date: 2019-08-08 15:02:27
 * @LastEditors: 蒋承志
 * @LastEditTime: 2020-09-27 11:11:29
 */

export const decideType = {
  // 统一处理参数错误
  _paramsHandler(p: any): any {
    if (!p && p !== null) {
      throw new Error('param is not defined!');
    }
  },

  // 判断是否为字符串
  isString(str: any): boolean {
    this._paramsHandler(str);
    return typeof str === 'string';
  },

  // 判断是否为数字
  isNumber(num: any): boolean {
    this._paramsHandler(num);
    return typeof num === 'number';
  },

  // 判断是否为布尔值
  isBoolean(bool: any): boolean {
    this._paramsHandler(bool);
    return typeof bool === 'boolean';
  },

  // 判断是否为函数
  isFunction(fn: any) {
    this._paramsHandler(fn);
    return typeof fn === 'function';
  },

  // 判断是否为数组
  isArray(arr: any): boolean {
    this._paramsHandler(arr);
    return Object.prototype.toString.call(arr) === '[object Array]';
  },

  // 判断是否为对象
  isObject(obj: any): boolean {
    this._paramsHandler(obj);
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
};

// ==================== 原工具方法 后期删除 start========================
// 判断是否为函数
export function isFunction(fn: any) {
  if (!fn) {
    return false;
  }
  return typeof fn === 'function';
}

// 判断是否为字符串
export function isString(str: string) {
  if (!str) {
    return false;
  }
  return typeof str === 'string';
}

// 判断是否为对象
export function isObject(obj: object) {
  if (!obj) {
    return false;
  }
  return Object.prototype.toString.call(obj) === '[object Object]';
}

// 与日期相关的方法集合
export const handleDate = {
  // 获取当前年份
  getCurrentFullYear: () => {
    return new Date().getFullYear();
  },

  // 获取当前月份
  getCurrentMonth: () => {
    return new Date().getMonth() + 1;
  },

  // 获取当前天数
  getCurrentDay: () => {
    return new Date().getDate();
  },

  // 时间格式化
  dateFormat: (time: any, fmt: string) => {
    if (!time) {
      return '';
    }
    const d = new Date(time);
    const o: any = {
      'M+': d.getMonth() + 1, // 月份
      'd+': d.getDate(), // 日
      'z+': d.getDate() - 1, // 昨日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      'S': d.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (d.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt;
  },

  // 时间格式
  ChangeDateFormat: (now: any) => {
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  }
};

/* 数字金额逢三加， 比如 123,464.23 */
export function numberToCurrency(value: any, fixed2?: boolean) {
  // 预定义小数部分
  let floatPart;
  if (fixed2) {
    // 保留两位
    if (!value) {
      return '0.00';
    }
    value = value.toFixed(2);
    floatPart = '.00';
  } else {
    // 不保留的情况
    if (!value) {
      return '0';
    }
    floatPart = ''; // 不保留
  }
  // 获取整数部分
  const intPart = Math.trunc(value);
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split('.');
  if (valueArray.length === 2) { // 有小数部分
    floatPart = valueArray[1].toString(); // 取得小数部分
    return intPartFormat + '.' + floatPart;
  }
  return intPartFormat + floatPart;
}

/**
 * @desc 对本地存储 WebStorage 进行封装操作，包含设置、读取，删除和清空
 * @param none
 * @return Object
 * @author liuzhen
 */
export const handleWebStorage = {
  // 设置数据
  setLocalData: (key: any, value: any, type: string = 'localStorage') => {
    // 如果value为对象或数组，则进行序列化
    // if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
    value = JSON.stringify(value);
    // }

    if (type === 'localStorage') {
      // 如果操作为默认的localStorge
      localStorage.setItem(key, value);
    } else if (type === 'sessionStorage') {
      sessionStorage.setItem(key, value);
    } else {
      throw new Error(
        `params ${type} is Error, it must able of ${localStorage} or ${sessionStorage}`
      );
    }
  },

  // 获取数据
  getLocalData: (key: string, type: any = 'localStorage') => {
    if (type === 'localStorage') {
      const temp: string | null = localStorage.getItem(key);
      if (temp) {
        return JSON.parse(temp);
      }
      // return JSON.parse(localStorage.getItem(key));
    } else if (type === 'sessionStorage') {
      const temp: string | null = sessionStorage.getItem(key);
      if (temp) {
        try {
          return JSON.parse(temp);
        } catch (e) {
          return temp;
        }
      }
      // return JSON.parse(sessionStorage.getItem(key): string | null);
    }
  },

  // 删除某条数据
  removeLocalData: (key: string, type = 'localStorage') => {
    if (type === 'localStorage') {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  },

  // 清空数据
  clearLocalData: (type = 'localStorage') => {
    if (type === 'localStorage') {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  },

  // 批量将对象参数中的信息存入本地
  batchSetLocalData: (obj: any, type = 'localStorage') => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      throw new Error(`params ${obj} must be a Object`);
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (type === 'localStorage') {
          localStorage.setItem(key, obj[key]);
        } else {
          sessionStorage.setItem(key, obj[key]);
        }
      }
    }
  }
};

/**
 *  @description 返回随机字符串
 *  @param 可指定字符串长度
 *  @return String（随机字符串）
 *  @author liuzhen
 */
export function getRandomString(len: number) {
  len = len || 32;
  const $chars: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxLen: number = $chars.length;
  let randomStr: string = '';

  for (let i = 0; i < len; i++) {
    randomStr += $chars.charAt(Math.floor(Math.random() * maxLen));
  }

  return randomStr;
}

/**
 * @description 对DOM添加动画操作，如果用户浏览器不支持classList特性及其API，则返回而不会触发动画效果
 * @param flag boolean 触发条件
 * @param dom HTMLElement 需要操作的DOM元素
 * @param classList array 需要添加的动画列表，一般含有两个动画，第一次触发的动画和第二次触发的动画，它们为相反的动画效果
 * @return void
 * @author liuzhen
 */
export function toggleAnimation(
  flag: boolean,
  dom: HTMLElement,
  classList: string[]
) {
  if (!dom.classList || !dom.classList.add || !dom.classList.remove) {
    return;
  }

  if (flag) {
    dom.classList.remove(classList[1]);
    dom.classList.add(classList[0]);
  } else {
    dom.classList.remove(classList[0]);
    dom.classList.add(classList[1]);
  }
}

/**
 * @description 从0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz中产生len位随机数
 * @param len 返回随机数的个数
 * @param radix：产生
 * @return len位随机数
 * @author chenmo
 */
const creareGuid = (len: number, radix: number) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  );
  const uuid: any[] = [];
  let i: number;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[Math.floor(Math.random() * radix)];
    }
  } else {
    let r: number;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 || Math.floor(Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * @description 上传图片Key
 * @param file any 触发条件、
 * @param config：配置参数
 * @return key
 * @author chenmo
 */
export function uploadKey(file: any, config: any) {
  let type = file.type.split('/')[1];
  type = type === 'jpeg' ? 'jpg' : type;
  const key =
    (config.prefix ? config.prefix : 'A') +
    '.' +
    creareGuid(8, 16) +
    '.' +
    type;
  return key;
}

/**
 * @description 获取url参数
 * @param name string 参数名
 * @return 参数对应value
 * @author qiangwei
 */
export function getQueryString(name: any) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * @description 下载Excel
 * @param id excel模拟表单参数
 * @param params 表单提交参数
 * @return 参数对应value
 * @author chenmo
 */
export function getExcel(id: string, params: any) {
  const fm: any = document.getElementById(id);
  params.userId = handleWebStorage.getLocalData('serviceInfo').UCenterGuid; // UesrId当前登录用户id， 后端校验
  params.serviceProviderId = handleWebStorage.getLocalData(
    'serviceInfo'
  ).ServiceProviderId; // UesrId当前登录用户id， 后端校验
  let inputHtmls: string = '';
  for (const i in params) {
    if (params.hasOwnProperty(i)) {
      // 这里必须使用 hasOwnProperty 判断元素是否为对象本身的而非继承的
      const nameValue = params[i];
      inputHtmls += "<input name='' + i + '' value='' + nameValue + ''/>";
    }
  }
  fm.innerHTML = inputHtmls;
  fm.submit();
}

/**
 * 获取后端接口返回的错误信息
 * @param  {any} e 错误对象
 * @param  {string} defaultMsg 默认信息
 * @returns string
 */
export function getErrorMessage(e: any, defaultMsg?: string): string {
  let msg = defaultMsg;
  try {
    msg = e.response.data.Message;
  } catch (e) {
    // 占位 消除warning
  }
  return msg || '';
}

/**
 * 获取当前 http | https 协议类型
 */
export const isSecureContext = window.location.protocol.includes('https');

/**
 * 获取当前设备类型
 */
export const getUserAgent = () => {
  let isMobile: boolean = true;
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    /* window.location.href='你的手机版地址'; */
    isMobile = true;
  } else {
    /* window.location.href='你的电脑版地址'; */
    isMobile = false;
  }
  return isMobile;
};

/**
 * 加法
 */
export const mathAdd = (a: any, b: any) => {
  const numA: string = typeof a === 'string' ? a : a.toString();
  const numB: string = typeof b === 'string' ? b : b.toString();
  const x: number = numA.split('.')[1] ? numA.split('.')[1].length : 0;
  const y: number = numB.split('.')[1] ? numB.split('.')[1].length : 0;
  const z: number = Math.pow(10, Math.max(x, y));
  return (mathMul(a, z) + mathMul(b, z)) / z;
};

/**
 * 减法
 */
export const mathSub = (a: any, b: any) => {
  const numA: string = typeof a === 'string' ? a : a.toString();
  const numB: string = typeof b === 'string' ? b : b.toString();
  const x: number = numA.split('.')[1] ? numA.split('.')[1].length : 0;
  const y: number = numB.split('.')[1] ? numB.split('.')[1].length : 0;
  const z: number = Math.pow(10, Math.max(x, y));
  return (mathMul(a, z) - mathMul(b, z)) / z;
};

/**
 * 乘法
 */
export const mathMul = (a: any, b: any) => {
  const numA: string = typeof a === 'string' ? a : a.toString();
  const numB: string = typeof b === 'string' ? b : b.toString();

  let c: number = numA.split('.')[1] ? numA.split('.')[1].length : 0;
  c = c + (numB.split('.')[1] ? numB.split('.')[1].length : 0);

  return (
    (Number(numA.replace('.', '')) * Number(numB.replace('.', ''))) /
    Math.pow(10, c)
  );
};

export const mathDiv = (a: any, b: any) => {
  const numA: string = typeof a === 'string' ? a : a.toString();
  const numB: string = typeof b === 'string' ? b : b.toString();

  const e: number = numA.split('.')[1] ? numA.split('.')[1].length : 0;
  const f: number = numB.split('.')[1] ? numB.split('.')[1].length : 0;

  const c: number = Number(a.toString().replace('.', ''));
  const d: number = Number(b.toString().replace('.', ''));
  return mathMul(c / d, Math.pow(10, f - e));
};

// 校验时间间隔不能大于几个月
export const checkTime = (startTime: any, endTime: any, num: number) => {
  const arr1: any[] = startTime.split('-').map(Number); // 缴费时间-开始
  const arr2: any[] = endTime.split('-').map(Number); // 缴费时间-结束
  let flag: boolean = true;
  if (arr1[0] === arr2[0]) {
    // 同年
    if (arr2[1] - arr1[1] > num) {
      // 月间隔超过2个月
      flag = false;
    } else if (arr2[1] - arr1[1] === num) {
      // 月相隔2个月，比较日
      if (arr2[2] > arr1[2]) {
        // 结束日期的日大于开始日期的日
        flag = false;
      }
    }
  } else {
    // 不同年
    if (arr2[0] - arr1[0] > 1) {
      flag = false;
    } else if (arr2[0] - arr1[0] === 1) {
      if (arr1[1] < 10) {
        // 开始年的月份小于10时，不需要跨年
        flag = false;
      } else if (arr1[1] + num - arr2[1] < 12) {
        // 月相隔大于2个月
        flag = false;
      } else if (arr1[1] + num - arr2[1] === 12) {
        // 月相隔2个月，比较日
        if (arr2[2] > arr1[2]) {
          // 结束日期的日大于开始日期的日
          flag = false;
        }
      }
    }
  }
  return flag;
};

function builTree(root: any, nodes: any, pid: string, id: string) {
  nodes.forEach((node: any) => {
    if (node[pid] === root[id]) {
      root.children = root.children || [];
      root.children.push(node);
      builTree(node, nodes, pid, id);
    }
  });
}

function addParentIds(tree: any, pid: string) {
  const each = (tree: any, arr: any) => {
    tree.forEach((i: any) => {
      i.parentIds = [...arr, i[pid]];
      if (i.children) {
        each(i.children, i.parentIds);
      }
    });
  };
  tree.forEach((i: any) => {
    i.parentIds = [];
    i.treeRoot = true;
    if (i.children) {
      each(i.children, i.parentIds);
    }
  });
}
/**
 * @Descripttion: 组装children结构
 */
export const dealTreeData = (arr: any, pid: string, id: string) => {
  const trees: any = [];
  arr.forEach((node: any) => {
    if (node[pid] === null) {
      trees.push(node);
    }
  });
  trees.forEach((tree: any) => builTree(tree, arr, pid, id));
  addParentIds(trees, pid);
  return trees;
};

/**
 * 正则表达式
 */
export const Regulars = (() => {
  const Regular: any = {
    checkPhone: (text: string) => {
      return /^1[3456789]\d{9}$/.test(text);
    },
    checkUsername: (text: string) => {
      return /^[a-zA-z]\w{5,}$/.test(text);
    },
    checkPassword: (text: string) => {
      return /^[a-zA-z0-9]{6,12}$/.test(text);
    },
    checkName: (text: string) => {
      return /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[.·\-()a-zA-Z]*[a-zA-Z]+$/.test(
        text
      );
    }
  };
  return Regular;
})();

/**
 * @Descripttion: 添加水印函数
 * @Param: e:需要添加到元素的选择器，str：水印需要添加的文字
 */
export function addWaterMarker(e: any, areaName: string, str: string) {
  const can: any = document.createElement('canvas');
  const el: any = document.querySelector(e);
  const date = new Date();
  const time = handleDate.dateFormat(date, 'yyyy年MM月dd日');
  const timeDivision = handleDate.dateFormat(date, 'hh:mm');
  const getDay = date.getDay(); // 获取存储当前日期
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  el.appendChild(can);
  can.width = 440; // 画布的宽
  can.height = 200; // 画布的高度
  can.style.display = 'none';
  const cans = can.getContext('2d');
  cans.rotate(-0.4); // 画布里面文字的旋转角度
  cans.font = '20px Microsoft JhengHei bolder'; // 画布里面文字的字体
  cans.fillStyle = 'rgba(100, 100, 100, .2)'; // 画布里面文字的颜色
  cans.textAlign = 'left'; // 画布里面文字的水平位置
  cans.textBaseline = 'Middle'; // 画布里面文字的垂直位置
  cans.fillText(areaName, (can.width / 6), can.height + 1); // 画布里面文字的间距比例
  // cans.fillText('税悟  |  让专业的人更专业', (can.width / 6), can.height + 1); // 画布里面文字的间距比例
  cans.font = '16px Microsoft JhengHei'; // 画布里面文字的字体
  cans.textAlign = 'left'; // 画布里面文字的水平位置
  cans.fillText(`${time} ${weekday[getDay]} ${timeDivision}`, (can.width / 6) + 14, can.height + 30); // 画布里面文字的间距比例
  cans.font = '16px Microsoft JhengHei'; // 画布里面文字的字体
  cans.textAlign = 'left'; // 画布里面文字的水平位置
  const s = (str !== 'undefined') ? str : '';
  cans.fillText(`${s}  不问科技`, (can.width / 6) + 30, can.height + 60); // 画布里面文字的间距比例
  el.style.backgroundImage = `url(${can.toDataURL('image/png')})`; // 把画布插入到body中
}

/**
 * @Descripttion: 本地图片转base64
 * @Param: url：本地图片地址：如（require('./logo.png')）
 * @Return: 返回一个resolve参数为base64的promise对象，要获取值需要 const data = await getBase64Image(require('./logo.png'));
 */
export const getBase64Image = async (url: any) => {
  let dataURL;
  const image = new Image();
  image.crossOrigin = '';
  image.src = url;
  const promise = new Promise((resolve: any) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx: any = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
      dataURL = canvas.toDataURL('image/' + ext);
      resolve();
    };
  });
  await promise;
  return dataURL;
};

/**
 * @Descripttion:判断是否是PC
 * @Author: 王小杰
 * @LastEditors: 王小杰
 */
export const isPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'];
  let flag = true;
  for (const item of Agents) {
    if (userAgentInfo.indexOf(item) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * @Descripttion:判断是否是安卓
 * @Author: 王小杰
 * @LastEditors: 王小杰
 */
export const isAndroid = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android'];
  let flag = false;
  for (const item of Agents) {
    if (userAgentInfo.indexOf(item) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
};

/**
 * @Description: 判断是否是u盘
 * @Author: 蒋承志
 */
export const isUPan = () => {
  let flag = false;
  const windows: any = window;
  if (windows.noaskUdiskHandler) {
    const msg: string = windows.noaskUdiskHandler.check();
    if (msg === 'noaskUdisk') {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

/**
 * @Descripttion: 对象深拷贝
 * @Param: obj：需要拷贝的对象；cache：内部处理所需不需要传
 */
export const deepClone = (obj: any, cache: any[] = []) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  /**
   * 处理对象属性相互引用
   * obj.a = obj.b;
   * obj.b.aa = obj.a;
   */
  const hit = cache.filter((c: any) => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }
  const copy: any = Array.isArray(obj) ? [] : {};
  cache.push({
    original: obj,
    copy
  });
  Object.keys(obj).map((item: any) => {
    copy[item] = deepClone(obj[item], cache);
  });
  return copy;
};

/**
 * @Descripttion: 加密
 */
export const EncryUrl = (query: any) => {
  try {
    query = JSON.stringify(query);
    const win: any = window;
    query = win.encodeURIComponent(query);
    return win.btoa(query); // 编码
  } catch (err) {
  }
  return '';
};
/**
 * @Descripttion: 解密
 */
export const DecryptUrl = (val: any) => {
  try {
    const win: any = window;
    const decryStr = win.atob(val); // 解码
    return win.decodeURIComponent(decryStr);
  } catch (err) {
  }
  return false;
};

export const device = () => {
  const u = navigator.userAgent;
  const app = navigator.appVersion; // appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  const deviceBrowser = () => {
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部和底部
      weixin: u.indexOf('MicroMessenger') > -1 // 是否微信
    };
  };
  return deviceBrowser();
};
