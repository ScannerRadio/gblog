### Gblog 一个基于GitHub的issues的“动态”博客

---
~~~
  _____    __    __
 / ____\  / /_  / /   ____  ____
/ / /__ \/ __ \/ /   / __ \/ __ \
\ \___/ / /_/ / /___/ /_/ / /_/ /
 \_____/\____/\____/\____/\__  /
                         \____/
~~~

项目完整示例：

https://darren.work | https://darren.ink

---



#### 准备工作：

1. 你需要有一个github账号（感觉是句废话，当看到这里你应该很大程度上已经拥有了一个Github账号）
2. 你需要申请一个Github Application，[点击这里申请](https://github.com/settings/applications/new)
3. ~~你需要申请一个Github Token（用于提高你的github仓库api的访问次数配额），[点击这里申请](https://github.com/settings/tokens)~~
4. 安装git （非必须），安装nodejs

---



#### 开始使用：

~~~bash
#如果没有安装git 可以直接打包下载
git clone git@github.com:ydq/gblog.git

cd gblog

# 修改src/config.js 中的配置，请参考配置说明
vi src/script/config.js

npm install
#本地运行
npm run dev
#build打包(将dist目录上传至您的静态空间即可，当然也可以Github Pages，请参考下面的使用说明)
npm run build
~~~

---



#### 配置说明：

##### 配置示例：

~~~javascript
//===> src/config.js 
export default {
  title: "Gblog", //博客的标题
  owner: "your_username", //你的github的用户名
  repo: "your_blog_repository", //你要读取issues的仓库名称
  perPage: 10, //列表页面每页分页条数
  clientID: "your_clientid", //申请的app clientID
  clientSecret: "your_clientsecret", //申请的app clientSecret
  talk: true, //全局是否开启评论功能
  disableTalk: "notalk", //文章禁止评论的标签
  player: {
    id: "", //网易云音乐歌单id，如 http://music.163.com/#/m/playlist?id=883476456  这个里面的883476456，为空时不显示播放器
    subtitle: "invictus maneo", //播放器暂停时默认显示的文字，可以作为博客的副标题
    tooltip: "click to play music~" //Chrome71+不再允许自动播放音频，因此需要提示用户手动点击激活播放器，同时也是为了用户体验着想，不要一进来就音乐
  }
};
~~~



##### 配置项说明：

- title：博客的标题，建议不要太长，否则会影响手机界面下的显示
- owner：你的Github的用户名
- repo：你存放文章的仓库
- perPage：列表每页数量
- clientID：申请的app的clientID
- clientSecret：申请的app的clientSecret
- talk：全局评论开关
- disableTalk：文章禁止评论打的标签
- player.id：网易云音乐歌单id，如 http://music.163.com/#/m/playlist?id=883476456  这个里面的883476456即为歌单ID，此值为空时不显示播放器
- player.subtitle：播放器暂停时默认显示的文字，可以作为博客的副标题
- player.tooltip：播放器默认文字的悬浮提示（仅在未激活播放器时显示，用于引导用户激活启动播放器）



##### 使用说明：

- 文章发布后默认允许评论，若要单独关闭谋篇文章的评论，则需要打上disable_talk配置的标签，当然如果全局都不想开启评论，则需要设置talk属性为false

- 音乐播放器使用第三方接口，可能存在不稳定的情况，因此不稳定时只会出现播放器的默认文字

- 由于某些原因，**如果你要将构建打包后的文件上传到github，使用github的pages服务的话，建议将你打包好的文件中的三个key (`clientID`和`clientSecret`)用字符串拼接的方式将其隔开**，否则github检测到你提交的代码中有你的key的话会导致key失效。

  > 例如你的key为  "abcdefghijklmn"  ，那么在你编译完只会，打开app.xxxx.js，搜索你的key，并将其替换为类似于  "abcdefg"+"hijklmn"  这样的形式
  
  ~~~bash
  //最后项目结构打开如下 可参考 https://github.com/ydq/blog
  ├── favicon.ico
  ├── index.html
  ├── css
     ├── app.xxxxxx.css
     ├── chunk-xxxxx.xxxxxx.css
     ├── ...
     ├── chunk-xxxxx.xxxxxx.css
  ├── CNAME
  ├── js
     ├── app.xxxxxx.js
     ├── chunk-vendors.xxxxxx.js
     ├── chunk-xxxxx.xxxxxx.js
     ├── ...
     ├── chunk-xxxxx.xxxxxx.js
  ├── 404.html //复制于index.html  仅仅部署在github/gitlab等pages服务才需要
  ├── README.md
  ~~~

---



#### 项目依赖：

项目中使用到了一些开源的框架

- vue全家桶：https://github.com/vuejs/vue
- spectre.css：https://github.com/picturepan2/spectre
- marked：https://github.com/markedjs/marked
- highlight.js：https://github.com/highlightjs/highlight.js
- gitalk：https://github.com/gitalk/gitalk
- 音乐播放器的接口由 https://api.imjad.cn/cloudmusic.md 提供
- 项目中的音乐播放器所播放的音乐内容来自于网易云音乐



---



#### LICENSE：

MIT