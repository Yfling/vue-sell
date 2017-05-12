<!-- 购物车加货减货组件 -->
<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        console.log('click');
        if (!this.food.count) {
          // 这里不能直接添加下面这句话，因为count是之前没有的一个属性
          // 需要在这里调用vue接口
          // this.food.count = 1;
          Vue.set(this.food, 'count', 1);
        }
        else {
          this.food.count++;
        }
      },
      decreaseCart() {
        if (this.food.count > 0) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="scss">
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
      &.move-enter, &.move-leave-active {
        opacity: 0;
        transform: translate3d(0, 0, 0);
/*         .inner {
          transform: rotate(180deg);
        } */
      }
      &.move-enter-active, &.move-leave {
        opacity: 1;
        transform: translate3d(24px, 0, 0);
/*         .inner {
          display: inline-block;
          line-height: 24px;
          font-size: 24px;
          color: rgb(0, 160, 220);
          transition: all 0.4s linear;
          transform: rotate(0);
        } */
      }
      .inner {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
