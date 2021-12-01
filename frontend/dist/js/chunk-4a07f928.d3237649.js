(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a07f928"],{"169a":function(t,e,i){"use strict";var n=i("5530"),a=i("2909"),r=i("ade3"),o=(i("a9e3"),i("498a"),i("caad"),i("2532"),i("7db0"),i("368e"),i("480e")),s=i("4ad4"),c=i("b848"),l=i("75eb"),u=i("e707"),d=i("e4d3"),h=i("21be"),v=i("f2e7"),f=i("a293"),p=i("58df"),_=i("d9bd"),m=i("80d2"),b=Object(p["a"])(s["a"],c["a"],l["a"],u["a"],d["a"],h["a"],v["a"]);e["a"]=b.extend({name:"v-dialog",directives:{ClickOutside:f["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var t;return t={},Object(r["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(r["a"])(t,"v-dialog--active",this.isActive),Object(r["a"])(t,"v-dialog--persistent",this.persistent),Object(r["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(r["a"])(t,"v-dialog--scrollable",this.scrollable),Object(r["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(_["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):u["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$nextTick((function(){t.previousActiveElement=document.activeElement,t.$refs.content.focus(),t.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===m["t"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var i=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),n=Object(a["a"])(i).find((function(t){return!t.hasAttribute("disabled")}));n&&n.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(o["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(n["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(n["a"])(Object(n["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(m["f"])(this.maxWidth),width:"auto"===this.width?void 0:Object(m["f"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"23a7":function(t,e,i){"use strict";var n=i("2909"),a=i("5530"),r=i("53ca"),o=(i("a9e3"),i("caad"),i("d81d"),i("b0c0"),i("99af"),i("a434"),i("159b"),i("fb6a"),i("5803"),i("2677")),s=i("cc20"),c=i("80d2"),l=i("d9bd"),u=i("d9f7");e["a"]=o["a"].extend({name:"v-file-input",model:{prop:"value",event:"change"},props:{chips:Boolean,clearable:{type:Boolean,default:!0},counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,placeholder:String,prependIcon:{type:String,default:"$file"},readonly:{type:Boolean,default:!1},showSize:{type:[Boolean,Number],default:!1,validator:function(t){return"boolean"===typeof t||[1e3,1024].includes(t)}},smallChips:Boolean,truncateLength:{type:[Number,String],default:22},type:{type:String,default:"file"},value:{default:void 0,validator:function(t){return Object(c["B"])(t).every((function(t){return null!=t&&"object"===Object(r["a"])(t)}))}}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},o["a"].options.computed.classes.call(this)),{},{"v-file-input":!0})},computedCounterValue:function(){var t=this.isMultiple&&this.lazyValue?this.lazyValue.length:this.lazyValue instanceof File?1:0;if(!this.showSize)return this.$vuetify.lang.t(this.counterString,t);var e=this.internalArrayValue.reduce((function(t,e){var i=e.size,n=void 0===i?0:i;return t+n}),0);return this.$vuetify.lang.t(this.counterSizeString,t,Object(c["r"])(e,1024===this.base))},internalArrayValue:function(){return Object(c["B"])(this.internalValue)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit("change",this.lazyValue)}},isDirty:function(){return this.internalArrayValue.length>0},isLabelActive:function(){return this.isDirty},isMultiple:function(){return this.$attrs.hasOwnProperty("multiple")},text:function(){var t=this;return this.isDirty||!this.isFocused&&this.hasLabel?this.internalArrayValue.map((function(e){var i=e.name,n=void 0===i?"":i,a=e.size,r=void 0===a?0:a,o=t.truncateText(n);return t.showSize?"".concat(o," (").concat(Object(c["r"])(r,1024===t.base),")"):o})):[this.placeholder]},base:function(){return"boolean"!==typeof this.showSize?this.showSize:void 0},hasChips:function(){return this.chips||this.smallChips}},watch:{readonly:{handler:function(t){!0===t&&Object(l["b"])("readonly is not supported on <v-file-input>",this)},immediate:!0},value:function(t){var e=this.isMultiple?t:t?[t]:[];Object(c["i"])(e,this.$refs.input.files)||(this.$refs.input.value="")}},methods:{clearableCallback:function(){this.internalValue=this.isMultiple?[]:null,this.$refs.input.value=""},genChips:function(){var t=this;return this.isDirty?this.text.map((function(e,i){return t.$createElement(s["a"],{props:{small:t.smallChips},on:{"click:close":function(){var e=t.internalValue;e.splice(i,1),t.internalValue=e}}},[e])})):[]},genControl:function(){var t=o["a"].options.methods.genControl.call(this);return this.hideInput&&(t.data.style=Object(u["c"])(t.data.style,{display:"none"})),t},genInput:function(){var t=o["a"].options.methods.genInput.call(this);return delete t.data.domProps.value,delete t.data.on.input,t.data.on.change=this.onInput,[this.genSelections(),t]},genPrependSlot:function(){var t=this;if(!this.prependIcon)return null;var e=this.genIcon("prepend",(function(){t.$refs.input.click()}));return this.genSlot("prepend","outer",[e])},genSelectionText:function(){var t=this.text.length;return t<2?this.text:this.showSize&&!this.counter?[this.computedCounterValue]:[this.$vuetify.lang.t(this.counterString,t)]},genSelections:function(){var t=this,e=[];return this.isDirty&&this.$scopedSlots.selection?this.internalArrayValue.forEach((function(i,n){t.$scopedSlots.selection&&e.push(t.$scopedSlots.selection({text:t.text[n],file:i,index:n}))})):e.push(this.hasChips&&this.isDirty?this.genChips():this.genSelectionText()),this.$createElement("div",{staticClass:"v-file-input__text",class:{"v-file-input__text--placeholder":this.placeholder&&!this.isDirty,"v-file-input__text--chips":this.hasChips&&!this.$scopedSlots.selection}},e)},genTextFieldSlot:function(){var t=this,e=o["a"].options.methods.genTextFieldSlot.call(this);return e.data.on=Object(a["a"])(Object(a["a"])({},e.data.on||{}),{},{click:function(){return t.$refs.input.click()}}),e},onInput:function(t){var e=Object(n["a"])(t.target.files||[]);this.internalValue=this.isMultiple?e:e[0],this.initialValue=this.internalValue},onKeyDown:function(t){this.$emit("keydown",t)},truncateText:function(t){if(t.length<Number(this.truncateLength))return t;var e=Math.floor((Number(this.truncateLength)-1)/2);return"".concat(t.slice(0,e),"…").concat(t.slice(t.length-e))}}})},2677:function(t,e,i){"use strict";var n=i("8654");e["a"]=n["a"]},"368e":function(t,e,i){},5803:function(t,e,i){},f9ea:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{"fill-height":"",fluid:""}},[i("v-overlay",{attrs:{value:!t.authorize,opacity:"0.9",absolute:""}},[i("v-card",[i("v-card-title",[t._v("Login")]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("v-text-field",{attrs:{label:"User",rules:[t.rules.required]},model:{value:t.authuser,callback:function(e){t.authuser=e},expression:"authuser"}})],1)],1),i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("v-text-field",{attrs:{label:"Password",rules:[t.rules.required]},model:{value:t.authpwd,callback:function(e){t.authpwd=e},expression:"authpwd"}})],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){return t.checkAuthorization()}}},[t._v(" OK ")])],1)],1)],1),i("v-row",{staticClass:"text-center"},[i("v-col",{staticClass:"mb-4",attrs:{cols:"12"}},[i("h1",{staticClass:"display-2 font-weight-bold mb-3"},[t._v(" vUCLARO Settings ")])])],1),i("v-row",[i("v-col",[i("v-card",[i("v-card-title",[t._v("Brachytherapy")]),i("v-card-subtitle",[t._v("BravosSM Radioactive Source Inventory")]),i("v-card-text",[i("v-simple-table",{attrs:{dense:""}},[i("thead",[i("tr",[i("th",{staticClass:"text-left"},[i("b",[t._v("Source ID")])]),i("th",{staticClass:"text-left"},[i("b",[t._v("Source Serial")])]),i("th",{staticClass:"text-left"},[i("b",[t._v("Calibration Date")])]),i("th",{staticClass:"text-left"},[i("b",[t._v("Calibration Activity (Ci)")])]),i("th",{staticClass:"text-left"},[i("b",[t._v("Active?")])]),i("th",{staticClass:"text-left"},[i("b",[t._v("Delete")])])])]),i("tbody",t._l(t.sources,(function(e){return i("tr",{key:e._id},[i("td",[t._v(t._s(e._id))]),i("td",[t._v(t._s(e.serial))]),i("td",[t._v(t._s(t._f("format_datestring")(e.calibration)))]),i("td",[t._v(t._s(e.curie))]),i("td",[i("v-icon",{attrs:{color:t.get_icon_color(e.active)},on:{click:function(i){return t.set_source_as_active(e._id)}}},[t._v(" "+t._s(t.get_active_icon(e.active))+" ")])],1),i("td",[i("v-icon",{attrs:{color:"red darken-4"},on:{click:function(i){t.delete_confirmation=!0,t.delete_id=e._id}}},[t._v(" mdi-delete-forever ")])],1)])})),0)])],1),i("v-card-actions",[i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){e.stopPropagation(),t.brachy_dialog=!0}}},[t._v(" Add New Source ")]),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){return e.stopPropagation(),t.refresh_sources()}}},[t._v(" Refresh List ")])],1),i("v-overlay",{attrs:{value:t.error_overlay,absolute:""}},[i("v-btn",{attrs:{color:"error"},on:{click:function(e){t.error_overlay=!1}}},[t._v(t._s(this.error)+" ")])],1)],1)],1)],1),i("v-row",{attrs:{justify:"center"}},[i("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.brachy_dialog,callback:function(e){t.brachy_dialog=e},expression:"brachy_dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"text-h5"},[t._v("Brachytherapy Source Entry")])]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"4"}},[i("v-select",{attrs:{label:"Isotope",items:["Ir-192"]},model:{value:t.isotope,callback:function(e){t.isotope=e},expression:"isotope"}})],1),i("v-col",{attrs:{cols:"4"}},[i("v-text-field",{attrs:{label:"Half-Life",disabled:"",suffix:"days"},model:{value:t.half_life,callback:function(e){t.half_life=e},expression:"half_life"}})],1),i("v-col",{attrs:{cols:"12"}},[i("v-text-field",{attrs:{label:"Source Serial Number *",rules:[t.rules.required,t.rules.check],hint:"Example format: 27-01-0001-001-010121-15000-21"},on:{change:function(e){t.attempted=!1}},model:{value:t.serial,callback:function(e){t.serial=e},expression:"serial"}})],1),i("v-col",{attrs:{cols:"6"}},[i("v-menu",{ref:"calmenu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[i("v-text-field",t._g(t._b({attrs:{label:"Source Calibration Date","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.calibration,callback:function(e){t.calibration=e},expression:"calibration"}},"v-text-field",a,!1),n))]}}]),model:{value:t.calmenu,callback:function(e){t.calmenu=e},expression:"calmenu"}},[i("v-date-picker",{attrs:{"no-title":"",scrollable:""},on:{input:function(e){t.calmenu=!1}},model:{value:t.calibration,callback:function(e){t.calibration=e},expression:"calibration"}})],1)],1),i("v-col",{attrs:{cols:"6"}},[i("v-menu",{ref:"tenmenu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[i("v-text-field",t._g(t._b({attrs:{label:"Source 10-Ci Date","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.tencurie,callback:function(e){t.tencurie=e},expression:"tencurie"}},"v-text-field",a,!1),n))]}}]),model:{value:t.tenmenu,callback:function(e){t.tenmenu=e},expression:"tenmenu"}},[i("v-date-picker",{attrs:{"no-title":"",scrollable:""},on:{input:function(e){t.tenmenu=!1}},model:{value:t.tencurie,callback:function(e){t.tencurie=e},expression:"tencurie"}})],1)],1),i("v-col",{attrs:{cols:"6"}},[i("v-text-field",{attrs:{label:"Activity",required:"",suffix:"Ci"},model:{value:t.curie,callback:function(e){t.curie=e},expression:"curie"}})],1),i("v-col",{attrs:{cols:"6"}},[i("v-text-field",{attrs:{label:"Activity",suffix:"GBq"},model:{value:t.gbq,callback:function(e){t.gbq=e},expression:"gbq"}})],1),i("v-col",{attrs:{cols:"4"}},[i("v-text-field",{attrs:{label:"Air Kerma Strength"},model:{value:t.aks_m,callback:function(e){t.aks_m=e},expression:"aks_m"}})],1),i("v-col",{attrs:{cols:"2"}},[i("span",[t._v("mGy.m"),i("sup",[t._v("2")]),t._v("/h")])]),i("v-col",{attrs:{cols:"4"}},[i("v-text-field",{attrs:{label:"Air Kerma Strength"},model:{value:t.aks_cm,callback:function(e){t.aks_cm=e},expression:"aks_cm"}})],1),i("v-col",{attrs:{cols:"2"}},[i("span",[t._v("cGy.cm"),i("sup",[t._v("2")]),t._v("/h")])])],1),i("v-row",[i("v-col",{attrs:{cols:"12"}},[t.checksum?t._e():i("span",{staticStyle:{color:"red"}},[t._v("Checksum failed. Please try again.")])])],1)],1),i("small",[t._v("* Required Fields")])],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.parse_serial(),t.attempted=!0}}},[t._v(" Parse Serial ")]),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.brachy_dialog=!1}}},[t._v(" Cancel ")]),i("v-btn",{attrs:{color:"#2774AE",text:"",disabled:!t.parsed},on:{click:function(e){t.brachy_dialog=!1,t.set_new_source(),t.post_new_source()}}},[t._v(" Save ")])],1)],1)],1)],1),i("v-row",{attrs:{justify:"center"}},[i("v-dialog",{attrs:{persistent:"","max-width":"400px"},model:{value:t.delete_confirmation,callback:function(e){t.delete_confirmation=e},expression:"delete_confirmation"}},[i("v-card",[i("v-card-title",{staticClass:"text-h5"},[t._v(" Permanently Delete Source? ")]),i("v-card-text",[t._v("Proceeding will remove this source from the database permanently. You may want to consider setting the source as inactive instead.")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.delete_confirmation=!1}}},[t._v(" Cancel ")]),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.delete_forever=!0,t.delete_source(t.delete_id),t.delete_confirmation=!1}}},[t._v(" Delete Forever ")])],1)],1)],1)],1),i("v-row",[i("v-col",[i("v-card",[i("v-card-title",[t._v("Plan Quality Database")]),i("v-card-subtitle",[t._v("DVH Constraint Templates")]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"6"}},[i("v-combobox",{attrs:{label:"Constraint Folder",hint:"Select a treatment area",items:t.cc_folders},on:{change:function(e){return t.retrieve_templates()}},model:{value:t.sel_folder,callback:function(e){t.sel_folder=e},expression:"sel_folder"}})],1),i("v-col",{attrs:{cols:"6"}},[i("v-combobox",{attrs:{label:"Constraint Template",hint:"Select a template to view constraints",items:t.cc_templates,"item-text":"template","return-object":""},model:{value:t.sel_template,callback:function(e){t.sel_template=e},expression:"sel_template"}})],1),i("v-col",{attrs:{cols:"12"}},[t.sel_template?i("v-simple-table",{attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[i("tbody",[i("tr",[i("th",[t._v("Structure")]),i("th",[t._v("Constraint")]),i("th",[t._v("Goal")])]),t._l(t.sel_template.constraints,(function(e){return i("tr",{key:e.Priority},[i("td",[t._v(t._s(e.StructureTemplate))]),i("td",[t._v(t._s(e.ConstraintToPresent))]),i("td",[t._v(t._s(e.GoalLimitToPresent))])])}))],2)]},proxy:!0}],null,!1,1426631078)}):t._e()],1)],1)],1)],1),i("v-card-actions",[i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){e.stopPropagation(),t.cc_dialog=!0}}},[t._v(" Add New Template ")]),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){return e.stopPropagation(),t.refresh_templates()}}},[t._v(" Refresh List ")]),t.sel_template?i("v-btn",{attrs:{color:"red",text:""},on:{click:function(e){e.stopPropagation(),t.delete_template_confirmation=!0}}},[t._v(" Delete Selected Template ")]):t._e(),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){return e.stopPropagation(),t.clear_templates()}}},[t._v(" Clear ")])],1)],1)],1)],1),i("v-row",{attrs:{justify:"center"}},[i("v-dialog",{attrs:{persistent:"","max-width":"400px"},model:{value:t.delete_template_confirmation,callback:function(e){t.delete_template_confirmation=e},expression:"delete_template_confirmation"}},[i("v-card",[i("v-card-title",{staticClass:"text-h5"},[t._v(" Permanently Delete Template? ")]),i("v-card-text",[t._v("Proceeding will remove this template from the database permanently.")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.delete_template_confirmation=!1}}},[t._v(" Cancel ")]),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.delete_template_forever=!0,t.delete_template(),t.delete_template_confirmation=!1}}},[t._v(" Delete Forever ")])],1)],1)],1)],1),i("v-row",{attrs:{justify:"center"}},[i("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.cc_dialog,callback:function(e){t.cc_dialog=e},expression:"cc_dialog"}},[i("v-card",[i("v-card-title",[t._v("Import New Constraint Template")]),i("v-card-text",[i("v-file-input",{attrs:{accept:".json",label:"Select a JSON file",outlined:""},model:{value:t.cc_chosenFile,callback:function(e){t.cc_chosenFile=e},expression:"cc_chosenFile"}}),i("h3",{directives:[{name:"show",rawName:"v-show",value:t.cc_imported,expression:"cc_imported"}]},[t._v(t._s(t.cc_chosenFolder)+" : "+t._s(t.cc_chosenTemplate))]),i("v-simple-table",{directives:[{name:"show",rawName:"v-show",value:t.cc_imported,expression:"cc_imported"}],scopedSlots:t._u([{key:"default",fn:function(){return[i("tbody",[i("tr",[i("th",{staticClass:"text-center"},[t._v("Structure")]),i("th",{staticClass:"text-center"},[t._v("Constraint")]),i("th",{staticClass:"text-center"},[t._v("Goal")])]),t._l(t.cc_chosenConstraints,(function(e){return i("tr",{key:e.Priority,staticClass:"text-center"},[i("td",[t._v(t._s(e.StructureTemplate))]),i("td",[t._v(t._s(e.ConstraintToPresent))]),i("td",[t._v(t._s(e.GoalLimitToPresent))])])}))],2)]},proxy:!0}])}),i("br"),i("p",{directives:[{name:"show",rawName:"v-show",value:t.cc_exists,expression:"cc_exists"}],staticStyle:{color:"red"}},[t._v("Template already exists in database.")])],1),i("v-card-actions",[i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){return t.import_cc_template()}}},[t._v(" Import JSON file ")]),i("v-btn",{attrs:{color:"#2774AE",text:""},on:{click:function(e){t.cc_dialog=!1}}},[t._v(" Cancel ")]),i("v-btn",{attrs:{color:"#2774AE",text:"",disabled:t.cc_exists},on:{click:function(e){t.cc_dialog=!1,t.cc_imported=!1,t.post_new_cc_template()}}},[t._v(" Save ")])],1)],1)],1)],1)],1)},a=[],r=(i("b680"),i("a15b"),i("ac1f"),i("1276"),i("fb6a"),i("d3b7"),i("25f0"),i("4d90"),{name:"Settings",props:{},data:function(){var t=this;return{error:"error",messages:[],sources:[],brachy_dialog:!1,new_source:{isotope:"",half_life:"",serial:"",calibration:"",ten_ci_date:"",curie:"",gbq:"",air_kerma_m:"",air_kerma_cm:"",_id:"",active:!1},isotope:"Ir-192",half_life:73.83,serial:"",calibration:(new Date).toISOString().substr(0,10),calmenu:!1,tencurie:(new Date).toISOString().substr(0,10),tenci_hours:"",tenmenu:!1,curie:0,rules:{required:function(t){return!!t||"Required"},check:function(e){return t.checksum(e)||"Checksum failed! (ex: 27-01-0001-001-010121-15000-22)"}},set_active:!1,error_overlay:!1,delete_confirmation:!1,delete_forever:!1,delete_id:"",authorize:!1,authuser:"",authpwd:"",templates:[],cc_folders:[],cc_templates:[],cc_dialog:!1,cc_imported:!1,sel_folder:null,sel_template:null,cc_constraints:[],cc_contents:null,cc_chosenFile:null,cc_chosenFolder:null,cc_chosenTemplate:null,cc_chosenConstraints:null,cc_exists:!1,delete_template_confirmation:!1,delete_template_forever:!1}},mounted:function(){this.refresh_sources(),this.retrieve_folders()},computed:{gbq:function(){return(37*this.curie).toFixed(2)},aks_m:function(){return(4.07*this.curie).toFixed(2)},aks_cm:function(){return(4070*this.curie).toFixed(2)},parsed:function(){return!!this.checksum(this.serial)&&this.curie>0}},methods:{checkAuthorization:function(){"admin"==this.authuser&&"admin"==this.authpwd&&(this.authorize=!0)},checksum:function(t){for(var e=t.split("-").join(""),i=0,n=0;n<11;n++)i+=parseInt(e.slice(2*n,2*n+2));var a=i%100,r=parseInt(e.slice(22,24));return a==r},set_new_source:function(){this.new_source.isotope=this.isotope,this.new_source.half_life=this.half_life,this.new_source.serial=this.serial;var t=new Date(this.calibration);t.setHours(t.getHours()+17),this.new_source.calibration=t,this.new_source._id=t.getFullYear().toString(),this.new_source._id+=(1+t.getMonth()).toString().padStart(2,"0"),this.new_source._id+=t.getDate().toString().padStart(2,"0"),t=new Date(this.tencurie),t.setHours(t.getHours()+7+this.tenci_hours),this.new_source.ten_ci_date=t,this.new_source.curie=this.curie,this.new_source.gbq=this.gbq,this.new_source.air_kerma_m=this.aks_m,this.new_source.air_kerma_cm=this.aks_cm,this.new_source.active=this.set_active},post_new_source:function(){var t=this;console.log(this.new_source),fetch("/api/bravos_sources/new",{method:"POST",body:JSON.stringify(this.new_source),headers:{"content-type":"application/json"}}).then((function(t){return t.json()})).then((function(e){e.error?(t.error=e.error,t.error_overlay=!0):t.error="",t.refresh_sources()}))},delete_source:function(t){var e=this;if(this.delete_forever){console.log(t);var i={_id:t};fetch("/api/bravos_sources/delete",{method:"DELETE",body:JSON.stringify(i),headers:{"content-type":"application/json"}}).then((function(t){return t.json()})).then((function(t){t.error?(e.error=t.error,e.error_overlay=!0):e.error=""})),this.delete_forever=!1,this.refresh_sources()}},set_source_as_active:function(t){var e=this;console.log("Setting Active: "+t);var i={_id:t};fetch("/api/bravos_sources/activate",{method:"PUT",body:JSON.stringify(i),headers:{"content-type":"application/json"}}).then((function(t){return t.json()})).then((function(t){t.error?(e.error=t.error,e.error_overlay=!0):e.error="",e.refresh_sources()}))},parse_serial:function(){var t=this.serial.split("-");this.curie=parseFloat(t[5])/1e3;var e=t[4],i=parseInt(e.slice(0,2))-1,n=parseInt(e.slice(2,4)),a=parseInt(e.slice(4,6))+2e3,r=new Date(a,i,n);r.setHours(r.getHours()+10),this.calibration=r.toISOString().substr(0,10);var o=-1*Math.log(10/this.curie)*this.half_life/Math.LN2,s=parseInt(o),c=parseInt(24*(o-s));r.setDate(r.getDate()+s),r.setHours(r.getHours()+c),this.tencurie=r.toISOString().substr(0,10),this.tenci_hours=r.getHours()},refresh_sources:function(){var t=this;fetch("/api/bravos_sources").then((function(t){return t.json()})).then((function(e){console.log(e),t.messages=e,t.sources=e.sources}))},get_active_icon:function(t){return t?"mdi-radioactive":"mdi-radioactive-off"},get_icon_color:function(t){return t?"amber":"grey"},import_cc_template:function(){var t=this;if(this.cc_chosenFile){var e=new FileReader;e.readAsText(this.cc_chosenFile),e.onload=function(){var i=JSON.parse(e.result),n=i.TemplateName.split("(");t.cc_chosenFolder=n[1].slice(0,-1),t.cc_chosenTemplate=n[0].slice(0,-1),t.check_db_for_template(),i.CalculatedConstraints?t.cc_chosenConstraints=i.CalculatedConstraints:t.cc_chosenConstraints=i.PlanData[0].CalculatedConstraints,t.cc_imported=!0}}},check_db_for_template:function(){var t=this,e="/api/pqr_templates/match/";e+=this.cc_chosenFolder,e+="/",e+=this.cc_chosenTemplate,console.log(e),fetch(e).then((function(t){return t.json()})).then((function(e){return e.template.length>0?(console.log("Template found."),console.log(e.template),t.cc_exists=!0,!0):(console.log("Template NOT found."),t.cc_exists=!1,!1)}))},post_new_cc_template:function(){var t=this;if(this.cc_exists)console.log("Folder/template already in database.");else{var e={folder:this.cc_chosenFolder,template:this.cc_chosenTemplate,constraints:this.cc_chosenConstraints};fetch("/api/pqr_templates/new",{method:"POST",body:JSON.stringify(e),headers:{"content-type":"application/json"}}).then((function(t){return t.json()})).then((function(e){e.error?(t.error=e.error,t.error_overlay=!0):t.error=""}))}this.refresh_templates()},retrieve_folders:function(){var t=this;fetch("/api/pqr_templates/folders").then((function(t){return t.json()})).then((function(e){console.log(e),t.messages=e,t.cc_folders=e.folders}))},retrieve_templates:function(){var t=this,e="/api/pqr_templates/templates/";e+=this.sel_folder,fetch(e).then((function(t){return t.json()})).then((function(e){console.log(e),t.messages=e,t.cc_templates=e.templates}))},refresh_templates:function(){this.retrieve_folders(),this.retrieve_templates()},delete_template:function(){var t=this;if(this.delete_template_forever){var e="/api/pqr_templates/delete/";e+=this.sel_template._id,console.log(e),fetch(e,{method:"DELETE"}).then((function(t){return t.json()})).then((function(e){e.error?(t.error=e.error,t.error_overlay=!0):t.error=""})),this.delete_template_forever=!1,this.refresh_templates()}},clear_templates:function(){this.sel_template=null,this.sel_folder=null}},filters:{format_datestring:function(t){var e=new Date(t);return e.toLocaleString("en-US",{day:"numeric",year:"numeric",month:"short",hour:"numeric",minute:"numeric"})}}}),o=r,s=i("2877"),c=i("6544"),l=i.n(c),u=i("8336"),d=i("b0af"),h=i("99d9"),v=i("62ad"),f=i("2b5d"),p=i("a523"),_=i("2e4b"),m=i("169a"),b=i("23a7"),g=i("132d"),y=i("e449"),x=i("a797"),w=i("0fd9"),k=i("b974"),S=i("1f4f"),C=i("2fa4"),A=i("8654"),O=Object(s["a"])(o,n,a,!1,null,null,null);e["default"]=O.exports;l()(O,{VBtn:u["a"],VCard:d["a"],VCardActions:h["a"],VCardSubtitle:h["b"],VCardText:h["c"],VCardTitle:h["d"],VCol:v["a"],VCombobox:f["a"],VContainer:p["a"],VDatePicker:_["a"],VDialog:m["a"],VFileInput:b["a"],VIcon:g["a"],VMenu:y["a"],VOverlay:x["a"],VRow:w["a"],VSelect:k["a"],VSimpleTable:S["a"],VSpacer:C["a"],VTextField:A["a"]})}}]);
//# sourceMappingURL=chunk-4a07f928.d3237649.js.map