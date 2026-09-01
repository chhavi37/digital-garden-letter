const field = document.getElementById('flowerField');
const hues = [340, 320, 280, 40, 10, 200, 0];

function makePetalFlower(x, hue, size, isDot){
  const flower = document.createElement('div');
  flower.className = 'flower' + (isDot ? ' dot' : '');
  const stemH = 30 + Math.random()*40;
  flower.style.left = x + 'px';
  flower.style.animationDelay = (Math.random()*1.2)+'s, '+(Math.random()*3)+'s';
  flower.style.height = (stemH + size) + 'px';
  flower.style.width = size*2 + 'px';
  flower.style.setProperty('--hue', hue);

  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.height = stemH + 'px';
  flower.appendChild(stem);

  const bloom = document.createElement('div');
  bloom.className = 'bloom';
  bloom.style.bottom = stemH + 'px';
  bloom.style.left = '50%';

  const petalCount = isDot ? 5 : 6;
  const petalW = size * (isDot ? 0.5 : 0.62);
  const petalH = size * (isDot ? 0.7 : 0.95);
  for(let i=0;i<petalCount;i++){
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.width = petalW + 'px';
    petal.style.height = petalH + 'px';
    petal.style.transform = `rotate(${i*(360/petalCount)}deg) translate(-50%,-100%)`;
    bloom.appendChild(petal);
  }
  const center = document.createElement('div');
  center.className = 'center';
  const cs = size*0.34;
  center.style.width = cs+'px';
  center.style.height = cs+'px';
  bloom.appendChild(center);

  flower.appendChild(bloom);
  return flower;
}

function plantFlower(x){
  const isDot = Math.random() < 0.35;
  const size = isDot ? 8 + Math.random()*6 : 14 + Math.random()*12;
  const hue = hues[Math.floor(Math.random()*hues.length)];
  const f = makePetalFlower(x, hue, size, isDot);
  field.appendChild(f);
  if(field.children.length > 140){ field.removeChild(field.firstChild); }
}

function plantGrass(x){
  const g = document.createElement('div');
  g.className = 'grass';
  g.style.left = x + 'px';
  g.style.height = (16 + Math.random()*22) + 'px';
  g.style.animationDelay = (Math.random()*3)+'s';
  field.appendChild(g);
}

function seedGarden(){
  const w = window.innerWidth;
  for(let i=0;i<70;i++) plantGrass(Math.random()*w);
  for(let i=0;i<48;i++) plantFlower(Math.random()*w);
}
seedGarden();
window.addEventListener('resize', () => {
  field.innerHTML='';
  seedGarden();
});

field.addEventListener('click', (e)=>{
  plantFlower(e.clientX);
});

/* clouds */
const skyEl = document.querySelector('.sky');
for(let i=0;i<4;i++){
  const c = document.createElement('div');
  c.className = 'cloud';
  const w = 80 + Math.random()*70, h = w*0.42;
  c.style.width = w+'px'; c.style.height = h+'px';
  c.style.top = (5 + Math.random()*22) + 'vh';
  c.style.animationDuration = (40 + Math.random()*30) + 's';
  c.style.animationDelay = (-Math.random()*40) + 's';
  document.body.appendChild(c);
}

/* butterflies */
const bWrap = document.getElementById('butterflies');
const bEmojis = ['🦋','🐝'];
for(let i=0;i<3;i++){
  const b = document.createElement('div');
  b.className = 'butterfly';
  b.textContent = bEmojis[i % bEmojis.length];
  b.style.animationDuration = (12 + Math.random()*8)+'s, 1s';
  b.style.animationDelay = (-Math.random()*10)+'s, '+(Math.random())+'s';
  bWrap.appendChild(b);
}

/* falling petals */
const fallEmojis = ['🌸','🌺','🍃'];
setInterval(()=>{
  const p = document.createElement('div');
  p.className = 'petal-fall';
  p.textContent = fallEmojis[Math.floor(Math.random()*fallEmojis.length)];
  p.style.left = (Math.random()*100)+'vw';
  p.style.setProperty('--drift', (Math.random()*80-40)+'px');
  p.style.animationDuration = (7+Math.random()*5)+'s';
  document.body.appendChild(p);
  setTimeout(()=>p.remove(), 13000);
}, 2600);

/* ---------------- LETTER CUSTOMIZATION ---------------- */
const root = document.documentElement;

