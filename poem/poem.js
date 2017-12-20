
new Vue({
    el: '#app',
    data: {
        essay_url: 'https://brucezz.xyz/coquettish',

        data:[],
        essay: {
            titile: null,
            content:null,
            author:null,
            time:null
        }
    },

    created: function() {
        this.get_data();
    },

    methods: {
        get_data: function() {
            var that = this;
            that.$http.get(this.essay_url).then((response) => {
                this.essay = response.data[0];
                var content = this.essay.content;
                content = content.replace(/\r\n/g,"<br>");
                this.essay.content = content;
            })
        },
    }

});
