(function(){
  const svg=document.getElementById('route'),ghost=document.getElementById('ghost'),live=document.getElementById('live'),aig=document.getElementById('aig');
  const hops=[...document.querySelectorAll('[data-hop]')];
  const LOOP_AT=2; // index of the Director hop (hop 3)
  const NS='http://www.w3.org/2000/svg';
  function el(n,a){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e}
  function build(){
    const W=document.documentElement.clientWidth,H=document.documentElement.scrollHeight;
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.height=H+'px';
    [...svg.querySelectorAll('circle,text')].forEach(c=>c.remove());aig.innerHTML='';
    let px=W*0.5,py=window.innerHeight*0.78,d=`M ${px} ${py}`;
    const pts=[[px,py]];
    hops.forEach((h,i)=>{
      const r=h.getBoundingClientRect();const isV=h.classList.contains('verdict');
      const y=r.top+window.scrollY+(isV?40:r.height*0.3);
      const x=isV?W*0.5:(h.classList.contains('r')?W*0.44:W*0.56);
      const cy=(py+y)/2;
      d+=` C ${px} ${cy}, ${x} ${cy}, ${x} ${y}`;
      if(i===LOOP_AT){
        const R=Math.min(100,W*0.08);
        d+=` c ${R*1.4} ${-R*0.6}, ${R*1.4} ${R*1.6}, 0 ${R*0.9} c ${-R*0.9} ${-R*0.5}, ${-R*0.6} ${-R*1.1}, 0 ${-R*0.9}`;
        svg.appendChild(el('text',{x:x+R*1.5,y:y+R*0.55})).textContent='LOOP · fill the gaps';
      }
      svg.appendChild(el('circle',{cx:x,cy:y,r:5}));
      pts.push([x,y]);px=x;py=y;
    });
    ghost.setAttribute('d',d);live.setAttribute('d',d);
    const L=live.getTotalLength();live.style.strokeDasharray=L;live.style.strokeDashoffset=L;live.dataset.len=L;
    const off=22;
    for(let i=1;i<pts.length;i++){
      const [x0,y0]=pts[i-1],[x1,y1]=pts[i];const cy=(y0+y1)/2;
      const seg=el('path',{class:'ai',d:`M ${x0+off} ${y0} C ${x0+off} ${cy}, ${x1+off} ${cy}, ${x1+off} ${y1}`,'stroke-width':(0.4+i*0.7).toFixed(2),opacity:(0.08+i*0.13).toFixed(2)});
      if(i<2)seg.setAttribute('stroke-dasharray','1 10');else if(i<4)seg.setAttribute('stroke-dasharray','3 8');else if(i<6)seg.setAttribute('stroke-dasharray','9 5');
      aig.appendChild(seg);
    }
    onScroll();
  }
  const REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onScroll(){
    const L=+live.dataset.len||0;const max=document.documentElement.scrollHeight-window.innerHeight;
    const p=Math.min(1,Math.max(0,(window.scrollY+window.innerHeight*0.6)/(max+window.innerHeight*0.6)));
    live.style.strokeDashoffset=REDUCED?0:L*(1-p);
    let n=0;hops.forEach(h=>{if(h.getBoundingClientRect().top<window.innerHeight*0.7)n=+h.dataset.hop});
    document.getElementById('hopnum').textContent=n;
  }
  if(REDUCED){hops.forEach(h=>h.classList.add('in'))}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
  hops.forEach(h=>io.observe(h));
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',build);
  document.fonts?document.fonts.ready.then(build):build();
  setTimeout(build,800);
})();
