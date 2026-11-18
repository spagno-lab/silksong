import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
let pages=0,checks=0;const ids=new Set();
for(const file of fs.readdirSync('docs').filter(f=>f.endsWith('.html'))){const html=fs.readFileSync('docs/'+file,'utf8');pages++;assert(html.includes('<html lang="en">'));assert(!html.includes('disabled="" type="checkbox"'));
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const u=m[1];if(/^(https?:|#|mailto:)/.test(u))continue;assert(fs.existsSync(path.resolve('docs',u.split('#')[0])),`${file}: missing ${u}`)}
 if(file==='index.html')continue;
 for(const m of html.matchAll(/data-check="([^"]+)"/g)){assert(!ids.has(m[1]),'Duplicate checkbox ID');ids.add(m[1]);checks++}
}
assert(pages>=30);assert(checks>650);assert(fs.statSync('docs/assets/bone-bottom.jpg').size>10000);assert(fs.statSync('docs/assets/pilgrims-rest.png').size>10000);assert(fs.statSync('docs/assets/sentinel.jpg').size>10000);
assert(!fs.readdirSync('.').some(n=>/\.dat$/i.test(n)));console.log(`Validated ${pages} HTML files, ${checks} unique checkboxes, local links and required maps.`);
