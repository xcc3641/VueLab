new Vue({
    el: '#app',
    data: {
        essay_url: 'https://brucezz.xyz/coquettish',

        data: [],
        index: 0,
        essay: {
            titile: null,
            content: null,
            author: null,
            time: null
        },
        next_disable: false,
        last_disable: true,
        is_loading: true,
    },

    created: function() {
        this.get_data();
    },

    methods: {
        get_data: function() {
            var that = this;
            that.$http.get(this.essay_url).then((response) => {
                this.data = response.data;
                this.essay = response.data[0];
                this.essay.content = this.clean_content(this.essay.content);
                this.is_loading = false;
                this.fade_in();
            })
        },

        // delay method
        to_next_page: _.debounce(
            function(next) {
                this.is_loading = true;
                next ? this.index += 1 : this.index -= 1;
                this.index = Math.max(this.index, 0);
                this.last_disable = this.index == 0;
                console.log("index: " + this.index + " length: " + this.data.length);

                if (this.data.length - 1 >= this.index) {
                    this.essay = this.data[this.index];
                    this.essay.content = this.clean_content(this.essay.content);
                }
                this.next_disable = this.data.length - 1 <= this.index;
                this.is_loading = false;
                this.fade_in();
            }, 300),

        // assist
        clean_content: function(content) {
            return content.replace(/\r\n/g, "<br>");
        },

        fade_in: function() {
            $('.poem')
                .transition({
                    animation: 'fade in',
                    duration: '300ms'
                });
        },
    }

});
