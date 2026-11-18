import fs from 'node:fs';
import {marked} from 'marked';
import crypto from 'node:crypto';
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
fs.mkdirSync('docs/assets',{recursive:true});
fs.cpSync('site/assets','docs/assets',{recursive:true});
const files=fs.readdirSync('guide').filter(f=>f.endsWith('.md')).sort();
const pages=files.map(file=>{
 const md=fs.readFileSync('guide/'+file,'utf8'),id=file.slice(0,-3),title=md.match(/^# (.+)/m)[1];
 let html=marked.parse(md,{gfm:true});
 html=html.replace(/href="([^"#:]+)\.md(#[^"]*)?"/g,(_,p,anchor)=>`href="${p.split('/').at(-1)}.html${anchor??''}"`)
 .replaceAll('../site/assets/','assets/');
 const duplicate=new Map();
 // Stable IDs depend on chapter and list-item text, so unrelated insertions preserve progress.
 html=html.replace(/<li>([\s\S]*?)<\/li>/g,(all,inner)=>{
  if(!inner.includes('type="checkbox"'))return all;
  const clean=inner.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").trim(),base=crypto.createHash('sha256').update(id+'|'+clean).digest('hex').slice(0,16),n=duplicate.get(base)??0;duplicate.set(base,n+1);
  return `<li class="task">${inner.replace('<input disabled="" type="checkbox">',`<input type="checkbox" data-check="${base}-${n}" aria-label="${esc(clean)}">`)}</li>`;
 });
 return {id,title,html,text:md.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/[#*\[\]`]/g,''),count:(html.match(/data-check=/g)||[]).length};
});
const nav=pages.map(p=>`<a href="${p.id}.html" data-page="${p.id}">${esc(p.title)}<span data-progress="${p.id}"></span></a>`).join('');
const shell=p=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#10212a"><meta name="description" content="A complete Silksong playthrough guide with missable-event checkpoints, ending order, maps and collection checklists."><title>${esc(p.title)} · Silksong Field Guide</title><link rel="stylesheet" href="site.css"><script src="search-data.js" defer></script><script src="site.js" defer></script></head><body data-page="${p.id}"><a class="skip" href="#main">Skip to guide</a><header><a class="brand" href="index.html"><span class="sigil">✧</span><span>SILKSONG<small>THE COMPLETIONIST’S FIELD GUIDE</small></span></a><button id="menu" aria-expanded="false" aria-controls="sidebar">Chapters</button><span class="spoilers">Full story spoilers</span></header><aside id="sidebar"><label for="search">SEARCH THE FIELD GUIDE</label><input id="search" type="search" placeholder="Try Lumble, Silkshot, endings…"><div id="results" aria-live="polite"></div><div class="total" id="total"></div><nav aria-label="Guide chapters">${nav}</nav><div class="tools"><button id="export">Export progress</button><label class="button" for="import">Import progress</label><input id="import" type="file" accept="application/json" hidden><button id="reset">Reset progress</button><button id="print">Print chapter</button></div><p class="fine">Progress stays in this browser.<br>Export a copy before changing devices.</p></aside><main id="main"><div class="eyebrow">PHARLOOM / FIELD NOTES / 18 NOV 2026</div><article>${p.html}</article><footer><p>Unofficial fan guide. Game imagery © Team Cherry. <a href="09-sources.html">Sources & credits</a></p><p>Compatible content in one run; exclusive branches need another. Checklist progress is not a save-file audit.</p></footer></main><div id="toast" role="status"></div></body></html>`;
for(const p of pages)fs.writeFileSync('docs/'+p.id+'.html',shell(p));
fs.writeFileSync('docs/index.html',shell(pages[0]));
fs.writeFileSync('docs/search-data.js','window.GUIDE_PAGES='+JSON.stringify(pages.map(({id,title,text,count})=>({id,title,text,count}))).replaceAll('<','\\u003c')+';');
for(const f of ['site.css','site.js'])fs.copyFileSync('site/'+f,'docs/'+f);
fs.writeFileSync('docs/.nojekyll','');
console.log(`Built ${pages.length} chapters and ${pages.reduce((n,p)=>n+p.count,0)} checkboxes.`);
