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
