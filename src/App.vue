<template>
  <div id="app">
    <!-- front header -->
    <FrontHeader />
    <div class="body p-2 my-2">
      <transition><router-view></router-view></transition>
    </div>

    <a
      href="javascript:void(0)"
      class="gotop tooltip tooltip-left btn ani"
      data-tooltip="返回顶部"
      @click="gotop"
      ><i class="icon icon-upward"></i
    ></a>

    <div class="footer bg-dark">
      <div class="copyright">
        <p>
          © 2018 - 2020 invictus maneo | power by
          <a href="https://github.com/ydq/gblog" target="_blank">Gblog</a>
          |
          <a
            class="text-secondary"
            target="_blank"
            :href="
              'https://scannerradio.github.io/gblog' +
                $store.state.config.owner +
                '/' +
                $store.state.config.repo +
                '/issues'
            "
            >admin</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    FrontHeader: () => import("./components/FrontHeader.vue")
  },
  data() {
    return {
      searchkw: "",
      home_hover: this.$store.state.config.title,
      avatar: ""
    };
  },
  created() {
    document.title = this.$store.state.config.title;
  },
  methods: {
    gotop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      //document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
@import "./style/app.scss";
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb:vertical:hover,
::-webkit-scrollbar-thumb:horizontal:hover {
  background: #999;
}
body {
  border-top: 0.15rem solid currentColor;
  overflow-y: scroll;
}
.ani,
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.v-leave-active,
.v-enter-active {
  position: absolute;
  width: 100%;
}
.v-enter,
.v-leave-active {
  transform: translateY(50px);
  opacity: 0;
}
a:visited {
  color: currentColor;
}
html,
body,
#app,
.footer {
  width: 100%;
  height: 100%;
}
.navbar,
.body,
.gplayer,
.footer .copyright {
  max-width: 800px;
  margin: auto;
}
.footer {
  max-height: 100px;
  margin-top: 50px;
  padding-top: 30px;
}
.navbar .navbar-brand {
  font-size: 1.6rem;
  white-space: nowrap;
  box-shadow: none;
}
.body {
  min-height: calc(100% - 160px);
  position: relative;
}
.gotop {
  position: fixed;
  bottom: 6rem;
  right: 1rem;
  z-index: 9;
}
.search-input {
  min-width: 5rem;
}
</style>
