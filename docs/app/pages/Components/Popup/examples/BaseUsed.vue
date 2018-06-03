<template>
  <div>
    <md-switch v-model="show">simple popup show</md-switch>
    <md-switch v-model="show3">Multi popup (first)</md-switch>
    <md-popup :md-active.sync="show" @on-opened="log('opened')" @on-closed="log('closed')">
      <div class="popup0">
        ddd
      </div>
    </md-popup>
    <md-popup :md-active.sync="show3">
      <div class="popup2">
        <md-switch title="Multi Popup (first)" v-model="show3"></md-switch>
        <md-switch title="Multi Popup (second)" v-model="show4"></md-switch>
        this is the first popup
      </div>
    </md-popup>
    <md-popup :md-active.sync="show4">
      <div class="popup2">
        <md-switch title="Multi Popup (second)" v-model="show4"></md-switch>
        this is the second popup
      </div>
    </md-popup>
  </div>
</template>
<script>
export default {
  name: 'BaseUsed',
  data() {
    return {
      show: false,
      show3: false,
      show4: false,
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
