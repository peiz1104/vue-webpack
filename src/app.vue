<template>
  <div>
    <transition name="fade" mode="out-in">
      <main id="main">
        <router-view class="view"></router-view>
      </main>
    </transition>
  </div>
</template>
<style lang="stylus" type="text/css" src="./styles/common.less"></style>
<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  mounted () { },
  // 方法
  methods: {
    test () { }
  },
  // 子组件
  components: {}
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#main {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
}
li {
  list-style: none;
}
</style>
