var app = getApp()
var https = require('../../utils/https.js')
var util = require('../../utils/util.js')
import {BookShelfInfo} from '../../model/BookShelfInfo.js';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        visible: false,
        scrolly: true,
        item: {},
        showCatelog: false,
        catelogs: {},
        recList: {},
        inBookshelf: false,
        showMoreDesc: false,
        showMoreText: '更多介绍',
        windowHeight: 0,//获取屏幕高度
        title: '',
    },
    initWindowHeight: function () {
        //获取屏幕高度
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
    },
    showDesc: function (e) {
        this.setData({
            showMoreDesc: !this.data.showMoreDesc,
            showMoreText: this.data.showMoreDesc ? '更多介绍' : '收起介绍'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        wx.setNavigationBarTitle({
            title: option.title
        });
        var that = this;
        that.setData({
            title: option.title
        });
        that.initWindowHeight();
        var inBookshelf = false;
        if (wx.getStorageSync("book" + option.id)) {
            inBookshelf = true;
        }
        showCatelog: (option.showCatelog == "true" ? true : false)
        let url = app.globalData.detailUrl + `?id=${option.id}`;
        wx.showLoading({
            title: '加载中',
            mark: true
        });
        https.get(url, function (res) {
            if (res) {
                res.modifytime = util.formatDate(new Date(res.modifytime));
            }
            that.setData({
                item: res,
                //{"image":"http://zhangyfr.com/images/books/1.jpg","name":"三寸人间","id":1,"category":1,"author":"耳根","status":0,"totalCount":1000,"updateTime":"2019-02-19","desc":"我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。"},
                visible: true,
                id: option.id,
                inBookshelf: inBookshelf
            });
            wx.hideLoading();
        }, function () {
            wx.hideLoading();
        })
        url = app.globalData.guessUrl + `?id=1&keyword=${option.title}`
        https.get(url, function (res) {
            that.setData({
                recList: res.slice(0, 8),
                visible: true,
            })
        })
    },
    refreshCatelog: function () {
        var that = this;
        that.initCatelog(that.data.id);
    },
    sortCatelog: function () {
        var that = this;
        var catelogs = that.data.catelogs;
        that.setData({
            catelogs: catelogs.reverse()
        });
    },
    initCatelog: function (nid) {
        var that = this;
        let url = app.globalData.catalogUrl + `?nid=${nid}`
        wx.showLoading({
            title: '加载中',
            mark: true
        });
        https.get(url, function (res) {
            that.setData({
                catelogs: res
            });
            wx.hideLoading();
        }, function () {
            wx.hideLoading();
        });
    },
    //点击事件处理
    clickDetail: function (e) {
        wx.redirectTo({
            url: `./detail?id=${e.currentTarget.dataset.id}&category=${e.currentTarget.dataset.category}&title=${e.currentTarget.dataset.title}`
        });
    },
    changeShowCatelog: function (e) {
        var that = this;
        that.setData({
            showCatelog: !that.data.showCatelog,
            scrolly: that.data.showCatelog
        })
        if (that.data.showCatelog) {
            that.initCatelog(that.data.id);
        }
    },
    toReader: function (e) {
        var that = this;
        let serialNumber = '1';
        if (e.currentTarget.dataset.serialnumber) {
            serialNumber = e.currentTarget.dataset.serialnumber;
        }
        wx.navigateTo({
            url: `../reader/reader?id=${that.data.id}&serialNumber=${serialNumber}&title=${that.data.item.name}`
        });
    },
    insertBookShelf: function () {
        var that = this;
        var item = that.data.item;
        var info = new BookShelfInfo(that.data.id, item.name,
            item.image, 1, "", item.categoryname, item.lastid, item.lastitemname, util.formatDate(new Date()));

        wx.setStorage({
            key: "book" + that.data.id,
            data: info,
            success: function () {
                wx.showToast({
                    title: '已加入书架',
                })
                that.setData({
                    inBookshelf: true
                })
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this;
        return {
            title: `${that.data.title}`,
            path: `pages/detail/detail?id=${that.data.id}&title=${that.data.title}`,
            imageUrl: '',
            success: function (shareTickets) {
                console.info(shareTickets + '成功');
                // 转发成功
            },
            fail: function (res) {
                console.log(res + '失败');
                // 转发失败
            },
            complete: function (res) {
                // 不管成功失败都会执行
            }
        }
    }
})