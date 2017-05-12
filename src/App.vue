<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!-- 根据不同的路由改变不同的内容 -->
    <router-view :seller="seller" class="content"></router-view>
  </div>
</template>

<script>
import {urlParse} from './common/js/util.js';
import header from './components/header/header.vue';

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.View();
    })
  },
  components: {
    'v-header': header
  },
  methods: {
    View() {
      this.$http.get('api/seller?id=' + this.seller.id).then(res => {
        this.seller = res.body.data;
        // this.seller = Object.assign({}, this.seller, res.data);

        console.log(this.seller.id);
      }, res => {
        alert('数据请求失败');
      });
    }
  }
}
</script>

<style lang="scss">
@import "./common/scss/mixin.scss";
/* @import "./common/stylus/mixin"; */

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
  }
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }

</style>
