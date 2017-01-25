/**
 * Created by hugo on 2017/1/25.
 */


var meizi_url = 'http://gank.io/api/data/福利/10/';
var vm = new Vue({
        el: '#app',
        data: {
            count: 1,
            girlData: {
                results: []
            }
        },
        created: function () {
            this.getMeizi()
        },
        methods: {
            getMeizi: function () {
                var xhr = new XMLHttpRequest();
                var self = this;
                xhr.open('GET', meizi_url + this.count);
                xhr.onload = function () {
                    self.girlData = JSON.parse(xhr.responseText);
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        document.body.scrollTop = 0
                    }
                };
                xhr.send()
            },
            toNextPage: function (add) {
                add ? this.count += 1 : this.count -= 1;
            }
        }
    }
);

vm.$watch('count', function () {
    this.getMeizi()
});