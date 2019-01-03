<template>
  <div class="index">
    <div class="top">
      <div class="detail">
        <p>{{topShow.name}}</p>
        <p>{{topShow.phone.slice(4)}}</p>
      </div>
      <div class="icon">
        <a :href="topShow.phone">
          <img class="phone" src="../assets/icon/top/phone.png" alt>
        </a>
      </div>
    </div>
    <router-view></router-view>

    <ul class="subMenu subMenu1" v-show="nav.popup[0].show" @click="isPopupNone()">
      <li @click="routerChildTo(0)">项目沙盘</li>
      <li @click="routerChildTo(1)">周边配套</li>
    </ul>

    <ul class="subMenu subMenu2" v-show="nav.popup[1].show" @click="isPopupNone();IsthreeShow()">
      <li @click="getAreaParams('7')">37㎡户型</li>
      <li @click="getAreaParams('8')">46㎡户型</li>
      <li @click="getAreaParams('9')">63㎡户型</li>
    </ul>

    <ul class="subMenu subMenu3" v-show="nav.popup[2].show" @click="isPopupNone()">
      <li @click="routerChildTo(2)">A1</li>
      <li @click="routerChildTo(3)">A2&A3</li>
    </ul>

    <ul class="subMenu subMenu4" v-show="nav.popup[3].show" @click="isPopupNone()">
      <li @click="routerChildTo(4)">楼顶花园</li>
      <li @click="routerChildTo(5)">商业漫游</li>
    </ul>

    <ul v-show="rightNav" class="rightNav">
      <li @click="areaTo();toggleImg1()">
        <img v-if="IsrightImg1==false" v-bind:src="rightImg1">
        <img v-else v-bind:src="rightImg2">
        <p>户型漫游</p>
      </li>
      <li @click="areaImgTo();toggleImg2();">
        <img v-if="IsrightImg3==false" v-bind:src="rightImg3" alt>
        <img v-else v-bind:src="rightImg4" alt>
        <p>平面户型</p>
      </li>
    </ul>

    <div class="tabbar">
      <ul>
        <li
          :class="[nav.itemDefultClass[index],nav.itemActive[index]]"
          v-for="(item,index) in nav.itemValue"
          :key="index"
          @click="isActive(index)"
        >
          <i></i>
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      nav: {
        itemValue: ["虚拟沙盘", "户型鉴赏", "大堂漫游", "景观漫游", "地下商场"],
        itemActive: [
          { nav_item_active1: true },
          { nav_item_active2: false },
          { nav_item_active3: false },
          { nav_item_active4: false },
          { nav_item_active5: false }
        ],
        itemDefultClass: [
          "nav_item1",
          "nav_item2",
          "nav_item3",
          "nav_item4",
          "nav_item5"
        ],
        popup: [
          { show: false },
          { show: false },
          { show: false },
          { show: false },
          { show: false }
        ]
      },

      topShow: {
        name: "万象天地售楼处",
        phone: "tel:025-8565 7666"
      },

      rightNav: false,

      IsrightImg1: false,
      IsrightImg3: false,

      areaParams: null,
      rightImg1: require("../assets/icon/right/10.png"),
      rightImg2: require("../assets/icon/right/11.png"),
      rightImg3: require("../assets/icon/right/20.png"),
      rightImg4: require("../assets/icon/right/21.png"),

      routerChild: [
        { path: "project", frameLink: "https://720yun.com/t/a8cjupmutn6" },
        { path: "around", frameLink: "https://720yun.com/t/b41jupmuev3" },
        { path: "a1", frameLink: "https://720yun.com/t/580jupmusn3" },
        { path: "a23", frameLink: "https://720yun.com/t/411jupmvsm8" },
        { path: "garden", frameLink: "https://720yun.com/t/863jupuOev9" },
        { path: "business", frameLink: "https://720yun.com/t/143jupuOew4" },
        { path: "under", frameLink: "https://720yun.com/t/78bjupuOeu0" },

        { path: "sq37", frameLink: "https://720yun.com/t/c7bjupmuOk3" },
        { path: "sq46", frameLink: "https://720yun.com/t/b44jupmuOf7" },
        { path: "sq63", frameLink: "https://720yun.com/t/a18jupmuOm2" }
      ],
      areaChild: [
        { img: require("../assets/img/37.jpg") },
        { img: require("../assets/img/46.jpg") },
        { img: require("../assets/img/63.jpg") }
      ],
      areaImgIndex: null
    };
  },
  methods: {
    toggleImg1() {
      this.IsrightImg1 = true;
      this.IsrightImg3 = false;
    },
    toggleImg2() {
      this.IsrightImg1 = false;
      this.IsrightImg3 = true;
    },
    areaImgTo() {
      this.$router.push({
        path: `/areaImg`,
        query: { imgSrc: this.areaChild[this.areaImgIndex].img }
      });
    },
    routerChildTo(index) {
      this.$router.push({
        path: `/pano`,
        query: { frameLink: this.routerChild[index].frameLink }
      });
    },
    isActive(index) {
      if (index == 4) {
        this.routerChildTo(6);
      }
      this.isPopup(index);
      this.IsthreeNone();
      for (var i = 0; i < this.nav.itemActive.length; i++) {
        for (var j in this.nav.itemActive[i]) {
          this.nav.itemActive[i][j] = false;
          if (i == index) {
            this.nav.itemActive[index][j] = true;
          }
        }
      }
    },

    isPopup(popupIndex) {
      for (let i = 0; i < this.nav.popup.length; i++) {
        this.nav.popup[i].show = false;
        if (popupIndex == i) this.nav.popup[popupIndex].show = true;
      }
    },

    isPopupNone() {
      for (let i = 0; i < this.nav.popup.length; i++) {
        this.nav.popup[i].show = false;
      }
    },
    getAreaParams(index) {
      this.areaParams = index;
      this.areaImgIndex = index - 7;
    },
    areaTo() {
      this.$router.push({
        path: `/pano`,
        query: { frameLink: this.routerChild[this.areaParams].frameLink }
      });
    },

    IsthreeShow() {
      this.rightNav = true;
    },
    IsthreeNone() {
      this.rightNav = false;
    }
  }
};
</script>

