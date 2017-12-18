/*
 1 获取首页的 id list
 --> http://v3.wufazhuce.com:8000/api/onelist/idlist
 2 获取当前 id 的内容 list
 --> http://v3.wufazhuce.com:8000/api/onelist/{id}/0
 {
  data:{
    weather
    content_list
    menu
      vol
  }
}
3
获取当前 id 的图文
  data:{
  content_list
}
获取当前 id 的文章,vol 是从 menu 中获取
--> http://v3.wufazhuce.com:8000/api/essay/{vol}
*/


new Vue({
    el: '#app',
    data: {

        id_list_url: 'http://v3.wufazhuce.com:8000/api/onelist/idlist',
        detail_url: 'http://v3.wufazhuce.com:8000/api/onelist/', //${id}/0
        essay_url: 'http://v3.wufazhuce.com:8000/api/essay/',

        fullscreenLoading: false,

        id_list: {
            data: []
        },

        detail: {
            data: {
                // forward & img_url
                content_list:[],
                menu:{
                  vol: null
                }
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
                this.id_list = response.data;
                this.get_detail(this.id_list.data[0]);
                that.fullscreenLoading = false;
            })

        },

        get_detail: function (id) {
            var that = this;
            that.$http.get(this.detail_url+id+"/0").then((response) => {
                this.detail = response.data;
                this.get_essay(this.detail.data.menu.vol);
                console.log(this.detail.data.content_list.length);
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
