<template lang="pug">
  q-list(no-border link inset-delimiter)
    q-item(v-if="currentUser")
      q-item-side(:avatar="currentUser.picture")
      q-item-main
        q-item-tile(label) {{ currentUser.first_name }}
        q-item-tile(sublabel) {{ currentUser.email }}

    q-item-separator
    q-item(@click.native="$router.replace({name : 'app.home'})")
      q-item-side(icon="home")
      q-item-main(label="Home" sublabel="")

    q-item(@click.native="$router.replace({name : 'app.info'})")
      q-item-side(icon="info")
      q-item-main(label="info" sublabel="")

    q-item-separator
    q-item(v-if="!guest" @click.native="logout")
      q-item-side(icon="exit_to_app")
      q-item-main(label="Log out" sublabel="")
</template>

<script>
import { mapState } from 'vuex'
import { openURL, QItemSeparator, QItemSide, QItemTile } from 'quasar'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    openURL,
    logout () {
      this.$oauth.logout()
      this.$router.push('/login')
    }
  },
  mounted () {
    this.$store.dispatch('users/getCurrentUser')
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  components: {
    QItemSeparator,
    QItemSide,
    QItemTile
  }
}
</script>

<style>
</style>
