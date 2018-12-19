<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>

    <div v-if="true" style="position: absolute;top:0;left: 300px;z-index:1;display: inline-block;">
      <span class="border_btn">产品帐套</span>
      <el-menu id="menu_id" style="padding-top:9px;height: 48px;line-height:48px;border-width:0px!important;display: inline-block;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">品种池</el-menu-item>
        <el-menu-item index="3">策略</el-menu-item>
        <el-menu-item index="4">资金</el-menu-item>
        <el-menu-item index="5">交易</el-menu-item>
        <el-menu-item index="6">统计分析</el-menu-item>
      </el-menu>
    </div>
    <div class="main-container">

      <div style="width:100%;height: 84px;position: relative;">
        <div style="position: absolute;top:24px;left:6px;z-index:1;display: inline-block; color: #ef6d11;font-size: 24px;"> 自定义指数交易系统</div>
        <div style="position: absolute;bottom:5px;left:10px;z-index:1;display: inline-block; color: #333;"> Linda，您好！</div>
        <navbar/>
        <tags-view v-if="false" />
      </div>
      <div style="position: relative;">
        <sidebar class="sidebar-container" style="border:1px solid #28acc6;"/>
        <app-main style="padding-left:179px;width: 100%;height:100%;box-sizing: border-box;"/>
      </div>
      <div class="fix_box" style="color:red!;">
        <div style="width:100%;height: 60px;line-height: 20px;padding:10px 20px; font-size: 14px;">
          <span style="width:50%;text-align: center;display: inline-block;float: left;">黄金池
            <span style="display:block;">100万</span>
          </span>
          <span style="width:50%;text-align: center;display: inline-block; float: right;">信用池
            <span style="display:block;">100万</span>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'


export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  data(){
    return{
      activeIndex:'1'
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .sidebar-container{
    position: absolute!important;
    display: inline-block!important;
  }
  .main-container {
    margin-left: 0px!important;
  }
  app-main{
    display:inline-block!important;
    display: inline-block!important;
  }
  el-menu--collapse{
    width: 0px!important;
  }
  .el-menu-item{
    height: 40px;
    line-height: 40px;
  }
  el-menu,el-menu-demo{
    background-color:rgba(0,0,0,0)!important;
  }
  .el-menu--horizontal>.el-menu-item{
    border-color:#28acc6;
    border:none!important;
  }
  .el-menu--horizontal>.el-menu-item{
    border-color:#28acc6;
    border-bottom:none!important;
    border-right:1px solid #ccc!important;
    height: 16px;
    line-height: 16px;
    margin-top: 20px;
  }
  .el-menu--horizontal>.el-menu-item:last-child{
    border-right:0px solid #ccc!important;
  }

  .el-menu--horizontal>.el-menu-item.is-active{
    color: #f06d11;
  }
  .margin_change{
    padding-left: 35px!important;
  }
  .border_btn{
    display: inline-block;
    position: relative;
    top:-5px;
    margin-right: 20px;
    padding-left:8px;
    border:1px solid #28acc6;
    width:90px;
    height: 24px;
    line-height: 24px;
    font-size:14px;
    background-image: url('/static/img/border_bg.png');
    background-repeat: no-repeat;
    background-position: 70px;
    cursor: pointer;
    color: #333;
  }
  .border_btn:hover{
    background-color: rgba(40,172,198,0.1);
  }
  .fix_box{
    position:fixed;
    bottom:0;
    width: 180px;
    border-top:1px solid #28acc6;
    border-right:1px solid #28acc6;
    height: 180px;
    z-index:1002;
    background: #fff;
  }
</style>
