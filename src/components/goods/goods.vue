<template>
  <div class="goods">
    <!-- 左侧菜单 -->
    <!--     BScroll屏幕下滑操作要引用dom,所以这里要用ref获取，并命名为food-wrapper,vue1.0是v-el属性，v2.0要用ref属性 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
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
        <!-- food-list-hook在这里没有实际的样式，只是为了让Js能够选择到 -->
        <li v-for="item in goods" class="food-list food-list-hook">
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
    props: {
      seller: {  // 接受从父组件传过来的数据
        type: Object
      }
    },
    data() {
      return {
        goods: [],  // 用来存放请求的goods数据
        listHeight: [],  // 用来存放每个菜单区间的高度高度
        scrollY: 0
      }
    },
    computed: {
      // 左右侧的高度做一个映射
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // 如果高度在height1与height2的这个区间内，或者height2不存在，即滚动到了最后一个Li
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
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

          this.$nextTick(() => {
            // 在created的生命周期，调用屏幕下滑方法
            this._initScroll();
            // 调用计算高度的方法
            this._calculateHeight();
          });
        // }
      }, res => {
        // 其实这一句可以不加，因为本地mock的数据是不会出现失败的情况。
        alert('数据请求失败');
      })
    },
    methods: {
      // 实现滑动控制菜单的上下滚动
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3});
        // 实时的拿到右侧的Y轴滚动值（这里利用的是BScroll的一个接口）
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算每一个<li>菜单的高度
      _calculateHeight() {
        // 通过className取到每一个li
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          // let item = foodList[i];
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        // 利用BScroll自带的借口实现菜单点击滚动到相应菜单
        this.foodsScroll.scrollToElement(el, 300);
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
      padding: 0 12px;
      line-height: 14px;
      /* 这里如果不用&符号，就要把样式写出，与menu-item平级 */
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text {
          @include border-none();
        }
      }
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
