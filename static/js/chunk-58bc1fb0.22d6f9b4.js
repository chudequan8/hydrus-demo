(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58bc1fb0"],{"27a6":function(t,e,i){"use strict";var s=i("c3e2"),n=i.n(s);n.a},6604:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tabs-view-container"},t._l(Array.from(t.visitedViews),(function(e){return i("router-link",{key:e.path,staticClass:"tabs-view",attrs:{to:e.path}},[i("el-tag",{attrs:{closable:!0,type:t.isActive(e.path)?"primary":"info"},on:{close:function(i){return t.closeViewTabs(e,i)}}},[t._v("\n      "+t._s(e.name)+"\n    ")])],1)})),1)},n=[],a=(i("7f7f"),{computed:{visitedViews:function(){return this.$store.state.app.visitedViews.slice(-6)}},methods:{closeViewTabs:function(t,e){this.$store.dispatch("delVisitedViews",t),e.preventDefault()},generateRoute:function(){return this.$route.matched[this.$route.matched.length-1].name?this.$route.matched[this.$route.matched.length-1]:(this.$route.matched[0].path="/",this.$route.matched[0])},addViewTabs:function(){this.$store.dispatch("addVisitedViews",this.generateRoute())},isActive:function(t){return t===this.$route.path}},watch:{$route:function(){this.addViewTabs()}}}),r=a,c=(i("27a6"),i("2877")),o=Object(c["a"])(r,s,n,!1,null,"7494231f",null);e["default"]=o.exports},c3e2:function(t,e,i){}}]);