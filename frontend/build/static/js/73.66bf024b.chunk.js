"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[73],{6015:function(e,t,n){n(8381);t.Z=n.p+"static/media/logo.70f8e5acb569cad1544b0d62074c8999.svg"},7669:function(e,t,n){var r=n(222);t.Z=r.Z.create({baseURL:"http://localhost:8081"})},7073:function(e,t,n){n.r(t),n.d(t,{default:function(){return Z}});var r=n(3433),a=n(4108),s=n(1413),i=n(5861),o=n(9439),l=(0,n(3037).Z)((function(e){return{root:{display:"flex",backgroundImage:"radial-gradient(cyan, dodgerblue, teal)",height:"100vh",width:"100vw"},signUpBox:{margin:"auto",borderRadius:"1rem",padding:"0 0 1rem 0",width:"max(20rem, 30vw)",boxShadow:"0 0 .5rem crimson"},titleBar:{background:"linear-gradient(45deg, violet, blue, orange)",display:"flex",alignItems:"center",padding:"2.5rem 7vw",height:"10vh",justifyContent:"center",borderRadius:"1rem 1rem 0 0",margin:"0 0 2rem 0"},logo:{width:"3rem"},title:{fontSize:"2rem",padding:".5rem",color:"aliceblue"},entry:{display:"flex",margin:".5rem 0"},label:{backgroundColor:"beige",margin:".5% 2%",padding:".5rem",borderRadius:"1rem",width:"15rem",textAlign:"center",fontWeight:"bolder"},input:{backgroundColor:"white",padding:".5rem",margin:".5% 2%",width:"100%",borderRadius:"1rem",fontWeight:"bold",textAlign:"center"},submitButton:{},error:{color:"green",display:"block"}}})),c=n(2524),d=n(7174),u=n(1955),m=n(5516),h=n(9292),p=n(6015),g=n(8381),f=n(3700),x=n(7669),v=n(9343),b="/tokens",j="/accounts/detail",w="/accounts";var Z=function(){var e=l(),t=(0,c.s0)(),n=(0,g.useContext)(f.Z),Z=n.auth,y=n.setAuth,k=(0,g.useState)(""),N=(0,o.Z)(k,2),C=N[0],O=N[1],P=(0,g.useState)(""),S=(0,o.Z)(P,2),B=S[0],A=S[1],D=(0,g.useState)(""),E=(0,o.Z)(D,2),I=E[0],R=E[1],F=(0,g.useState)([]),U=(0,o.Z)(F,2),L=U[0],z=U[1],J=(0,g.useState)([]),T=(0,o.Z)(J,2),W=T[0],_=T[1],M=B===I,q=L.length?(0,v.jsx)("ul",{className:e.error,children:L.map((function(e){return(0,v.jsx)("li",{children:e.message},e.code)}))}):(0,v.jsx)(v.Fragment,{}),G=W.length?(0,v.jsx)("ul",{className:e.error,children:W.map((function(e){return(0,v.jsx)("li",{children:e.message},e.code)}))}):(0,v.jsx)(v.Fragment,{}),H=M?(0,v.jsx)(v.Fragment,{}):(0,v.jsx)("ul",{className:e.error,children:(0,v.jsx)("li",{children:"passwords must match."},"mismatchError")});(0,g.useEffect)((function(){var e=null===Z||void 0===Z?void 0:Z.token;if(e){var n=function(){var n=(0,i.Z)((0,a.Z)().mark((function n(){var r,i;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x.Z.get(j,{headers:{Authorization:"Bearer "+e}});case 2:r=n.sent,i=null===r||void 0===r?void 0:r.data,y((0,s.Z)((0,s.Z)({},Z),i)),t("/customerConsole",{replace:"true"});case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}}),[Z]);var K=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n,s,i,o,l,c,d,u,m;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!M){e.next=21;break}return e.prev=2,e.next=5,x.Z.post(w,JSON.stringify({name:C,password:B}),{headers:{"Content-Type":"application/json"},withCredentials:!0});case 5:return i=e.sent,o=null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.id,alert("Account create with id : ".concat(o)),e.next=10,x.Z.post(b,JSON.stringify({accountId:o,password:B}),{headers:{"Content-Type":"application/json"},withCredentials:!0});case 10:l=e.sent,c=null===l||void 0===l||null===(s=l.data)||void 0===s?void 0:s.token,y({token:c}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(2),(d=null===e.t0||void 0===e.t0?void 0:e.t0.response)?null!==(m=null===d||void 0===d||null===(u=d.data)||void 0===u?void 0:u.errors)&&void 0!==m&&m.length&&m.forEach((function(e){"name"===e.field?z((function(t){return[].concat((0,r.Z)(t),[e])})):"password"===e.field&&_((function(t){return[].concat((0,r.Z)(t),[e])}))})):alert("No server response");case 19:e.next=22;break;case 21:alert("Password and Confirm Password do not match");case 22:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(t){return e.apply(this,arguments)}}(),Q=(0,g.useMemo)((function(){return(0,v.jsxs)("div",{className:e.titleBar,children:[(0,v.jsx)("div",{className:e.logoContainer,children:(0,v.jsx)("img",{src:p.Z,alt:"online_bank",className:e.logo})}),(0,v.jsx)("div",{className:e.title,children:"Online Bank"})]})}),[p.Z]);return(0,v.jsx)("div",{className:e.root,children:(0,v.jsx)(u.Z,{className:e.signUpBox,sx:{backgroundColor:"black"},children:(0,v.jsxs)(m.ZP,{container:!0,justifyContent:"center",alignItems:"center",children:[(0,v.jsx)(m.ZP,{item:!0,xs:12,children:Q}),(0,v.jsxs)(m.ZP,{item:!0,xs:12,children:[(0,v.jsxs)("div",{className:e.entry,children:[(0,v.jsx)("label",{className:e.label,children:"Full Name"}),(0,v.jsx)("input",{id:"full_name",type:"text",className:e.input,autoComplete:"off",onChange:function(e){z([]),O(e.target.value)}})]}),q,(0,v.jsxs)("div",{className:e.entry,children:[(0,v.jsx)("label",{className:e.label,children:"Password"}),(0,v.jsx)("input",{id:"password",type:"password",className:e.input,onChange:function(e){_([]),A(e.target.value)}})]}),G,(0,v.jsxs)("div",{className:e.entry,children:[(0,v.jsx)("label",{className:e.label,children:"Confirm Password"}),(0,v.jsx)("input",{id:"confirmPassword",type:"password",className:e.input,onChange:function(e){_([]),R(e.target.value)}})]}),H]}),(0,v.jsx)(m.ZP,{item:!0,xs:1}),(0,v.jsx)(m.ZP,{item:!0,xs:10,children:(0,v.jsx)(h.Z,{className:e.submitButton,sx:{color:"white",backgroundColor:"#4b484c",width:"100%",margin:"1rem 0"},onClick:K,disabled:L.length||W.length||!M||!C.length||!B.length,children:"Sign Up"})}),(0,v.jsx)(m.ZP,{item:!0,xs:1}),(0,v.jsx)(m.ZP,{item:!0,xs:12,children:(0,v.jsx)(d.OL,{to:"/login",style:{display:"block",textAlign:"right",textDecoration:"none",color:"blue"},replace:!0,children:"Already have an account? Log In! \xa0"})})]})})})}},1413:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(4942);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=73.66bf024b.chunk.js.map