<style>
.nav_item1 i {
  background: url(../assets/icon/tabbar/10.png) no-repeat;
  background-size: 100% 100%;
}
.nav_item2 i {
  background: url(../assets/icon/tabbar/20.png) no-repeat;
  background-size: 100% 100%;
}
.nav_item3 i {
  background: url(../assets/icon/tabbar/30.png) no-repeat;
  background-size: 100% 100%;
}
.nav_item4 i {
  background: url(../assets/icon/tabbar/40.png) no-repeat;
  background-size: 100% 100%;
}
.nav_item5 i {
  background: url(../assets/icon/tabbar/50.png) no-repeat;
  background-size: 100% 100%;
}

.nav_item_active1 i {
  background: url(../assets/icon/tabbar/11.png) no-repeat;
  background-size: 100% 100%;
}
.nav_item_active2 i {
  background: url(../assets/icon/tabbar/21.png) no-repeat;
  background-size: 100% 100%;
}

.nav_item_active3 i {
  background: url(../assets/icon/tabbar/31.png) no-repeat;
  background-size: 100% 100%;
}

.nav_item_active4 i {
  background: url(../assets/icon/tabbar/41.png) no-repeat;
  background-size: 100% 100%;
}
.nav_item_active5 i {
  background: url(../assets/icon/tabbar/51.png) no-repeat;
  background-size: 100% 100%;
}

.rightNav {
  background: #07141e;
  position: fixed;
  right: 0.1rem;
  bottom: 1.16rem;
}
.rightNav li {
  width: 0.9rem;
  height: 0.9rem;
  border-bottom: 0.01rem solid #3d4244;
  position: relative;
}
.rightNav img {
  width: 0.5rem;
  height: 0.44rem;
  position: absolute;
  top: 35%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.rightNav p {
  font-size: 0.22rem;
  color: #fff;
  position: absolute;
  bottom: 0.03rem;
  text-align: center;
}

iframe {
  width: 100%;
  height: calc(100% - 0.92rem);
  position: absolute;
  top: 0;
}
.subMenu {
  position: absolute;
  bottom: 1rem;
}
.subMenu li {
  width: 2rem;
  height: 0.9rem;
  font-size: 0.28rem;
  color: #dfdddc;
  background: #0b1c29;
  text-align: center;
  line-height: 0.9rem;
  border-bottom: 0.01rem solid #192936;
}
.subMenu li:nth-last-of-type() {
  border: none;
}

.subMenu1 {
  position: fixed;
  bottom: 1rem;
  left: 0.1rem;
}

.subMenu2 {
  position: fixed;
  bottom: 1rem;
  left: 1.25rem;
}

.subMenu3 {
  position: fixed;
  bottom: 1rem;
  right: 2.79rem;
}

.subMenu4 {
  position: fixed;
  bottom: 1rem;
  right: 1.3rem;
}

* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}

.top {
  display: flex;
  height: 1rem;
  width: 100%;
  background: #021421;
  position: relative;
  overflow: hidden;
  transition: all 0.7s;
  z-index: 1999;
  justify-content: space-between;
  align-items: center;
}
.top .icon {
  margin-right: 0.2rem;
}
.top .icon img {
  width: 0.7rem;
  height: 0.7rem;
}
.top .icon .phone {
  margin-right: 0.3rem;
}

.top .detail {
  margin-left: 0.2rem;
}

.top .detail p {
  font-size: 0.3rem;
  color: #fff;
  transform: scale(0.8);
  transform-origin: left center;
  letter-spacing: 1px;
  text-indent: 1px;
  margin-left: 0px;
  margin: 0;
}

.top .detail p:nth-of-type(1) {
  font-size: 0.4rem;
}
.top .detail p:nth-of-type(2) {
  margin-top: -0.1rem;
}

/* 样式 */
textarea,
input,
select:focus {
  outline: 0;
}
img {
  border: none;
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
i {
  font-style: normal;
}
/* 自定义 */
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0%;
  width: 100%;

  background: #021421;
}

.tabbar ul {
  display: flex;
  justify-content: space-around;
}
.tabbar ul li {
  width: 20%;
  height: 0.92rem;
  text-align: center;
  padding-bottom: 0.14rem;
}
.tabbar ul li i {
  width: 0.54rem;
  height: 0.54rem;
  margin: 0.1rem auto;
  display: block;
}

.tabbar ul li span {
  font-size: 0.14rem;
  display: block;
  color: #dedede;
}

/* .tabbar ul li:nth-of-type(1).router-link-active i {
  background: url(../assets/icon/tabbar/11.png) no-repeat;
  background-size: 100% 100%;
} */
</style>

