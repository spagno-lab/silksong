'use strict';
const KEY='silksong-field-guide-v1';
let state={};try{state=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{}
if(!state||typeof state!=='object'||Array.isArray(state))state={};
const checks=[...document.querySelectorAll('[data-check]')],page=document.body.dataset.page;
function toast(s){const t=document.querySelector('#toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500)}
function paint(){for(const c of checks){c.checked=!!state[c.dataset.check];c.closest('li').classList.toggle('done',c.checked)}
 const chapterCounts=state._chapters||{};chapterCounts[page]=checks.filter(c=>c.checked).length;state._chapters=chapterCounts;
 for(const p of window.GUIDE_PAGES){const a=document.querySelector(`nav [data-page="${p.id}"]`);if(a){if(p.id===page)a.setAttribute('aria-current','page');a.querySelector('span').textContent=p.count?`${chapterCounts[p.id]||0}/${p.count}`:''}}
 const total=window.GUIDE_PAGES.reduce((n,p)=>n+p.count,0),done=window.GUIDE_PAGES.reduce((n,p)=>n+(chapterCounts[p.id]||0),0);document.querySelector('#total').textContent=`${done} / ${total} checklist entries · includes alternate branches`;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{toast('Browser storage unavailable. Export progress to keep a copy.')}}
for(const c of checks)c.addEventListener('change',()=>{if(c.checked)state[c.dataset.check]=true;else delete state[c.dataset.check];paint();save()});
paint();
const search=document.querySelector('#search'),results=document.querySelector('#results');
search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();results.replaceChildren();if(q.length<2)return;const found=window.GUIDE_PAGES.filter(p=>(p.title+' '+p.text).toLowerCase().includes(q));for(const p of found.slice(0,20)){const a=document.createElement('a');a.href=p.id+'.html';a.textContent=p.title;const small=document.createElement('small'),i=p.text.toLowerCase().indexOf(q);small.textContent=p.text.slice(Math.max(0,i-45),i+140).replace(/\s+/g,' ');a.append(small);results.append(a)}if(!found.length)results.textContent='No matching chapters.'});
document.querySelector('#export').onclick=()=>{const blob=new Blob([JSON.stringify({format:KEY,exported:new Date().toISOString(),progress:state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='silksong-progress-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
document.querySelector('#import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;const data=JSON.parse(await file.text());if(data.format!==KEY||!data.progress||typeof data.progress!=='object'||Array.isArray(data.progress))throw Error();const next={};for(const [k,v]of Object.entries(data.progress))if(/^[a-f0-9]{16}-\d+$/.test(k)&&v===true)next[k]=true;const counts=data.progress._chapters;next._chapters={};for(const p of window.GUIDE_PAGES)if(Number.isInteger(counts?.[p.id])&&counts[p.id]>=0&&counts[p.id]<=p.count)next._chapters[p.id]=counts[p.id];if(!confirm('Replace this browser’s checklist progress with the imported copy?'))return;state=next;paint();save();toast('Progress imported.')}catch{toast('This is not a valid Silksong progress export.')}finally{e.target.value=''}};
document.querySelector('#reset').onclick=()=>{if(confirm('Clear all checklist progress in this browser? Export a copy first if needed.')){state={};paint();save();toast('Progress reset.')}};
document.querySelector('#print').onclick=()=>window.print();
document.querySelector('#menu').onclick=()=>{const b=document.querySelector('#menu');const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)};
