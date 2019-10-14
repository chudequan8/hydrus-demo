/* * 抽屉组件 * 默认从右侧移入，30%宽度 */

<template>
  <div
    class="vue-drawer-wrapper"
    :style="{
      display: isClosed ? 'none' : 'block'
    }"
  >
    <transition
      name="drawer-move"
      @enter="enter"
      @after-leave="afterLeave"
      :enter-class="`drawer-enter-${position}`"
      :leave-to-class="`drawer-leave-to-${position}`"
    >
      <div
        v-show="visible"
        class="vue-drawer-container"
        :style="{
          width: width,
          height: height,
          [position]: 0
        }"
      >
        <div class="el-dialog__header vue-drawer__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            @click="handleClose"
          >
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body vue-drawer__body"><slot></slot></div>
        <div
          class="el-dialog__footer vue-drawer__footer"
          v-if="this.$scopedSlots.footer"
        >
          <slot name="footer" v-bind:handleClose="handleClose"></slot>
        </div>
      </div>
    </transition>
    <transition name="drawer-fade">
      <div v-show="visible" class="vue-drawer-mask" @click="handleClose"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'vue-drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: '30%'
      // validator: value => typeof value === 'number' ? `${value}px` : value
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    position: {
      type: String,
      default: 'right',
      validator: value =>
        ['top', 'right', 'bottom', 'left'].includes(value) ? value : 'right'
    },
    beforeClose: Function
  },
  data() {
    return {
      isClosed: true
    }
  },
  // computed() {
  //   trueWidth() {
  //     if (['top', 'bottom'].includes(this.position)) {
  //       this.trueWidth = '100%'
  //     }
  //     return
  //   }
  // },
  methods: {
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide() {
      this.$emit('update:visible', false)
    },
    enter() {
      this.isClosed = false
    },
    afterLeave() {
      this.isClosed = true
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-drawer-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  position: fixed;
  .vue-drawer-mask {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .vue-drawer-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
      0px 16px 24px 2px rgba(0, 0, 0, 0.14),
      0px 6px 30px 5px rgba(0, 0, 0, 0.12);

    .vue-drawer__body {
      flex: 1;
      overflow: auto;
    }

    .vue-drawer__footer {
      display: flex;
      justify-content: center;
      border-top: 1px solid #dcdfe6;
    }
  }
}
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 300ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.drawer-fade-enter,
.drawer-fade-leave-to {
  opacity: 0;
}
.drawer-move-enter-active,
.drawer-move-leave-active {
  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

$positionList: left right;

@each $position in $positionList {
  .drawer-enter-#{$position},
  .drawer-leave-to-#{$position} {
    @if $position == left {
      transform: translateX(-100%);
    } @else {
      transform: translateX(100%);
    }
  }
}
</style>
