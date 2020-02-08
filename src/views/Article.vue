<template>
  <div class="article" :class="{ loading: loading, 'loading-lg': loading }">
    <h3>{{ article.title }}</h3>
    <div class="authinfo my-2">
      <div v-if="article.user" class="chip">
        <img :src="article.user.avatar_url" class="avatar avatar-sm" />{{
          truename
        }}
      </div>
      <span v-if="article.user" class="label mx-2"
        >发布时间：{{ fmtDate }}</span
      >
      <a
        v-if="article.user && showGitalk()"
        class="label label-rounded"
        href="javascript:void(0)"
        @click="gocomment"
        v-text="article.comments > 0 ? article.comments + '条评论' : '抢沙发'"
      ></a>
    </div>
    <div class="content" v-html="content"></div>
    <p v-if="article.labels && article.labels.length">
      本文标签：
      <router-link
        v-for="label in article.labels"
        :key="label.name"
        :to="'/tag/' + label.name"
        class="label d-inline-block mx-1"
        >#{{ label.name }}</router-link
      >
    </p>

    <div v-if="showGitalk" id="gitalk"></div>
    <a
      v-if="showGitalk()"
      href="javascript:void(0)"
      class="gocomment tooltip tooltip-left btn"
      data-tooltip="查看评论"
      @click="gocomment"
      ><i class="icon icon-message"></i
    ></a>
    <router-link
      v-if="article.user"
      class="btn tooltip tooltip-left backoff"
      :style="{
        bottom: showGitalk() ? 'calc(6rem - 70px)' : 'calc(6rem - 35px)'
      }"
      data-tooltip="返回上一页"
      :to="backurl"
      ><i class="icon icon-back"></i
    ></router-link>
  </div>
</template>

<script>
import "gitalk/dist/gitalk.css";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-gist.css";
import marked from "marked";
import Gitalk from "gitalk";
import hljs from "highlight.js";
import { articleapi } from "../script/api.js";
export default {
  props: ["id"],
  data() {
    return {
      loading: true,
      backurl: "/",
      article: {}
    };
  },
  computed: {
    content() {
      return this.article.body
        ? marked(this.article.body, {
            highlight: code => hljs.highlightAuto(code).value
          }).replaceAll("<pre>", '<pre class="code">')
        : "";
    },
    truename() {
      let config = this.$store.state.config;
      return config.truename && this.article.user.login === config.owner
        ? config.truename
        : config.owner;
    },
    fmtDate() {
      return this.article.created_at
        ? new Date(this.article.created_at).format("d M y")
        : "";
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setBackUrl(from.path));
  },
  beforeRouteLeave(to, from, next) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    next();
  },
  created() {
    this.loadArticle();
  },
  methods: {
    setBackUrl(backurl) {
      this.backurl = backurl;
    },
    async loadArticle() {
      let config = this.$store.state.config;
      let article = await articleapi(this.id);

      if (article.author_association != "OWNER" || article.state == "closed") {
        this.$router.replace("/404");
        return;
      }
      this.article = article;
      this.loading = false;
      document.title = article.title;
      if (this.showGitalk()) {
        let gitalk = new Gitalk({
          clientID: config.clientID,
          clientSecret: config.clientSecret,
          repo: config.repo,
          owner: config.owner,
          admin: [config.owner],
          number: this.id * 1,
          createIssueManually: false,
          distractionFreeMode: false
        });
        this.$nextTick(() => gitalk.render("gitalk"));
      }
    },
    showGitalk() {
      let config = this.$store.state.config;
      let talk = config.talk;
      let notalk = config.disableTalk;
      return (
        talk &&
        this.article.labels &&
        !this.article.labels.filter(label => label.name == notalk).length
      );
    },
    initPage() {
      this.pageparam.prev = 0;
      this.pageparam.next = 0;
      this.pageparam.last = 0;
      this.pageparam.first = 0;
    },
    parsePageLink(link) {
      let rs,
        reg = /page=(\d+).*?rel="(\w+)"/g;
      this.initPage();
      while ((rs = reg.exec(link)) != null) {
        this.pageparam[rs[2]] = rs[1];
      }
    },
    gocomment() {
      window.scrollTo({
        top: document.querySelector("#gitalk").offsetTop,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style>
.article {
  font-size: 14px;
}
.content img {
  max-width: 100%;
}
.content h1 {
  font-size: 1.3rem;
}
.content h2 {
  font-size: 1.2rem;
}
.content h3 {
  font-size: 1.1rem;
}
.content h4 {
  font-size: 1rem;
}
.content h5 {
  font-size: 0.9rem;
}
#gitalk .gt-container .gt-header-textarea,
#gitalk >>> .gt-btn {
  border-radius: 0.1rem;
}
.authinfo .label {
  vertical-align: middle;
}
.gocomment {
  position: fixed;
  bottom: calc(6rem - 35px);
  right: 1rem;
  z-index: 9;
}
.backoff {
  position: fixed;
  right: 1rem;
  z-index: 9;
}
</style>
