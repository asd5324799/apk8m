// game-movie.js
let main = new Vue({
  el: '#main',
  data: {
      typeList: false,
      spread: '展开更多',
      on: 1,
  },
  methods: {
      spreadPut() {
          if (this.typeList === false) {
              this.spread = '收起部分';
              this.typeList = true;
          } else {
              this.spread = '展开更多';
              this.typeList = false;
          }
      },
      tab(index) {
        this.on = index;
        sessionStorage.setItem('tab', index);
      }
  },
  mounted() {
    if(sessionStorage.getItem('tab')) {
      let tab = sessionStorage.getItem('tab');
      tab = parseInt(tab);
      this.on = tab;
    }
  }
})