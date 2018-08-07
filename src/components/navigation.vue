<template lang="pug">
  q-list.menu-list(no-border link inset-delimiter)

    .center(v-if="currentUser")
      img.user-avatar(:src="currentUser.photoUrl")
    q-item(v-if="currentUser")
      q-item-main
        q-item-tile(label) {{ currentUser.name }}
        q-item-tile(sublabel) {{ currentUser.email }}
    q-item-separator(v-if="currentUser")

    q-item(@click.native="$router.replace({name : 'app.home'})")
      q-item-side(icon="home")
      q-item-main(label="Home" sublabel="")

    q-item(@click.native="$router.replace({name : 'app.info'})")
      q-item-side(icon="info")
      q-item-main(label="info" sublabel="")

    q-item-separator
    q-item(v-if="currentUser" @click.native="logout")
      q-item-side(icon="exit_to_app")
      q-item-main(label="Log out" sublabel="")
</template>

<script>
import { QItemSeparator, QItemSide, QItemTile } from 'quasar'
export default {
  name: 'Navigation',
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$oauth.logout()
      this.$router.replace({ name: 'app.login' })
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['users/currentUser']
    }
  },
  components: {
    QItemSeparator,
    QItemSide,
    QItemTile
  }
}
</script>

<style lang="scss">
.center {
  text-align: center;
}

.menu-list {
  padding: 0;
  .user-avatar {
    background-color:rgba(0,0,0,0.1);
    display:inline-block;
    text-align: center;
    width: 100%;
    max-height: 80px;
    object-fit: contain;
  }
}
</style>
