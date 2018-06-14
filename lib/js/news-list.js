/* news-list */
let main = new Vue({
  el: '#main',
  data: {
    on: 1
  },
  methods: {
    tab(index) {
      this.on = index;
      sessionStorage.setItem('tab', index);
    },
  },
  mounted() {
    if(sessionStorage.getItem('tab')) {
      let tab = sessionStorage.getItem('tab');
      tab = parseInt(tab);
      this.on = tab;
    }
  }
})