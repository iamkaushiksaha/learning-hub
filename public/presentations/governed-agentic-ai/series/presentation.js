(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const scenes=$$('.scene'), deck=document.body.dataset.deck||'deck';
  const state={index:Math.max(0,Math.min(scenes.length-1,Number(localStorage.getItem('cyber-series-'+deck)||0))),started:Date.now(),timers:[]};
  const els={stage:$('#stage'),chapter:$('#chapterLabel'),progress:$('#progress'),counter:$('#counter'),title:$('#navTitle'),prev:$('#prevBtn'),next:$('#nextBtn'),toc:$('#toc'),tocList:$('#tocList'),notes:$('#notes'),notesBody:$('#notesBody'),sources:$('#sources'),sourcesList:$('#sourcesList'),help:$('#help'),live:$('#live')};
  function fragments(scene){return $$('.fragment',scene)}
  scenes.forEach((scene,sceneIndex)=>{const fs=fragments(scene);if(fs.length>4&&fs.every(f=>!f.dataset.reveal))fs.forEach((f,i)=>f.dataset.reveal=`auto-${sceneIndex}-${Math.floor(i/3)}`)});
  function fragmentGroup(scene,target){const key=target?.dataset.reveal;return key?fragments(scene).filter(f=>f.dataset.reveal===key):[target]}
  function updateChrome(){
    const s=scenes[state.index];
    els.chapter.textContent=s.dataset.chapter||`Scene ${state.index+1}`;
    els.counter.innerHTML=`<b>${String(state.index+1).padStart(2,'0')}</b> / ${String(scenes.length).padStart(2,'0')}`;
    els.title.textContent=s.dataset.title||'';
    els.progress.style.width=`${((state.index+1)/scenes.length)*100}%`;
    els.prev.disabled=state.index===0;els.next.textContent=state.index===scenes.length-1?'↻ Start again':'Next →';
    els.notesBody.textContent=s.dataset.notes||'No additional speaker note for this scene.';
    localStorage.setItem('cyber-series-'+deck,state.index);
    els.live.textContent=`Scene ${state.index+1} of ${scenes.length}: ${s.dataset.title||''}`;
    $$('#tocList button').forEach((b,i)=>b.classList.toggle('active',i===state.index));
  }
  function showScene(i,direction='forward',reset=false){
    if(i<0||i>=scenes.length)return;
    const old=scenes.find(s=>s.classList.contains('active'))||scenes[state.index];
    scenes.forEach(s=>{if(s!==scenes[i])s.classList.remove('active');if(s!==old)s.classList.remove('exit-left')});
    old?.classList.remove('active');old?.classList.toggle('exit-left',direction==='forward');
    state.index=i;const s=scenes[i];s.classList.remove('exit-left');s.classList.add('active');
    if(reset)fragments(s).forEach(f=>f.classList.remove('revealed'));
    updateChrome();
  }
  function restart(){localStorage.setItem('cyber-series-'+deck,'0');document.body.classList.add('restarting');setTimeout(()=>location.reload(),220)}
  function advance(){const scene=scenes[state.index],fs=fragments(scene),next=fs.find(f=>!f.classList.contains('revealed'));if(next){fragmentGroup(scene,next).forEach(f=>f.classList.add('revealed'));return}if(state.index<scenes.length-1)showScene(state.index+1,'forward',true);else restart()}
  function back(){const scene=scenes[state.index],fs=fragments(scene),shown=fs.filter(f=>f.classList.contains('revealed'));if(shown.length){fragmentGroup(scene,shown.at(-1)).forEach(f=>f.classList.remove('revealed'));return}if(state.index>0)showScene(state.index-1,'backward')}
  function closeDrawers(){[els.toc,els.notes,els.sources].forEach(x=>x&&x.classList.remove('open'));els.help?.classList.remove('open')}
  function toggle(el){const open=el.classList.contains('open');closeDrawers();if(!open)el.classList.add('open')}
  const controlLabels={tocBtn:'Table of contents',notesBtn:'Speaker notes',sourcesBtn:'References',fullBtn:'Full screen',helpBtn:'Help'};
  Object.entries(controlLabels).forEach(([id,label])=>{const el=$('#'+id);el?.setAttribute('aria-label',label);el?.setAttribute('title',label)});
  els.prev.onclick=back;els.next.onclick=()=>state.index===scenes.length-1?restart():advance();$('#tocBtn').onclick=()=>toggle(els.toc);$('#notesBtn').onclick=()=>toggle(els.notes);$('#sourcesBtn').onclick=()=>toggle(els.sources);$('#helpBtn').onclick=()=>{closeDrawers();els.help.classList.add('open')};
  $$('.close-btn').forEach(b=>b.onclick=closeDrawers);$('#helpClose').onclick=closeDrawers;$('#fullBtn').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
  const tocHint=document.createElement('div');tocHint.className='toc-hint';tocHint.textContent='Scroll to explore all scenes ↓';els.tocList.appendChild(tocHint);
  scenes.forEach((s,i)=>{const b=document.createElement('button');b.innerHTML=`<b>${String(i+1).padStart(2,'0')}</b><span>${s.dataset.title||''}</span>`;b.onclick=()=>{closeDrawers();showScene(i,'forward',true)};els.tocList.appendChild(b)});
  const finalActions=$$('.chips',scenes.at(-1)).at(-1);if(finalActions){const b=document.createElement('button');b.className='action-btn secondary restart-btn';b.textContent='↻ Start this session again';b.onclick=restart;finalActions.prepend(b)}
  const template=$('#sourcesTemplate');if(template)els.sourcesList.append(template.content.cloneNode(true));
  document.addEventListener('keydown',e=>{
    if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();advance()}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();back()}
    else if(e.key.toLowerCase()==='m')toggle(els.toc);else if(e.key.toLowerCase()==='n')toggle(els.notes);else if(e.key.toLowerCase()==='r')toggle(els.sources);else if(e.key.toLowerCase()==='f')$('#fullBtn').click();else if(e.key==='Escape')closeDrawers();else if(e.key==='Home')showScene(0,'backward',true);else if(e.key==='End')showScene(scenes.length-1,'forward',true);else if(e.key==='?')$('#helpBtn').click();
  });
  els.stage.addEventListener('click',e=>{if(e.target.closest('button,a,input,textarea,select,[data-interactive]'))return;advance()});
  $$('.tab-set').forEach(set=>{set.addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;const key=b.dataset.tab;$$('[data-tab]',set).forEach(x=>x.classList.toggle('active',x===b));$$('[data-panel]',set).forEach(x=>x.hidden=x.dataset.panel!==key)})});
  $$('.poll').forEach(poll=>poll.addEventListener('click',e=>{const b=e.target.closest('.poll-btn');if(!b)return;$$('.poll-btn',poll).forEach(x=>x.classList.toggle('active',x===b));const result=poll.parentElement.querySelector('.poll-result');if(result)result.innerHTML=b.dataset.result||''}));
  $$('.flow-run').forEach(btn=>btn.addEventListener('click',()=>{const root=btn.closest('.content'),nodes=$$('.flow-node',root);state.timers.forEach(clearTimeout);nodes.forEach(n=>n.classList.remove('running','done','blocked'));nodes.forEach((n,i)=>state.timers.push(setTimeout(()=>{if(i)nodes[i-1].classList.add('done');n.classList.add(i===Number(btn.dataset.blockAt)?'blocked':'running');if(i===nodes.length-1||i===Number(btn.dataset.blockAt))setTimeout(()=>n.classList.remove('running'),500)},i*650)))}));
  setInterval(()=>{const sec=Math.floor((Date.now()-state.started)/1000);$('#timer').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`},1000);
  showScene(state.index,'forward',true);
  window.CyberDeck={$, $$, scenes, state, showScene, advance, back, restart};
})();
