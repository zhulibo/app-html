<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <open-app :extinfo="{page: 'socialDetail', id: 123}" ref="openApp"></open-app>
  </div>
</template>

<script>
import openApp from "components/openApp2/openApp2";

export default {
  name: 'test1',
  data() {
    return {}
  },
  components: {
    openApp,
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
</style>