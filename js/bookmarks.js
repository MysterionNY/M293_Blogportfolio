const STORAGE_KEY='cp_bookmarks';
const $$=(q,r=document)=>r.querySelectorAll(q);
const $=(q,r=document)=>r.querySelector(q);
const gridsSel='.portfolio-grid, #portfolio-grid, .project-grid';

function getBookmarks(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch(e){return[]}}
function saveBookmarks(a){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(a))}catch(e){}}
function toggleBookmark(id){let set=new Set(getBookmarks());set.has(id)?set.delete(id):set.add(id);saveBookmarks([...set]);return[...set]}

let badge,drawer;
function updateBadge(c){badge||(badge=$('#bookmark-count'));if(!badge)return;badge.textContent=c;badge.hidden=c===0}
function buildDrawer(){drawer=document.createElement('aside');drawer.id='bookmark-drawer';drawer.innerHTML=`<div class="bm-backdrop" id="bm-backdrop"></div><div class="bm-panel"><header><h2>Merkliste</h2><button id="bm-close">×</button></header><ul id="bm-list"></ul></div>`;document.body.append(drawer);$('#bm-backdrop').onclick=closeDrawer;$('#bm-close').onclick=closeDrawer}
function openDrawer(){drawer||buildDrawer();renderDrawer();drawer.classList.add('open')}
function closeDrawer(){drawer?.classList.remove('open')}
function renderDrawer(){const l=$('#bm-list');if(!l)return;l.innerHTML='';const ids=getBookmarks();if(ids.length===0){l.innerHTML='<li class="bm-empty">Noch keine Projekte gemerkt.</li>';return}ids.forEach(id=>{const src=$(`[data-id="${id}"]`);if(!src)return;const clone=src.cloneNode(true);clone.querySelector('.bookmark-btn')?.remove();l.appendChild(clone)})}

function reorderGrids(){const order=getBookmarks();if(order.length===0)return;const orderMap=new Map(order.map((id,i)=>[id,i]));$$(gridsSel).forEach(grid=>{const items=[...grid.children];items.sort((a,b)=>{return (orderMap.has(a.dataset.id)?0:1)-(orderMap.has(b.dataset.id)?0:1)});items.forEach(el=>grid.appendChild(el))})}

window.addEventListener('DOMContentLoaded',()=>{
  // badge button
  if(!$('#bookmark-toggle')){const nav=$('nav')||document.body,btn=document.createElement('button');btn.id='bookmark-toggle';btn.innerHTML='<i class="fas fa-bookmark"></i><span id="bookmark-count" hidden>0</span>';btn.className='bookmark-head-btn';btn.onclick=openDrawer;nav.append(btn)}
  updateBadge(getBookmarks().length);
  reorderGrids();

  // click handling
  document.body.addEventListener('click',e=>{
    const btn=e.target.closest('.bookmark-btn');
    if(btn){const card=btn.closest('[data-id]');if(!card)return;const id=card.dataset.id;const arr=toggleBookmark(id);btn.classList.toggle('active',arr.includes(id));updateBadge(arr.length);reorderGrids();return}
  });

  // mark active hearts
  const current=new Set(getBookmarks());$$('.bookmark-btn').forEach(btn=>{const card=btn.closest('[data-id]');if(card&&current.has(card.dataset.id))btn.classList.add('active')})
});
