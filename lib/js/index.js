// index.js
let main = new Vue({
  el: "main",
  data: {
      newsList: 1,
  },
  methods: {
      tab(a) {
        this.newsList = a;
      }
  },
  mounted() {
      let indexSwiper = new Swiper('#index-swiper', {
          loop: true,
          autoplay: 3000,
          pagination: {
              el: '.swiper-pagination'
          }
      })
  }
})