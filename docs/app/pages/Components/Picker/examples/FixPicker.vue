<template>
  <div>
    <md-picker :md-data="data"  v-model="selected" :md-columns="3" @on-change="onChange" ref="picker1" />
    <md-button @click.native="setData1"> 设置 ["USA", "usa002", "0005"]</md-button>
    <md-button @click.native="setData2"> 设置 ['china', 'china002', 'gz']</md-button>
    <p>当前选择值为：<span>{{ valueJSON }}</span></p>
    <p>getNameValues:{{$refs.picker1&&$refs.picker1.getNameValues()}}</p>
  </div>
</template>
<script>
export default {
  name: 'FixPicker',
  data() {
    return {
      selected: [],
      data: [{ name: '中国', value: 'china', parent: 0 },
        { name: '美国', value: 'USA', parent: 0 },
        { name: '广东', value: 'china001', parent: 'china' },
        { name: '广西', value: 'china002', parent: 'china' },
        { name: '美国001', value: 'usa001', parent: 'USA' },
        { name: '美国002', value: 'usa002', parent: 'USA' },
        { name: '广州', value: 'gz', parent: 'china001' },
        { name: '深圳', value: 'sz', parent: 'china001' },
        { name: '广西001', value: 'gz', parent: 'china002' },
        { name: '广西002', value: 'sz', parent: 'china002' },
        { name: '美国001_001', value: '0003', parent: 'usa001' },
        { name: '美国001_002', value: '0004', parent: 'usa001' },
        { name: '美国002_001', value: '0005', parent: 'usa002' },
        { name: '美国002_002', value: '0006', parent: 'usa002' }
      ],
      valueJSON: ''
    };
  },
  methods: {
    onChange(value) {
      this.valueJSON = JSON.stringify(value);
    },
    setData1() {
      this.selected = ['USA', 'usa002', '0005']
    },
    setData2() {
      this.selected = ['china', 'china002', 'gz']
    },
  }
}

</script>
