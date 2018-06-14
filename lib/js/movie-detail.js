// movie-detail
let main = new Vue({
  el: '#main',
  data: {
    on: 1,
    ifPlay: true,
    poster: 'http://m.qiyipic.com/image/20180408/51/91/v_115516938_m_601_480_270.jpg',
    url: 'http://1252153290.vod2.myqcloud.com/8e45c765vodtransgzp1252153290/c1b3960c7447398156166161075/v.f30.mp4',
    src: ' ',
    autoplay: false,
    more: '点击加载游戏攻略',
    ajaxSwitch: 1,
  },
  methods: {
    tab(index) {
      this.on = index;
    },
    playMovie() {
      this.ifPlay = false;
      this.src = this.url;
      this.autoplay = true;
    },
    loadingMore() {
      if(1 === this.ajaxSwitch) {
        this.ajaxSwitch = 2;
        this.more = '加载中...';
        let url = `test2.json?page=${this.page}`;
        axios.get(url)
        .then((response) => {
          let res = response.data;
          let list,str;
          if(1 === res.code) {
            str = this.splitHtml(res, this.page);
            list = document.getElementsByClassName('news-list')[0];
            list.innerHTML += str;
            this.more = '点击加载游戏攻略';
            this.page++;
          } else {
            this.more = '暂无数据';
          }
          this.ajaxSwitch = 1;
        })
        .catch((error) => {
          console.log(error);
          this.more = '加载失败请重试';
          setTimeout(() => {
            this.more = '点击加载游戏攻略';
            this.ajaxSwitch = 1;
          }, 2000);
        })
      }
    },
    splitHtml(res) {
      let u = navigator.userAgent;
      let isIOS= !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let str = '';
      res.data.forEach(item => {
        download = true === isIOS ? item.detailurl : item.download;
        str += `<li class="news-item">
                  <a href="${item.detailurl}">
                    <img class="news-img" src="${item.src}" alt="${item.title}" title="">
                    <div class="container">
                      <div class="news-title">${item.title}</div>
                      <div class="news-date">${item.date}</div>
                    </div>
                  </a>
                </li>`;
      });
      return str;
    }
  }
})