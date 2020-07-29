<script>
  let flag
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

  if (isiOS) {
    flag = true
  } else if (isAndroid) {
    flag = false
  }
  export default {
    isIos: flag
  }
</script>
