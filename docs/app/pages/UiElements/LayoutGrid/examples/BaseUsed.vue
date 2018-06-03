<template>
  <div>
    <md-layout-grid :md-cols="3">
      <md-layout-grid-item v-for="i in 10" :key="i">
        <img slot="icon" src="/assets/icon-menu.svg">
        <span slot="label">{{ i}}</span>
      </md-layout-grid-item>
    </md-layout-grid>
  </div>
</template>
<script>
export default {
  name: 'BaseUsed',
  data() {
    return {
      valueJSON: ''
    };
  },
  methods: {
    onChange(value) {
      this.valueJSON = JSON.stringify(value);
    },
    log(str) {
      console.log(str)
    }
  }
}

</script>
<style lang="scss" scoped>
@import "~gmf/components/MdAnimation/variables";
  @import "~gmf/theme/engine";
  .md-layout-grid-item{
  }
</style>