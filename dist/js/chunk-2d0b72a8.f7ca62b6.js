(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b72a8"],{"1feb":function(e,s,r){"use strict";r.r(s);var t=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("div",{staticClass:"register"},[r("form",{on:{submit:function(s){return s.preventDefault(),e.register(s)}}},[r("h3",{staticClass:"text-center"},[e._v("Register")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"username"}},[e._v("Username")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control",attrs:{name:"username",type:"text",id:"username"},domProps:{value:e.user.username},on:{input:function(s){s.target.composing||e.$set(e.user,"username",s.target.value)}}}),e._v("\n                "+e._s(e.errors.first("username"))+"\n            ")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"password"}},[e._v("Password")]),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"},{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{name:"password",type:"password",id:"password"},domProps:{value:e.user.password},on:{input:function(s){s.target.composing||e.$set(e.user,"password",s.target.value)}}}),e._v("\n                "+e._s(e.errors.first("password"))+"\n            ")]),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Register")])])])},a=[],o=r("bc3a"),n=r.n(o),i={data:function(){return{user:{username:"",password:""},notificationSystem:{success:{theme:"dark",icon:"fas fa-check-circle",position:"topCenter",backgroundColor:"#28a745",progressBar:!1,timeout:2e3},error:{theme:"dark",icon:"fas fa-exclamation-circle",position:"topCenter",backgroundColor:"#dc3545",progressBar:!1,timeout:2e3}}}},methods:{register:function(){var e=this,s=this;this.$validator.validateAll().then(function(r){r&&n.a.post("https://classicgamedb.herokuapp.com/users/register",{username:e.user.username,password:e.user.password}).then(function(e){this.$router.push("../")}.bind(e)).catch(function(e){422==e.response.status&&s.$toast.show(" ","This username is already taken, is someone trying to impersonate you? :o",s.notificationSystem.error),console.log(e)})}).catch(function(){console.log(":(")})}}},u=i,c=r("2877"),l=Object(c["a"])(u,t,a,!1,null,null,null);l.options.__file="Register.vue";s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b72a8.f7ca62b6.js.map