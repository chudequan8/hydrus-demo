(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4af21b64"],{"1c4c":function(e,t,a){"use strict";var n=a("9b43"),r=a("5ca1"),l=a("4bf8"),i=a("1fa8"),o=a("33a4"),s=a("9def"),c=a("f1ae"),u=a("27ee");r(r.S+r.F*!a("5cc5")((function(e){Array.from(e)})),"Array",{from:function(e){var t,a,r,d,p=l(e),h="function"==typeof this?this:Array,f=arguments.length,m=f>1?arguments[1]:void 0,g=void 0!==m,y=0,b=u(p);if(g&&(m=n(m,f>2?arguments[2]:void 0,2)),void 0==b||h==Array&&o(b))for(t=s(p.length),a=new h(t);t>y;y++)c(a,y,g?m(p[y],y):p[y]);else for(d=b.call(p),a=new h;!(r=d.next()).done;y++)c(a,y,g?i(d,m,[r.value,y],!0):r.value);return a.length=y,a}})},"5d39":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search-row"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择状态",clearable:""},model:{value:e.searchForm.status,callback:function(t){e.$set(e.searchForm,"status",t)},expression:"searchForm.status"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择完成状态",clearable:""},model:{value:e.searchForm.complete,callback:function(t){e.$set(e.searchForm,"complete",t)},expression:"searchForm.complete"}},e._l(e.completeOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.handleSearch(1)}}},[e._v("查询")])],1),a("el-form-item",[a("el-button",{attrs:{plain:"",icon:"el-icon-delete"},on:{click:function(t){return e.handleSearch(2)}}},[e._v("清空")])],1)],1)],1),a("grid-unit",{ref:"hydrusAbnormalGrid",attrs:{formOptions:e.queryFormValues,reqMethod:e.reqFunction,columns:e.curColModels},scopedSlots:e._u([{key:"handle",fn:function(t){return 1===t.row.status?[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(a){return e.refreshHydrusAbnormal(t.row)}}},[e._v("重试")]),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return e.deleteHydrusAbnormal(t.row)}}},[e._v("删除")])]:void 0}}],null,!0)})],1)},r=[],l=(a("6762"),a("2fdb"),a("e1ca")),i=[{prop:"merchantNo",label:"商户号"},{prop:"product",label:"产品"},{prop:"noticeId",label:"通知id"},{prop:"unitId",label:"unitId"},{prop:"dataSource",label:"数据类型"},{prop:"dataKey",label:"key"},{prop:"complete",label:"是否完成",type:"status",unitFilters:{renderStatusType:function(e){var t={1:"success",0:"danger"};return t[e]||"info"},renderStatusValue:function(e){var t=["初始化","已完成","待定"];return t[e]||"待定"}}},{prop:"status",label:"状态",type:"status",unitFilters:{renderStatusType:function(e){var t={1:"success",0:"danger"};return t[e]||"info"},renderStatusValue:function(e){var t=["无效","有效","待定"];return t[e]||"待定"}}},{prop:"crtTime",label:"创建时间"},{prop:"updTime",label:"更新时间"},{label:"操作",slotName:"handle",fixed:"right",align:"center",width:150}],o={name:"abnormalFlowTable",components:{GridUnit:l["a"]},props:["tableType"],data:function(){return{queryFormValues:{status:"1",complete:"0"},searchForm:{status:"1",complete:"0"},statusOptions:[{label:"无效",value:"0"},{label:"有效",value:"1"}],completeOptions:[{label:"未完成",value:"0"},{label:"已完成",value:"1"}],curColModels:"1"===this.tableType?i.filter((function(e){return!["dataSource","dataKey"].includes(e.prop)})):i.filter((function(e){return"unitId"!==e.prop})),reqFunction:this.$api.hydrusAbnormalFlow["1"===this.tableType?"getHydrusAbnormalList":"getDataAbnormalList"]}},methods:{handleSearch:function(e){1===e?(this.queryFormValues.status=this.searchForm.status,this.queryFormValues.complete=this.searchForm.complete):(this.queryFormValues.status=this.searchForm.status="",this.queryFormValues.complete=this.searchForm.complete=""),this.$nextTick(this.searchParams)},searchParams:function(){this.$refs.hydrusAbnormalGrid.searchHandler()},refreshHydrusAbnormal:function(e){var t=this,a=this.$api.hydrusAbnormalFlow["1"===this.tableType?"recoverHydrusAbnormal":"recoverDataAbnormal"];a(this.tableType,e.id).then((function(e){t.$message({type:e.rel?"success":"error",message:e.message}),e.rel&&t.searchParams()})).catch((function(e){t.$message.error(e.msg||"请求失败")}))},deleteHydrusAbnormal:function(e){var t=this;this.$confirm("确定删除该记录吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a=t.$api.hydrusAbnormalFlow["1"===t.tableType?"deleteHydrusAbnormal":"deleteDataAbnormal"];a(t.tableType,e.id).then((function(e){t.$message({type:e.rel?"success":"error",message:e.message}),e.rel&&t.searchParams()})).catch((function(e){t.$message.error(e.msg||"请求失败")}))})).catch((function(){return!1}))}}},s=o,c=a("2877"),u=Object(c["a"])(s,n,r,!1,null,null,null);t["default"]=u.exports},"713b":function(e,t,a){},b022:function(e,t,a){"use strict";var n=a("713b"),r=a.n(n);r.a},e1ca:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"model-table-pagenation"},[a("div",{staticClass:"model-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.lock",value:e.loading,expression:"loading",modifiers:{lock:!0}}],ref:"gridUnit",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:e.border,stripe:e.stripe,"max-height":e.tableHeight,fit:e.fit,size:e.size,"show-header":e.showHeader,"highlight-current-row":e.highlightCurrentRow,"current-row-key":e.currentRowKey,"row-class-name":e.rowClassName,"row-style":e.rowStyle,"row-ket":e.rowKey,"empty-text":e.emptyText,"default-expand-all":e.defaultExpandAll,"expand-row-keys":e.expandRowKeys,"default-sort":e.defaultSort,"tooltip-effect":e.tooltipEffect,"show-summary":e.showSummary,"sum-text":e.sumText,"summary-method":e.summaryMethod,"cell-class-name":e.cellClassName,"span-method":e.spanMethod,"header-row-style":e.headerRowStyle,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle,footerScopedSlots:e.footerScopedSlots},on:{select:function(t,a){return e.emitEventHandler("select",t,a)},"select-all":function(t){return e.emitEventHandler("select-all",t)},"selection-change":function(t){return e.emitEventHandler("selection-change",t)},"cell-mouse-enter":function(t,a,n,r){return e.emitEventHandler("cell-mouse-enter",t,a,n,r)},"cell-mouse-leave":function(t,a,n,r){return e.emitEventHandler("cell-mouse-leave",t,a,n,r)},"cell-click":function(t,a,n,r){return e.emitEventHandler("cell-click",t,a,n,r)},"cell-dblclick":function(t,a,n,r){return e.emitEventHandler("cell-dblclick",t,a,n,r)},"row-click":function(t,a,n){return e.emitEventHandler("row-click",t,a,n)},"row-dblclick":function(t,a){return e.emitEventHandler("row-dblclick",t,a)},"row-contextmenu":function(t,a){return e.emitEventHandler("row-contextmenu",t,a)},"header-click":function(t,a){return e.emitEventHandler("header-click",t,a)},"sort-change":function(t){return e.emitEventHandler("sort-change",t)},"filter-change":function(t){return e.emitEventHandler("filter-change",t)},"current-change":function(t,a){return e.emitEventHandler("current-change",t,a)},"header-dragend":function(t,a,n,r){return e.emitEventHandler("header-dragend",t,a,n,r)},"expand-change":function(t,a){return e.emitEventHandler("expand-change",t,a)}}},[e.showRowIndex?a("el-table-column",{attrs:{type:"index",width:"40",align:"center"}}):e._e(),e.showExpand?a("el-table-column",{attrs:{type:"expand",width:"40"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._t("expandTable",null,{row:t.row}),e._t("expandForm",null,{row:t.row})]}}],null,!0)}):e._e(),e._l(e.columns,(function(t,n){return[t.slot&&e.showSelection?e._t(t.slot):e._e(),t.slot?e._e():a("el-table-column",{key:n,attrs:{"column-key":t.columnKey,prop:t.prop,label:t.label,width:t.minWidth?"-":t.width||"auto","min-width":t.minWidth||t.width||100,fixed:t.fixed,"render-header":t.renderHeader,sortable:t.sortable,"sort-method":t.method,resizable:t.resizable,formatter:t.formatter,"show-overflow-tooltip":t.showOverflowTooltip||!0,align:t.align||"left","header-align":t.headerAlign||t.align,"class-name":t.className,"label-class-name":t.labelClassName,selectable:t.selectable,"reserve-selection":t.reserveSelection,filters:t.filters,"filter-placement":t.filterPlacement,"filter-multiple":t.filterMultiple,"filter-method":t.filterMethod,"filtered-value":t.filteredValue},scopedSlots:e._u([{key:"default",fn:function(n){return[t.filter?a("span",["parseTime"===t.filter&&n.row[t.prop]&&""!=n.row[t.prop]?a("i",{staticClass:"el-icon-time"}):e._e(),e._v("\n              "+e._s(e.Vue.filter(t["filter"])(n.row[t.prop]))+"\n            ")]):"img"===t.type?a("div",{staticStyle:{display:"flex"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.row[t.prop],expression:"scope.row[column.prop]"}],staticClass:"image preview-img image-center",attrs:{width:"40",height:"40"},on:{click:function(a){return e.previewImage(n.row[t.prop])}}})]):"link"===t.type?a("a",{staticStyle:{color:"#409eff"},attrs:{href:n.row[t.prop],target:"_blank"}},[e._v("\n              "+e._s(n.row[t.prop])+"\n            ")]):"status"===t.type&&t.unitFilters?a("el-tag",{attrs:{type:t.unitFilters.renderStatusType(n.row[t.prop])}},[e._v("\n              "+e._s(t.unitFilters.renderStatusValue(n.row[t.prop]))+"\n            ")]):t.slotName?a("span",[e._t(t.slotName,null,{row:n.row,$index:n.$index})],2):t.isHandle?a("span",[a("el-button",{attrs:{icon:t.icon,type:"primary",size:"small"}},[e._v(e._s(t.text))])],1):a("span",[e._v("\n              "+e._s(t.render?t.render(n.row):n.row[t.prop])+"\n            ")])]}}],null,!0)})]}))],2)],1),e.showPagination?a("div",{ref:"gridPagination",staticClass:"model-pagenation"},[a("el-pagination",{attrs:{background:e.pagenationBg,"current-page":e.pagination.pageNo,"page-sizes":e.pageSizes,"page-size":e.pagination.pageSize,layout:e.paginationLayout,total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):e._e()])},r=[],l=(a("6762"),a("5df3"),a("1c4c"),a("75fc")),i=a("7618"),o=(a("6b54"),a("28a5"),a("ac6a"),a("bd86")),s=a("2b0e"),c=(a("c5f6"),{maxHeight:[String,Number],stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},size:{type:String,default:"medium"},fit:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightCurrentRow:{type:Boolean,default:!0},currentRowKey:[String,Number],rowClassName:[String,Function],rowStyle:[String,Function],rowKey:[String,Function],emptyText:String,defaultExpandAll:Boolean,expandRowKeys:Array,defaultSort:Object,tooltipEffect:String,showSummary:Boolean,sumText:String,summaryMethod:Function,cellClassName:[String,Function],headerRowStyle:[Function],headerCellStyle:[Function],cellStyle:[Function],footerScopedSlots:[Object],reqMethod:Function,selectionKey:{type:String,default:"id"},headers:{type:Object,default:function(){return{}}},showRowIndex:{type:Boolean,default:!1},showSelection:{type:Boolean,default:!1},showExpand:{type:Boolean,default:!1},listField:{type:String,default:"rows"},totalField:{type:String,default:"total"},params:{type:Object,default:function(){return{}}},formOptions:{type:Object,default:function(){return{}}},autoLoad:{type:Boolean,default:!0},spanMethod:{type:Function},indexMethod:{type:Function},type:{type:String,default:"remote",validator:function(e){var t=["remote","local"],a=-1!==t.indexOf(e);return a||!1}},data:{type:Array},dataHandler:{type:Function},columns:{type:Array,required:!0,columnKey:String,label:{type:String,required:!0},prop:{type:String,required:!0},width:{type:[Number,String],default:"auto"},minWidth:{type:Number,default:100},fixed:[Boolean,String],renderHeader:Function,sortable:[Boolean,String],sortMethod:Function,resizable:Boolean,formatter:Function,showOverflowTooltip:{type:Boolean,default:!0},align:{type:String,default:"left"},headerAlign:String,className:{type:String,default:""},labelClassName:{type:String,default:""},selectable:Function,reserveSelection:Boolean,filters:Array,filterPlacement:String,filterMultiple:{type:Boolean,default:!0},filterMethod:Function,filteredValue:Array,filter:{type:String},render:{type:Function},slotName:{type:String}},expandColums:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},pagenationBg:{type:Boolean,default:!0},pageSize:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[10,20,50,100]}},paginationLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"},pageNoKey:{type:String,default:"page"},pageSizeKey:{type:String,default:"size"}}),u=c,d=a("ed08"),p=a("0e15"),h=a.n(p),f=0,m=0,g=15,y=20,b=15,S={name:"tablePagination",props:u,data:function(){return{Vue:s["default"],pagination:{pageNo:1,pageSize:this.pageSizes?this.pageSizes[0]:20},total:0,loading:!1,tableData:[],searchParams:{},multipleSelection:[],multipleSelectionAll:[],tableHeight:600}},computed:{},watch:{formOptions:{immediate:!0,handler:function(e){this.searchParams=Object.assign(e,this.params)},deep:!0},params:{handler:function(e){this.searchParams=Object.assign(e,this.params)},deep:!0}},mounted:function(){var e=this;this.$refs.gridUnit.$on("expand-change",(function(t,a){return e.emitEventHandler("expand-change",t,a)}));var t=this.type,a=this.autoLoad,n=this.formOptions,r=this.params,l=this.data;"remote"===t&&a?(this.searchParams=n?Object.assign(n,r):r,this.fetchHandler()):"local"===t&&Array.isArray(l)&&(this.tableData=l,this.total=l.length),this.$nextTick((function(){g=document.querySelectorAll(".el-tabs")[0]?15:0,e.changeTableSize(),window.addEventListener("resize",e.changeTableSize)}))},beforeDestroy:function(){window.removeEventListener("resize",this.changeTableSize)},methods:{previewImage:function(e){if(!e)return!1;var t={src:e},a=new Image;a.src=e,a.onload=function(){t.w=a.width||800,t.h=a.height||600,s["default"].$preview.open(0,[t])}},handleSizeChange:function(e){this.pagination.pageSize=e,this.fetchHandler("selection")},handleCurrentChange:function(e){this.pagination.pageNo=e,this.changePageHoldSelection(),this.fetchHandler("selection")},searchHandler:function(e){this.pagination.pageNo=1,e&&"clear"===e.type&&(this.searchParams=e.data),this.fetchHandler()},fetchHandler:function(e,t){var a,n,r=this,l=this.reqMethod,s=this.listField,c=this.pageNoKey,u=this.pageSizeKey,p=this.totalField,h=this.showPagination,f=this.pagination;if("function"!==typeof l)return this.$message.error("请传入请求方法"),!1;(this.loading=!t,a=Object(d["a"])(Object(d["d"])(this.searchParams)),h)&&(a=Object.assign(a,(n={},Object(o["a"])(n,c,"offset"===c?(f.pageNo-1)*f.pageSize:f.pageNo),Object(o["a"])(n,u,f.pageSize),n)));l(a).then((function(t){var a=t,n=a;if(!a||a instanceof Array||(s&&-1!==s.indexOf(".")?s.split(".").forEach((function(e){n=n[e]})):n=a[s]||[]),!n||!(n instanceof Array))return r.loading=!1,!1;r.dataHandler?r.tableData=r.dataHandler(n):r.tableData=n;var l=a;"[object Array]"===Object.prototype.toString.call(a)?l=a.length:"object"===Object(i["a"])(a)?p&&-1!==p.indexOf(".")?p.split(".").forEach((function(e){l=l[e]})):l=a[p]||0:l=0,r.total=l,r.loading=!1,"selection"===e?setTimeout((function(){r.setSelectRow()}),0):(r.multipleSelection=[],r.multipleSelectionAll=[])})).catch((function(e){r.$message.error(e.msg||"请求失败"),r.loading=!1}))},emitEventHandler:function(e){var t=this,a=arguments;"selection-change"===e?(this.multipleSelection=Object(l["a"])(Array.from(arguments).slice(1))[0],setTimeout((function(){t.changePageHoldSelection(),t.$emit.apply(t,[e].concat(Object(l["a"])(Array.from(a).slice(1))))}),0)):this.$emit.apply(this,[e].concat(Object(l["a"])(Array.from(arguments).slice(1))))},setSelectRow:function(){if(this.multipleSelectionAll&&!(this.multipleSelectionAll.length<=0)){var e=this.selectionKey,t=[];this.multipleSelectionAll.forEach((function(a){t.push(a[e])})),this.$refs.gridUnit.clearSelection();for(var a=0;a<this.tableData.length;a++)t.includes(this.tableData[a][e])&&this.$refs.gridUnit.toggleRowSelection(this.tableData[a],!0)}},changePageHoldSelection:function(){var e=this,t=this.selectionKey;if(this.multipleSelectionAll.length<=0)this.multipleSelectionAll=this.multipleSelection;else{var a=[];this.multipleSelectionAll.forEach((function(e){a.push(e[t])}));var n=[];this.multipleSelection.forEach((function(r){n.push(r[t]),a.includes(r[t])||e.multipleSelectionAll.push(r)}));var r=[];this.tableData.forEach((function(e){n.includes(e[t])||r.push(e[t])})),r.forEach((function(n){if(a.includes(n))for(var r=0;r<e.multipleSelectionAll.length;r++)if(e.multipleSelectionAll[r][t]===n){e.multipleSelectionAll.splice(r,1);break}}))}},changeTableSize:h()(100,(function(){f=this.$refs.gridUnit.$el.getBoundingClientRect().top,m=this.$refs.gridPagination.offsetHeight;var e=document.body.clientHeight-f-m-g-y-b;this.tableHeight=Math.max(e,250)}))}},w=S,v=(a("b022"),a("2877")),x=Object(v["a"])(w,n,r,!1,null,"2580dfa0",null);t["a"]=x.exports}}]);