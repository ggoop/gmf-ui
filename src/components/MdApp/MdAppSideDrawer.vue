<template>
  <div class="md-app md-app-side-drawer md-layout-row" :class="[appClasses, $mdActiveTheme]">
    <slot name="md-app-drawer"></slot>

    <main class="md-app-container md-flex md-layout-column" :class="[$mdActiveTheme, scrollerClasses]" :style="contentStyles" @scroll.passive="handleScroll">
      <slot name="md-app-toolbar"></slot>
      <div class="md-app-scroller md-layout-column md-flex" :class="[$mdActiveTheme, scrollerClasses]" :style="containerStyles" @scroll.passive="handleScroll">
        <slot name="md-app-content"></slot>
      </div>
    </main>
  </div>
</template>

<script>
  import MdComponent from 'gmf/core/MdComponent'
  import MdAppMixin from './MdAppMixin'

  export default new MdComponent({
    name: 'MdAppInternalSideDrawer',
    mixins: [MdAppMixin]
  })
</script>

<style lang="scss">
  @import "~gmf/components/MdAnimation/variables";

  .md-app-side-drawer {
    .md-app-container {
      flex-direction: column;
    }
  }
</style>
