<script>

let isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

let downloadApp = () => {
  if (isIos) {
    location.href = "https://apps.apple.com/cn/app/id1518819615";
  }
  if (!isIos) {
    location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003";
  }
}

let getParams = () => {
  let params = {} // 参数存放的对象
  let key, value;  // 键、值
  let str = location.href; // 整个url
  str = str.substr(str.indexOf("?") + 1); // 从?下标+1处截取到最后
  let arr = str.split("&"); // 以&分割参数

  for (let i = 0; i < arr.length; i++) {
    let num = arr[i].indexOf("=");
    if (num > 0) {
      key = arr[i].substring(0, num); // 从0到num
      value = arr[i].substr(num + 1); // 从num + 1到最后
      params[key] = value;
    }
  }
  return params
}

let getNowBeijingTimestamp = () => {
  let nowLocalTime = new Date()
  let nowLocalTimestamp = nowLocalTime.getTime()
  // 将此时当地时间戳转换为此时北京utf+8时间戳
  let nowLocalTimeStr = nowLocalTime.toString()
  let index = nowLocalTimeStr.indexOf('GMT') + 3
  let hourOffset = nowLocalTimeStr.substr(index, 5) / 100 - 8 // 当地与北京时区差
  let nowBeijingTimestamp = nowLocalTimestamp - hourOffset * 60 * 60 * 1000 // 此时北京时间戳
  return nowBeijingTimestamp
}

export default {
  isIos, // 判断设备类型
  downloadApp, // 下载App
  getParams, // 获取url中参数
  getNowBeijingTimestamp, // 获取此时北京时间戳
}
</script>
