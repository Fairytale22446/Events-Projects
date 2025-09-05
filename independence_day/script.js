const $ = (sel, ctx=document) => ctx.querySelector(sel);

// Fireworks setup
const fw = $('#fireworks');
const ctx = fw.getContext('2d');
const DPR = Math.min(2, window.devicePixelRatio||1); 
function resizeCanvas(){
  fw.width = Math.floor(innerWidth*DPR);
  fw.height = Math.floor(innerHeight*DPR);
  fw.style.width = innerWidth+'px';
  fw.style.height = innerHeight+'px';
}
addEventListener('resize', resizeCanvas); resizeCanvas();

const particles = [];
function burst(x,y,count=80){
  for(let i=0;i<count;i++){
    const angle = Math.random()*Math.PI*2;
    const speed = 2 + Math.random()*4;
    particles.push({
      x:x*DPR, y:y*DPR,
      vx: Math.cos(angle)*speed*DPR,
      vy: Math.sin(angle)*speed*DPR,
      life: 60 + Math.random()*40,
      color: `hsl(${Math.floor(100+Math.random()*80)}, 90%, ${(60+Math.random()*20)}%)`,
      size: 1 + Math.random()*2
    });
  }
}
function step(){
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0,0,fw.width,fw.height);
  for(let i=particles.length-1;i>=0;i--){
    const p = particles[i];
    p.vy += 0.03*DPR;
    p.vx *= 0.995; p.vy *= 0.995;
    p.x += p.vx; p.y += p.vy; p.life -= 1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if(p.life<=0) particles.splice(i,1);
  }
  requestAnimationFrame(step);
}
step();

// Confetti
const cf = $('#confetti');
const cfx = cf.getContext('2d');
function resizeCf(){
  cf.width = Math.floor(innerWidth*DPR);
  cf.height = Math.floor(innerHeight*DPR);
  cf.style.width = innerWidth+'px';
  cf.style.height = innerHeight+'px';
}
addEventListener('resize', resizeCf); resizeCf();

const confetti = [];
function confettiBurst(n=120){
  for(let i=0;i<n;i++){
    confetti.push({
      x: Math.random()*cf.width, y: -Math.random()*100,
      w: 4 + Math.random()*6, h: 6 + Math.random()*10,
      vy: 1 + Math.random()*2, vx: -1 + Math.random()*2,
      rot: Math.random()*Math.PI, vr: -0.1 + Math.random()*0.2,
      color: `hsl(${Math.floor(100+Math.random()*80)}, 90%, 60%)`
    });
  }
}
function confettiStep(){
  cfx.clearRect(0,0,cf.width,cf.height);
  for(const c of confetti){
    c.vy += 0.01*DPR; c.x += c.vx; c.y += c.vy; c.rot += c.vr;
    cfx.save(); cfx.translate(c.x,c.y); cfx.rotate(c.rot);
    cfx.fillStyle = c.color; cfx.fillRect(-c.w/2,-c.h/2,c.w,c.h);
    cfx.restore();
  }
  for(let i=confetti.length-1;i>=0;i--){ if(confetti[i].y>cf.height+20) confetti.splice(i,1); }
  requestAnimationFrame(confettiStep);
}
confettiStep();

// Celebrate
$('#celebrateBtn').addEventListener('click', () => {
  burst(innerWidth*0.5, innerHeight*0.45);
  burst(innerWidth*0.2, innerHeight*0.65);
  burst(innerWidth*0.8, innerHeight*0.6);
  confettiBurst(180);
  showToast('🎉 Jeeay Pakistan!');
});

// Language toggle
$('#toggleLang').addEventListener('click', () => {
  document.querySelectorAll('[data-en]').forEach(el => el.toggleAttribute('hidden'));
  document.querySelectorAll('[data-ur]').forEach(el => el.toggleAttribute('hidden'));
});

// Share
$('#shareBtn').addEventListener('click', async () => {
  const shareData = {title:'Pakistan Zindabad', text:'Celebrate Pakistan’s Independence Day! 🇵🇰', url: location.href};
  if(navigator.share){
    try{ await navigator.share(shareData); } catch{}
  } else {
    try{ await navigator.clipboard.writeText(shareData.url); showToast('Link copied!'); } 
    catch{ showToast('Copy failed'); }
  }
});

// Toast
const toast = $('#toast');
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2000);
}
