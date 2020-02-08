<template>
  <div>
    <header class="navbar p-2">
      <section class="navbar-section my-2">
        <router-link
          to="/"
          class="navbar-brand tooltip tooltip-right"
          :data-tooltip="home_hover"
        >
          <figure
            class="avatar avatar-xl"
            :data-initial="$store.state.config.owner.substr(0, 1).toUpperCase()"
          >
            <img v-if="avatar" :src="avatar" />
          </figure>
          {{ $store.state.config.title }}
        </router-link>
      </section>
      <section class="navbar-section my-2">
        <form
          class="input-group input-inline"
          action=""
          @submit.prevent="search"
        >
          <input
            v-model="searchkw"
            class="form-input search-input"
            type="search"
            placeholder="Search"
            @keyup.enter.prevent="search"
          />
          <button
            class="btn btn-primary input-group-btn"
            type="button"
            @click.prevent="search"
          >
            <i class="icon icon-search"></i> 搜索
          </button>
        </form>
      </section>
    </header>
    <player
      v-if="$store.state.config.player.id"
      class="gplayer px-2 mb-1"
      :config="$store.state.config.player"
    ></player>
  </div>
</template>
<script>
import { userapi } from "../script/api.js";
export default {
  name: "FrontHeader",
  components: {
    player: () => import("./Gplayer.vue")
  },
  data() {
    return {
      searchkw: "",
      home_hover: this.$store.state.config.title,
      avatar: ""
    };
  },
  created() {
    this.inituser();
  },
  methods: {
    async inituser() {
      let userinfo = await userapi();
      this.avatar = userinfo.avatar_url;
      this.$store.commit("truename", userinfo.name);
      if (userinfo.bio) {
        this.home_hover = userinfo.bio;
      }
    },
    search() {
      this.$router.push(this.searchkw ? "/search/" + this.searchkw : "/");
    }
  }
};
</script>
