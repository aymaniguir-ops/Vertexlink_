(function(){
  'use strict';

  /* Cursor */
  const cur = document.getElementById('vl-cursor');
  const ring = document.getElementById('vl-ring');
  if(cur && ring){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
    (function lr(){ rx+=(mx-rx)*.09; ry+=(my-ry)*.09; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(lr); })();
    document.querySelectorAll('a,button,[data-h]').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ cur.classList.add('h'); ring.classList.add('h'); });
      el.addEventListener('mouseleave',()=>{ cur.classList.remove('h'); ring.classList.remove('h'); });
    });
  }

  /* Progress */
  const prog = document.getElementById('vl-prog');
  if(prog) window.addEventListener('scroll',()=>{
    const d=document.documentElement;
    prog.style.width=(d.scrollTop/(d.scrollHeight-d.clientHeight)*100)+'%';
  },{passive:true});

  /* Nav scroll */
  const nav = document.querySelector('.nav');
  if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});

  /* Burger */
  const burger=document.querySelector('.nav__burger');
  const mnav=document.querySelector('.mobile-nav');
  if(burger&&mnav){
    burger.addEventListener('click',()=>{ burger.classList.toggle('open'); mnav.classList.toggle('open'); });
    mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ burger.classList.remove('open'); mnav.classList.remove('open'); }));
  }

  /* Scroll reveal */
  const els=document.querySelectorAll('[data-r]');
  if(els.length){
    const ro=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); ro.unobserve(e.target); } }),{rootMargin:'0px 0px -50px 0px',threshold:.06});
    els.forEach(el=>ro.observe(el));
  }

  /* Score bars */
  document.querySelectorAll('.score-wrap').forEach(wrap=>{
    const so=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;
      wrap.querySelectorAll('.score-fill').forEach((f,i)=>setTimeout(()=>f.style.width=f.dataset.v+'%',i*120+180));
      so.unobserve(wrap);
    }),{threshold:.3});
    so.observe(wrap);
  });

  /* Counters */
  document.querySelectorAll('[data-count]').forEach(el=>{
    const co=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const target=parseInt(el.dataset.count),suf=el.dataset.suf||'',dur=1100,st=performance.now();
      (function t(now){ const p=Math.min((now-st)/dur,1),v=Math.round(p*p*target); el.textContent=v+suf; p<1?requestAnimationFrame(t):el.textContent=target+suf; })(performance.now());
      co.unobserve(el);
    }),{threshold:.5});
    co.observe(el);
  });

  /* Magnetic buttons */
  document.querySelectorAll('.btn--acc,.btn--wt').forEach(b=>{
    b.addEventListener('mousemove',e=>{ const r=b.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.15,y=(e.clientY-r.top-r.height/2)*.15; b.style.transform=`translate(${x}px,${y}px) translateY(-2px)`; });
    b.addEventListener('mouseleave',()=>b.style.transform='');
  });

})();
