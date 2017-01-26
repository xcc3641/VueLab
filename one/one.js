/*
 获取首页
 http://v3.wufazhuce.com:8000/api/hp/idlist/0
 然后通过
 http://v3.wufazhuce.com:8000/api/hp/detail/1275 进入
 */


new Vue({
    el: '#app',
    data: {

        id_list_url: 'http://v3.wufazhuce.com:8000/api/hp/idlist/0',
        detail_url: 'http://v3.wufazhuce.com:8000/api/hp/detail/',
        essay_url: 'http://v3.wufazhuce.com:8000/api/essay/',

        fullscreenLoading: false,

        list: {
            data: []
        },
        detail: {
            data: {
                hp_content: null
            }
        },
        essay: {
            data: {
                hp_title: null,
                hp_content: null
            }
        }

    },

    created: function () {
        this.get_id();
    },

    methods: {
        get_id: function () {
            var that = this;
            that.fullscreenLoading = true;
            that.$http.get(this.id_list_url).then((response) => {
                this.list = response.data.data;
                this.get_detail(this.list[0]);
                this.get_essay(this.list[0]);
                that.fullscreenLoading = false;
            })

        },

        get_detail: function (id) {
            var that = this;
            that.$http.get(this.detail_url + id).then((response) => {
                this.detail = response.data;
            })
        },

        get_essay: function (id) {
            var that = this;
            that.$http.get(this.essay_url + id).then((response) => {
                this.essay = response.data;
            })
        },

    }

});
