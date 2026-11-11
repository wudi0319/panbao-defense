// 卡通画法：单位格 0..1，描边，脚在 .95 附近
const OL='#3b2a20';
function rr(c,x,y,w,h,r,fill,ol=true){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(ol){c.lineWidth=.065;c.lineJoin='round';c.strokeStyle=OL;c.stroke()}}
function circ(c,x,y,r,fill,ol=true){c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=fill;c.fill();if(ol){c.lineWidth=.065;c.lineJoin='round';c.strokeStyle=OL;c.stroke()}}
function shadow(c,x,y,rx,ry){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle='rgba(60,40,20,.22)';c.fill()}
const S={};
S.tree=c=>{shadow(c,.5,.92,.32,.09);rr(c,.42,.55,.16,.38,.06,'#c08a5a');circ(c,.5,.4,.33,'#8fc96b');circ(c,.36,.36,.14,'#b5dd8a',false)};
S.flower=c=>{c.strokeStyle='#3f9a3a';c.lineWidth=.06;c.beginPath();c.moveTo(.5,.85);c.lineTo(.5,.5);c.stroke();[[0,-1],[1,0],[0,1],[-1,0],[.7,.7]].forEach(([dx,dy])=>circ(c,.5+dx*.12,.42+dy*.12,.1,'#f7b2c0'));circ(c,.5,.42,.08,'#ffd84a')};
S.rock=c=>{shadow(c,.5,.85,.3,.07);c.beginPath();c.ellipse(.5,.66,.3,.22,0,0,7);c.fillStyle='#b9bfc8';c.fill();c.lineWidth=.065;c.strokeStyle=OL;c.stroke();circ(c,.42,.6,.06,'#d8dde3',false)};
// 勇士 / 小兵：col=衣服颜色，hat=头盔颜色，gear: 'sword'|'bow'|'hammer'|null
S.hero=(c,dir,ph,mv,col,hat,gear)=>{const f=dir===2?-1:1,b=mv?Math.abs(Math.sin(ph))*.04:0,l=mv?Math.sin(ph)*.06:0;c.save();c.translate(.5,0);c.scale(f,1);c.translate(-.5,0);
 shadow(c,.5,.95,.24,.06);rr(c,.36+l,.76,.12,.18,.05,'#6b4a32');rr(c,.52-l,.76,.12,.18,.05,'#6b4a32');
 rr(c,.28,.46-b,.44,.38,.14,col);rr(c,.3,.64-b,.4,.06,.02,'#8a5a30',false);
 circ(c,.5,.32-b,.22,'#ffe0c2');
 c.beginPath();c.arc(.5,.3-b,.235,Math.PI,0);c.lineTo(.735,.34-b);c.lineTo(.265,.34-b);c.closePath();c.fillStyle=hat;c.fill();c.lineWidth=.06;c.strokeStyle=OL;c.stroke();
 rr(c,.47,.04-b,.06,.1,.03,hat);
 if(dir!==1){const ox=dir>=2?.07:0;circ(c,.43+ox,.4-b,.028,OL,false);circ(c,.57+ox,.4-b,.028,OL,false);circ(c,.37+ox,.46-b,.032,'#ffaaaa',false);circ(c,.63+ox,.46-b,.032,'#ffaaaa',false)}
 if(gear==='sword'){rr(c,.74,.36-b,.06,.34,.02,'#dfe6ee');rr(c,.68,.66-b,.18,.05,.02,'#c9a227')}
 else if(gear==='bow'){c.beginPath();c.arc(.74,.6-b,.2,-1.2,1.2);c.lineWidth=.06;c.strokeStyle='#8a5a30';c.stroke();c.beginPath();c.moveTo(.74+Math.cos(-1.2)*.2,.6-b+Math.sin(-1.2)*.2);c.lineTo(.74+Math.cos(1.2)*.2,.6-b+Math.sin(1.2)*.2);c.lineWidth=.02;c.strokeStyle='#fff';c.stroke()}
 c.restore()};
// 要保护的大萝卜：mood 'happy'|'scared'|'calm'
S.carrot=(c,mood,t)=>{const w=Math.sin(t*2)*.03;shadow(c,.5,.94,.42,.07);
 c.beginPath();c.ellipse(.5,.9,.4,.09,0,0,7);c.fillStyle='#a8764e';c.fill();c.lineWidth=.03;c.strokeStyle=OL;c.stroke();
 const leaf=(x,y,r,a)=>{c.save();c.translate(x,y);c.rotate(a+w);c.beginPath();c.ellipse(0,-r,r*.38,r,0,0,7);c.fillStyle='#6cc24a';c.fill();c.lineWidth=.025;c.strokeStyle=OL;c.stroke();c.restore()};
 leaf(.44,.3,.13,-.5);leaf(.56,.3,.13,.5);leaf(.5,.28,.16,0);
 c.beginPath();c.moveTo(.26,.36);c.quadraticCurveTo(.5,.22,.74,.36);c.quadraticCurveTo(.7,.78,.5,.92);c.quadraticCurveTo(.3,.78,.26,.36);c.closePath();c.fillStyle='#ff8a2a';c.fill();c.lineWidth=.03;c.strokeStyle=OL;c.stroke();
 c.lineWidth=.018;[[.32,.5,.4],[.62,.6,.68],[.38,.7,.45]].forEach(([a,y,b2])=>{c.beginPath();c.moveTo(a,y);c.lineTo(b2,y+.01);c.stroke()});
 const dot=(x,y,r,col)=>{c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=col;c.fill()};
 if(mood==='scared'){c.lineWidth=.02;[[.43],[.57]].forEach(([x])=>{c.beginPath();c.moveTo(x-.03,.43);c.lineTo(x+.03,.47);c.moveTo(x+.03,.43);c.lineTo(x-.03,.47);c.stroke()});
  c.beginPath();c.ellipse(.5,.55,.035,.045,0,0,7);c.fillStyle='#5a221c';c.fill();dot(.7,.42,.025,'#7fd3ff')}
 else{dot(.43,.45,.022,OL);dot(.57,.45,.022,OL);c.beginPath();c.arc(.5,.51,.04,.2,Math.PI-.2);c.lineWidth=.018;c.stroke()}
 c.globalAlpha=.7;dot(.37,.52,.03,'#ffb3c0');dot(.63,.52,.03,'#ffb3c0');c.globalAlpha=1};
S.goldNugget=c=>{c.beginPath();c.moveTo(.2,.8);c.lineTo(.35,.45);c.lineTo(.65,.4);c.lineTo(.82,.78);c.closePath();c.fillStyle='#ffd23f';c.fill();c.lineWidth=.06;c.strokeStyle=OL;c.stroke();circ(c,.45,.55,.06,'#fff3a0',false)};
window.S=S;
