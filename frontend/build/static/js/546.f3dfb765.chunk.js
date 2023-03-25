"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[546],{6015:function(e,t,n){n(8381);t.Z=n.p+"static/media/logo.70f8e5acb569cad1544b0d62074c8999.svg"},7669:function(e,t,n){var r=n(222);t.Z=r.Z.create({baseURL:"http://localhost:8081"})},4546:function(e,t,n){n.r(t),n.d(t,{default:function(){return Z}});var r=n(3433),a=n(4108),o=n(1413),i=n(5861),s=n(9439),c=(0,n(3037).Z)((function(e){return{root:{display:"flex",backgroundImage:"radial-gradient(cyan, dodgerblue, teal)",height:"100vh",width:"100vw"},loginBox:{margin:"auto",borderRadius:"1rem",padding:"0 0 1rem 0",width:"max(20rem, 30vw)",boxShadow:"0 0 .5rem crimson"},titleBar:{background:"linear-gradient(45deg, violet, blue, orange)",display:"flex",alignItems:"center",padding:"2.5rem 7vw",height:"10vh",justifyContent:"center",borderRadius:"1rem 1rem 0 0",margin:"0 0 2rem 0"},logo:{width:"3rem"},title:{fontSize:"2rem",padding:".5rem",color:"aliceblue"},entry:{display:"flex",margin:".5rem 0"},label:{backgroundColor:"beige",margin:".5% 2%",padding:".5rem",borderRadius:"1rem",width:"15rem",textAlign:"center",fontWeight:"bolder"},input:{backgroundColor:"white",padding:".5rem",margin:".5% 2%",width:"100%",borderRadius:"1rem",fontWeight:"bold",textAlign:"center","&::-webkit-outer-spin-button":{WebkitAppearance:"none"},"&::-webkit-inner-spin-button":{WebkitAppearance:"none"},MozAppearance:"textfield"},submitButton:{},error:{color:"green",display:"block"}}})),l=n(2524),u=n(7174),d=n(1955),p=n(5516),g=n(9292),m=n(6015),h=n(8381),f=n(3700),v=n(7669),b=n(9343),x="/tokens",j="/accounts/detail";var Z=function(){var e=c(),t=(0,l.s0)(),n=(0,h.useContext)(f.Z),Z=n.auth,w=n.setAuth,y=(0,h.useState)(""),k=(0,s.Z)(y,2),O=k[0],C=k[1],N=(0,h.useState)(""),P=(0,s.Z)(N,2),S=P[0],A=P[1],B=(0,h.useState)([]),D=(0,s.Z)(B,2),R=D[0],E=D[1],I=(0,h.useState)([]),W=(0,s.Z)(I,2),z=W[0],L=W[1],F=z.length?(0,b.jsx)("ul",{className:e.error,children:z.map((function(e){return(0,b.jsx)("li",{children:e.message},e.code)}))}):(0,b.jsx)(b.Fragment,{}),M=R.length?(0,b.jsx)("ul",{className:e.error,children:R.map((function(e){return(0,b.jsx)("li",{children:e.message},e.code)}))}):(0,b.jsx)(b.Fragment,{});(0,h.useEffect)((function(){var e=null===Z||void 0===Z?void 0:Z.token;if(e){var n=function(){var n=(0,i.Z)((0,a.Z)().mark((function n(){var r,i;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,v.Z.get(j,{headers:{Authorization:"Bearer "+e}});case 2:r=n.sent,i=null===r||void 0===r?void 0:r.data,w((0,o.Z)((0,o.Z)({},Z),i)),null!==i&&void 0!==i&&i.admin?t("/adminConsole",{replace:"true"}):t("/customerConsole",{replace:"true"});case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}}),[Z]);var U=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n,o,i,s,c,l,u,d,p,g;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),L([]),E([]),e.prev=3,e.next=6,v.Z.post(x,JSON.stringify({accountId:O,password:S}),{headers:{"Content-Type":"application/json"},withCredentials:!0});case 6:o=e.sent,i=null===o||void 0===o||null===(n=o.data)||void 0===n?void 0:n.token,w({token:i}),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),(s=null===e.t0||void 0===e.t0?void 0:e.t0.response)?401===(null===s||void 0===s?void 0:s.status)?(c=null===s||void 0===s?void 0:s.data,l=c.type,u=c.message,d={code:l,message:u},"Kindly Recheck Your Password."===u?E((function(e){return[].concat((0,r.Z)(e),[d])})):L((function(e){return[].concat((0,r.Z)(e),[d])}))):422===(null===s||void 0===s?void 0:s.status)&&null!==(g=null===s||void 0===s||null===(p=s.data)||void 0===p?void 0:p.errors)&&void 0!==g&&g.length&&g.forEach((function(e){"password"===e.field?E((function(t){return[].concat((0,r.Z)(t),[e])})):L((function(t){return[].concat((0,r.Z)(t),[e])}))})):alert("No server response");case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t){return e.apply(this,arguments)}}(),_=(0,h.useMemo)((function(){return(0,b.jsxs)("div",{className:e.titleBar,children:[(0,b.jsx)("div",{className:e.logoContainer,children:(0,b.jsx)("img",{src:m.Z,alt:"online_bank",className:e.logo})}),(0,b.jsx)("div",{className:e.title,children:"Online Bank"})]})}),[m.Z]);return(0,b.jsx)("div",{className:e.root,children:(0,b.jsx)(d.Z,{className:e.loginBox,sx:{backgroundColor:"black"},children:(0,b.jsxs)(p.ZP,{container:!0,justifyContent:"center",alignItems:"center",children:[(0,b.jsx)(p.ZP,{item:!0,xs:12,children:_}),(0,b.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,b.jsxs)("div",{className:e.entry,children:[(0,b.jsx)("label",{className:e.label,children:"Account No."}),(0,b.jsx)("input",{id:"account_no",type:"number",className:e.input,autoComplete:"off",onChange:function(e){L([]);var t=e.target.value>0?e.target.value:"";C(t)},value:O})]}),F,(0,b.jsxs)("div",{className:e.entry,children:[(0,b.jsx)("label",{className:e.label,children:"Password"}),(0,b.jsx)("input",{id:"password",type:"password",className:e.input,onChange:function(e){E([]),A(e.target.value)}})]}),M]}),(0,b.jsx)(p.ZP,{item:!0,xs:1}),(0,b.jsx)(p.ZP,{item:!0,xs:10,children:(0,b.jsx)(g.Z,{className:e.submitButton,sx:{color:"white",backgroundColor:"#4b484c",width:"100%",margin:"1rem 0"},onClick:U,disabled:z.length||R.length||!O.length||!S.length,children:"Login"})}),(0,b.jsx)(p.ZP,{item:!0,xs:1}),(0,b.jsx)(p.ZP,{item:!0,xs:12,children:(0,b.jsx)(u.OL,{to:"/signup",style:{display:"block",textAlign:"right",textDecoration:"none",color:"blue"},replace:!0,children:"Don't have an account? Sign Up! \xa0"})})]})})})}},1413:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(4942);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=546.f3dfb765.chunk.js.map