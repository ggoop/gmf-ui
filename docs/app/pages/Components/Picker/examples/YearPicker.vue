<template>
  <div>
    <md-picker :md-data="data" v-model='selected' @on-change="onChange" />
    <p>当前选择值为：<span>{{ valueJSON }}</span></p>
  </div>
</template>

<script>
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  name: 'YearPicker',
  data() {
    return {
      selected:[],
      data:[years],
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
