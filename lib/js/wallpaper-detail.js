// wallpaper-detail.js
let main = new Vue({
  el: '#main',
  data: {
    more: '查看更多手机壁纸',
    ajaxSwitch: 1,
  },
  mounted() {
    let swiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      slidesPerView: 2.5,
    })
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
            list = document.getElementsByClassName('wallpaper-list')[0];
            list.innerHTML += str;
            this.more = '查看更多手机壁纸';
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
            this.more = '查看更多手机壁纸';
            this.ajaxSwitch = 1;
          }, 2000);
        })
      }
    },
    splitHtml(res) {
      let str = '';
      res.data.forEach(item => {
        str += `<li class="wallpaper-item">
                  <a href="${item.detailurl}">
                    <img src="${item.src}" alt="">
                  </a>
                </li>`;
      });
      return str;
    }
  }
  
})