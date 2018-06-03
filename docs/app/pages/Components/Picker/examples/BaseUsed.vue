<template>
  <div>
    <md-picker :md-data="data" v-model='selected' @on-change="onChange" />
    <p>当前选择值为：<span>{{ valueJSON }}</span></p>
  </div>
</template>

<script>
export default {
  name: 'BaseUsed',
  data() {
    return {
      selected:[],
      data: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
      valueJSON:''
    };
  },
  methods: {
    onChange(value) {
      this.valueJSON=JSON.stringify(value);
    }
  }
}
</script>
