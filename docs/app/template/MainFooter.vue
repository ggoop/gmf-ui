<template>
  <footer class="main-footer">
   
  </footer>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'MainFooter',
    computed: {
      ...mapState({
        isSplash: 'splashPage'
      })
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
