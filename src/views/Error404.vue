<template>
  <div class="404">
    <router-link id="code" :to="backurl"
      ><span>4</span><span>0</span><span>4</span></router-link
    >
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {
      backurl: "/"
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setBackUrl(from.path));
  },
  methods: {
    setBackUrl(backurl) {
      this.backurl = backurl;
    }
  }
};
</script>
<style>
#code {
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;
  outline: none;
}
#code span {
  transition: all 0.1s linear;
  font-size: 6rem;
  font-weight: bold;
  color: #fff !important;
  text-shadow: 0px 0px 2px #686868, 0px 1px 1px #ddd, 0px 2px 1px #d6d6d6,
    0px 3px 1px #ccc, 0px 4px 1px #c5c5c5, 0px 5px 1px #c1c1c1, 0px 6px 1px #bbb,
    0px 7px 1px #777, 0px 8px 3px rgba(100, 100, 100, 0.4),
    0px 9px 5px rgba(100, 100, 100, 0.1), 0px 10px 7px rgba(100, 100, 100, 0.15),
    0px 11px 9px rgba(100, 100, 100, 0.2),
    0px 12px 11px rgba(100, 100, 100, 0.25),
    0px 13px 15px rgba(100, 100, 100, 0.3);
}
#code span:hover {
  text-shadow: 0px 0px 2px #686868, 0px 1px 1px #fff, 0px 2px 1px #fff,
    0px 3px 1px #fff, 0px 4px 1px #fff, 0px 5px 1px #fff, 0px 6px 1px #fff,
    0px 7px 1px #777, 0px 8px 3px #fff, 0px 9px 5px #fff, 0px 10px 7px #fff,
    0px 11px 9px #fff, 0px 12px 11px #fff, 0px 13px 15px #fff;
}
</style>
