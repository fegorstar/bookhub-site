/* ======== countdown logic (unchanged core) ========= */
(function(){
    const ids = {days:'days',hours:'hours',mins:'mins',secs:'secs'};
    const els = Object.fromEntries(
                 Object.entries(ids).map(([k,id])=>[k,document.getElementById(id)]));
    if(!els.days) return;
  
    const target = new Date('2025-10-06T09:00:00+01:00').getTime();
  
    function tick(){
      const diff = target - Date.now();
      if(diff<=0){
        Object.values(els).forEach(e=>e.textContent='00');
        clearInterval(t); return;
      }
      const s = Math.floor(diff/1000)%60;
      const m = Math.floor(diff/60000)%60;
      const h = Math.floor(diff/3600000)%24;
      const d = Math.floor(diff/86400000);
  
      els.days .textContent = String(d).padStart(2,'0');
      els.hours.textContent = String(h).padStart(2,'0');
      els.mins .textContent = String(m).padStart(2,'0');
      els.secs .textContent = String(s).padStart(2,'0');
    }
    const t = setInterval(tick,1000); tick();
  })();
  

(function(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.querySelectorAll('.oa-icon').forEach(el=>el.style.animation='none');
    }
  })();

  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slide-track');
    const slides = Array.from(track.children);
    
    // 1. Duplicate slides for seamless loop
    slides.forEach(slide => track.appendChild(slide.cloneNode(true)));
    
    // 2. Measure total width of one set
    const singleSetWidth = slides.reduce((sum, slide) => 
      sum + slide.getBoundingClientRect().width + parseFloat(getComputedStyle(slide).marginLeft) + parseFloat(getComputedStyle(slide).marginRight)
    , 0);
    
    // 3. Compute animation duration (pixels per second)
    const speed = 100; // px per second
    const duration = singleSetWidth / speed; // seconds
    
    // 4. Inject keyframes with dynamic distance
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes scrollLogos {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-${singleSetWidth}px); }
      }
      .slide-track {
        animation: scrollLogos ${duration}s linear infinite;
      }
    `;
    document.head.appendChild(styleTag);
  });