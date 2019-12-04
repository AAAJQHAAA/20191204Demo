<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

	export default {
		name: "Scroll",
    data() {
		  return {
		    scroll: {}
      }
    },
    mounted() {
		  setTimeout(this.__initScroll, 20)
    },
    methods: {
		  __initScroll() {
		    // 1.初始化BScroll对象
		    if (!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          click:true
        })
      }
    }
	}
</script>

<style scoped>
  .wrapper{
    position: fixed;
    top: 46px;
    bottom: 53px;
    width: 100%;
  }
  .content {
    width: 100%;
  }
</style>
