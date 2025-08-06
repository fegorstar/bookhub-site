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

  const speakers = [
    {
      id: 'aworh',
      img: '/assets/images/speaker one.jpeg',            
      name: 'Prof. Ogugua Charles Aworh',
      role: 'Renowned Food Technologist and former Chair, TETFund Technical Advisory Group (TAG)',
      bio: `<div class="profile">
  <p><strong>PROFILE OF PROFESSOR OGUGUA CHARLES AWORH</strong></p>
  <p>Emeritus Professor of Food Technology and founding George Coumantaros Distinguished Professor (2018–2021) in the Department of Food Technology, University of Ibadan; Past President (2022–2024) of the International Academy of Food Science and Technology; Member of the Board of Directors, Global Harmonization Institute; Fellow of the African Academy of Sciences. His research spans post-harvest physiology and utilization of tropical fruits and vegetables, African traditional foods, food biotechnology and safety. He’s the author of <em>Lesser-known Nigerian Fruits and Vegetables</em> and Editor of <em>Nutritional and Health Aspects of Food in Western Africa</em>. Awarded the Lifetime Achievement Award of the Nigerian Institute of Food Science and Technology (2014) and the inaugural World Food Prize Foundation Top Agri-Food Pioneer Award (2024). Read more about Prof. Aworh here: <a href="https://www.ui.edu.ng/people/ogugua-aworh" target="_blank">https://www.ui.edu.ng/people/ogugua-aworh</a></p>
</div>
`
    },
  
    {
      id: 'joe',
      img: './assets/images/joe.png',
      name: 'Prof. Joe Deville',
      role: 'Managing Director, Open Book Collective | Co-Founder, Mattering Press & ScholarLed',
      bio: `Prof. Joe Deville is a senior lecturer based jointly in the Department of Organisation, Work and Technology and the Department of Sociology. His research interests include: the everyday, embodied life of debt, credit, and finance; informational mobility, methods of algorithmic prediction, futures of credit scoring; open access and the politics of academic knowledge production; disaster preparedness and the production/materialisation of risk; science and technology studies, speculative sociology, non-representational theory; digital methods. Read more about Joe Deville here: <a href="https://www.lancaster.ac.uk/lums/people/joseph-deville" target="_blank">https://www.lancaster.ac.uk/lums/people/joseph-deville</a>.`
    }
    
  ];
  
  /* ===================  RENDER CARDS  =================== */
  const grid = document.getElementById('speakerGrid');
  speakers.forEach(sp => {
    const card = document.createElement('article');
    card.className = 'speaker-card';
    card.dataset.id = sp.id;
    card.innerHTML = `
      <img src="${sp.img}" alt="Portrait of ${sp.name}">
      <div class="card-body">
        <h3 class="speaker-name">${sp.name}</h3>
        <p class="speaker-role">${sp.role}</p>
      </div>`;
    grid.appendChild(card);
  });
  
  /* ===================  MODAL LOGIC  =================== */
  const backdrop   = document.getElementById('speakerModal');
  const modalImg   = document.getElementById('modalImg');
  const modalName  = document.getElementById('modalName');
  const modalRole  = document.getElementById('modalRole');
  const modalBio   = document.getElementById('modalBio');
  const modalToggle= document.getElementById('modalToggle');
  
  /* open modal with speaker data */
  function showModal(sp){
    modalImg.src = sp.img;
    modalImg.alt = `Portrait of ${sp.name}`;
    modalName.textContent = sp.name;
    modalRole.textContent = sp.role;
    modalBio.innerHTML  = sp.bio; // Use innerHTML to render HTML content
    modalToggle.open = false;              // collapsed by default
    backdrop.hidden = false;
    document.body.style.overflow='hidden'; // lock scroll
  }
  
  /* card click */
  grid.addEventListener('click', e=>{
    const card = e.target.closest('.speaker-card');
    if(!card) return;
    const sp = speakers.find(s=>s.id===card.dataset.id);
    if(sp) showModal(sp);
  });
  
  /* close handlers */
  backdrop.addEventListener('click', e=>{
    if(e.target===backdrop || e.target.classList.contains('modal-close')){
      backdrop.hidden = true;
      document.body.style.overflow='';
    }
  });