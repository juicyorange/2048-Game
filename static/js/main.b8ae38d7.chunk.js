(this["webpackJsonpmy-2048"]=this["webpackJsonpmy-2048"]||[]).push([[0],{19:function(e,n,r){},31:function(e,n,r){"use strict";r.r(n);var t,i,o,a,c=r(0),d=r.n(c),s=r(10),u=r.n(s),f=r(5),p=r(3),g=r(4),l=(r(19),r(11)),v=r.n(l),b=r(1),h=g.a.div(t||(t=Object(p.a)(["\n  height: 80px;\n  width: 80px;\n  background: lightgray;\n  margin: 3px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 45px;\n  font-weight: 800;\n  color: white;\n  padding: 5px;\n"]))),j=function(e){var n=e.item;return Object(b.jsx)(h,{style:{background:m(n),color:2===n||4===n?"#645B52":"#F7F4EF"},children:n||""})},m=function(e){switch(e){case 2:return"#EDE4DA";case 4:return"#EEE1C9";case 8:return"#F3B279";case 16:return"#F79563";case 32:return"#F2654F";case 64:return"#F75F3B";case 128:return"#EDD073";case 256:return"#EECC61";case 512:return"#EDC950";case 1024:return"#E8BB31";case 2048:return"#E7B723";case 4096:return"#2385D0";case 8192:return"#000000";default:return"#C2B3A3"}},x=g.a.div(i||(i=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  margin-bottom : 3px\n  padding-top: 7px;\n  padding-botton: 7px;\n  padding-left: 10px;\n  padding-right: 10px;\n  background: #846f5b;\n  color: #f8f5f0;\n  width: 50px;\n  font-weight: 900;\n  margin-left: 5px;\n  margin-bottom: auto;\n"]))),O=function(e){var n=e.name,r=e.score;return Object(b.jsxs)(x,{children:[n,Object(b.jsx)("br",{}),r]})},y=r(2),S=function(e){var n=function(e){for(var n=[],r=0;r<e.length;r++)for(var t=0;t<e[r].length;t++)0===e[r][t]&&n.push([r,t]);return n}(e),r=n[Math.floor(Math.random()*n.length)],t=Math.random()>.5?2:4;return e[r[0]][r[1]]=t,e},w=function(e){for(var n=[],r=0,t=0;t<e.length;t++){for(var i=[],o=0,a=0;a<e[t].length;a++){var c=e[t][a];0!==c?i.push(c):o++}for(var d=0;d<o;d++)i.push(0);n.push(i)}for(var s=0;s<n.length;s++)n[s][0]===n[s][1]&&n[s][2]===n[s][3]?(n[s][0]=2*n[s][0],n[s][1]=2*n[s][2],n[s][2]=0,n[s][3]=0,r=r+n[s][0]+n[s][1]):n[s][0]===n[s][1]?(n[s][0]=2*n[s][0],n[s][1]=n[s][2],n[s][2]=n[s][3],n[s][3]=0,r+=n[s][0]):n[s][1]===n[s][2]?(n[s][1]=2*n[s][1],n[s][2]=n[s][3],n[s][3]=0,r+=n[s][1]):n[s][2]===n[s][3]&&(n[s][2]=2*n[s][2],n[s][3]=0,r+=n[s][2]);return{returnGrid:n,addScore:r}},G=function(e){var n=y.cloneDeep(e),r=w(n),t=r.returnGrid,i=r.addScore;return{moveLeftGrid:y.cloneDeep(t),addScore:i}},D=function(e){var n=y.cloneDeep(e);n=E(n);var r=w(n),t=r.returnGrid,i=r.addScore;return n=y.cloneDeep(t),{moveRightGrid:E(n),addScore:i}},J=function(e){var n=y.cloneDeep(e);n=k(E(n));var r=w(n),t=r.returnGrid,i=r.addScore;return n=y.cloneDeep(t),{moveUpGrid:E(k(n)),addScore:i}},N=function(e){var n=y.cloneDeep(e);n=E(k(n));var r=w(n),t=r.returnGrid,i=r.addScore;return n=y.cloneDeep(t),{moveDownGrid:k(E(n)),addScore:i}},k=function(e){for(var n=0;n<e.length;n++)for(var r=0;r<n;r++){var t=e[n][r];e[n][r]=e[r][n],e[r][n]=t}return e},E=function(e){for(var n=0;n<e.length;n++)e[n].reverse();return e},C=g.a.div(o||(o=Object(p.a)(["\n  background: #ad9d8f;\n  width: max-content;\n  margin: auto;\n  padding: 5px;\n  border-radius: 5px;\n  margin-top: 5px;\n"]))),F=g.a.div(a||(a=Object(p.a)(["\n  display: flex;\n  justify-content: center;\n  padding: 10px;\n  background: #846f5b;\n  color: #f8f5f0;\n  width: 50px;\n  border-radius: 7px;\n  font-weight: 900;\n  margin-left: auto;\n  margin-bottom: auto;\n  cursor: pointer;\n"]))),B=function(){var e=Object(c.useState)([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]),n=Object(f.a)(e,2),r=n[0],t=n[1],i=Object(c.useState)(!1),o=Object(f.a)(i,2),a=o[0],d=o[1],s=Object(c.useState)(0),u=Object(f.a)(s,2),p=u[0],g=u[1],l=Object(c.useState)(0),h=Object(f.a)(l,2),m=h[0],x=h[1],y=Object(c.useState)(!1),w=Object(f.a)(y,2),k=w[0],E=w[1];Object(c.useEffect)((function(){var e=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];g(0),e=S(S(e)),t(e)}),[]);var B=function(e){return JSON.stringify(G(e).moveLeftGrid)===JSON.stringify(e)&&(JSON.stringify(D(e).moveRightGrid)===JSON.stringify(e)&&(JSON.stringify(J(e).moveUpGrid)===JSON.stringify(e)&&JSON.stringify(N(e).moveDownGrid)===JSON.stringify(e)))},M=function(e){if(!1===a)switch(e){case"left":var n=G(r);if(JSON.stringify(r)!==JSON.stringify(n.moveLeftGrid)){var i=S(n.moveLeftGrid);B(i)&&(d(!0),p>m&&x(p)),g((function(e){return e+n.addScore})),t(i)}break;case"right":var o=D(r);if(JSON.stringify(r)!==JSON.stringify(o.moveRightGrid)){var c=S(o.moveRightGrid);B(c)&&(p>m&&x(p),d(!0)),g((function(e){return e+o.addScore})),t(c)}break;case"up":var s=J(r);if(JSON.stringify(r)!==JSON.stringify(s.moveUpGrid)){var u=S(s.moveUpGrid);B(u)&&(d(!0),p>m&&x(p)),g((function(e){return e+s.addScore})),t(u)}break;case"down":var f=N(r);if(JSON.stringify(r)!==JSON.stringify(f.moveDownGrid)){var l=S(f.moveDownGrid);B(l)&&(d(!0),p>m&&x(p)),g((function(e){return e+f.addScore})),t(l)}}},I=function(e){Math.abs(e.x)>Math.abs(e.y)?e.x>0?M("right"):e.x<0&&M("left"):e.y<0?M("up"):e.y>0&&M("down")};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(C,{onKeyDown:function(e){37===e.keyCode?M("left"):39===e.keyCode?M("right"):38===e.keyCode?M("up"):40===e.keyCode&&M("down")},tabIndex:1,children:[Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(b.jsx)("div",{style:{fontSize:"50px",fontWeight:"bold",margin:"0"},children:"MY 2048"}),Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(b.jsx)(O,{name:"score",score:p}),Object(b.jsx)(O,{name:"best",score:m})]})]}),Object(b.jsx)(F,{onClick:function(){return function(){var e=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];!0===a&&d(!1),g(0),E(!1),e=S(S(e)),t(e)}()},children:"retry"}),Object(b.jsx)(v.a,{innerRef:function(e){return e},onSwipeMove:function(e){!1===k&&(E(!0),I(e),setTimeout((function(){return E(!1)}),200))},children:r.map((function(e,n){return Object(b.jsx)("div",{style:{display:"flex"},children:e.map((function(e,n){return Object(b.jsx)(j,{item:e},"itemIndex-".concat(n))}))},"rowIndex-".concat(n))}))})]}),Object(b.jsx)("p",{children:a?"Game Over!! push retry":""})]})};u.a.render(Object(b.jsx)(d.a.StrictMode,{children:Object(b.jsx)(B,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.b8ae38d7.chunk.js.map