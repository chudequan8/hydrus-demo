(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e6484"],{"97a1":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container calendar-list-container"},[r("el-card",[r("div",{staticClass:"filter-container"},[r("el-button-group",[e.menuManager_btn_add?r("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.handlerAdd}},[e._v("添加")]):e._e(),e.menuManager_btn_edit?r("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handlerEdit}},[e._v("编辑")]):e._e(),e.menuManager_btn_del?r("el-button",{attrs:{type:"primary",icon:"delete"},on:{click:e.handleDelete}},[e._v("删除")]):e._e()],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{staticStyle:{"margin-top":"15px"},attrs:{span:8}},[r("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[r("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),r("el-tree",{ref:"menuTree",staticClass:"filter-tree",attrs:{data:e.treeData,"node-key":"id","highlight-current":"",props:e.defaultProps,"filter-node-method":e.filterNode,"expand-on-click-node":!1,"default-expand-all":""},on:{"node-click":e.getNodeData}})],1)],1),r("el-col",{staticStyle:{"margin-top":"15px"},attrs:{span:16}},[r("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"20px"},attrs:{shadow:"hover"}},[r("el-form",{ref:"form",attrs:{"label-position":e.labelPosition,"label-width":"80px",model:e.form}},[r("el-form-item",{attrs:{label:"路径编码",prop:"code"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入路径编码"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"父级节点",prop:"parentId"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入父级节点",readonly:""},model:{value:e.form.parentId,callback:function(t){e.$set(e.form,"parentId",t)},expression:"form.parentId"}})],1),r("el-form-item",{attrs:{label:"图标",prop:"icon"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入图标"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}})],1),r("el-form-item",{attrs:{label:"资源路径",prop:"href"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入资源路径"},model:{value:e.form.href,callback:function(t){e.$set(e.form,"href",t)},expression:"form.href"}})],1),r("el-form-item",{attrs:{label:"类型",prop:"type"}},[r("el-select",{staticClass:"filter-item",attrs:{disabled:e.formEdit,placeholder:"请输入资源请求类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.typeOptions,(function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),r("el-form-item",{attrs:{label:"排序",prop:"orderNum"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入排序"},model:{value:e.form.orderNum,callback:function(t){e.$set(e.form,"orderNum",t)},expression:"form.orderNum"}})],1),r("el-form-item",{attrs:{label:"描述",prop:"description"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入描述"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),r("el-form-item",{attrs:{label:"前端组件",prop:"attr1"}},[r("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入描述"},model:{value:e.form.attr1,callback:function(t){e.$set(e.form,"attr1",t)},expression:"form.attr1"}})],1),"update"==e.formStatus?r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("更新")]),r("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1):e._e(),"create"==e.formStatus?r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.create}},[e._v("保存")]),r("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1):e._e()],1)],1),r("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[r("span",[e._v("按钮或资源")]),r("menu-element",{ref:"menuElement",attrs:{menuId:e.currentId}})],1)],1)],1)],1)],1)},o=[],i=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),a=r("2f62");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(r,!0).forEach((function(t){Object(i["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={name:"hydrus-menu",components:{"menu-element":function(){return r.e("chunk-f711e88e").then(r.bind(null,"346a"))}},data:function(){return{filterText:"",list:null,total:null,formEdit:!0,formAdd:!0,formStatus:"",showElement:!1,typeOptions:["menu","dirt"],listQuery:{name:void 0},treeData:[],defaultProps:{children:"children",label:"title"},labelPosition:"right",form:{code:void 0,title:void 0,parentId:void 0,href:void 0,icon:void 0,orderNum:void 0,description:void 0,path:void 0,enabled:void 0,type:void 0,attr1:void 0},currentId:-1,menuManager_btn_add:!1,menuManager_btn_edit:!1,menuManager_btn_del:!1}},watch:{filterText:function(e){this.$refs.menuTree.filter(e)}},created:function(){this.getList(),this.menuManager_btn_add=this.elements["menuManager:btn_add"],this.menuManager_btn_del=this.elements["menuManager:btn_del"],this.menuManager_btn_edit=this.elements["menuManager:btn_edit"]},computed:s({},Object(a["b"])(["elements"])),methods:{getList:function(){var e=this;this.$api.menu.getTree(this.listQuery).then((function(t){e.treeData=t}))},filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},getNodeData:function(e){var t=this;this.formEdit||(this.formStatus="update"),this.$api.menu.getObj(e.id).then((function(e){t.form=e})),this.currentId=e.id,this.showElement=!0,this.$refs.menuElement.menuId=e.id,this.$refs.menuElement.getList()},handlerEdit:function(){this.form.id&&(this.formEdit=!1,this.formStatus="update")},handlerAdd:function(){this.resetForm(),this.formEdit=!1,this.formStatus="create"},handleDelete:function(){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$api.menu.delObj(e.currentId).then((function(){e.getList(),e.resetForm(),e.onCancel(),e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})}))}))},update:function(){var e=this;this.$api.menu.putObj(this.form.id,this.form).then((function(){e.getList(),e.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})}))},create:function(){var e=this;this.$api.menu.addObj(this.form).then((function(){e.getList(),e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})}))},onCancel:function(){this.formEdit=!0,this.formStatus=""},resetForm:function(){this.form={code:void 0,title:void 0,parentId:this.currentId,href:void 0,icon:void 0,orderNum:void 0,description:void 0,path:void 0,enabled:void 0}}}},c=d,m=r("2877"),u=Object(m["a"])(c,n,o,!1,null,null,null);t["default"]=u.exports}}]);