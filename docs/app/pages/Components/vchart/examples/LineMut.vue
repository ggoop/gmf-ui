<template>
  <div>
    <md-vchart :md-data="data">
      <md-vline series-field="type" />
    </md-vchart>
  </div>
</template>

<script>

/*
* [
*   {"date":"2010-01-10","type":"能源","value":99.9},
*   {"date":"2010-01-10","type":"金属","value":96.6}
* ]
*/
import data from './line_color.json'

export default {
  data () {
    return {
      data
    }
  }
}
</script>
