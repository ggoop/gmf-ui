<template>
  <div>
    <md-swipeout>
      <md-swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <md-swipeout-button @click.native="onButtonClick('fav')" type="primary">Yes</md-swipeout-button>
          <md-swipeout-button @click.native="onButtonClick('delete')" type="warn">Right</md-swipeout-button>
        </div>
        <div slot="content" class="demo-content md-1px-t">
          JavaScript is the best language
        </div>
      </md-swipeout-item>
      <md-swipeout-item :threshold=".5" underlay-color="#ccc">
        <div slot="right-menu">
          <md-swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">Fav</md-swipeout-button>
          <md-swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">Delete</md-swipeout-button>
        </div>
        <div slot="content" class="demo-content md-1px-tb">
          threshold = 0.5
        </div>
      </md-swipeout-item>
      <md-swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
        <div slot="right-menu">
          <md-swipeout-button @click.native="onButtonClick('fav')" type="primary" :width="70">Fav</md-swipeout-button>
          <md-swipeout-button @click.native="onButtonClick('delete')" type="warn" :width="70">Delete</md-swipeout-button>
          <md-swipeout-button @click.native="onButtonClick('ignore')" type="default" :width="70">Ignore</md-swipeout-button>
        </div>
        <div slot="left-menu">
          <md-swipeout-button @click.native="onButtonClick('fav')" type="primary">Fav</md-swipeout-button>
          <md-swipeout-button @click.native="onButtonClick('delete')" type="warn">Delete</md-swipeout-button>
        </div>
        <div slot="content" class="demo-content md-1px-b">
          now <span v-if="disabled">disabled</span>
          <span v-else="enabled">enabled</span>
        </div>
      </md-swipeout-item>
    </md-swipeout>
    <div style="padding:15px;">
      <md-button @click.native="disabled = false" type="primary" :disabled="!disabled">set Enabled</md-button>
      <md-button @click.native="disabled = true" type="warn" :disabled="disabled">set Disabled</md-button>
      <md-button @click.native="$refs.swipeoutItem.open('left')" type="primary">open left menu</md-button>
      <md-button @click.native="$refs.swipeoutItem.open('right')" type="primary">open right menu</md-button>
      <md-button @click.native="$refs.swipeoutItem.close()" type="warn">close menu</md-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseUsed',
  data() {
    return {
      disabled: false,
      valueJSON: ''
    };
  },
  methods: {
    onButtonClick(type) {
      alert('on button click ' + type)
    },
    handleEvents(type) {
      console.log('event: ', type)
    },
    log(str) {
      console.log(str)
    }
  }
}

</script>
<style lang="scss">
.demo-content {
  padding: 10px 10px;
}
</style>