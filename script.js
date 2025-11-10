window.addEventListener('load', () => {
  const creditsContainer = document.querySelector('.credits');
  const creditText = document.querySelector('.credit-text');
  const windSound = document.getElementById('wind-sound');
  const mapScreen = document.getElementById('map-screen');
  const mapContainer = document.getElementById('map-container');

  // Música do mapa
  const mapMusic = new Audio('musica_mapa.mp3');
  mapMusic.loop = true; mapMusic.volume = 0.3;

  // Tentar tocar som do vento
  const tryPlayAudio = () => {
    const playPromise = windSound.play();
    if(playPromise !== undefined){
      playPromise.catch(()=>{document.addEventListener('click',()=>windSound.play(),{once:true});});
    }
  };
  tryPlayAudio();

  setTimeout(()=>{
    creditText.classList.add('fade-out-paragraphs');
    document.addEventListener('click', handleScreenClick, {once:true});
  },16000);

  function handleScreenClick(){
    creditsContainer.style.transition='opacity 1s ease-in-out';
    creditsContainer.style.opacity=0;
    fadeOutAudio(windSound,1000,()=>{
      windSound.pause(); windSound.currentTime=0;
      fadeInAudio(mapMusic,2000);
    });
    setTimeout(()=>{creditsContainer.style.display='none'; mapScreen.classList.add('active'); generateParticles(); startShootingStars();},1000);
  }

  function fadeOutAudio(audio,duration,callback){
    const step=audio.volume/(duration/50);
    const fade=setInterval(()=>{
      if(audio.volume>step){audio.volume-=step;}
      else{audio.volume=0; clearInterval(fade); if(callback)callback();}
    },50);
  }

  function fadeInAudio(audio,duration){
    audio.volume=0; audio.play();
    const step=1/(duration/50);
    const fade=setInterval(()=>{
      if(audio.volume<1){audio.volume+=step;}
      else{audio.volume=1; clearInterval(fade);}
    },50);
  }

  // Tooltip
  const tooltip=document.getElementById('tooltip');
  document.addEventListener('mousemove',e=>{
    const target = e.target.closest('.clickable-area');
    if(target){
      tooltip.style.left=e.pageX+15+'px';
      tooltip.style.top=e.pageY+15+'px';
      tooltip.innerText=target.dataset.tooltip;
      tooltip.style.opacity=1;

      // Zoom suave no mapa
      mapContainer.style.transform='translate(-50%,-50%) scale(1.02)';
    } else {
      tooltip.style.opacity=0;
      mapContainer.style.transform='translate(-50%,-50%) scale(1)';
    }
  });

  // Partículas flutuantes
  function generateParticles(){
    const container=document.getElementById('particles-container');
    for(let i=0;i<50;i++){
      const p=document.createElement('div');
      p.classList.add('particle');
      p.style.left=Math.random()*100+'%';
      p.style.top=Math.random()*100+'%';
      p.style.animationDuration=(5+Math.random()*5)+'s';
      container.appendChild(p);
    }
  }

  // Estrelas cadentes
  function startShootingStars(){
    setInterval(()=>{
      const star=document.createElement('div');
      star.classList.add('particle');
      star.style.width='2px'; star.style.height='2px';
      star.style.left=Math.random()*100+'%';
      star.style.top='-5px';
      star.style.background='white';
      star.style.opacity=1;
      star.style.animationDuration='1s';
      star.style.animationName='shootStar';
      document.getElementById('map-screen').appendChild(star);
      setTimeout(()=>{star.remove();},1000);
    },3000);
  }

});

// Funções de pop-up
function openPopup(imageSrc){
  const popup=document.getElementById('popup');
  const popupImg=document.getElementById('popup-img');
  popupImg.src=imageSrc;
  popup.classList.add('show');
}
function closePopup(){
  const popup=document.getElementById('popup');
  popup.classList.remove('show');
}
