<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count" @click="detail">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletion-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="detail"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" >
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
               <!-- :score、:size将header里面的score、size传进star组件 -->
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="detail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>

</template>

<script type="text/javascript">
// import star from '../../components/star/star.vue';
import star from '../star/star.vue';

export default {
  props: {
    seller: {  // 接受从父组件传过来的数据
      type: Object
    }
  },
  components: {
    star
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    detail() {
      this.detailShow = !this.detailShow;
    }
  },
  created() { // 动态更新图标数组
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}

</script>

<style lang="scss" scoped>
/* @import "../../common/stylus/mixin"; */
@import "../../common/scss/mixin";

.header {
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  position: relative;
  overflow: hidden;  /* 隐藏多余的阴影区域 */
}
.content-wrapper {
  position: relative;
  padding: 24px 12px 18px 24px;
  font-size: 0;
}
.avatar {
  display: inline-block;
  vertical-align: top;
  img {
    border-radius: 2px;
  }
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.content {
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
}
.title {
  margin: 2px 0 8px 0;
}
.brand {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  @include bg-image('img/brand');
  background-size: 30px 18px;
  background-repeat: no-repeat;
}
.name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.support {
  margin-top: 10px;
  .icon {
    vertical-align: top;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    &.decrease {
      @include bg-image('img/decrease_1');
    }
    &.discount {
      @include bg-image('img/discount_1');
    }
    &.guarantee {
      @include bg-image('img/guarantee_1');
    }
    &.invoice {
      @include bg-image('img/invoice_1');
    }
    &.special {
      @include bg-image('img/special_1');
    }
  }
  .text {
    line-height: 12px;
    font-size: 12px;
  }
}
.support-count {
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
  .count {
    font-size: 10px;
    vertical-align: top;
  }
  .icon-keyboard_arrow_right {
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
  }
}
.bulletion-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;  /* 多余文字隐藏 */
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(7, 17, 27, 0.2);
  .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    @include bg-image('img/bulletin');
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .bulletin-text {
    text-align: top;
    margin: 0 4px;
    font-size: 10px;
  }
  .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }
}
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;  /* 不能用hidden 因为如果一旦超过的部分就会被隐藏了 */
  transition: all 0.5s;
  background: rgba(7, 17, 27, 0.8);
  backdrop-filter: blur(10px);
  /* 过渡动画和1.0有区别，这里要注意一下 */
  &.fade-enter-active {  /* 进入过渡的结束状态 */
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
  }
  &.fade-enter {  /* 进入过渡的开始状态 */
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  &.fade-leave {  /* 离开过渡的开始状态 */
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
  }
  &.fade-leave-active {  /* 离开过渡的结束状态 */
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  .detail-wrapper {
    min-height: 100%;
    width: 100%;
    .detail-main {
      margin-top: 64px;
      padding-bottom: 64px;
      .name {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
      }
      .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
      }
      .title {
        display: flex;
        width: 80%;
        margin: 28px auto 24px auto;
        .line {
          flex: 1;
          position: relative;
          top: -6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text {
          padding: 0 12px;
          font-weight: 700;
          font-size: 14px;
        }
      }
      .supports {
        width: 80%;
        margin: 0 auto;
        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;
          &:last-child {
            margin-bottom: 0;
          }
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('img/decrease_2');
            }
            &.discount {
              @include bg-image('img/discount_2');
            }
            &.guarantee {
              @include bg-image('img/guarantee_2');
            }
            &.invoice {
              @include bg-image('img/invoice_2');
            }
            &.special {
              @include bg-image('img/special_2');
            }
          }
          .text {
            line-height: 16px;
            font-size: 12px;
          }
        }
      }
      .bulletin {
        width: 80%;
        margin: 0 auto;
        .content {
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
        }
      }
    }
  }
  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
}
</style>
