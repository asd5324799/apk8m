// news-detail.js
let main = new Vue({
  el: '#main',
  data: {
    more: '点击加载游戏攻略',
    ajaxSwitch: 1,
  },
  methods: {
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
      let str = '';
      res.data.forEach(item => {
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