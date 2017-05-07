<template>
  <div class="goods">
    <!-- 左侧菜单 -->
    <!--     BScroll屏幕下滑操作要引用dom,所以这里要用ref获取，并命名为food-wrapper,vue1.0是v-el属性，v2.0要用ref属性 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧详情 -->
    <!-- 用ref属性获取dom 1.0命名可以写成羊肉串，但是2.0必须驼峰-->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;  // OK码:代表请求成功，不是错误的意思

  export default {
    data() {
      return {
        goods: []  // 用来存放请求的goods数据
      }
    },
    props: {
      seller: {  // 接受从父组件传过来的数据
        type: Object
      }
    },
    // 生命周期
    created() {
      // 1.icon数组
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      // 2.请求数据
      this.$http.get('api/goods').then(res => {
        // 为什么加了错误码检测会取不到数据呢
        // if (res.errno == ERR_OK)  {
          this.goods = res.body.data;
          // console.log(this.goods);
          // 在created的生命周期，调用屏幕下滑方法
          this.$nextTick(() => {
            this._initScroll();
          });
        // }
      }, res => {
        // 其实这一句可以不加，因为本地mock的数据是不会出现失败的情况。
        alert('数据请求失败');
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
      }
    }
  }
</script>

<style lang="scss">
@import "../../common/scss/mixin";
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;  /* 多行垂直居中 */
      width: 56px;
      height: 54px;
      line-height: 14px;
      padding: 0 12px;
      .icon {
        vertical-align: top;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          @include bg-image('img/decrease_3');
        }
        &.discount {
          @include bg-image('img/discount_3');
        }
        &.guarantee {
          @include bg-image('img/guarantee_3');
        }
        &.invoice {
          @include bg-image('img/invoice_3');
        }
        &.special {
          @include bg-image('img/special_3');
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {  /* sass里面不能写成&.count */
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
        }
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
