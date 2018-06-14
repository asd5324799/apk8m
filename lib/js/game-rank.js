// game-rank.js
let main = new Vue({
  el: '#main',
  data: {
    on: 0,
    more: '更多内容+',
    ajaxSwitch: 1,
    moreRank: '加载更多排行榜',
    ajaxSwitch2: 1,
    bt: {
      page: 2,
    },
    break: {
      page: 2,
    },
    hot: {
      page: 2,
    }
  },
  methods: {
    tab(index) {
      this.on = index;
    },
    loadingMore(index) {
      if(1 === this.ajaxSwitch) {
        this.ajaxSwitch = 2;
        this.more = '加载中...';
        if(0 === index) {
          this.bt.url = `test.json?page=${this.bt.page}`;
          this.ajax(index, this.bt);
        } else if (1 === index) {
          this.break.url = `test.json?page=${this.break.page}`;
          this.ajax(index, this.break);
        } else if (2 === index) {
          this.hot.url = `test.json?page=${this.hot.page}`;
          this.ajax(index, this.hot);
        }
      }
    },
    loadingRank() {
      if(1 === this.ajaxSwitch2) {
        this.ajaxSwitch2 = 2;
        this.moreRank = '加载中...'
        axios.get('test.json')
        .then((response) => {
          let res = response.data;
          let list,str;
          if(1 === res.code) {
            str = this.splitRank(res);
            list = document.getElementsByClassName('list-type')[0];
            list.innerHTML += str;
            this.moreRank = '加载更多排行榜';
          } else {
            this.moreRank = '暂无数据';
          }
          this.ajaxSwitch2 = 1;
        })
        .catch((error) => {
          console.log(error);
          this.moreRank = '加载失败请重试';
          setTimeout(() => {
            this.moreRank = '加载更多排行榜'
            this.ajaxSwitch2 = 1;
          },2000)
        })
      }
    },
    ajax(index, obj) {
      axios.get(obj.url)
      .then((response) => {
        let res = response.data;
        let list,str;
        if( 1 === res.code) {
          str = this.splitHtml(res, obj.page);
          list = document.getElementsByClassName('game-list')[index];
          list.innerHTML += str;
          this.more = '更多内容+';
          obj.page++;
        } else {
          this.more = '暂无数据';
        }
        this.ajaxSwitch = 1;
      })
      .catch((error) => {
        console.log(error);
        this.more = '加载失败请重试';
        setTimeout(() => {
          this.more = '更多内容+';
          this.ajaxSwitch = 1;
        },2000);
      });
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
    splitRank(res) {
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let str = `<section class="game-type-list">
                  <div class="title">
                    <div class="content">${res.title}</div>
                    <a href="" class="more">查看更多>></a>
                  </div>
                  <div class="container">
                    <ul class="game-list">`;
      let download = '';
      res.data.forEach((item, n) => {
        download = true === isIOS ? item.detailurl : item.download;
        str += `<li class="game-item rank">
                  <a href="${item.detailurl}" target="_blank">
                    <div class="num rank${n + 1}">${n + 1}</div>
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
      str += `</ul>
              </div>
              </section>`
      return str;
    },
  },
})