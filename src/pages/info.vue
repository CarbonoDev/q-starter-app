<template lang="pug">
  q-page.column.info
    p Running on Quasar v{{ $q.version }}

    q-list(no-border link inset-delimiter)
        q-list-header Useful Links
        q-item(@click.native="openURL('https://github.com/CarbonoDev/q-starter-app')")
          q-item-side(icon="code")
          q-item-main(label="Github Repo" sublabel="Official repo for the starter app")
        q-item(@click.native="openURL('https://github.com/CarbonoDev/Wiki')")
          q-item-side(icon="school")
          q-item-main(label="Carbono Wiki" sublabel="Find useful info on how to build your apps, style guides and examples.")
        q-item(@click.native="openURL('http://quasar-framework.org')")
          q-item-side(icon="school")
          q-item-main(label="Quasar Docs" sublabel="quasar-framework.org")
        q-item(@click.native="openURL('https://github.com/quasarframework/')")
          q-item-side(icon="code")
          q-item-main(label="Quasar GitHub" sublabel="github.com/quasarframework")
        q-item(@click.native="openURL('https://discord.gg/5TDhbDg')")
          q-item-side(icon="chat")
          q-item-main(label="Quasar Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg")
        q-item(@click.native="openURL('http://forum.quasar-framework.org')")
          q-item-side(icon="record_voice_over")
          q-item-main(label="Quasar Forum" sublabel="forum.quasar-framework.org")
</template>

<script>
export default {
  name: 'PageInfo',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .index{
  }
</style>
