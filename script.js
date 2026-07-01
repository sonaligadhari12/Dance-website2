const styles = [
  {id:'bollywood', icon:'⭐', name:'Bollywood', origin:'India', mood:'Expressive storytelling'},
  {id:'hiphop', icon:'🧢', name:'Hip Hop', origin:'USA', mood:'Groove and confidence'},
  {id:'salsa', icon:'🌶️', name:'Salsa', origin:'Cuba', mood:'Partner rhythm'},
  {id:'ballet', icon:'🩰', name:'Ballet', origin:'Europe', mood:'Grace and posture'},
  {id:'kathak', icon:'💫', name:'Kathak', origin:'North India', mood:'Rhythm and spins'},
  {id:'bharatanatyam', icon:'🏛️', name:'Bharatanatyam', origin:'Tamil Nadu', mood:'Classical devotion'},
  {id:'jazz', icon:'🎷', name:'Jazz', origin:'USA', mood:'Sharp energy'},
  {id:'contemporary', icon:'🌙', name:'Contemporary', origin:'Global', mood:'Emotion and flow'},
  {id:'folk', icon:'🥁', name:'Folk Dance', origin:'Cultural', mood:'Community celebration'},
  {id:'freestyle', icon:'🔥', name:'Freestyle', origin:'Urban', mood:'Personal expression'}
];
const ageData = {
  kids:{label:'Kids', range:'4–12 Years', tone:'fun, playful and safe', benefits:['Builds coordination','Improves confidence','Teaches rhythm','Encourages teamwork'], time:'15–25 minutes', level:'Beginner', imageAge:'children'},
  teens:{label:'Teens', range:'13–18 Years', tone:'stylish, energetic and expressive', benefits:['Builds stage presence','Improves fitness','Boosts self-expression','Develops discipline'], time:'30–45 minutes', level:'Beginner to Intermediate', imageAge:'teen'},
  adults:{label:'Adults', range:'19+ Years', tone:'confident, expressive and wellness-focused', benefits:['Reduces stress','Improves stamina','Supports flexibility','Builds confidence'], time:'35–60 minutes', level:'All levels', imageAge:'adult'}
};
const descriptions = {
  bollywood:'Bollywood dance mixes music, drama, hand gestures, facial expressions and joyful movement. It is easy to enjoy because the steps connect naturally with popular songs and storytelling.',
  hiphop:'Hip Hop focuses on bounce, groove, rhythm, isolation and attitude. It is perfect for building confidence, musical timing and personal style.',
  salsa:'Salsa is a lively Latin dance built around rhythm, footwork and partner connection. It teaches coordination, timing and social confidence.',
  ballet:'Ballet develops posture, balance, control and graceful movement. It is ideal for building discipline, body awareness and elegant technique.',
  kathak:'Kathak uses footwork, spins, hand gestures and storytelling. It connects rhythm with expression and gives learners a strong cultural foundation.',
  bharatanatyam:'Bharatanatyam is a classical Indian dance form combining expression, geometry, rhythm and devotion. It builds discipline, strength and cultural understanding.',
  jazz:'Jazz dance is sharp, energetic and performance-focused. It combines kicks, turns, rhythm, style and expressive body movement.',
  contemporary:'Contemporary dance focuses on emotion, flow, floor work and expressive movement. It helps dancers communicate feelings through the body.',
  folk:'Folk dance celebrates tradition, community and cultural identity. It is joyful, rhythmic and easy to connect with in groups.',
  freestyle:'Freestyle encourages dancers to create their own movement. It develops creativity, musicality and confidence without strict rules.'
};
let currentAge='kids';let currentStyle='bollywood';
const styleButtons=document.getElementById('styleButtons');
const styleGrid=document.getElementById('styleGrid');
function imageUrl(age, style){
  const q = `${ageData[age].imageAge},${styles.find(s=>s.id===style).name},dance,human,stage`;
  const sig = (Object.keys(ageData).indexOf(age)+1)*100 + styles.findIndex(s=>s.id===style)+1;
  return `https://source.unsplash.com/1200x900/?${encodeURIComponent(q)}&sig=${sig}`;
}
function renderButtons(){
  styleButtons.innerHTML=styles.map(s=>`<button class="style-btn ${s.id===currentStyle?'active':''}" data-style="${s.id}"><span>${s.icon}</span>${s.name}</button>`).join('');
  document.querySelectorAll('.style-btn').forEach(btn=>btn.onclick=()=>{currentStyle=btn.dataset.style;renderAll();});
}
function renderPanel(){
  const age=ageData[currentAge];const style=styles.find(s=>s.id===currentStyle);
  document.getElementById('breadcrumb').textContent=`Home • ${age.label} (${age.range}) • ${style.name}`;
  document.getElementById('lessonTitle').textContent=`${style.name} for ${age.label}`;
  document.getElementById('lessonTagline').textContent=`${style.mood} • ${age.tone}.`;
  document.getElementById('lessonDescription').innerHTML=`${descriptions[currentStyle]} For <b>${age.label.toLowerCase()}</b>, the learning focus is ${age.tone}, with simple progress, safe practice and clear musical understanding.`;
  document.getElementById('benefits').innerHTML=age.benefits.map(b=>`<div class="benefit"><span>✦</span>${b}</div>`).join('');
  document.getElementById('infoCards').innerHTML=`
    <div class="info-card"><b>Origin</b><span>${style.origin}</span></div>
    <div class="info-card"><b>Practice Time</b><span>${age.time}</span></div>
    <div class="info-card"><b>Level</b><span>${age.level}</span></div>
    <div class="info-card"><b>Beginner Lesson</b><span>Warm-up, basic steps, rhythm count and short combo.</span></div>`;
  const img=document.getElementById('lessonImage');
  img.src=imageUrl(currentAge,currentStyle);
  img.alt=`${age.label} performing ${style.name} dance`;
  img.onerror=()=>{img.style.display='none';document.querySelector('.lesson-image-card').style.background='linear-gradient(135deg,#18051f,#4b0f3f,#042a3a)';};
  document.getElementById('imageCaption').textContent=`${age.label} ${style.name} dance example`;
}
function renderGrid(){
  styleGrid.innerHTML=styles.map(s=>`<a href="#age" class="style-card" data-style="${s.id}"><img src="${imageUrl(currentAge,s.id)}" alt="${s.name} dance human example"><h3>${s.icon} ${s.name}</h3></a>`).join('');
  document.querySelectorAll('.style-card').forEach(card=>card.onclick=()=>{currentStyle=card.dataset.style;renderAll();});
}
function renderAll(){renderButtons();renderPanel();renderGrid();}
document.querySelectorAll('.age-tab').forEach(tab=>tab.onclick=()=>{currentAge=tab.dataset.age;document.querySelectorAll('.age-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');renderAll();});
renderAll();
