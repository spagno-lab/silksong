import fs from 'node:fs';
import path from 'node:path';
const upstream=process.argv[2];
if(!upstream)throw Error('Pass the path to the upstream silksong-completionist checkout.');
const categories={tools:'Tools',crests:'Crests and Eva upgrades',abilities:'Abilities and Silk skills',bosses:'Bosses and minibosses',tasks:'Wishes and objectives',maskShards:'Mask Shards',spoolFragments:'Spool Fragments',fleas:'Fleas',memoryLockets:'Memory Lockets',craftmetals:'Craftmetals',paleOil:'Pale Oils',mossberries:'Mossberries',keys:'Keys',relics:'Relics',bellways:'Bellways',ventricaStations:'Ventrica stations',mappingSupplies:'Maps and mapping supplies',bellhome:'Bellhome purchases',mementos:'Mementos',silkeaters:'Silkeaters',upgrades:'Upgrades',huntersJournal:'Hunter’s Journal',materium:'Materium'};
const decode=s=>s.replace(/\\([\\'"nrt])/g,(_,c)=>({n:' ',r:' ',t:' '}[c]??c));
const stats=[];
for(const [key,title]of Object.entries(categories)){
 let p=path.join(upstream,'src/dictionary/categories',key+'.ts');if(!fs.existsSync(p))p+='x';
 const src=fs.readFileSync(p,'utf8'), names=[...src.matchAll(/^\s*name: "([^"\n]+)",/gm)];
 let lines=[`# ${title}`,'','Use alongside the route and checkpoint chapters. Act labels are reference stages, not a strict acquisition order. Mutually exclusive branches and mode-only entries are planning alternatives. Tick journal entries after completing the required notes, not merely discovering the creature.',''];
 if(key==='tools')lines.push('One Silkshot variant counts for Arsenal. Needle Phial and Snare Setter are quest tools rather than permanent Arsenal requirements.','');
 if(key==='bosses')lines.push('The list includes mode-exclusive entries. Automatic journal credit does not prove an encounter was played. Additional rematches are listed below.','');
 let count=0;
 for(let i=0;i<names.length;i++){
  const body=src.slice(names[i].index,names[i+1]?.index??src.length);if(!/\bparsingInfo:/.test(body))continue;
  const name=names[i][1];let act=body.match(/whichAct:\s*(\d+)/)?.[1];const map=body.match(/mapLink:\s*"([^"\n]+)"/)?.[1];
  const detail=body.match(/completionDetails:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/s)?.[1];
  let desc=detail?decode(detail.slice(1,-1)).replace(/\s+/g,' ').trim():'';
  if(name==='Magnetite Dice')desc='Blasted Steps, west of the Bellway: win Lumble’s game after he runs out of Rosaries. Play BEFORE Clawline or Cogwork Dancers; later recovery of the tool does not preserve the minigame.';
  if(name==='Choral Commandment · Whiteward (#2)'){act='3';desc='Recommended route: return with Silk Soar in Act 3 to reach the hidden upper passage near the map machine and the Silk Siphon room. Safe to leave until then; this relic is not a pre-Act 3 checkpoint. The wiki reports a precise Faydown Cloak jump as an early alternative, but this guide does not validate or require that difficult manoeuvre. [Source](https://hollowknight.wiki/w/Choral_Commandment)';}
  if(name==='Weaver Effigy · Shellwood')desc='Chapel of the Witch, eastern side: accessible immediately after Rite of Rebirth while cursed. Go right from the awakening room, break the vines, and climb the walls above the pool. No Witch Crest, Silk Soar or Act 3 required. [Requirements](https://hollowknight.wiki/w/Weaver_Effigy)';
  if(name==='Rune Harp · High Halls')desc='Conductor Ballador’s room in High Halls, on his corpse. Exclusive to Act 3. [Requirements](https://hollowknight.wiki/w/Rune_Harp)';
  const mode=/onlyFoundInSteelSoulMode:\s*true/.test(body)||name==='Summoned Saviour'?' · Steel Soul only':/onlyFoundInClassicMode:\s*true/.test(body)?' · Classic only':'';
  const kills=body.match(/killsRequired:\s*(\d+)/)?.[1];
  lines.push(`- [ ] **${name}** — ${act&&act!=='0'?'Act '+act:'Variable stage'}${mode}${kills?' · Notes: '+kills+' required':''}${map?' · [Map]('+map+')':''}${desc?' — '+desc:''}`);count++;
 }
 if(key==='bosses')lines.push('','## Additional encounter audit','','- [ ] Weavenest Atla Moss Mothers.','- [ ] Second Skull Tyrant at Bone Bottom.','- [ ] Second Savage Beastfly in Far Fields.','- [ ] Lace at the Cradle.','- [ ] Additional Act 3 Moss Mother encounter / chosen boss variants.');
 lines.push('','Data: [Silksong Completionist](https://github.com/Br3zzly/silksong-completionist), revision 7f85ff6146516f913065143c67e3402247557e8c; MIT notice in licenses/silksong-completionist.txt. See Sources and map credits for limitations.');
 fs.writeFileSync(`guide/catalog-${key}.md`,lines.join('\n')+'\n');stats.push({key,count});
}
console.log(JSON.stringify(stats));
