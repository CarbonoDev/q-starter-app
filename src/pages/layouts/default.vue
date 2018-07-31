<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="primary")
        q-btn(flat dense round @click="leftDrawerOpen = !leftDrawerOpen")
          q-icon(name="menu")
        q-toolbar-title Carbono App

    q-layout-drawer(v-model="leftDrawerOpen" content-class="bg-white")
      navigation
    q-page-container
      router-view
</template>

<script>
import navigation from 'src/components/navigation'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
  },
  components: {
    navigation
  }
}
</script>

<style>
</style>
