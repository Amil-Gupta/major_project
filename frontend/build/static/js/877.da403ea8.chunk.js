"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[877],{9877:function(e,n,t){t.r(n),t.d(n,{default:function(){return K}});var r=t(4108),a=t(5861),o=t(9439),i=t(8708),s=t(2704),l=t(368),c=t(1955),d=t(9292),u=t(5516),m=t(8381),h=t(2288),x=t(3037),g=(0,x.Z)((function(e){return{logoContainer:{},logo:{width:"3rem",padding:".5rem"},titleBar:{background:"linear-gradient(45deg, violet, blue, orange)",display:"flex",alignItems:"center",padding:"0 .5rem",height:"10vh"},banner:{display:"flex",alignItems:"center",cursor:"pointer"},title:{fontSize:"1.5rem",padding:".5rem",color:"aliceblue"},avatar:{marginLeft:"auto"},popperBox:{backgroundColor:"#666263",padding:".3rem",border:".2vw solid black",borderRadius:"1vh",color:"aliceblue"},username:{textAlign:"center"},body:{backgroundColor:"#2a2b2a",height:"90vh",padding:"1rem",overflowY:"auto"},optionButton:{color:"white",fontSize:"1.5rem",fontWeight:"bolder",textAlign:"center",backgroundColor:"black",backgroundSize:"contain",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"2vw",border:".5px solid white",margin:".5rem"}}})),v=t(2524),f=t(7174),p=t(3700),j=t(9386),b=(0,x.Z)((function(e){return{}})),C=t(7669),k=t(9343),Z=(0,m.createContext)({}),N=Z,w=(0,x.Z)((function(e){return{userInfo:{backgroundImage:"linear-gradient(darkslategrey, black, darkslategrey)",color:"white",borderRadius:"3rem",height:"100%",margin:"1rem",textAlign:"center"},heading:{fontWeight:"bolder",fontSize:"1.7rem",color:"lightslategrey"},avatarContainer:{display:"flex",aspectRatio:"1 / 1",height:"100%",justifyContent:"center",alignItems:"center"},details:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",margin:".5rem",fontWeight:"bold",fontSize:"1.5rem"},transferFormContainer:{display:"flex",flexDirection:"column",height:"100%",alignItems:"center",justifyContent:"center"},transferForm:{backgroundColor:"black",borderRadius:"1rem",padding:"1rem"},entry:{display:"flex",margin:".5rem 0"},label:{backgroundColor:"beige",margin:".5% 2%",padding:".5rem",borderRadius:"1rem",width:"15rem",textAlign:"center",fontWeight:"bolder"},input:{backgroundColor:"white",padding:".5rem",margin:".5% 2%",width:"100%",borderRadius:"1rem",fontWeight:"bold",textAlign:"center","&::-webkit-outer-spin-button":{WebkitAppearance:"none"},"&::-webkit-inner-spin-button":{WebkitAppearance:"none"},MozAppearance:"textfield"}}})),y="/transfers";var P=function(){var e=w(),n=(0,v.s0)(),t=(0,m.useContext)(p.Z),i=t.auth,l=(t.setAuth,(0,m.useContext)(N)),c=(l.transfer,l.setTransfer),h=(0,m.useContext)(j.Z),x=(h.loading,h.setLoading),g=(h.loadingColor,h.setLoadingColor,(0,m.useState)("")),f=(0,o.Z)(g,2),b=f[0],Z=f[1],P=(0,m.useState)(""),A=(0,o.Z)(P,2),S=A[0],B=A[1],I=S?100*S:"",T=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var a,o,s,l,d;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),x(!0),e.prev=2,a=null===i||void 0===i?void 0:i.token,e.next=6,C.Z.post(y,JSON.stringify({toAccountId:b,amountPaise:I}),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a}});case 6:o=e.sent,s=null===o||void 0===o?void 0:o.data,c(s),x(!1),n("success",{replace:!0}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),x(!1),null!==e.t0&&void 0!==e.t0&&e.t0.response?alert(null===e.t0||void 0===e.t0||null===(l=e.t0.response)||void 0===l||null===(d=l.data)||void 0===d?void 0:d.message):alert("No server response");case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(n){return e.apply(this,arguments)}}(),W=function(n){var t=n.name?n.name:"Anonymous",r=n.accountNo?n.accountNo:"...";return(0,k.jsxs)("div",{className:e.userInfo,children:[(0,k.jsx)("span",{className:e.heading,children:n.heading}),(0,k.jsxs)(u.ZP,{container:!0,children:[(0,k.jsx)(u.ZP,{item:!0,xs:4,md:12,children:(0,k.jsx)("div",{className:e.avatarContainer,children:(0,k.jsx)(s.Z,{sx:{bgcolor:n.avatarBgcolor,color:n.avatarColor,width:"50%",height:"50%"}})})}),(0,k.jsx)(u.ZP,{item:!0,xs:8,md:12,children:(0,k.jsxs)("div",{className:e.details,children:[(0,k.jsx)("div",{className:e.username,children:t}),(0,k.jsxs)("div",{className:e.accountNo,children:["Account no.:\xa0",r]})]})})]})]})},R=function(){var n=i.id,t=i.name;return(0,k.jsx)("div",{className:e.sender,children:(0,k.jsx)(W,{heading:"FROM",name:t,accountNo:n,avatarBgcolor:"khaki",avatarColor:"lightcoral"})})},z=function(){return(0,k.jsx)("div",{className:e.receiver,children:(0,k.jsx)(W,{heading:"TO",accountNo:b,avatarBgcolor:"indigo",avatarColor:"green"})})};return(0,k.jsx)("div",{className:e.root,children:(0,k.jsxs)(u.ZP,{container:!0,children:[(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,children:(0,k.jsx)(R,{})}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,children:(0,k.jsx)("div",{className:e.transferFormContainer,children:(0,k.jsxs)("div",{className:e.transferForm,children:[(0,k.jsxs)("div",{className:e.entry,children:[(0,k.jsx)("label",{className:e.label,children:"Account no."}),(0,k.jsx)("input",{id:"account_no",type:"number",className:e.input,autoComplete:"off",onChange:function(e){var n=parseInt(e.target.value)>0?e.target.value:"";Z(n)},value:b})]}),(0,k.jsxs)("div",{className:e.entry,children:[(0,k.jsx)("label",{className:e.label,children:"Amount in \u20b9"}),(0,k.jsx)("input",{id:"amount",type:"number",className:e.input,autoComplete:"off",onChange:function(e){var n=parseInt(e.target.value)>0?e.target.value:"";B(n)},value:S})]}),(0,k.jsx)(d.Z,{className:e.submitButton,sx:{color:"white",backgroundColor:"#4b484c",width:"100%",margin:"1rem 0"},onClick:T,disabled:!b.length||!S.length,children:"Initiate Transfer"})]})})}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,children:(0,k.jsx)(z,{})})]})})},A=(0,x.Z)((function(e){return{root:{color:"white",textAlign:"center",fontSize:"1.5rem"},heading:{backgroundColor:"black",color:"green",fontSize:"2rem",borderRadius:"1rem",boxShadow:"0 0 .5rem grey"},amount:{color:"royalblue",fontSize:"3rem"},detailsHeading:{backgroundColor:"dimgrey",fontWeight:"bold",border:".2rem solid silver"},label:{backgroundColor:"darkslategrey",padding:"1rem",border:".05rem solid black"},value:{backgroundColor:"grey",padding:"1rem",border:".05rem solid black"}}}));var S=function(){var e=A(),n=(0,v.s0)(),t=(0,m.useContext)(N),r=t.transfer,a=(t.setTransfer,r.id),o=r.fromAccount,i=r.toAccount,s=r.amountPaise,l=r.transferredAt,c=s/100,h=new Date(l);return(0,k.jsx)("div",{className:e.root,children:(0,k.jsxs)(u.ZP,{container:!0,children:[(0,k.jsx)(u.ZP,{item:!0,xs:12,children:(0,k.jsx)("div",{className:e.heading,children:"Transfer Successful!"})}),(0,k.jsx)(u.ZP,{item:!0,xs:12,children:(0,k.jsxs)("div",{className:e.amount,children:["\u20b9",c]})}),(0,k.jsx)(u.ZP,{item:!0,xs:12,children:(0,k.jsx)("div",{className:e.detailsHeading,children:"Details"})}),(0,k.jsxs)(u.ZP,{item:!0,xs:12,children:[(0,k.jsxs)(u.ZP,{container:!0,style:{maxHeight:"40vh",overflowY:"auto",border:".2rem solid black"},children:[(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,className:e.label,children:"From Account No."}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:8,className:e.value,children:o}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,className:e.label,children:"To Account No."}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:8,className:e.value,children:i}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,className:e.label,children:"Transaction Id"}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:8,className:e.value,children:a}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:4,className:e.label,children:"Time of Transaction"}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:8,className:e.value,children:h.toString()})]}),(0,k.jsx)(u.ZP,{item:!0,xs:12,children:(0,k.jsx)(d.Z,{className:e.okButton,onClick:function(e){e.preventDefault(),n("customerConsole/transfer",{replace:!0})},sx:{color:"greenyellow",backgroundColor:"green",margin:".5rem 0",border:".1rem solid yellowgreen"},children:"OK"})})]})]})})},B=(0,m.memo)((function(){var e=(0,m.useContext)(j.Z),n=(e.loading,e.setLoading),t=(e.loadingColor,e.setLoadingColor);(0,m.useEffect)((function(){t("green")}),[]);var r=b();return(0,k.jsx)("div",{className:r.root,children:(0,k.jsxs)(v.Z5,{children:[(0,k.jsx)(v.AW,{path:"*",element:(0,k.jsx)(P,{setLoading:n})}),(0,k.jsx)(v.AW,{path:"success",element:(0,k.jsx)(S,{})})]})})})),I=(0,m.createContext)({}),T=I,W=(0,x.Z)((function(e){return{header:{color:"black",backgroundColor:"grey",fontSize:"1.5rem",fontWeight:"bolder"},heading:{textAlign:"center",border:".1rem solid black"},gridContainer:{height:"65vh","& .MuiButtonBase-root":{color:"white"},"& .MuiTablePagination-toolbar":{flexWrap:"wrap",justifyContent:"flex-end"}},typeIconContainer:{height:"100%"},typeIcon:{fit:"contain",height:"100%"},refreshButtonContainer:{display:"flex",justifyContent:"center"}}})),R=t(6252),z=t(9969),L=t(5837),D=t(9677),O=t(1733),F=t(3925),E=t(4865),M="/accounts/statement";var Y=function(){var e,n,t=W(),o=(0,m.useContext)(p.Z),i=o.auth,s=(o.setAuth,(0,m.useContext)(j.Z).setLoading),l=(0,m.useContext)(T),c=l.statement,x=l.setStatement,g=null!==(e=null===c||void 0===c||null===(n=c.rows)||void 0===n?void 0:n.content)&&void 0!==e?e:[],v=[{field:"type",headerName:"Type",headerAlign:"center",align:"center",flex:1,valueGetter:function(e){var n=e.row,t=n.withdrawalAmount,r=n.description;return t?r.startsWith("To Account")?"Outbound Transfer":"Withdrawal":r.startsWith("From Account")?"Inbound Transfer":"Deposit"},renderCell:function(e){return(0,k.jsx)(F.Z,{title:e.value,enterTouchDelay:0,children:(0,k.jsx)("div",{className:t.typeIconContainer,children:function(){switch(e.value){case"Withdrawal":return(0,k.jsx)("img",{src:h.Em,alt:"W",className:t.typeIcon});case"Deposit":return(0,k.jsx)("img",{src:h.wi,alt:"D",className:t.typeIcon});case"Inbound Transfer":return(0,k.jsx)("img",{src:h.R2,alt:"I",className:t.typeIcon});case"Outbound Transfer":return(0,k.jsx)("img",{src:h.K4,alt:"O",className:t.typeIcon});default:return(0,k.jsx)(k.Fragment,{children:"Unknown"})}}()})})}},{field:"amount",headerName:"Amount",headerAlign:"center",align:"center",valueGetter:function(e){var n=e.row,t=n.withdrawalAmount,r=n.depositAmount;return"\u20b9  ".concat((null!==t&&void 0!==t?t:r)/100)},flex:4,renderCell:function(e){return(0,k.jsx)("p",{style:{overflowX:"auto"},children:e.value})}},{field:"date",headerName:"Date",flex:2,headerAlign:"center",align:"center",renderCell:function(e){return(0,k.jsx)("p",{style:{overflowX:"auto"},children:e.value})}},{field:"description",headerName:"Description",flex:3,headerAlign:"center",align:"center",renderCell:function(e){return(0,k.jsx)("p",{style:{overflowX:"auto"},children:e.value})}}],f=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t,a,o,l,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),s(!0),e.prev=2,t=null===i||void 0===i?void 0:i.token,e.next=6,C.Z.get(M,{headers:{Authorization:"Bearer "+t}});case 6:a=e.sent,s(!1),x(null===a||void 0===a?void 0:a.data),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),null!==e.t0&&void 0!==e.t0&&e.t0.response?alert(null!==(o=null===e.t0||void 0===e.t0||null===(l=e.t0.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)&&void 0!==o?o:"An error occured."):alert("No server response"),s(!1);case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(n){return e.apply(this,arguments)}}();return(0,k.jsxs)("div",{className:t.root,children:[(0,k.jsx)("div",{className:t.header,children:(0,k.jsxs)(u.ZP,{container:!0,children:[(0,k.jsx)(u.ZP,{item:!0,xs:12,md:6,children:(0,k.jsxs)("div",{className:t.heading,children:[null===i||void 0===i?void 0:i.name,"[#",null===c||void 0===c?void 0:c.accountId,"]"]})}),(0,k.jsx)(u.ZP,{item:!0,xs:12,md:6,children:(0,k.jsxs)("div",{className:t.heading,children:["Balance: \u20b9",(null===c||void 0===c?void 0:c.balancePaise)/100]})})]})}),(0,k.jsx)("div",{className:t.gridContainer,children:(0,k.jsx)(O._,{rows:g,columns:v,disableRowSelectionOnClick:!0,initialState:{pagination:{paginationModel:{pageSize:10,page:0}}},sx:{color:"white",backgroundColor:"darkslategrey",fontWeight:"bolder",fontSize:"1.2rem"},components:{Pagination:function(){var e=(0,R.l)(),n=(0,z.P)(e,L.bu),t=(0,z.P)(e,D.hh),r=(0,z.P)(e,L.B_);return(0,k.jsx)(E.Z,{component:"div",variant:"outlined",shape:"rounded",page:n,count:t,rowsPerPage:r,rowsPerPageOptions:[10,25,50,100],labelRowsPerPage:(0,k.jsx)("span",{children:"Records Per Page:"}),onRowsPerPageChange:function(n){e.current.setPageSize(n.target.value),e.current.setPage(0)},onPageChange:function(n,t){e.current.setPage(t)},showFirstButton:!0,showLastButton:!0,sx:{color:"white"}})}}})}),(0,k.jsx)("div",{className:t.refreshButtonContainer,children:(0,k.jsx)(d.Z,{onClick:f,sx:{color:"greenyellow",backgroundColor:"green",margin:".5rem 0",border:".1rem solid yellowgreen"},children:"Refresh"})})]})},_=[function(e){var n=e.children,t=(0,m.useState)({}),r=(0,o.Z)(t,2),a=r[0],i=r[1];return(0,k.jsx)(Z.Provider,{value:{transfer:a,setTransfer:i},children:n})},function(e){var n=e.children,t=(0,m.useState)({}),r=(0,o.Z)(t,2),a=r[0],i=r[1];return(0,k.jsx)(I.Provider,{value:{statement:a,setStatement:i},children:n})}],H=t(8268).i.apply(void 0,_),X="/accounts/detail",G="/accounts/statement";var K=function(){var e=g(),n=(0,m.useContext)(p.Z),t=n.auth,x=n.setAuth,b=(0,v.s0)(),Z=(0,m.useContext)(j.Z),N=(Z.loading,Z.setLoading),w=(Z.loadingColor,Z.setLoadingColor),y=function(){b("/customerConsole",{replace:!0})},P=(0,m.useMemo)((function(){return(0,k.jsxs)("div",{className:e.banner,onClick:y,children:[(0,k.jsx)("div",{className:e.logoContainer,children:(0,k.jsx)("img",{src:h.jY,alt:"online_bank",className:e.logo})}),(0,k.jsx)("div",{className:e.title,children:"Online Bank"})]})}),[]);(0,m.useEffect)((function(){null!==t&&void 0!==t&&t.token||(null!==t&&void 0!==t&&t.admin&&b("/adminConsole",{replace:!0}),b("/login",{replace:!0}))}),[t]);var A=function(){var n=t.name,u=(0,m.useState)(null===t||void 0===t?void 0:t.balancePaise),h=(0,o.Z)(u,2),g=h[0],v=h[1],f=n||"Loading...",p="number"===typeof g?(0,k.jsxs)(k.Fragment,{children:["Balance:\xa0","\u20b9",g/100]}):"Loading...",j=(0,m.useState)(null),b=(0,o.Z)(j,2),Z=b[0],N=b[1],w=Boolean(Z),y=w?"avatarPopper":void 0,A=(0,m.useRef)(null),S=(0,m.useRef)(null);(0,m.useEffect)((function(){var e=function(e){A.current&&!A.current.contains(e.target)&&S.current&&!S.current.contains(e.target)&&N(null)};return document.addEventListener("click",e,!0),function(){document.removeEventListener("click",e,!0)}}),[]);var B=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var a,o,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.token,N(Z?null:n.currentTarget),e.next=4,C.Z.get(X,{headers:{Authorization:"Bearer "+a}});case 4:o=e.sent,i=null===o||void 0===o?void 0:o.data,v(null===i||void 0===i?void 0:i.balancePaise);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,k.jsxs)("div",{className:e.titleBar,children:[P,(0,k.jsxs)("div",{className:e.avatar,children:[(0,k.jsx)(i.Z,{onClick:B,ref:A,children:(0,k.jsx)(s.Z,{sx:{bgcolor:"black"}})}),(0,k.jsx)(l.Z,{id:y,open:w,anchorEl:Z,ref:S,children:(0,k.jsxs)(c.Z,{className:e.popperBox,children:[(0,k.jsx)("section",{className:e.username,children:f}),(0,k.jsx)("section",{className:e.balance,children:p}),(0,k.jsx)(d.Z,{className:e.logoutButton,onClick:function(){x({})},sx:{color:"red",width:"100%",backgroundColor:"black"},children:"Log Out"})]})})]})]})};function S(){var n=(0,m.useContext)(T),o=(n.statement,n.setStatement),i=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var a,i,s,l,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),w("pink"),e.prev=2,a=null===t||void 0===t?void 0:t.token,e.next=6,C.Z.get(G,{headers:{Authorization:"Bearer "+a}});case 6:i=e.sent,N(!1),o(null===i||void 0===i?void 0:i.data),b("statement",{replace:!0}),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(2),null!==e.t0&&void 0!==e.t0&&e.t0.response?alert(null!==(s=null===e.t0||void 0===e.t0||null===(l=e.t0.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)&&void 0!==s?s:"An error occured."):alert("No server response"),b("/customerConsole",{replace:!0}),N(!1);case 17:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(n){return e.apply(this,arguments)}}(),s=function(n){var t="url(".concat(n.icon,")");return(0,k.jsx)(f.OL,{to:n.route,style:{textDecoration:"none",color:"white",width:"100%",display:"block",aspectRatio:"1 / 1"},replace:!0,children:(0,k.jsx)("div",{style:{backgroundImage:t,backgroundSize:"contain",backgroundRepeat:"no-repeat"},className:e.optionButton,onClick:n.onClick,id:n.id,children:n.name})})},l=function(){return(0,k.jsx)("div",{className:e.options,children:(0,k.jsxs)(u.ZP,{container:!0,children:[(0,k.jsx)(u.ZP,{item:!0,xs:6,md:2,children:(0,k.jsx)(s,{name:"Money Transfer",icon:h.YC,id:"transferButton",route:"transfer"})}),(0,k.jsx)(u.ZP,{item:!0,xs:6,md:2,children:(0,k.jsx)(s,{name:"Account Statement",icon:h.hg,id:"accountStatementButton",route:"statement",onClick:i})})]})})};return(0,k.jsx)("div",{className:e.body,children:(0,k.jsxs)(v.Z5,{children:[(0,k.jsx)(v.AW,{path:"*",element:(0,k.jsx)(l,{})}),(0,k.jsx)(v.AW,{path:"transfer/*",element:(0,k.jsx)(B,{})}),(0,k.jsx)(v.AW,{path:"statement/*",element:(0,k.jsx)(Y,{})})]})})}return(0,k.jsx)(H,{children:(0,k.jsx)("div",{className:e.root,children:(0,k.jsxs)(u.ZP,{container:!0,children:[(0,k.jsx)(u.ZP,{item:!0,xs:12,children:(0,k.jsx)(A,{})}),(0,k.jsx)(u.ZP,{item:!0,xs:12,children:(0,k.jsx)(S,{})})]})})})}}}]);
//# sourceMappingURL=877.da403ea8.chunk.js.map