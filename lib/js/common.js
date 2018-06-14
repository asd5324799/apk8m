let header = new Vue({
    el: "header",
    data: {
        isActive: false,
        showList: false,
        scrollTop: 0,
        returnShow: false,
    },
    methods: {
        // 导航栏是否显示
        isShow() {
            if(this.isActive) {
                this.isActive = false;
                this.showList = false;
            } else {
                this.isActive = true;
                this.showList = true;
            }
        }, 
        // 返回顶部
        backTop() {
            var interval = setInterval(() => {
                if(document.documentElement.scrollTop > 0) {
                    document.documentElement.scrollTop -= 100;     
                } else if (document.body.scrollTop > 0) {
                    document.body.scrollTop -= 100;
                } else {
                    clearInterval(interval); 
                }
            },20)
        },
        // 返回顶部显示
        scrollHeight() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(this.scrollTop >= 667) {
                this.returnShow = true;
            } else {
                this.returnShow = false;
            }
        }
    },
    mounted() {
        // 监听滚动条
        window.addEventListener('scroll', this.scrollHeight);
    }
})