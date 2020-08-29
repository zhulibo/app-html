let dateToCustomizeTime = value => {
  if (!value) return ''
  let createTimestamp = new Date(value).getTime()

  let offTime = new Date().getTime() - createTimestamp

  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24

  minute = offTime / minute
  hour = offTime / hour
  day = offTime / day

  if (day >= 3) {
    return value
  } else if (day >= 1) {
    return parseInt(day) + '天前'
  } else if (hour >= 1) {
    return parseInt(hour) + '小时前'
  } else if (minute >= 1) {
    return parseInt(minute) + '分钟前'
  } else {
    return '刚刚'
  }
}

let timestampToDate = value => {
  let dt = new Date(value);

  let y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDate();
  let hh = dt.getHours();
  let mm = dt.getMinutes();

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  m = checkTime(m);
  d = checkTime(d);
  hh = checkTime(hh);
  mm = checkTime(mm);

  return y + "-" + m + "-" + d + "  " + hh + ":" + mm
}

let noneToLine = value => {
  if (!value) return '--'
  return value
}

export default {
  dateToCustomizeTime, // 日期转自定义时间
  timestampToDate, // 时间戳转日期
  noneToLine, // '' 转 '--'
}