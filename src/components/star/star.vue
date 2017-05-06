<template>
    <div class="star" :class="starType">
        图片是放在css属性里面的，所以这里直接v-for的是属性
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/javascript">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemCLasses() {
        let result = [];  // 用数组来存放属性的名字
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 != 0;  // 判断是否有小数
        let integer = Math.floor(score);

        // 把全星的属性放在数组总
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        // 把半星的属性放在数组中
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        // 当全星+半星的个数不足总星的个数的时候
        // 要补全后面空白的星星
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang="scss">
@import "../../common/scss/mixin";

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
      .star-48 {
        .star-item {
          width: 20px;
          height: 20px;
          margin-right: 22px;
          background-size: 20px 20px;
          &:last-child {
            margin-right: 0;
          }
          &.on {
            @include bg-image('star48_on');
          }
          &.half {
            @include bg-image('star48_half');
          }
          &.off {
            @include bg-image('star48_off');
          }
        }
      }
      .star-36 {
        .star-item {
          width: 15px;
          height: 15px;
          margin-right: 6px;
          background-size: 15px 15px;
          &:last-child {
            margin-right: 0;
          }
          &.on {
            @include bg-image('img/star36_on');
          }
          &.half {
            @include bg-image('img/star36_half');
          }
          &.off {
            @include bg-image('img/star36_off');
          }
        }
      }
      .star-24 {
        .star-item {
          width: 10px;
          height: 10px;
          margin-right: 3px;
          background-size: 10px 10px;
          &:last-child {
            margin-right: 0;
          }
          &.on {
            @include bg-image('img/star24_on');
          }
          &.half {
            @include bg-image('img/star24_half');
          }
          &.off {
            @include bg-image('img/star24_off');
          }
        }
      }
    }
  }
</style>