const paperColors = ['#FFFBF3','#FDE2E9','#EDE3F7','#E1F1E2','#E4EEFB','#FFF3D6'];
const sealColors = ['#E1728F','#C4444F','#6B9A5E','#D9A441','#9B7FC0','#4A6B3A'];
const fonts = [
  {label:'Caveat', value:"'Caveat', cursive"},
  {label:'Shadows Into Light', value:"'Shadows Into Light', cursive"},
  {label:'Homemade Apple', value:"'Homemade Apple', cursive"}
];
const stickerEmojis = ['🌸','🌷','🌻','🌼','🌹','💐','🦋','🐝','🐞','🌿','🍃','✨','💛','💌','🕊️','🍄','🌈','☀️','🐌','🪻'];

function buildSwatches(container, colors, varName, sealEl){
  colors.forEach((color, i)=>{
    const btn = document.createElement('button');
    btn.className = 'swatch' + (i===0 ? ' active':'');
    btn.style.background = color;
    btn.title = color;
    btn.addEventListener('click', ()=>{
      root.style.setProperty(varName, color);
      container.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active'));
      btn.classList.add('active');
    });
    container.appendChild(btn);
  });
}
buildSwatches(document.getElementById('paperSwatches'), paperColors, '--paper');
buildSwatches(document.getElementById('sealSwatches'), sealColors, '--seal');

const fontContainer = document.getElementById('fontOptions');
fonts.forEach((f, i)=>{
  const btn = document.createElement('button');
  btn.className = 'font-btn' + (i===0 ? ' active':'');
  btn.style.fontFamily = f.value;
  btn.textContent = 'Aa — ' + f.label;
  btn.addEventListener('click', ()=>{
    root.style.setProperty('--font-letter', f.value);
    fontContainer.querySelectorAll('.font-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
  fontContainer.appendChild(btn);
});

const stickerGrid = document.getElementById('stickerGrid');
const stickerLayer = document.getElementById('stickerLayer');
const letter = document.getElementById('letter');

stickerEmojis.forEach(emoji=>{
  const btn = document.createElement('button');
  btn.className = 'sticker-btn';
  btn.textContent = emoji;
  btn.addEventListener('click', ()=> addSticker(emoji));
  stickerGrid.appendChild(btn);
});

function addSticker(emoji){
  const el = document.createElement('div');
  el.className = 'sticker';
  el.textContent = emoji;
  const rect = letter.getBoundingClientRect();
  const x = rect.width*0.25 + Math.random()*rect.width*0.5;
  const y = rect.height*0.2 + Math.random()*rect.height*0.5;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.transform = `rotate(${Math.random()*30-15}deg)`;
  makeDraggable(el);
  el.addEventListener('dblclick', ()=> el.remove());
  stickerLayer.appendChild(el);
}

function makeDraggable(el){
  let offsetX=0, offsetY=0, dragging=false;
  el.addEventListener('pointerdown', (e)=>{
    dragging = true;
    el.setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    offsetX = e.clientX - r.left;
    offsetY = e.clientY - r.top;
  });
  el.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    const lr = letter.getBoundingClientRect();
    let x = e.clientX - lr.left - offsetX;
    let y = e.clientY - lr.top - offsetY;
    x = Math.max(-10, Math.min(lr.width-10, x));
    y = Math.max(-10, Math.min(lr.height-10, y));
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  });
  el.addEventListener('pointerup', ()=> dragging=false);
  el.addEventListener('pointercancel', ()=> dragging=false);
}

document.getElementById('clearStickersBtn').addEventListener('click', ()=>{
  stickerLayer.innerHTML = '';
});

document.getElementById('resetBtn').addEventListener('click', ()=>{
  root.style.setProperty('--paper', paperColors[0]);
  root.style.setProperty('--seal', sealColors[0]);
  root.style.setProperty('--font-letter', fonts[0].value);
  document.querySelectorAll('.swatch').forEach((s,i)=>s.classList.toggle('active', false));
  document.querySelectorAll('#paperSwatches .swatch')[0].classList.add('active');
  document.querySelectorAll('#sealSwatches .swatch')[0].classList.add('active');
  document.querySelectorAll('.font-btn').forEach((b,i)=>b.classList.toggle('active', i===0));
  stickerLayer.innerHTML = '';
  document.getElementById('toField').textContent='';
  document.getElementById('messageField').textContent='';
  document.getElementById('fromField').textContent='';
});

document.getElementById('downloadBtn').addEventListener('click', ()=>{
  const btn = document.getElementById('downloadBtn');
  const original = btn.textContent;
  btn.textContent = 'Preparing your letter…';
  html2canvas(letter, {backgroundColor:null, scale:2}).then(canvas=>{
    const link = document.createElement('a');
    link.download = 'garden-letter.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.textContent = original;
  }).catch(()=>{ btn.textContent = original; });
});
