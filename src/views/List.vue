<template>
  <div class="main-list" :class="{ loading: loading, 'loading-lg': loading }">
    <table v-if="articles.length" class="table table-scroll">
      <tbody is="transition-group">
        <tr v-if="!!query" key="query">
          <td colspan="2">
            搜索：<mark>{{ query }}</mark>
          </td>
        </tr>
        <tr v-else-if="!!tag" key="tag">
          <td colspan="2">
            标签：<span class="label label-rounded">#{{ tag }}</span>
          </td>
        </tr>
        <tr v-for="(article, i) in articles" :key="article.number">
          <td colspan="2">
            <router-link
              :to="'/post/' + article.number"
              :class="{ badge: showCommentsCount(article) }"
              >{{ article.title }}</router-link
            >
            <router-link
              v-for="label in labels(i)"
              :key="label"
              :to="'/tag/' + label"
              class="label d-inline-block mx-1"
              >#{{ label }}</router-link
            >
            <br />
            <span class="date text-gray">{{
              new Date(article.created_at).format("d M y")
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="
        !loading &&
          articles.length &&
          (pageparam.last > 1 || pageparam.curr > 1)
      "
      class="clearfix"
    >
      <div class="float-left">
        <router-link
          v-if="pageparam.curr > 1"
          class="btn btn-link tooltip mx-1"
          data-tooltip="首页"
          :to="url(1)"
          ><i class="icon icon-back"></i
        ></router-link>
        <router-link
          v-if="pageparam.prev > 0"
          class="btn btn-link tooltip mx-1"
          data-tooltip="上一页"
          :to="url(pageparam.prev)"
          ><i class="icon icon-arrow-left"></i
        ></router-link>
      </div>
      <div class="float-right">
        <router-link
          v-if="pageparam.next > 0"
          class="btn btn-link tooltip mx-1"
          data-tooltip="下一页"
          :to="url(pageparam.next)"
          ><i class="icon icon-arrow-right"></i
        ></router-link>
        <router-link
          v-if="pageparam.curr < pageparam.last"
          class="btn btn-link tooltip mx-1"
          data-tooltip="尾页"
          :to="url(pageparam.last)"
          ><i class="icon icon-forward"></i
        ></router-link>
      </div>
    </div>

    <div v-if="!loading && !articles.length" class="empty">
      <div class="empty-icon">
        <i
          class="icon icon-3x"
          :class="{
            'icon-search': !!query,
            'icon-bookmark': !!tag,
            'icon-emoji': !query && !tag
          }"
        ></i>
      </div>
      <p v-if="!!query" class="empty-title h5">
        没有搜索到 <mark>{{ query }}</mark> 相关结果
      </p>
      <p v-else-if="!!tag" class="empty-title h5">
        没有找到标签
        <span class="label label-rounded label-error">{{ tag }}</span>
        相关的文章
      </p>
      <p v-else class="empty-title h5">这个博主懒滴很</p>
      <p v-if="!!query" class="empty-subtitle">您可以尝试搜索一下别的内容</p>
      <p v-else-if="!!tag" class="empty-subtitle">要不试试别的标签</p>
      <p v-else class="empty-subtitle">您可以过段时间再过来看看</p>
    </div>
  </div>
</template>

<script>
import { listapi } from "../script/api.js";

export default {
  name: "List",
  props: ["page", "tag", "query"],
  data() {
    return {
      loading: true,
      articles: [],
      pageparam: {
        curr: 1,
        prev: 0,
        next: 0,
        last: 0,
        first: 0
      }
    };
  },
  watch: {
    $route(to) {
      this.loading = true;
      this.articles = [];
      this.page = to.params.page;
      this.loadList();
    }
  },
  created() {
    this.loadList();
  },
  beforeRouteLeave(to, from, next) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    next();
  },
  methods: {
    api() {
      let config = this.$store.state.config;
      let api;
      if (this.query) {
        api =
          "search/issues?q=repo:" +
          config.owner +
          "/" +
          config.repo +
          "+author:" +
          config.owner +
          "+state:open+in:title,body+" +
          this.query;
      } else if (this.tag) {
        api =
          "search/issues?q=repo:" +
          config.owner +
          "/" +
          config.repo +
          "+author:" +
          config.owner +
          "+state:open+label:" +
          this.tag;
      } else {
        api =
          "repos/" +
          config.owner +
          "/" +
          config.repo +
          "/issues?creator=" +
          config.owner;
      }
      this.pageparam.curr = this.page || 1;
      api += "&per_page=" + config.perPage + "&page=" + this.pageparam.curr;
      return api;
    },
    url(page) {
      if (this.query) {
        return "/search/" + this.query + (page > 1 ? "/" + page : "");
      } else if (this.tag) {
        return "/tag/" + this.tag + (page > 1 ? "/" + page : "");
      } else {
        return page == 1 ? "/" : "/page/" + page;
      }
    },
    async loadList() {
      //调用github接口获取文章列表
      let config = this.$store.state.config;
      this.pageparam.curr = this.page || 1;
      document.title =
        (this.pageparam.curr == 1 ? "" : "第" + this.pageparam.curr + "页 - ") +
        (this.tag ? "标签:" + this.tag + " - " : "") +
        (this.query ? "搜索:" + this.query + " - " : "") +
        config.title;
      let resp = await listapi(this.api());
      this.parsePageLink(resp.link);
      if (this.query || this.tag) {
        this.articles = resp.json.items;
      } else {
        this.articles = resp.json;
      }
      this.loading = false;
    },
    parsePageLink(link) {
      let rs,
        reg = /[^_]page=(\d+).*?rel="(\w+)"/g;
      this.pageparam.prev = 0;
      this.pageparam.next = 0;
      this.pageparam.last = 0;
      this.pageparam.first = 0;
      while ((rs = reg.exec(link)) != null) {
        this.pageparam[rs[2]] = rs[1];
      }
    },
    showCommentsCount(article) {
      return this.$store.state.config.talk && article.comments;
    },
    labels(i) {
      let notalk = this.$store.state.config.disableTalk;
      return this.articles[i].labels
        .filter(label => label.name != notalk)
        .map(label => label.name);
    }
  }
};
</script>
<style>
table tbody tr:last-child td {
  border-bottom: none;
}
.date {
  width: 5.7rem;
  font-size: 0.7rem;
  vertical-align: top;
}
a.label {
  text-decoration: none;
}
.main-list td,
.main-list th {
  border: none;
  padding: 0.6rem 0;
}
</style>
