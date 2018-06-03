<template>
  <div>
    <md-vchart :md-data="data">
      <md-vscale x type="timeCat" mask="MM/DD" :tick-count="3" />
      <md-vscale y :min="0" alias="日均温度" :tick-count="5" />
      <md-vpoint
        :style="{
          stroke: '#fff',
          lineWidth: 1
        }"
        shape="smooth" />
      <md-vline shape="smooth" />
    </md-vchart>
  </div>
</template>

<script>

export default {
  data () {
    return {
      data: [
        { time: '2016-08-08 00:00:00', tem: 10 },
        { time: '2016-08-08 00:10:00', tem: 22 },
        { time: '2016-08-08 00:30:00', tem: 20 },
        { time: '2016-08-09 00:35:00', tem: 26 },
        { time: '2016-08-09 01:00:00', tem: 20 },
        { time: '2016-08-09 01:20:00', tem: 26 },
        { time: '2016-08-10 01:40:00', tem: 28 },
        { time: '2016-08-10 02:00:00', tem: 20 },
        { time: '2016-08-10 02:20:00', tem: 18 }
      ]
    }
  }
}
</script>