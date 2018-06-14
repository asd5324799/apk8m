// game-rank-detail.js
let main = new Vue({
  el: '#main',
  data: {
    more: '更多内容+',
    page: 2,
    ajaxSwitch: 1,
  },
  methods: {
    loadingMore() {
      if(1 === this.ajaxSwitch) {
        this.ajaxSwitch = 2;
        this.more = '加载中...'
        let url = `test.json?page=${this.page}`;
        axios.get(url)
        .then((response) => {
          let res = response.data;
          let list,str;
          if(1 === res.code) {
            str = this.splitHtml(res, this.page);
            list = document.getElementsByClassName('game-list')[0];
            list.innerHTML += str;
            this.more = '更多内容+';
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
            this.more = '更多内容+'
            this.ajaxSwitch = 1;
          },2000);
        })
      }
    },
    splitHtml(res, page) {
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let str = '';
      let download = '';
      res.data.forEach((item, n) => {
        download = true === isIOS ? item.detailurl : item.download;
        str += `<li class="game-item rank">
                  <a href="${item.detailurl}" target="_blank">
                    <div class="num rank4">${(page-1)*10 + n + 1}</div>
                    <img src="${item.image}" alt="${item.name}" class="game-image">
                    <div class="content">
                      <div class="game-name">${item.name}</div>
                      <div class="type"><span class="">${item.type}</span><span class="text border-left">${item.size}</span></div>
                      <div class="boon">${item.boon}</div>
                    </div>
                  </a>
                  <a href="${download}" class="download">下载</a>
                </li>`;
      });
      return str;
    },
  },
})