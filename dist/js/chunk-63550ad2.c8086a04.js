(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63550ad2"],{"02f4":function(e,t,r){var a=r("4588"),n=r("be13");e.exports=function(e){return function(t,r){var i,o,s=String(n(t)),l=a(r),c=s.length;return l<0||l>=c?e?"":void 0:(i=s.charCodeAt(l),i<55296||i>56319||l+1===c||(o=s.charCodeAt(l+1))<56320||o>57343?e?s.charAt(l):i:e?s.slice(l,l+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,r){"use strict";var a=r("02f4")(!0);e.exports=function(e,t,r){return t+(r?a(e,t).length:1)}},"0bfb":function(e,t,r){"use strict";var a=r("cb7c");e.exports=function(){var e=a(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,r){"use strict";r("b0c5");var a=r("2aba"),n=r("32e9"),i=r("79e5"),o=r("be13"),s=r("2b4c"),l=r("520a"),c=s("species"),u=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),p=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();e.exports=function(e,t,r){var m=s(e),f=!i(function(){var t={};return t[m]=function(){return 7},7!=""[e](t)}),v=f?!i(function(){var t=!1,r=/a/;return r.exec=function(){return t=!0,null},"split"===e&&(r.constructor={},r.constructor[c]=function(){return r}),r[m](""),!t}):void 0;if(!f||!v||"replace"===e&&!u||"split"===e&&!p){var d=/./[m],g=r(o,m,""[e],function(e,t,r,a,n){return t.exec===l?f&&!n?{done:!0,value:d.call(t,r,a)}:{done:!0,value:e.call(r,t,a)}:{done:!1}}),h=g[0],b=g[1];a(String.prototype,e,h),n(RegExp.prototype,m,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}}},"28a5":function(e,t,r){"use strict";var a=r("aae3"),n=r("cb7c"),i=r("ebd6"),o=r("0390"),s=r("9def"),l=r("5f1b"),c=r("520a"),u=Math.min,p=[].push,m="split",f="length",v="lastIndex",d=!!function(){try{return new RegExp("x","y")}catch(e){}}();r("214f")("split",2,function(e,t,r,g){var h=r;return"c"=="abbc"[m](/(b)*/)[1]||4!="test"[m](/(?:)/,-1)[f]||2!="ab"[m](/(?:ab)*/)[f]||4!="."[m](/(.?)(.?)/)[f]||"."[m](/()()/)[f]>1||""[m](/.?/)[f]?h=function(e,t){var n=String(this);if(void 0===e&&0===t)return[];if(!a(e))return r.call(n,e,t);var i,o,s,l=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),m=0,d=void 0===t?4294967295:t>>>0,g=new RegExp(e.source,u+"g");while(i=c.call(g,n)){if(o=g[v],o>m&&(l.push(n.slice(m,i.index)),i[f]>1&&i.index<n[f]&&p.apply(l,i.slice(1)),s=i[0][f],m=o,l[f]>=d))break;g[v]===i.index&&g[v]++}return m===n[f]?!s&&g.test("")||l.push(""):l.push(n.slice(m)),l[f]>d?l.slice(0,d):l}:"0"[m](void 0,0)[f]&&(h=function(e,t){return void 0===e&&0===t?[]:r.call(this,e,t)}),[function(r,a){var n=e(this),i=void 0==r?void 0:r[t];return void 0!==i?i.call(r,n,a):h.call(String(n),r,a)},function(e,t){var a=g(h,e,this,t,h!==r);if(a.done)return a.value;var c=n(e),p=String(this),m=i(c,RegExp),f=c.unicode,v=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(d?"y":"g"),b=new m(d?c:"^(?:"+c.source+")",v),x=void 0===t?4294967295:t>>>0;if(0===x)return[];if(0===p.length)return null===l(b,p)?[p]:[];var y=0,w=0,_=[];while(w<p.length){b.lastIndex=d?w:0;var C,E=l(b,d?p:p.slice(w));if(null===E||(C=u(s(b.lastIndex+(d?0:w)),p.length))===y)w=o(p,w,f);else{if(_.push(p.slice(y,w)),_.length===x)return _;for(var S=1;S<=E.length-1;S++)if(_.push(E[S]),_.length===x)return _;w=y=C}}return _.push(p.slice(y)),_}]})},"4c83":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"gameadd"},[r("form",{on:{submit:function(t){return t.preventDefault(),e.handleSubmit(t)}}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-4"},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"cover"}},[e._v("Cover")]),r("base64-upload",{attrs:{imageSrc:"http://www.markweb.in/primehouseware/images/noimage.png"},on:{change:e.onChangeImage}}),e._v("\n                        "+e._s(e.errors.first("cover"))+"\n                    ")],1)]),r("div",{staticClass:"col-8"},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"title"}},[e._v("Title")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:3",expression:"'required|min:3'"},{name:"model",rawName:"v-model",value:e.game.title,expression:"game.title"}],staticClass:"form-control",attrs:{type:"text",name:"title",id:"title"},domProps:{value:e.game.title},on:{input:function(t){t.target.composing||e.$set(e.game,"title",t.target.value)}}}),e._v("\n                        "+e._s(e.errors.first("title"))+"\n                    ")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"description"}},[e._v("Description")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:3",expression:"'required|min:3'"},{name:"model",rawName:"v-model",value:e.game.description,expression:"game.description"}],staticClass:"form-control",attrs:{name:"description",type:"text",id:"description"},domProps:{value:e.game.description},on:{input:function(t){t.target.composing||e.$set(e.game,"description",t.target.value)}}}),e._v("\n                        "+e._s(e.errors.first("description"))+"\n                    ")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"platform"}},[e._v("Platform")]),r("select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:e.game.platform,expression:"game.platform"}],staticClass:"form-control",attrs:{name:"platform",id:"platform"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.game,"platform",t.target.multiple?r:r[0])}}},e._l(e.platforms,function(t){return r("option",{key:t.abb,domProps:{value:t.abb}},[e._v("\n                                "+e._s(t.name)+" - "+e._s(t.description)+"\n                            ")])})),e._v("\n                        "+e._s(e.errors.first("platform"))+"\n                    ")])])]),r("div",{staticClass:"row"},[r("div",{staticClass:"col-12"},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"genre"}},[e._v("Genre")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:3",expression:"'required|min:3'"},{name:"model",rawName:"v-model",value:e.game.genre,expression:"game.genre"}],staticClass:"form-control",attrs:{name:"genre",type:"text",id:"genre"},domProps:{value:e.game.genre},on:{input:function(t){t.target.composing||e.$set(e.game,"genre",t.target.value)}}}),e._v("\n                        "+e._s(e.errors.first("genre"))+"\n                    ")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"publisher"}},[e._v("Publisher")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:2",expression:"'required|min:2'"},{name:"model",rawName:"v-model",value:e.game.publisher,expression:"game.publisher"}],staticClass:"form-control",attrs:{name:"publisher",type:"text",id:"publisher"},domProps:{value:e.game.publisher},on:{input:function(t){t.target.composing||e.$set(e.game,"publisher",t.target.value)}}}),e._v("\n                        "+e._s(e.errors.first("publisher"))+"\n                    ")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"releaseDate"}},[e._v("Release Date")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:e.game.releaseDate,expression:"game.releaseDate"}],staticClass:"form-control",attrs:{name:"releaseDate",type:"date",id:"releaseDate"},domProps:{value:e.game.releaseDate},on:{input:function(t){t.target.composing||e.$set(e.game,"releaseDate",t.target.value)}}}),e._v("\n                        "+e._s(e.errors.first("releaseDate"))+"\n                    ")]),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Save")])])])])])},n=[],i=r("bc3a"),o=r.n(i),s=r("9203"),l={components:{Base64Upload:s["a"]},props:["token"],data:function(){return{platforms:[],game:{cover:"",title:"",description:"",platform:"",genre:"",publisher:"",releaseDate:""}}},methods:{overview:function(e){this.$router.push({name:"gameoverview",params:{id:e}})},onChangeImage:function(e){this.game.cover=e.base64},loadPlatforms:function(){var e=this;o.a.get("https://classicgamedb.herokuapp.com/platforms").then(function(t){e.platforms=t.data,console.log(t.data)}).catch(function(e){e.response&&console.log(e.response)})},handleSubmit:function(){var e=this;this.$validator.validateAll().then(function(t){t&&o.a.post("https://classicgamedb.herokuapp.com/games",{title:e.game.title,cover:e.game.cover,description:e.game.description,genre:e.game.genre,platform:e.game.platform,publisher:e.game.publisher,releaseDate:e.game.releaseDate},{headers:{Authorization:e.token}}).then(function(e){this.overview(e.data._id),console.log(e)}.bind(e)).catch(function(e){console.log(e)})}).catch(function(){console.log(":(")})}},mounted:function(){this.token||this.$router.push({name:"login"}),this.loadPlatforms()}},c=l,u=r("2877"),p=Object(u["a"])(c,a,n,!1,null,null,null);p.options.__file="GameAdd.vue";t["default"]=p.exports},"520a":function(e,t,r){"use strict";var a=r("0bfb"),n=RegExp.prototype.exec,i=String.prototype.replace,o=n,s="lastIndex",l=function(){var e=/a/,t=/b*/g;return n.call(e,"a"),n.call(t,"a"),0!==e[s]||0!==t[s]}(),c=void 0!==/()??/.exec("")[1],u=l||c;u&&(o=function(e){var t,r,o,u,p=this;return c&&(r=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),l&&(t=p[s]),o=n.call(p,e),l&&o&&(p[s]=p.global?o.index+o[0].length:t),c&&o&&o.length>1&&i.call(o[0],r,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)}),o}),e.exports=o},"5a8d":function(e,t,r){},"5f1b":function(e,t,r){"use strict";var a=r("23c6"),n=RegExp.prototype.exec;e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var i=r.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(e))throw new TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},"7f7f":function(e,t,r){var a=r("86cc").f,n=Function.prototype,i=/^\s*function ([^ (]*)/,o="name";o in n||r("9e1e")&&a(n,o,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(e){return""}}})},9203:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"base64-upload"},[r("img",{style:e.imageStyle,attrs:{src:e.src}}),r("input",{attrs:{type:"file",accept:"image/*"},on:{change:e.onChange}})])},n=[];r("7f7f"),r("28a5");function i(e){if(Array.isArray(e))return e}function o(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done);a=!0)if(r.push(o.value),t&&r.length===t)break}catch(l){n=!0,i=l}finally{try{a||null==s["return"]||s["return"]()}finally{if(n)throw i}}return r}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(e,t){return i(e)||o(e,t)||s()}var c={props:{imageSrc:String,imageStyle:Object},data:function(){return{src:this.imageSrc}},methods:{onChange:function(e){var t=this;if(e.target.files&&e.target.files[0]){var r=e.target.files[0],a=new FileReader;a.addEventListener("load",function(e){t.src=e.target.result;var a=t.src.split(","),n=l(a,2),i=n[1];t.$emit("change",{size:r.size,type:r.type,name:r.name,base64:i})}),a.readAsDataURL(r)}}}},u=c,p=(r("f4c8"),r("2877")),m=Object(p["a"])(u,a,n,!1,null,"353a4f12",null);m.options.__file="Base64Upload.vue";t["a"]=m.exports},aae3:function(e,t,r){var a=r("d3f4"),n=r("2d95"),i=r("2b4c")("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==n(e))}},b0c5:function(e,t,r){"use strict";var a=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},f4c8:function(e,t,r){"use strict";var a=r("5a8d"),n=r.n(a);n.a}}]);
//# sourceMappingURL=chunk-63550ad2.c8086a04.js.map