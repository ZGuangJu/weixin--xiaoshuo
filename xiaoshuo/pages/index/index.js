var app = getApp()
var https = require('../../utils/https.js')
var auth = require('../../utils/auth.js')

const order = ['red', 'yellow', 'blue', 'green', 'red']

Page({
    data: {
        // text:"这是一个页面"
        list: [],
        windowHeight: 0,//获取屏幕高度
        imgUrls: [
            '../../images/slide1.jpg',
            '../../images/slide2.jpg',
            '../../images/slide3.jpg',
            '../../images/slide4.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 500,
        toView: "red",
        dotCurrent:0,
        newlist:[{"image":"http://zhangyfr.com/images/books/1.jpg","name":"三寸人间","id":1,"category":1},{"image":"http://zhangyfr.com/images/books/2.jpg","name":"飞剑问道","id":2,"category":1},{"image":"http://zhangyfr.com/images/books/3.jpg","name":"我是至尊","id":3,"category":1}],
        hotlist:[{"image":"http://zhangyfr.com/images/books/1.jpg","name":"三寸人间","id":1,"category":1,"author":"耳根","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/2.jpg","name":"飞剑问道","id":2,"category":1,"author":"我吃西红柿","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/3.jpg","name":"我是至尊","id":3,"category":1,"author":"猫腻","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"}],
        reclist:[[{"image":"http://zhangyfr.com/images/books/1.jpg","name":"三寸人间","id":1,"category":1,"author":"耳根","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/2.jpg","name":"飞剑问道","id":2,"category":1,"author":"我吃西红柿","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/3.jpg","name":"我是至尊","id":3,"category":1,"author":"猫腻","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"}],[{"image":"http://zhangyfr.com/images/books/4.jpg","name":"大道朝天","id":1,"category":1,"author":"耳根","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/5.jpg","name":"汉乡","id":2,"category":1,"author":"我吃西红柿","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/6.jpg","name":"大王饶命","id":3,"category":1,"author":"猫腻","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"}],[{"image":"http://zhangyfr.com/images/books/7.jpg","name":"苍穹之上","id":1,"category":1,"author":"耳根","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/8.jpg","name":"巅峰文明","id":2,"category":1,"author":"我吃西红柿","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},{"image":"http://zhangyfr.com/images/books/9.jpg","name":"我是仙凡","id":3,"category":1,"author":"猫腻","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"}]]
    },
    upper(e) {
        console.log(e)
    },
    lower(e) {
        console.log(e)
    },
    scroll(e) {
      
      console.log(e);
    },
    tap(e) {
        for (let i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    onLoad: function (options) {

        var that = this;
        https.get("https://weixin.zhangyfr.com/weixin/hot.json",
            function (res) {
                that.setData({
                    hotlist : res
                });
            }, function (res) {
                console.info(res);
            });

        https.get("https://weixin.zhangyfr.com/weixin/newest.json",
            function (res) {
                that.setData({
                    newlist : res
                });
            }, function (res) {
                console.info(res);
            });

        https.get("https://weixin.zhangyfr.com/weixin/yanked.json",
            function (res) {
                that.setData({
                    reclist : res
                });
            }, function (res) {
                console.info(res);
            });
        //获取屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
        auth.trySettingToken();
    },
    toList: function (e) {
        var show = e.currentTarget.dataset.show;
        wx.navigateTo({
            url: `../list/list?keyword=${e.currentTarget.dataset.cat}&title=${e.currentTarget.dataset.title}&showChoose=${show}`
        });
    },
    //点击事件处理
    clickDetail: function (e) {
        wx.navigateTo({
            url: `../detail/detail?id=${e.currentTarget.dataset.id}&category=${e.currentTarget.dataset.category}&title=${e.currentTarget.dataset.title}`
        });
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    //点击事件处理
    bindViewTap: function (e) {
        console.log(e.currentTarget.dataset.id);
    },
    recchange: function(e) {
        this.setData({
            dotCurrent:e.detail.current
        });
    },
    onShareAppMessage: function (res) {
        return {
            title: '',
            path: 'pages/index/index',
            imageUrl:'',
            success: function (shareTickets) {
                console.info(shareTickets + '成功');
                // 转发成功
            },
            fail: function (res) {
                console.log(res + '失败');
                // 转发失败
            },
            complete:function(res){
                // 不管成功失败都会执行
            }
        }
    }
})