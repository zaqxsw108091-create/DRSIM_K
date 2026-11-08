'use strict';
// ════════════════════════════════════════
// DATA
// ════════════════════════════════════════
const DRONES = [
  {id:'rq101', nm:'RQ-101 송골매',   type:'정찰', sub:'고정익 중형 정찰',   ico:'✈', spd:120,alt:3000,bat:180,rng:'150km', shape:'fw',  col:0x3a5828, desc:'대한민국 육군 주력 전술 정찰. EO/IR 실시간 전송.'},
  {id:'rq900', nm:'RQ-900 나이트아울',type:'정찰', sub:'야간 특수 정찰',    ico:'🦅', spd:90, alt:4000,bat:240,rng:'200km', shape:'fw',  col:0x1c1e2c, desc:'야간 FLIR 열화상 카메라. 야간 작전 특화.'},
  {id:'shadow',nm:'RQ-7 Shadow',    type:'정찰', sub:'전술 정찰 중형',    ico:'🛩', spd:110,alt:4600,bat:300,rng:'125km', shape:'fw',  col:0x4a5a38, desc:'미 육군 전술 정찰. 한미 연합훈련 운용.'},
  {id:'hermes',nm:'Hermes 450',     type:'정찰', sub:'중고도 광역 정찰',  ico:'🛸', spd:176,alt:5500,bat:420,rng:'350km', shape:'fw',  col:0x888888, desc:'이스라엘제 중고도 장시간 체공 정찰.'},
  {id:'sonmi', nm:'SONMI-01 소니미', type:'정찰', sub:'보병 휴대 소형',   ico:'🔭', spd:60, alt:300, bat:30, rng:'3km',   shape:'quad',col:0x222222, desc:'보병 분대 전방 정찰용 소형 쿼드콥터.'},
  {id:'mq9',   nm:'MQ-9 리퍼',       type:'공격', sub:'대형 무장 공격기',  ico:'💀', spd:482,alt:15000,bat:600,rng:'1850km',shape:'lw', col:0x4a6888, desc:'미 공군 주력 공격 드론. 헬파이어 탑재.'},
  {id:'kh1',   nm:'KH-1 타격드론',   type:'공격', sub:'자폭 공격형',       ico:'💥', spd:200,alt:1000,bat:60, rng:'50km',  shape:'quad',col:0x882222, desc:'한국형 소형 자폭 드론. 정밀 유도 타격.'},
  {id:'tb2',   nm:'Bayraktar TB2',  type:'공격', sub:'중형 무장 공격',    ico:'🎯', spd:222,alt:8200,bat:720,rng:'300km', shape:'fw',  col:0x556633, desc:'튀르키예 공격 드론. 현대전 검증.'},
  {id:'swarm', nm:'SWARM-K 군집',    type:'공격', sub:'군집 공격형',       ico:'🐝', spd:80, alt:500, bat:45, rng:'20km',  shape:'mini',col:0x444400, desc:'군집비행 소형 공격 편대 드론.'},
  {id:'lm1',   nm:'LM-1 배회탄',     type:'공격', sub:'배회 무장',         ico:'🔴', spd:160,alt:4500,bat:240,rng:'100km', shape:'fw',  col:0x662222, desc:'목표 상공 배회 후 자폭 타격.'},
  {id:'ls1',   nm:'LS-1 보급드론',   type:'지원', sub:'보급 수송형',       ico:'📦', spd:80, alt:500, bat:120,rng:'30km',  shape:'hexa',col:0x223355, desc:'전방 부대 탄약/의약품 보급.'},
  {id:'medk',  nm:'MED-K 의무드론',  type:'지원', sub:'의무 지원형',       ico:'🏥', spd:70, alt:400, bat:90, rng:'20km',  shape:'quad',col:0x553322, desc:'부상병 응급키트 투하 및 위치 중계.'},
  {id:'com1',  nm:'COM-1 중계드론',  type:'지원', sub:'통신 중계형',       ico:'📡', spd:100,alt:2000,bat:480,rng:'200km', shape:'hexa',col:0x334455, desc:'통신 음영 지역 공중 중계기.'},
  {id:'net1',  nm:'NET-1 그물포획',  type:'방어', sub:'쿼드 그물포획형',   ico:'🛡', spd:110,alt:800, bat:150,rng:'15km',  shape:'quad',col:0x2e3338, desc:'위상배열 레이더+RF재머. 적 드론 그물 포획 격추.'},
  {id:'intk',  nm:'INT-K 요격드론', type:'방어', sub:'델타익 고속요격형',  ico:'⚡', spd:380,alt:5000,bat:90, rng:'60km',  shape:'delta',col:0x2e3338, desc:'스텔스 델타익 고속 요격. 킨에틱 격추 특화.'},
  {id:'nano',  nm:'NI-1 나노아이',   type:'소형', sub:'나노급 초소형',     ico:'🔬', spd:40, alt:100, bat:15, rng:'0.5km', shape:'mini',col:0x333333, desc:'손바닥 크기 초소형. 건물 내부 정찰.'},
  {id:'bh3',   nm:'Black Hornet 3', type:'소형', sub:'포켓 정찰형',       ico:'🐝', spd:30, alt:100, bat:25, rng:'2km',   shape:'mini',col:0x2a2a2a, desc:'세계 최소 군용 드론 33g. 노르웨이제.'},
  {id:'puma',  nm:'Puma AE',        type:'소형', sub:'수동 발사형',       ico:'🦁', spd:83, alt:150, bat:120,rng:'15km',  shape:'fw',  col:0x665533, desc:'손으로 던져 발사. 포대급 정찰.'},
  {id:'raven', nm:'RQ-11 Raven',   type:'소형', sub:'소대급 정찰',       ico:'🦆', spd:95, alt:150, bat:90, rng:'10km',  shape:'fw',  col:0x446644, desc:'미군 표준 소대급 정찰 드론.'},
  {id:'skyr',  nm:'SkyRanger R70', type:'소형', sub:'소형 다목적',       ico:'🌀', spd:72, alt:3000,bat:60, rng:'5km',   shape:'quad',col:0x334433, desc:'특수부대 소형 다목적. 모듈 교체 가능.'},
];

const MISSIONS = {
  recon:    {nm:'적 진지 정찰 임무',   cat:'정찰', objs:['전방 진지 비행','적 전력 영상 촬영','귀환 지점 복귀'],     tl:600,  sc:1000},
  rescue:   {nm:'고립 부대 위치 파악', cat:'정찰', objs:['통신 두절 구역 진입','아군 신호탄 확인','좌표 전송'],      tl:480,  sc:900},
  nbc:      {nm:'NBC 오염 지역 탐지',  cat:'정찰', objs:['오염 구역 A 탐지','오염 구역 B 탐지','경계 구역 설정'],   tl:720,  sc:950},
  night:    {nm:'야간 감시 작전',      cat:'정찰', objs:['감시 구역 A 스캔','감시 구역 B 스캔','의심 활동 전송'],    tl:900,  sc:800},
  intercept:{nm:'침투 드론 격추',      cat:'타격', objs:['미확인 비행체 추적','드론 시각 식별','재밍 무력화'],        tl:420,  sc:1200},
  strike:   {nm:'적 거점 정밀 타격',   cat:'타격', objs:['목표 좌표 비행','타격 지점 확인','전과 영상 전송'],        tl:480,  sc:1300},
  escort:   {nm:'보급 드론 호위',      cat:'방어', objs:['보급 드론 합류','적 감시 구역 우회','전방 기지 도착'],     tl:540,  sc:850},
  jamming:  {nm:'전자전 방어 작전',    cat:'방어', objs:['재밍 구역 진입','적 신호 탐지','귀환 복귀'],               tl:600,  sc:900},
};

// ════════════════════════════════════════
// CONFIG
// ════════════════════════════════════════
const C = {mode:'p', did:'rq101', map:'plain', wx:'clear', wind:10, wdir:0, turb:6,
           ctrl:'kb', sens:85, cam:'3rd', diff:'easy', mis:'recon', tod:'day'};
let GS = {};
let TMAP = null; // 지형 높이 맵 (바이리니어 보간용)
let TERRAIN_MESH = null; // 레이캐스팅용 지형 메시 참조
let _RC = null; // THREE.Raycaster 재사용
const _RCO = new THREE.Vector3(0,-1,0); // 아래 방향

// ════════════════════════════════════════
// UI HELPERS
// ════════════════════════════════════════
const $ = id => document.getElementById(id);
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));$(id).classList.add('on');}
function toMenu(){stopGame();show('sm');}
function toSet(){
  $('m-end').classList.remove('on');
  buildDGrid();buildManDrones();
  if(C.mode==='m') filterMis('정찰',$('mis-cats').children[0]);
  show('ss');
}
function openMan(){buildManDrones();$('man').classList.add('on');}
function closeMan(){$('man').classList.remove('on');}
function sTab(b,id){
  document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.tc').forEach(t=>t.classList.remove('on'));
  b.classList.add('on');$(id).classList.add('on');
}
function setMode(m){
  C.mode=m;
  $('mcp').classList.toggle('sel',m==='p');
  $('mcm').classList.toggle('sel',m==='m');
  $('mr').style.display=m==='m'?'':'none';
  if(m==='m') filterMis('정찰', $('mis-cats').children[0]);
}
function filterMis(cat, btn){
  document.querySelectorAll('#mis-cats .ftab').forEach(t=>t.classList.remove('on'));
  btn.classList.add('on');
  const sel=$('s-mis'); sel.innerHTML='';
  Object.entries(MISSIONS).filter(([,v])=>v.cat===cat).forEach(([k,v])=>{
    const o=document.createElement('option');o.value=k;o.textContent=v.nm;sel.appendChild(o);
  });
  C.mis=sel.value;
  sel.onchange=()=>C.mis=sel.value;
}
function setCam(v){
  C.cam=v;
  $('co3').classList.toggle('sel',v==='3rd');
  $('cof').classList.toggle('sel',v==='fpv');
}
function fD(type,btn){
  document.querySelectorAll('.ftab').forEach(t=>t.classList.remove('on'));
  btn.classList.add('on');buildDGrid(type);
}
function buildDGrid(filter='all'){
  const g=$('dgrid');g.innerHTML='';
  const list=filter==='all'?DRONES:DRONES.filter(d=>d.type===filter);
  list.forEach(d=>{
    const c=document.createElement('div');
    c.className='d-card'+(d.id===C.did?' sel':'');
    c.innerHTML=`<span class="ico">${d.ico}</span><div class="nm">${d.nm}</div><div class="tp">${d.sub}</div>`;
    c.onclick=()=>{C.did=d.id;buildDGrid(filter);};
    g.appendChild(c);
  });
}
function buildManDrones(){
  const map={r:'정찰',a:'공격',d:'방어',s:'지원',m:'소형'};
  // t4(미션수행)→t6(드론목록) 탭 변경에 따라 di-* 요소 두 곳에 모두 채움
  Object.entries(map).forEach(([k,v])=>{
    const el=$('di-'+k);if(!el||el.childElementCount>0)return;
    DRONES.filter(d=>d.type===v).forEach(d=>{
      const c=document.createElement('div');c.className='dic';
      c.innerHTML=`<div class="ii">${d.ico}</div><div class="in">${d.nm}</div>
        <div class="it">${d.sub} · ${d.spd}km/h · ${d.alt}m · ${d.rng}</div>
        <div class="id">${d.desc}</div>`;
      el.appendChild(c);
    });
  });
}

// ════════════════════════════════════════
// START
// ════════════════════════════════════════
function startGame(){
  // 이전 임무 완료/실패 오버레이 초기화
  const _me=$('m-end');if(_me)_me.classList.remove('on');
  C.map = $('s-map').value;
  C.wx  = $('s-wx').value;
  C.wind= +$('sl-w').value;
  C.wdir= +$('s-wd').value;
  C.turb= +$('sl-t').value;
  C.ctrl= $('s-ct').value;
  C.sens= +$('sl-s').value;
  C.diff= $('s-df').value;
  // C.mis: UI 드롭다운을 우선하되, 이미 유효한 임무가 설정된 경우 유지
  const _uiMis=$('s-mis').value;
  if(_uiMis && MISSIONS[_uiMis]) C.mis=_uiMis; // UI 선택 적용
  // else: 프로그래밍으로 설정된 C.mis 유지
  C.tod = $('s-td').value;

  show('sl');
  const steps=['지형 데이터 생성 중...','드론 3D 모델 로딩...','물리 엔진 초기화...','HUD 시스템 준비...','비행 준비 완료!'];
  let i=0;
  const bar=$('ldf'),txt=$('lds');
  bar.style.width='0';
  const iv=setInterval(()=>{
    i++;bar.style.width=(i/steps.length*100)+'%';txt.textContent=steps[i-1];
    if(i>=steps.length){clearInterval(iv);setTimeout(()=>{show('sg');init3D();initGS();lastT=0;aniId=requestAnimationFrame(loop);},300);}
  },260);
}

// ════════════════════════════════════════
// THREE.JS ENGINE
// ════════════════════════════════════════
let R,SCN,CAM,DRONE,aniId,mmCtx;
let camWorldYaw=0,camPitch=0.22;
let isFPV=false;
let _fpvRollQ=null,_fpvRollAxis=null;
let _dt=1/60;

function skyC(){
  const n=C.tod==='night',d=C.tod==='dusk'||C.tod==='dawn';
  return {clear:n?0x010306:d?0xd04010:0x7ab8e0,cloudy:0x566268,rain:0x303840,fog:0xa8b8c2,storm:0x1a2430}[C.wx]||0x7ab8e0;
}
function ambI(){return({clear:.68,cloudy:.52,rain:.4,fog:.7,storm:.28}[C.wx]||.55)*({day:1,dawn:.62,dusk:.55,night:.12}[C.tod]||1);}
function fogD(){return{clear:.00042,cloudy:.00072,rain:.0018,fog:.011,storm:.003}[C.wx]||.00042;}
function M(col,em=0,ei=0,t=false,op=1){
  const m=new THREE.MeshStandardMaterial({color:col,roughness:.68,metalness:.12});
  if(em){m.emissive=new THREE.Color(em);m.emissiveIntensity=ei||1;}
  if(t){m.transparent=true;m.opacity=op;m.side=THREE.DoubleSide;}
  return m;
}

function init3D(){
  const cv=$('cv');
  R=new THREE.WebGLRenderer({canvas:cv,antialias:true,preserveDrawingBuffer:true});
  R.setSize(innerWidth,innerHeight);
  R.setPixelRatio(Math.min(devicePixelRatio,2));
  R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;

  SCN=new THREE.Scene();
  SCN.background=new THREE.Color(skyC());
  SCN.fog=new THREE.FogExp2(skyC(),fogD());

  CAM=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.1,8000);
  CAM.position.set(0,22,24);

  SCN.add(new THREE.AmbientLight(0xffffff,ambI()*.6));
  // 하늘색을 엷은 회백색으로 낮춰 나무/오브젝트가 파랗게 물드는 버그 해결
  SCN.add(new THREE.HemisphereLight(0xd8e8ee,0x4a6028,.32));
  const sun=new THREE.DirectionalLight(
    C.tod==='night'?0x2233aa:C.tod==='dusk'||C.tod==='dawn'?0xff6622:0xffe8a0,
    C.tod==='night'?0:C.tod==='day'?1.15:.6);
  sun.position.set(800,1100,500);
  sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left=-700;sun.shadow.camera.right=700;
  sun.shadow.camera.top=700;sun.shadow.camera.bottom=-700;
  sun.shadow.camera.far=2500;
  SCN.add(sun);
  const fill=new THREE.DirectionalLight(0x4488cc,.22);fill.position.set(-400,300,-200);SCN.add(fill);

  buildTerrain();
  buildSceneObjects();
  DRONE=buildDroneMesh();
  SCN.add(DRONE);
  DRONE.position.set(0,12,0);

  mmCtx=$('mm').getContext('2d');
  isFPV=C.cam==='fpv';

  window.onresize=()=>{if(!R||!CAM)return;R.setSize(innerWidth,innerHeight);CAM.aspect=innerWidth/innerHeight;CAM.updateProjectionMatrix();};
}

// ─── TERRAIN ─────────────────────────────────
function buildTerrain(){
  const seg=280;
  const geo=new THREE.PlaneGeometry(2600,2600,seg,seg);
  geo.rotateX(-Math.PI/2);
  const pos=geo.attributes.position;
  const N=seg+1;

  for(let row=0;row<N;row++){
    for(let col=0;col<N;col++){
      const i=row*N+col;
      const x=pos.getX(i), z=pos.getZ(i);
      let h=0;
      switch(C.map){
        case 'mountain':
          h = noise(x*.007,z*.006)*80
            + noise(x*.018,z*.015)*28
            + noise(x*.038,z*.032)*11
            + noise(x*.08,z*.07)*5
            + noise(x*.16,z*.14)*2;
          h *= 1 + 0.3*Math.abs(Math.sin(x*.004+z*.003));
          // 급경사 완화: 높을수록 증가폭 감소
          if(h>50) h = 50 + (h-50)*0.55;
          break;
        case 'plain':
          h = noise(x*.003,z*.003)*9
            + noise(x*.01,z*.01)*3
            + noise(x*.022,z*.022)*1.2;
          break;
        case 'sea':
          const cx=x-100;
          if(cx>0) h=Math.max(-14,cx*.05*-1-2);
          else h=noise(x*.006,z*.005)*9+noise(x*.015,z*.012)*3;
          break;
        case 'urban':
          h = noise(x*.002,z*.002)*2;
          break;
        case 'military':
          h = noise(x*.005,z*.005)*30
            + noise(x*.015,z*.012)*12
            + noise(x*.035,z*.03)*5;
          h += Math.max(0,6-Math.abs(x%80-40))*0.4;
          break;
      }
      pos.setY(i,h);
    }
  }
  // 지형 높이 맵 저장 (getTerrainH 바이리니어 보간용)
  TMAP = {N: N, seg: seg, data: new Float32Array(pos.count)};
  for(let i=0; i<pos.count; i++) TMAP.data[i] = pos.getY(i);
  geo.computeVertexNormals();

  const colAttr=new Float32Array(pos.count*3);
  for(let i=0;i<pos.count;i++){
    const h=pos.getY(i);
    let r,g,b;
    if(C.map==='sea' && h<-1){r=.1;g=.3;b=.55;}
    else if(C.map==='mountain'){
      // 부드러운 색상 전환 (경계선 아티팩트 방지)
      const t1=Math.max(0,Math.min(1,(h-20)/12)); // green→tan: h=20~32
      const t2=Math.max(0,Math.min(1,(h-48)/12)); // tan→snow: h=48~60
      r=(1-t1)*.32+t1*.52; g=(1-t1)*.42+t1*.48; b=(1-t1)*.22+t1*.38;
      r=(1-t2)*r+t2*.85;   g=(1-t2)*g+t2*.85;   b=(1-t2)*b+t2*.85;
    }
    else if(C.map==='urban'){r=.44;g=.44;b=.44;}
    else if(C.map==='military'){r=.34;g=.42;b=.26;}
    else{r=.3;g=.52;b=.18;}
    colAttr[i*3]=r;colAttr[i*3+1]=g;colAttr[i*3+2]=b;
  }
  geo.setAttribute('color',new THREE.BufferAttribute(colAttr,3));

  const mat=new THREE.MeshLambertMaterial({vertexColors:true});
  const mesh=new THREE.Mesh(geo,mat);
  mesh.receiveShadow=true;mesh.name='terrain';
  SCN.add(mesh);
  TERRAIN_MESH=mesh; // 레이캐스팅용 저장

  if(C.map==='sea'){
    const wm=new THREE.Mesh(new THREE.PlaneGeometry(2600,2600),M(0x1a4e8a));
    wm.material.transparent=true;wm.material.opacity=.82;
    wm.rotation.x=-Math.PI/2;wm.position.y=-.4;
    SCN.add(wm);
  }
}

function noise(x,z){
  return Math.sin(x*1.2)*Math.cos(z*.9)*.5
       + Math.sin(x*.7+z*1.1)*.35
       + Math.cos(x*2.1-z*1.7)*.15;
}

// 지형 높이 조회 — 레이캐스팅 방식 (렌더된 실제 메시와 100% 일치)
const _rayOrig=new THREE.Vector3();
const _rayDir=new THREE.Vector3(0,-1,0);
function getTerrainH(x,z){
  // 레이캐스팅: 위에서 아래로 광선을 쏴 실제 메시 표면 높이를 얻음
  if(TERRAIN_MESH){
    if(!_RC) _RC=new THREE.Raycaster();
    _rayOrig.set(x,2000,z);
    _RC.set(_rayOrig,_rayDir);
    const hits=_RC.intersectObject(TERRAIN_MESH,false);
    if(hits.length>0) return hits[0].point.y;
  }
  // 메시 미준비 시 공식으로 fallback
  let h=0;
  switch(C.map){
    case 'mountain':
      h=noise(x*.007,z*.006)*80+noise(x*.018,z*.015)*28+noise(x*.038,z*.032)*11
       +noise(x*.08,z*.07)*5+noise(x*.16,z*.14)*2;
      h*=1+0.3*Math.abs(Math.sin(x*.004+z*.003));
      if(h>50) h=50+(h-50)*0.55;
      break;
    case 'plain':
      h=noise(x*.003,z*.003)*9+noise(x*.01,z*.01)*3+noise(x*.022,z*.022)*1.2;
      break;
    case 'sea':{
      const cx=x-100;
      h=cx>0?Math.max(-14,cx*.05*-1-2):noise(x*.006,z*.005)*9+noise(x*.015,z*.012)*3;
      break;}
    case 'urban':
      h=noise(x*.002,z*.002)*2;
      break;
    case 'military':
      h=noise(x*.005,z*.005)*30+noise(x*.015,z*.012)*12+noise(x*.035,z*.03)*5;
      h+=Math.max(0,6-Math.abs(x%80-40))*0.4;
      break;
  }
  return Math.max(0,h);
}

// ─── SCENE OBJECTS ────────────────────────────
function buildSceneObjects(){
  if(C.map!=='urban'){
    const count=C.map==='mountain'?120:C.map==='sea'?40:80;
    // 채도 높은 초록 — HemisphereLight 영향에도 녹색 유지
    const treeColors=C.map==='mountain'
      ?[0x4a6030,0x526838,0x3e5828,0x445832,0x506040]
      :[0x2e7012,0x367018,0x2a6810,0x327814,0x3c7820];
    for(let i=0;i<count;i++){
      const tx=(Math.random()-.5)*700,tz=(Math.random()-.5)*700;
      if(Math.abs(tx)<40&&Math.abs(tz)<40) continue;
      // 바다 지도: 물 위/물가에는 나무 금지 — 명확한 육지 언덕(높이>4)에만
      if(C.map==='sea'){
        if(tx>85) continue;
        if(getTerrainH(tx,tz)<4) continue;
        // 주변도 물에 잠기지 않은 육지여야 함
        if(getTerrainH(tx+12,tz)<2||getTerrainH(tx-12,tz)<2||
           getTerrainH(tx,tz+12)<2||getTerrainH(tx,tz-12)<2) continue;
      }
      const th=5+Math.random()*10;
      const gy=getTerrainH(tx,tz);
      // 산악 지형: 평탄하고 낮은 곳에만 나무 생성
      if(C.map==='mountain'){
        if(gy>18) continue; // 높이 제한 강화
        const sd=15;
        const h1=getTerrainH(tx+sd,tz),h2=getTerrainH(tx-sd,tz),h3=getTerrainH(tx,tz+sd),h4=getTerrainH(tx,tz-sd);
        const sd2=30;
        const h5=getTerrainH(tx+sd2,tz),h6=getTerrainH(tx-sd2,tz),h7=getTerrainH(tx,tz+sd2),h8=getTerrainH(tx,tz-sd2);
        if(Math.max(h1,h2,h3,h4,h5,h6,h7,h8)>25) continue; // 주변 넓은 범위도 낮아야 함
        const slope=Math.max(Math.abs(h1-gy),Math.abs(h2-gy),Math.abs(h3-gy),Math.abs(h4-gy));
        if(slope>3) continue; // 경사 허용치 강화
      }
      // 군 지도: 가파른 경사면 회피 (품질)
      if(C.map==='military'){
        const sd=14;
        const s1=getTerrainH(tx+sd,tz),s2=getTerrainH(tx-sd,tz),s3=getTerrainH(tx,tz+sd),s4=getTerrainH(tx,tz-sd);
        if(Math.max(Math.abs(s1-gy),Math.abs(s2-gy),Math.abs(s3-gy),Math.abs(s4-gy))>5) continue;
      }
      // 기둥을 지형 안으로 2유닛 깊이 박기 (레이캐스팅으로 정확한 높이 확보)
      const embed=2.0;
      addMesh(new THREE.CylinderGeometry(.22,.35,th,7),M(0x5c3a18),tx,gy+th/2-embed,tz,true);
      const tCol=treeColors[Math.floor(Math.random()*treeColors.length)];
      const coneH=7+Math.random()*4;
      const cone=new THREE.Mesh(new THREE.ConeGeometry(2.5+Math.random()*2.5,coneH,8),M(tCol));
      cone.position.set(tx,gy+th-embed+coneH/2,tz);cone.castShadow=true;SCN.add(cone);
    }
  }

  // 산악 지도 바위: 레이캐스팅으로 정확한 지형 높이 사용, 엄격한 평탄 필터
  if(C.map==='mountain'){
    let placed=0, tries=0;
    while(placed<30 && tries<500){
      tries++;
      const rx=(Math.random()-.5)*500, rz=(Math.random()-.5)*500;
      const rgy=getTerrainH(rx,rz);
      if(rgy>12) continue; // 높이 12 이하 매우 낮은 곳만
      const sd=25;
      const h1=getTerrainH(rx+sd,rz),h2=getTerrainH(rx-sd,rz),h3=getTerrainH(rx,rz+sd),h4=getTerrainH(rx,rz-sd);
      if(Math.max(h1,h2,h3,h4)>16) continue; // 주변도 낮아야 함
      const slope=Math.max(Math.abs(h1-rgy),Math.abs(h2-rgy),Math.abs(h3-rgy),Math.abs(h4-rgy));
      if(slope>2) continue; // 거의 평탄한 곳만
      const rs=1.2+Math.random()*2.5;
      const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(rs,0),M(0x6a6056));
      rock.position.set(rx, rgy-rs*0.3, rz); // 지형 안으로 깊이 박기
      rock.rotation.y=Math.random()*Math.PI;
      SCN.add(rock);
      placed++;
    }
  }

  if(C.map==='urban'||C.map==='military'){
    const bc=C.map==='urban'?0x6a7888:0x4a5c44;
    const darkBc=C.map==='urban'?0x445566:0x38482e;
    for(let i=0;i<35;i++){
      const bw=8+Math.random()*18, bd=8+Math.random()*18, bh=8+Math.random()*(C.map==='urban'?30:15);
      const bx=(Math.random()-.5)*700, bz=(Math.random()-.5)*700;
      if(Math.abs(bx)<50&&Math.abs(bz)<50) continue;
      const bgy=getTerrainH(bx,bz);
      addMesh(new THREE.BoxGeometry(bw,bh,bd),M(bc),bx,bgy+bh/2-2.0,bz,true);
      addMesh(new THREE.BoxGeometry(bw,0.5,bd),M(darkBc),bx,bgy+bh-2.0+.25,bz,false);
      if(C.tod==='night'||C.tod==='dusk'){
        for(let w=0;w<4;w++){
          const wx=bx+(Math.random()-.5)*bw*.8, wy=bgy+2+Math.random()*(bh-4), wz=bz+(Math.random()<.5?bd/2+.05:-bd/2-.05);
          addMesh(new THREE.BoxGeometry(.9,.7,.05),M(0x887755,0xffaa44,.6),wx,wy,wz,false);
        }
      }
    }
    if(C.map==='urban'){
      const roadM=M(0x2a2a2a);
      [-250,0,250].forEach(x=>{addMesh(new THREE.PlaneGeometry(10,800),roadM,x,.05,0,false,true);});
      [-250,0,250].forEach(z=>{addMesh(new THREE.PlaneGeometry(800,10),roadM,0,.05,z,false,true);});
    }
    if(C.map==='military'){
      for(let i=0;i<8;i++){
        const bx=(Math.random()-.5)*500, bz=(Math.random()-.5)*500;
        const mgy=getTerrainH(bx,bz);
        addMesh(new THREE.CylinderGeometry(5,6,2.5,8),M(0x3a4a2a),bx,mgy+1.0,bz,false);
      }
    }
  }

  const _misT=(MISSIONS[C.mis]||{}).cat;
  if(C.mode==='m'&&_misT!=='타격'){
    getMT().forEach((t,i)=>{
      const colR=i===0?0x00ff88:0xff3300;
      const ring=new THREE.Mesh(new THREE.TorusGeometry(5,.45,10,20),M(colR,colR,.45));
      ring.rotation.x=Math.PI/2;ring.position.set(t[0],t[1]+.8,t[2]);ring.name='tgt'+i;SCN.add(ring);
      const tgt_gy=getTerrainH(t[0],t[2]);
      const beam=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,40,6),M(colR));
      beam.material.transparent=true;beam.material.opacity=.2;
      beam.position.set(t[0],tgt_gy+20,t[2]);SCN.add(beam);
    });
  }
  const home=new THREE.Mesh(new THREE.TorusGeometry(3.5,.35,8,16),M(0x00ff88,0x00ff88,.4));
  home.rotation.x=Math.PI/2;home.position.set(0,.6,0);SCN.add(home);
  const pad=new THREE.Mesh(new THREE.CylinderGeometry(4,4,.1,16),M(0x224422));
  pad.position.set(0,.1,0);SCN.add(pad);
}

function addMesh(geo,mat,x,y,z,castShadow,flatRot=false){
  const m=new THREE.Mesh(geo,mat);
  m.position.set(x,y,z);
  if(flatRot)m.rotation.x=-Math.PI/2;
  if(castShadow)m.castShadow=true;
  m.receiveShadow=true;
  SCN.add(m);return m;
}

function getMT(){
  const cnt=(MISSIONS[C.mis]||MISSIONS.recon).objs.length;
  const raw=[[0,0,0],[180,0,95],[-120,0,200],[210,0,-140]].slice(0,cnt);
  return raw.map(([x,,z])=>[x,getTerrainH(x,z),z]);
}

// ════════════════════════════════════════
// DRONE 3D MODELS
// ════════════════════════════════════════
function buildDroneMesh(){
  const d=DRONES.find(x=>x.id===C.did)||DRONES[0];
  const g=new THREE.Group();g.name='drone';
  const inner=new THREE.Group();
  inner.rotation.y=Math.PI/2;
  g.add(inner);

  const s=d.shape, t=d.type;
  let builder;
  if(s==='delta')              builder=bDeltaInterceptor;
  else if(s==='hexa')          builder=bSupport;
  else if(s==='lw')            builder=bMQ9;
  else if(s==='fw')            builder=t==='공격'?bMQ9:bLoitering;
  else if(s==='quad'||s==='mini'){
    if(t==='공격')             builder=bBomberQuad;
    else if(t==='방어')        builder=bDefenseQuad;
    else                       builder=bQuad;
  }
  else builder=bLoitering;
  builder(inner,d);

  const nav=new THREE.PointLight(0x00ff88,.8,7);nav.name='nav';g.add(nav);
  const strobe=new THREE.PointLight(0xffffff,0,5);strobe.name='strobe';g.add(strobe);
  const red=new THREE.PointLight(0xff2200,.5,4);red.name='red';g.add(red);
  g.scale.setScalar({'소형':.9}[d.type]||1.35);
  return g;
}

function bQuad(g,d){
  const col=d.col, dark=Math.max(0,col-0x181818), isAtk=d.type==='공격';
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.13,8),M(col));g.add(body);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.28,.31,.07,8),M(dark));cap.position.y=.1;g.add(cap);
  const bat=new THREE.Mesh(new THREE.BoxGeometry(.28,.09,.17),M(dark));bat.position.y=.14;g.add(bat);
  [45,135,225,315].forEach((ang,idx)=>{
    const r=ang*Math.PI/180;
    const ax=Math.cos(r)*.68, az=Math.sin(r)*.68;
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.38,5),M(dark));
    arm.position.set(ax/2,0,az/2);arm.lookAt(ax,0,az);arm.rotateX(Math.PI/2);g.add(arm);
    const mot=new THREE.Mesh(new THREE.CylinderGeometry(.062,.072,.068,8),M(0x1a1a1a));mot.position.set(ax,.07,az);g.add(mot);
    const pb=new THREE.Mesh(new THREE.BoxGeometry(.7,.013,.062),M(0x888888));pb.position.set(ax,.14,az);pb.name='prop';g.add(pb);
    const pd=new THREE.Mesh(new THREE.CylinderGeometry(.37,.37,.006,14),M(0x333333,0,0,true,.26));pd.position.set(ax,.14,az);pd.name='pDisc';g.add(pd);
    const lc=idx%2===0?0xff2200:0x00ff44;
    const ll=new THREE.Mesh(new THREE.SphereGeometry(.022,6,6),M(lc,lc,1.6));ll.position.set(ax,.055,az);g.add(ll);
  });
  if(isAtk){
    const wh=new THREE.Mesh(new THREE.CylinderGeometry(.11,.14,.22,8),M(Math.min(0xffffff,col+0x202020)));wh.position.y=-.15;g.add(wh);
    const tip=new THREE.Mesh(new THREE.ConeGeometry(.11,.18,8),M(0xcc2200));tip.position.y=-.29;g.add(tip);
    [0,90,180,270].forEach(a=>{
      const fin=new THREE.Mesh(new THREE.BoxGeometry(.16,.005,.09),M(dark));
      fin.position.set(Math.cos(a*Math.PI/180)*.12,-.2,Math.sin(a*Math.PI/180)*.12);fin.rotation.y=a*Math.PI/180;g.add(fin);
    });
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.35,.015,6,16),M(0xff3300,0xff3300,1.2));ring.rotation.x=Math.PI/2;ring.position.y=-.07;g.add(ring);
  } else {
    const gbase=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.1,6),M(0x444444));gbase.position.set(0,-.09,.15);g.add(gbase);
    const cam=new THREE.Mesh(new THREE.BoxGeometry(.15,.11,.12),M(0x111111,0x001100,.1));cam.position.set(0,-.16,.21);g.add(cam);
    const lens=new THREE.Mesh(new THREE.CylinderGeometry(.042,.042,.04,8),M(0x1a1a2e,0x000d22,.14));lens.rotation.x=Math.PI/2;lens.position.set(0,-.16,.28);g.add(lens);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.35,.015,6,16),M(0x00ff88,0x00ff88,1.1));ring.rotation.x=Math.PI/2;ring.position.y=-.07;g.add(ring);
  }
  [0,90,180,270].forEach(ang=>{
    const r=ang*Math.PI/180, lx=Math.cos(r)*.21, lz=Math.sin(r)*.21;
    const leg=new THREE.Mesh(new THREE.CylinderGeometry(.017,.017,.27,4),M(0x252525));leg.position.set(lx,-.19,lz);g.add(leg);
    const foot=new THREE.Mesh(new THREE.CylinderGeometry(.013,.013,.28,4),M(0x252525));foot.rotation.z=Math.PI/2;foot.position.set(lx,-.32,lz);g.add(foot);
  });
}

function bLoitering(g,d){
  const col=d.col,dk=Math.max(0,col-0x101010),lo=Math.min(0xffffff,col+0x202028);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,3.6,10),M(col));body.rotation.z=Math.PI/2;g.add(body);
  const camS=new THREE.Mesh(new THREE.SphereGeometry(.11,8,8),M(0x090912,0x000d22,.14));camS.position.set(1.9,0,0);g.add(camS);
  const wh=new THREE.Mesh(new THREE.CylinderGeometry(.102,.102,.65,10),M(dk));wh.rotation.z=Math.PI/2;wh.position.set(1.3,0,0);g.add(wh);
  const gps=new THREE.Mesh(new THREE.SphereGeometry(.065,8,5,0,Math.PI*2,0,Math.PI*.5),M(0xd8d8d8,0x777788,.06));gps.position.set(.1,.12,0);g.add(gps);
  [-1,1].forEach(s=>{const a=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.38,4),M(0x888888));a.position.set(.2,.18,s*.06);g.add(a);});
  [-1,1].forEach(s=>{
    const wg=new THREE.Mesh(new THREE.BoxGeometry(.62,.055,2.7),M(lo));
    wg.position.set(-.18,0,s*1.4);wg.rotation.y=s*-16*Math.PI/180;g.add(wg);
    const ail=new THREE.Mesh(new THREE.BoxGeometry(.28,.04,.35),M(dk));ail.position.set(-.58,0,s*2.5);g.add(ail);
  });
  [[0,Math.PI/2,0],[0,0,0],[Math.PI/2,0,0],[Math.PI/2,Math.PI,0]].forEach(([rx,ry,rz])=>{
    const fin=new THREE.Mesh(new THREE.BoxGeometry(.55,.045,.22),M(dk));fin.position.set(-1.7,0,0);fin.rotation.set(rx,ry,rz);g.add(fin);
  });
  const mot=new THREE.Mesh(new THREE.CylinderGeometry(.055,.07,.12,8),M(0x1a1a1a));mot.rotation.z=Math.PI/2;mot.position.set(-1.92,0,0);g.add(mot);
  const prop=new THREE.Mesh(new THREE.BoxGeometry(.85,.015,.07),M(0x555555));prop.position.set(-2.08,0,0);prop.name='prop';g.add(prop);
  const pd=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.008,12),M(0x333333,0,0,true,.2));pd.rotation.z=Math.PI/2;pd.position.set(-2.08,0,0);pd.name='pDisc';g.add(pd);
}

function bMQ9(g,d){
  const col=d.col, lo=Math.min(0xffffff,col+0x1a2218), dk=Math.max(0,col-0x0c0c08);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.12,.40,6.6,12),M(col));body.rotation.z=Math.PI/2;g.add(body);
  const nBulge=new THREE.Mesh(new THREE.SphereGeometry(.40,12,10),M(col));nBulge.scale.set(1.2,.92,.92);nBulge.position.set(2.8,0,0);g.add(nBulge);
  const nTip=new THREE.Mesh(new THREE.ConeGeometry(.12,.58,10),M(col));nTip.rotation.z=-Math.PI/2;nTip.position.set(3.56,0,0);g.add(nTip);
  const spine=new THREE.Mesh(new THREE.BoxGeometry(4.2,.14,.26),M(lo));spine.position.set(.3,.38,0);g.add(spine);
  const eoMount=new THREE.Mesh(new THREE.CylinderGeometry(.07,.11,.16,8),M(dk));eoMount.position.set(3.0,-.32,0);g.add(eoMount);
  const eoBall=new THREE.Mesh(new THREE.SphereGeometry(.21,12,12),M(0x040408,0x000b18,.16));eoBall.position.set(3.0,-.49,0);g.add(eoBall);
  const eoRing=new THREE.Mesh(new THREE.TorusGeometry(.21,.026,6,14),M(0x1a1c2c));eoRing.rotation.y=Math.PI/2;eoRing.position.set(3.0,-.49,0);g.add(eoRing);
  const intBox=new THREE.Mesh(new THREE.BoxGeometry(.68,.20,.35),M(dk));intBox.position.set(1.4,.45,0);g.add(intBox);
  const intSlot=new THREE.Mesh(new THREE.BoxGeometry(.60,.12,.27),M(0x060606));intSlot.position.set(1.4,.53,0);g.add(intSlot);
  const intRim=new THREE.Mesh(new THREE.BoxGeometry(.70,.04,.37),M(lo));intRim.position.set(1.4,.49,0);g.add(intRim);
  const satBase=new THREE.Mesh(new THREE.CylinderGeometry(.26,.28,.07,14),M(dk));satBase.position.set(-.2,.42,0);g.add(satBase);
  const satDome=new THREE.Mesh(new THREE.SphereGeometry(.26,14,10,0,Math.PI*2,0,Math.PI*.58),M(0xdce8d5,0x8898a0,.06));satDome.position.set(-.2,.47,0);g.add(satDome);
  const sar=new THREE.Mesh(new THREE.BoxGeometry(1.25,.045,.62),M(dk));sar.position.set(-.05,-.40,0);g.add(sar);
  [-1,1].forEach(s=>{const sl=new THREE.Mesh(new THREE.BoxGeometry(1.2,.02,.02),M(lo));sl.position.set(-.05,-.37,s*.22);g.add(sl);});
  const wing=new THREE.Mesh(new THREE.BoxGeometry(1.58,.072,15.2),M(col));wing.position.set(-.28,0,0);g.add(wing);
  const wLE=new THREE.Mesh(new THREE.BoxGeometry(.22,.046,14.9),M(lo));wLE.position.set(-.28+.68,.038,0);g.add(wLE);
  const wTE=new THREE.Mesh(new THREE.BoxGeometry(.18,.04,14.9),M(dk));wTE.position.set(-.28-.7,.038,0);g.add(wTE);
  [-4.6,-2.3,2.3,4.6].forEach(z=>{
    const pyl=new THREE.Mesh(new THREE.BoxGeometry(1.02,.24,.066),M(dk));pyl.position.set(-.28,-.13,z);g.add(pyl);
    const mis=new THREE.Mesh(new THREE.CylinderGeometry(.056,.056,.88,10),M(0x1c2c3a));mis.rotation.z=Math.PI/2;mis.position.set(-.28,-.31,z);g.add(mis);
    const sk=new THREE.Mesh(new THREE.SphereGeometry(.058,8,8),M(0x0c1824,0x000e20,.1));sk.position.set(-.28+.48,-.31,z);g.add(sk);
    for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;
      const ff=new THREE.Mesh(new THREE.BoxGeometry(.13,.004,.052),M(0x162232));ff.position.set(-.28+.26,-.31+Math.sin(a)*.06,z+Math.cos(a)*.06);ff.rotation.x=a;g.add(ff);}
    for(let i=0;i<4;i++){const a=i*Math.PI/2;
      const rf=new THREE.Mesh(new THREE.BoxGeometry(.22,.004,.095),M(0x162232));rf.position.set(-.28-.28,-.31+Math.sin(a)*.095,z+Math.cos(a)*.095);rf.rotation.x=a;g.add(rf);}
  });
  [1,-1].forEach(s=>{
    const fin=new THREE.Mesh(new THREE.BoxGeometry(.062,.96,.90),M(col));
    fin.position.set(-2.85,.36,s*.40);
    fin.rotation.x=-s*42*Math.PI/180;g.add(fin);
    const tip=new THREE.Mesh(new THREE.BoxGeometry(.05,.2,.2),M(dk));
    const tipAngle=42*Math.PI/180;
    tip.position.set(-2.85,.36+.58*Math.cos(tipAngle),s*(.40+.58*Math.sin(tipAngle)));g.add(tip);
  });
  const nacelle=new THREE.Mesh(new THREE.CylinderGeometry(.07,.11,.16,8),M(0x161616));nacelle.rotation.z=Math.PI/2;nacelle.position.set(-3.5,0,0);g.add(nacelle);
  const propHub2=new THREE.Mesh(new THREE.SphereGeometry(.065,8,8),M(0x0e0e0e));propHub2.position.set(-3.59,0,0);g.add(propHub2);
  for(let i=0;i<3;i++){
    const bl=new THREE.Mesh(new THREE.BoxGeometry(2.85,.028,.13),M(0x1e1e1e));bl.position.set(-3.59,0,0);bl.rotation.x=i*Math.PI*2/3;bl.name='prop';g.add(bl);
  }
  const pDisc=new THREE.Mesh(new THREE.CylinderGeometry(.72,.72,.012,16),M(0x161616,0,0,true,.13));pDisc.rotation.z=Math.PI/2;pDisc.position.set(-3.59,0,0);pDisc.name='pDisc';g.add(pDisc);
  const nLeg=new THREE.Mesh(new THREE.CylinderGeometry(.024,.024,.40,5),M(0x1a1a1a));nLeg.position.set(2.55,-.37,0);g.add(nLeg);
  const nWheel=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.11,10),M(0x090909));nWheel.rotation.z=Math.PI/2;nWheel.position.set(2.55,-.58,0);g.add(nWheel);
  [-1,1].forEach(s=>{
    const mLeg=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,.44,5),M(0x1a1a1a));mLeg.position.set(-.28,-.36,s*.56);g.add(mLeg);
    const mWheel=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.13,12),M(0x090909));mWheel.rotation.x=Math.PI/2;mWheel.position.set(-.28,-.58,s*.56);g.add(mWheel);
    const mHub=new THREE.Mesh(new THREE.CylinderGeometry(.058,.058,.06,8),M(0x222222));mHub.rotation.x=Math.PI/2;mHub.position.set(-.28,-.58,s*.56);g.add(mHub);
  });
  // 날개 끝 항법등: Z축이 스팬 방향 (Z=-7.6=좌=적색, Z=+7.6=우=청색)
  [[-.28,.04,-7.55,0xff1100],[-.28,.04,7.55,0x0044ff]].forEach(([x,y,z,lc])=>{
    const l=new THREE.Mesh(new THREE.SphereGeometry(.09,6,6),M(lc,lc,2.8));l.position.set(x,y,z);g.add(l);
    // 항법등 페어링 (날개 끝 소익)
    const wt=new THREE.Mesh(new THREE.BoxGeometry(.22,.04,.18),M(lc===0xff1100?0x882200:0x002288));wt.position.set(x,.04,z);g.add(wt);
  });
}

function bSupport(g,d){
  const col=d.col, dark=Math.max(0,col-0x181818);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.18,6),M(col));g.add(body);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.42,.46,.09,6),M(dark));cap.position.y=.135;g.add(cap);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(.22,12,7,0,Math.PI*2,0,Math.PI*.55),M(0xdde4ee,0x8899cc,.07));dome.position.y=.28;g.add(dome);
  [-1,1].forEach(s=>{const a=new THREE.Mesh(new THREE.CylinderGeometry(.013,.013,.55,4),M(0x888888));a.position.set(s*.13,.6,0);g.add(a);});
  const box=new THREE.Mesh(new THREE.BoxGeometry(.5,.3,.5),M(0x252525));box.position.y=-.24;g.add(box);
  const lens=new THREE.Mesh(new THREE.SphereGeometry(.1,8,8),M(0x090912,0x000d22,.14));lens.position.set(.25,-.24,.25);g.add(lens);
  for(let i=0;i<6;i++){
    const a=i*Math.PI/3;
    const ax=Math.cos(a)*.88, az=Math.sin(a)*.88;
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1.78,5),M(dark));
    arm.position.set(ax/2,0,az/2);arm.lookAt(ax,0,az);arm.rotateX(Math.PI/2);g.add(arm);
    const mot=new THREE.Mesh(new THREE.CylinderGeometry(.072,.085,.08,8),M(0x1e1e1e));mot.position.set(ax,.08,az);g.add(mot);
    const pb=new THREE.Mesh(new THREE.BoxGeometry(.78,.015,.07),M(0x888888));pb.position.set(ax,.16,az);pb.name='prop';g.add(pb);
    const pd2=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.007,14),M(0x333333,0,0,true,.28));pd2.position.set(ax,.16,az);pd2.name='pDisc';g.add(pd2);
    const lc=i%2===0?0xff2200:0x00ff44;
    const ll=new THREE.Mesh(new THREE.SphereGeometry(.026,6,6),M(lc,lc,1.6));ll.position.set(ax,.07,az);g.add(ll);
  }
  for(let i=0;i<3;i++){
    const a=i*Math.PI*2/3+Math.PI/6;
    const lx=Math.cos(a)*.38, lz=Math.sin(a)*.38;
    const vert=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.35,4),M(0x333333));vert.position.set(lx,-.28,lz);g.add(vert);
    const horiz=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.4,4),M(0x333333));horiz.rotation.z=Math.PI/2;horiz.rotation.y=a;horiz.position.set(lx,-.44,lz);g.add(horiz);
  }
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.51,.018,6,20),M(0x0055ff,0x0055ff,1.4));ring.rotation.x=Math.PI/2;ring.position.y=-.09;g.add(ring);
}

function bBomberQuad(g,d){
  const col=d.col,dark=Math.max(0,col-0x181818),lo=Math.min(0xffffff,col+0x181820);
  const body=new THREE.Mesh(new THREE.BoxGeometry(.78,.56,.68),M(col));g.add(body);
  const gpsD=new THREE.Mesh(new THREE.SphereGeometry(.12,8,5,0,Math.PI*2,0,Math.PI*.5),M(0xd0d0d0,0x707070,.05));gpsD.position.y=.32;g.add(gpsD);
  [-1,1].forEach(s=>{const a=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.45,4),M(0x888888));a.position.set(s*.12,.5,0);g.add(a);});
  const gimb=new THREE.Mesh(new THREE.SphereGeometry(.1,8,8),M(0x090912,0x000d22,.14));gimb.position.set(.32,-.18,.28);g.add(gimb);
  const gring=new THREE.Mesh(new THREE.TorusGeometry(.1,.015,6,10),M(0x333344));gring.rotation.y=Math.PI/2;gring.position.set(.32,-.18,.28);g.add(gring);
  const bay=new THREE.Mesh(new THREE.BoxGeometry(.58,.24,.5),M(dark));bay.position.y=-.4;g.add(bay);
  [-1,1].forEach(s=>{
    const pl=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.44,8),M(lo));pl.rotation.z=Math.PI/2;pl.position.set(s*.18,-.42,0);g.add(pl);
    const plcap=new THREE.Mesh(new THREE.SphereGeometry(.08,6,6),M(0xcc2200));plcap.position.set(s*.18+s*.23,-.42,0);g.add(plcap);
  });
  [45,135,225,315].forEach((ang,idx)=>{
    const r=ang*Math.PI/180,ax=Math.cos(r)*.82,az=Math.sin(r)*.82;
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(.048,.048,1.66,6),M(dark));arm.position.set(ax/2,0,az/2);arm.lookAt(ax,0,az);arm.rotateX(Math.PI/2);g.add(arm);
    const mot=new THREE.Mesh(new THREE.CylinderGeometry(.08,.095,.09,8),M(0x1a1a1a));mot.position.set(ax,.08,az);g.add(mot);
    const pb=new THREE.Mesh(new THREE.BoxGeometry(.92,.016,.08),M(0x777777));pb.position.set(ax,.18,az);pb.name='prop';g.add(pb);
    const pd3=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.007,14),M(0x333333,0,0,true,.25));pd3.position.set(ax,.18,az);pd3.name='pDisc';g.add(pd3);
    const lc=idx<2?0x00ff44:0xff6600;
    const ll=new THREE.Mesh(new THREE.SphereGeometry(.028,6,6),M(lc,lc,1.6));ll.position.set(ax,.07,az);g.add(ll);
  });
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{const vert=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.5,4),M(0x2a2a2a));vert.position.set(sx*.3,-.6,sz*.28);g.add(vert);});
  [-1,1].forEach(s=>{
    const bar=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.62,4),M(0x2a2a2a));bar.rotation.z=Math.PI/2;bar.position.set(0,-.84,s*.28);g.add(bar);
    const bar2=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.58,4),M(0x2a2a2a));bar2.rotation.x=Math.PI/2;bar2.position.set(s*.3,-.84,0);g.add(bar2);
  });
}

function bDefenseQuad(g,d){
  const col=d.col,dark=Math.max(0,col-0x141414);
  const body=new THREE.Mesh(new THREE.BoxGeometry(.62,.2,.62),M(col));g.add(body);
  const radar=new THREE.Mesh(new THREE.SphereGeometry(.22,10,6,0,Math.PI*2,0,Math.PI*.38),M(0xd0d8e0,0x8899aa,.06));radar.position.y=.14;g.add(radar);
  const gimb=new THREE.Mesh(new THREE.SphereGeometry(.1,8,8),M(0x090912,0x000d22,.14));gimb.position.y=-.15;g.add(gimb);
  const gring=new THREE.Mesh(new THREE.TorusGeometry(.1,.016,6,10),M(0x333344));gring.position.y=-.15;g.add(gring);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{
    const can=new THREE.Mesh(new THREE.BoxGeometry(.13,.16,.13),M(dark));can.position.set(sx*.25,.03,sz*.25);g.add(can);
    const tip=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,.04,8),M(0x1a1a1a));tip.position.set(sx*.25,.12,sz*.25);g.add(tip);
  });
  [-1,1].forEach(s=>{
    const ant=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.32,4),M(0x888888));ant.position.set(s*.34,.14,0);g.add(ant);
    [-1,1].forEach(ss=>{const sub=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.16,4),M(0x888888));sub.position.set(s*.4,.22,ss*.08);sub.rotation.x=ss*35*Math.PI/180;g.add(sub);});
  });
  [45,135,225,315].forEach((ang,idx)=>{
    const r=ang*Math.PI/180,ax=Math.cos(r)*.78,az=Math.sin(r)*.78;
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(.034,.034,1.58,5),M(dark));arm.position.set(ax/2,0,az/2);arm.lookAt(ax,0,az);arm.rotateX(Math.PI/2);g.add(arm);
    const mot=new THREE.Mesh(new THREE.CylinderGeometry(.068,.08,.075,8),M(0x1a1a1a));mot.position.set(ax,.07,az);g.add(mot);
    const pb=new THREE.Mesh(new THREE.BoxGeometry(.78,.014,.07),M(0x888888));pb.position.set(ax,.15,az);pb.name='prop';g.add(pb);
    const pd4=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.006,14),M(0x333333,0,0,true,.27));pd4.position.set(ax,.15,az);pd4.name='pDisc';g.add(pd4);
    const lc=idx<2?0x0044ff:0xff1100;
    const ll=new THREE.Mesh(new THREE.SphereGeometry(.024,6,6),M(lc,lc,1.6));ll.position.set(ax,.06,az);g.add(ll);
  });
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{const sk=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.28,4),M(0x252525));sk.position.set(sx*.22,-.22,sz*.22);g.add(sk);});
  [-1,1].forEach(s=>{
    const b=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.46,4),M(0x252525));b.rotation.z=Math.PI/2;b.position.set(0,-.35,s*.22);g.add(b);
    const b2=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.46,4),M(0x252525));b2.rotation.x=Math.PI/2;b2.position.set(s*.22,-.35,0);g.add(b2);
  });
}

function bDeltaInterceptor(g,d){
  const col=d.col,dk=Math.max(0,col-0x0c0c0c);
  const hull=new THREE.Mesh(new THREE.CylinderGeometry(.22,.16,3.0,8),M(col));hull.rotation.z=Math.PI/2;hull.scale.y=.28;g.add(hull);
  const hull2=new THREE.Mesh(new THREE.CylinderGeometry(.18,.12,3.0,8),M(dk));hull2.rotation.z=Math.PI/2;hull2.scale.y=.22;hull2.position.y=.05;g.add(hull2);
  const seeker=new THREE.Mesh(new THREE.SphereGeometry(.1,8,8),M(0x1a1a2a,0x000d22,.15));seeker.scale.set(1.4,1,1);seeker.position.set(1.6,0,0);g.add(seeker);
  const kh=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,.5,8),M(0x5a2218));kh.rotation.z=Math.PI/2;kh.position.set(1.15,0,0);g.add(kh);
  [-1,1].forEach(s=>{const slot=new THREE.Mesh(new THREE.BoxGeometry(.55,.04,.14),M(0x111111));slot.position.set(.2,0,s*.18);g.add(slot);});
  const aesa=new THREE.Mesh(new THREE.BoxGeometry(.55,.06,.38),M(0x444454));aesa.position.set(.3,.07,0);g.add(aesa);
  const dl=new THREE.Mesh(new THREE.SphereGeometry(.07,8,5,0,Math.PI*2,0,Math.PI*.5),M(0xd0d8e0,0x8899aa,.06));dl.position.set(-.2,.08,0);g.add(dl);
  [-1,1].forEach(s=>{
    const wI=new THREE.Mesh(new THREE.BoxGeometry(1.6,.055,.7),M(col));wI.position.set(-.6,0,s*.5);wI.rotation.y=s*-22*Math.PI/180;g.add(wI);
    const wO=new THREE.Mesh(new THREE.BoxGeometry(1.0,.042,.55),M(dk));wO.position.set(-1.28,0,s*1.1);wO.rotation.y=s*-35*Math.PI/180;g.add(wO);
    const wl=new THREE.Mesh(new THREE.BoxGeometry(.06,.22,.24),M(col));wl.position.set(-1.65,.11,s*1.55);g.add(wl);
    const ll=new THREE.Mesh(new THREE.SphereGeometry(.038,6,6),M(0x0044ff,0x0044ff,2));ll.position.set(-1.65,.11,s*1.55);g.add(ll);
  });
  const fin=new THREE.Mesh(new THREE.BoxGeometry(.06,.48,.55),M(dk));fin.position.set(-1.3,.28,0);g.add(fin);
  const nozzle=new THREE.Mesh(new THREE.CylinderGeometry(.1,.12,.22,12),M(0x1a1a1a));nozzle.rotation.z=Math.PI/2;nozzle.position.set(-1.62,0,0);g.add(nozzle);
  const glow=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.1,10),M(0xff6600,0xff6600,1.8));glow.rotation.z=Math.PI/2;glow.position.set(-1.78,0,0);g.add(glow);
}

// ════════════════════════════════════════
// GAME STATE
// ════════════════════════════════════════
function initGS(){
  const d=DRONES.find(x=>x.id===C.did)||DRONES[0];

  // 산악 지도: 지형이 낮고 평탄한 시작 위치 탐색
  let _sx=0, _sz=0;
  if(C.map==='mountain'){
    const cands=[[0,0],[0,-300],[0,300],[-300,0],[300,0],
                 [-200,-200],[-200,200],[200,-200],[200,200],
                 [-400,0],[400,0],[0,-400],[0,400]];
    let bestH=Infinity;
    for(const [cx,cz] of cands){
      // 해당 지점 + 주변 4방향 높이 중 최대값으로 평탄도 평가
      const th=getTerrainH(cx,cz);
      const flat=Math.max(th,
        getTerrainH(cx+80,cz),getTerrainH(cx-80,cz),
        getTerrainH(cx,cz+80),getTerrainH(cx,cz-80));
      if(flat<bestH){bestH=flat;_sx=cx;_sz=cz;}
    }
  }
  const _startY=Math.max(20, getTerrainH(_sx,_sz)+25);

  GS={
    run:true, paused:false, ft:0, bat:100, thrt:0,
    spd:0, alt:Math.round(_startY), vs:0, pitch:0, roll:0, yaw:0,
    x:_sx, y:_startY, z:_sz, vx:0, vy:0, vz:0,
    drone:d,
    objs: C.mode==='m' ? (MISSIONS[C.mis]||MISSIONS.recon).objs.map(t=>({text:t,done:false})) : [],
    tl:   C.mode==='m' ? (MISSIONS[C.mis]||MISSIONS.recon).tl : 99999,
    tmrs:{}, done:false, score:0, terrainCrash:false,
  };

  $('h-ico').textContent=d.ico;
  $('h-nm').textContent=d.nm;
  $('h-tp').textContent=d.sub;
  $('h-mod').textContent=C.mode==='m'?'임무 수행':'자유 비행';

  isFPV=C.cam==='fpv';
  camWorldYaw=GS.yaw; camPitch=0.22;
  updCam();
  initMisGameplay();

  const wn={clear:'맑음',cloudy:'흐림',rain:'비',fog:'안개',storm:'폭풍'};
  $('wx-w').textContent=wn[C.wx]||'맑음';
  const drs={0:'N',45:'NE',90:'E',135:'SE',180:'S',225:'SW',270:'W',315:'NW'};
  const windSpd=Math.round((+C.wind||0)*.18)||0;
  $('wx-s').textContent=(drs[+C.wdir]||'N')+' / '+windSpd+'m/s';
  $('wx-t').textContent=(+C.turb||0)<15?'없음':(+C.turb)<50?'보통':'강함';

  if(C.mode==='m'){
    $('m-n').textContent=(MISSIONS[C.mis]||MISSIONS.recon).nm;
    renderObjs();
  } else {
    $('m-n').textContent='자유 비행 연습';
    $('m-objs').innerHTML='<div class="m-o">자유롭게 비행 연습</div>';
  }

  $('fpv-ov').classList.toggle('on',isFPV);
  $('h-hnt').textContent=isFPV
    ?'W/S 전진후진 | A/D 좌우 | Q/E 회전 | Space 상승 | X 하강 | V 3인칭전환 | ESC 일시정지'
    :'W/S 전진후진 | A/D 좌우 | Q/E 회전 | Space 상승 | X 하강 | V FPV전환 | 마우스드래그=카메라조작 | ESC 일시정지';
}

function updCam(){
  $('h-cam').textContent=isFPV?'1인칭 FPV':'3인칭';
  $('h-cbg').textContent=isFPV?'[ 1인칭 FPV 카메라 — V키로 3인칭 전환 ]':'[ 3인칭 추적 카메라 — V키로 FPV 전환 ]';
}

function renderObjs(){
  $('m-objs').innerHTML=GS.objs.map(o=>`<div class="m-o ${o.done?'done':''}">${o.done?'✓':'○'} ${o.text}</div>`).join('');
}

// ════════════════════════════════════════
// INPUT
// ════════════════════════════════════════
const K={};
// 창 포커스 잃을 때 모든 키 해제 — Alt+Tab/스크린샷 후 키 고착 방지
window.addEventListener('blur', ()=>{ for(const k in K) K[k]=false; });
// 일시정지 상태에서 포커스 복귀 시 throttle 강제 0으로 내리지 않고 현 상태 유지
window.addEventListener('focus', ()=>{ /* 키만 해제됐으므로 별도 처리 불필요 */ });
document.addEventListener('keydown',e=>{
  K[e.code]=true;
  if(e.code==='Escape'||e.code==='KeyP'){e.preventDefault();togglePause();}
  if(e.code==='KeyV'&&GS.run&&!GS.paused) flipCam();
  if(e.code==='KeyF'&&GS.run&&!GS.paused) fireWeapon();
  // 설정 화면에서 Enter 키로 비행 개시 (빠른 테스트용)
  if(e.code==='Enter'&&document.getElementById('ss').classList.contains('on')&&!GS.run){
    e.preventDefault(); startGame();
  }
});
document.addEventListener('keyup',e=>K[e.code]=false);

let camDrag=false;
$('cv').addEventListener('mousedown',e=>{if(GS.run&&!GS.paused&&!isFPV&&e.button===0)camDrag=true;});
document.addEventListener('mouseup',()=>camDrag=false);
document.addEventListener('mousemove',e=>{
  if(!camDrag||!GS.run||GS.paused||isFPV) return;
  camWorldYaw -= e.movementX*.003*(C.sens/85);
  camPitch    -= e.movementY*.003*(C.sens/85);
  camPitch     = Math.max(-.15,Math.min(1.2,camPitch));
});

let gp9p=false,gp3p=false;
function gpGet(){try{return navigator.getGamepads?Array.from(navigator.getGamepads()).filter(Boolean):[]}catch{return[];}}
function gpPoll(){
  const gps=gpGet();
  $('h-gp').textContent=gps.length?'연결됨 ✓':'미연결';
  if(!gps.length) return null;
  const gp=gps[0];
  function dz(v,d=.12){return Math.abs(v)<d?0:v;}
  const b9=gp.buttons[9]&&gp.buttons[9].pressed;
  if(b9&&!gp9p) togglePause(); gp9p=b9;
  const b3=gp.buttons[3]&&gp.buttons[3].pressed;
  if(b3&&!gp3p) flipCam(); gp3p=b3;
  return{lx:dz(gp.axes[0]),ly:dz(gp.axes[1]),rx:dz(gp.axes[2]),ry:dz(gp.axes[3]),
    r2:gp.buttons[7]?gp.buttons[7].value:0,l2:gp.buttons[6]?gp.buttons[6].value:0};
}

function flipCam(){
  isFPV=!isFPV;
  $('fpv-ov').classList.toggle('on',isFPV);
  updCam();
  camDrag=false;
}

// ════════════════════════════════════════
// PHYSICS
// ════════════════════════════════════════
function handleInput(dt){
  const gpi=gpPoll();
  const s=C.sens/85;
  const maxV=(GS.drone?GS.drone.spd:80)/3.6;
  let fx=0,fz=0,fy=0,yr=0;

  if(K.KeyW)fz-=1; if(K.KeyS)fz+=1;
  if(K.KeyA)fx-=1; if(K.KeyD)fx+=1;
  if(K.KeyQ)yr-=1; if(K.KeyE)yr+=1;
  if(K.Space||K.ShiftLeft||K.ShiftRight){GS.thrt=Math.min(100,GS.thrt+78*dt);fy+=1;}
  if(K.KeyX||K.ControlLeft||K.ControlRight){GS.thrt=Math.max(0,GS.thrt-66*dt);fy-=1;}
  if(!isFPV){
    if(K.ArrowLeft) camWorldYaw+=dt*1.1;
    if(K.ArrowRight)camWorldYaw-=dt*1.1;
    if(K.ArrowUp)   camPitch=Math.min(1.2,camPitch+dt*1.1);
    if(K.ArrowDown) camPitch=Math.max(-.15,camPitch-dt*1.1);
  }

  if(gpi&&C.ctrl!=='kb'){
    fz+=gpi.ly; fx+=gpi.lx; yr+=gpi.rx*.92;
    if(!isFPV) camPitch=Math.max(-.15,Math.min(1.2,camPitch-gpi.ry*.042));
    if(gpi.r2>.05){GS.thrt=Math.min(100,GS.thrt+gpi.r2*88*dt);fy+=gpi.r2;}
    if(gpi.l2>.05){GS.thrt=Math.max(0,GS.thrt-gpi.l2*77*dt);fy-=gpi.l2;}
  }

  const wr=C.wdir*Math.PI/180;
  const wf=C.wind*.0025;
  fx+=Math.sin(wr)*wf; fz+=Math.cos(wr)*wf;
  if(C.turb>4){
    fx+=(Math.random()-.5)*C.turb*.0018;
    fz+=(Math.random()-.5)*C.turb*.0018;
    fy+=(Math.random()-.5)*C.turb*.0008;
  }

  const accel=maxV*2.5*s;
  const cy=Math.cos(GS.yaw),sy=Math.sin(GS.yaw);
  GS.vx+=(fx*cy-fz*sy)*accel*dt;
  GS.vz+=(fx*sy+fz*cy)*accel*dt;
  GS.vy+=fy*accel*.58*dt;
  GS.yaw+=yr*dt*1.75*s;

  GS.roll = fx*.34;
  GS.pitch = -fz*.26;
}

function updatePhys(dt){
  const stab={easy:.86,normal:.91,hard:.95,expert:.986}[C.diff]||.91;
  const grav=({easy:0,normal:.1,hard:.22,expert:.38}[C.diff]??0.1);
  GS.vx*=stab; GS.vz*=stab; GS.vy*=.85;
  GS.vy-=grav*dt*10;
  GS.x+=GS.vx*dt; GS.z+=GS.vz*dt; GS.y+=GS.vy*dt;
  if(GS.drone) GS.y=Math.min(GS.drone.alt,GS.y);
  GS.alt=Math.round(GS.y);
  GS.spd=Math.round(Math.sqrt(GS.vx*GS.vx+GS.vz*GS.vz)*3.6);
  GS.vs=+(GS.vy*10).toFixed(1);

  // ── 지형 충돌 감지 ──────────────────────────
  if(GS.run && !GS.terrainCrash){
    const terrH=getTerrainH(GS.x,GS.z);
    if(GS.y < terrH+0.8){
      // 지형에 박힘 → 드론 파괴
      GS.terrainCrash=true;
      spawnExp(GS.x,GS.y,GS.z,true);
      if(DRONE) DRONE.visible=false;
      GS.run=false;
      setTimeout(()=>{
        endMis(false,'지형 충돌 — 드론 추락');
      },900);
      return;
    }
    // 지형 아래로 내려가지 않도록 위치 보정
    GS.y=Math.max(GS.y, terrH+0.8);
  } else {
    GS.y=Math.max(.5,GS.y);
  }

  const btF=(GS.drone?GS.drone.bat:60)*60;
  GS.bat=Math.max(0,GS.bat-(100/btF)*dt*(GS.thrt>5?1.35:.52));

  if(DRONE){
    DRONE.position.set(GS.x,GS.y,GS.z);
    DRONE.rotation.y=-GS.yaw;
    DRONE.rotation.x=GS.pitch;
    DRONE.rotation.z=-GS.roll;
  }
}

// ════════════════════════════════════════
// CAMERA
// ════════════════════════════════════════
function updateCamera(){
  if(!DRONE) return;
  const p=DRONE.position;
  // 카메라 흔들림 (폭발 시)
  if(_shakeT>0){
    _shakeT-=_dt;
    const s=_shakeAmt*(_shakeT/0.55)*0.6;
    CAM.position.x+=(Math.random()-.5)*s;
    CAM.position.y+=(Math.random()-.5)*s*0.5;
    CAM.position.z+=(Math.random()-.5)*s;
    if(_shakeT<=0){_shakeT=0;_shakeAmt=0;}
  }

  if(isFPV){
    DRONE.visible=false;
    const fwdX=Math.sin(GS.yaw), fwdZ=-Math.cos(GS.yaw);
    CAM.position.set(p.x+fwdX*1.1, p.y+.1, p.z+fwdZ*1.1);
    CAM.up.set(0,1,0);
    CAM.lookAt(p.x+fwdX*30, p.y-GS.pitch*8, p.z+fwdZ*30);
    if(!_fpvRollQ){_fpvRollQ=new THREE.Quaternion();_fpvRollAxis=new THREE.Vector3();}
    _fpvRollAxis.set(fwdX,0,fwdZ);
    _fpvRollQ.setFromAxisAngle(_fpvRollAxis,-GS.roll*.35);
    CAM.quaternion.multiply(_fpvRollQ);
  } else {
    DRONE.visible=true;
    if(!camDrag){
      const target=GS.yaw;
      let d=((target-camWorldYaw)+Math.PI*3)%(Math.PI*2)-Math.PI;
      camWorldYaw+=d*Math.min(_dt*2.2,.12);
      camPitch+=(0.22-camPitch)*Math.min(_dt*1.5,.08);
    }
    const dist=12;
    const cx=p.x-Math.sin(camWorldYaw)*dist*Math.cos(camPitch);
    const cy=p.y+Math.sin(camPitch)*dist;
    const cz=p.z+Math.cos(camWorldYaw)*dist*Math.cos(camPitch);
    CAM.position.set(cx, Math.max(.5,cy), cz);
    CAM.lookAt(p.x, p.y+.5, p.z);
    CAM.up.set(0,1,0);
  }
}

// ════════════════════════════════════════
// HUD UPDATE
// ════════════════════════════════════════
let sT=0;
function updateHUD(dt){
  GS.ft+=dt; sT+=dt;

  if(DRONE){
    const sb=DRONE.getObjectByName('strobe');
    if(sb) sb.intensity=Math.floor(sT/.75)%2===0?1.6:0;
    const rd=DRONE.getObjectByName('red');
    if(rd) rd.intensity=Math.floor(sT/.35)%2===0?.55:0;
    const nv=DRONE.getObjectByName('nav');
    if(nv) nv.intensity=.6+Math.sin(sT*4)*.25;
  }

  const t=Math.floor(GS.ft);
  $('h-time').textContent=p2(Math.floor(t/3600))+':'+p2(Math.floor(t%3600/60))+':'+p2(t%60);

  $('t-spd').textContent=GS.spd;
  $('t-alt').textContent=GS.alt;
  // 상단 바 고도 표시
  const hAlt=$('h-alt');if(hAlt)hAlt.textContent=GS.alt+'m';

  const bp=Math.round(GS.bat);
  const bf=$('bat-f');
  bf.style.width=bp+'%';
  bf.style.background=bp>40?'var(--g)':bp>20?'var(--w)':'var(--r)';
  $('bat-p').textContent=bp+'%';

  const tp=Math.round(GS.thrt);
  $('th-f').style.height=tp+'%';
  $('th-v').textContent=tp+'%';
  $('i-th').textContent=tp+'%';

  const pitDeg=GS.pitch*180/Math.PI;
  const rolDeg=GS.roll*180/Math.PI;
  $('a-hz').style.transform=`rotate(${rolDeg}deg) translateY(${-pitDeg*3.2}%)`;
  $('a-gnd').style.transform=`rotate(${rolDeg}deg)`;

  const yd=Math.round(((GS.yaw*180/Math.PI)%360+360)%360);
  $('c-val').textContent=String(yd).padStart(3,'0')+'°';
  buildCompass(yd);

  $('i-vs').textContent=GS.vs+'m/s';
  $('i-pt').textContent=Math.round(pitDeg)+'°';
  $('i-rl').textContent=Math.round(rolDeg)+'°';
  $('i-yw').textContent=yd+'°';
  const dist=Math.round(Math.sqrt(GS.x*GS.x+GS.z*GS.z));
  $('i-ds').textContent=dist+'m';
  const lq=dist<500?'정상':dist<1000?'약함':'불량';
  const lqEl=$('i-lk');
  lqEl.textContent=lq;lqEl.className='iv'+(lq==='불량'?' r':lq==='약함'?' w':'');

  const hw=$('h-wrn');
  hw.style.color='var(--r)';
  if(GS.bat===0){hw.style.display='block';hw.textContent='⚠ 배터리 방전 — 비상착륙 ⚠';}
  else if(GS.bat<20){hw.style.display='block';hw.textContent='⚠ 배터리 부족 — 즉시 귀환 ⚠';}
  else if(GS.alt<5){hw.style.display='block';hw.textContent='⚠ 저고도 위험 ⚠';}
  else hw.style.display='none';

  // ── 미션 타이머 ──
  if(C.mode==='m'&&!GS.done){
    const tl=Math.max(0,GS.tl);
    const timerEl=$('mis-timer');
    if(timerEl){
      timerEl.textContent='⏱ '+p2(Math.floor(tl/60))+':'+p2(Math.floor(tl%60));
      timerEl.className=tl<60?'warn':'';
    }
  }

  // ── 공격 가이드 바 ──
  const ag=$('atk-guide');
  if(ag&&GMS.misType==='attack'&&!GS.done){
    const alive=GMS.targets.filter(t=>t.mesh&&t.mesh.visible).length;
    const locked=!!_lockTarget;
    if(locked){
      ag.innerHTML=`<span class="rd">🔴 LOCK-ON</span> &nbsp;|&nbsp; <span class="hl">F키</span> = 미사일 발사 &nbsp;|&nbsp; 잔여 목표 <span class="hl">${alive}</span>개 &nbsp;|&nbsp; 미사일 <span class="hl">${GMS.ammo}</span>발`;
    } else {
      const closest=GMS.targets.filter(t=>t.mesh&&t.mesh.visible).reduce((a,b)=>{
        const da=Math.sqrt((a.x-GS.x)**2+(a.z-GS.z)**2);
        const db=Math.sqrt((b.x-GS.x)**2+(b.z-GS.z)**2);
        return da<db?a:b;
      },{x:9999,z:9999});
      const d=Math.round(Math.sqrt((closest.x-GS.x)**2+(closest.z-GS.z)**2));
      if(d<9999){
        const need=d<800?0:d-800;
        ag.innerHTML=need>0
          ?`🎯 가장 가까운 목표 <span class="wn">${d}m</span> &nbsp;|&nbsp; <span class="wn">Lock-on까지 ${need}m 더 접근</span> &nbsp;|&nbsp; 미사일 <span class="hl">${GMS.ammo}</span>발`
          :`🎯 목표 <span class="hl">${d}m</span> — 화면 중앙에 맞추면 Lock-on &nbsp;|&nbsp; <span class="hl">F키</span> 발사 &nbsp;|&nbsp; 미사일 <span class="hl">${GMS.ammo}</span>발`;
      }
    }
  }
}

function buildCompass(hdg){
  const bar=$('c-tks');bar.innerHTML='';
  const W=210;
  for(let i=-180;i<=360;i+=10){
    const deg=(i+360)%360;
    const off=((i-hdg+540)%360-180)/(180)*(W/2)+W/2;
    if(off<-6||off>W+6) continue;
    const tk=document.createElement('div');
    tk.className='ctk'+(deg%90===0?' maj':'');
    tk.textContent=deg===0?'N':deg===90?'E':deg===180?'S':deg===270?'W':deg%45===0?String(deg):'·';
    tk.style.left=off+'px';
    bar.appendChild(tk);
  }
}

function p2(n){return String(n).padStart(2,'0');}

// ════════════════════════════════════════
// MINIMAP
// ════════════════════════════════════════
function updateMini(){
  if(!mmCtx) return;
  const W=116,H=116;
  mmCtx.clearRect(0,0,W,H);
  const bgC={plain:'#1e3a0c',mountain:'#2a301a',sea:'#0a1e38',urban:'#1e1e28',military:'#1e2a18'};
  mmCtx.fillStyle=bgC[C.map]||'#1e3a0c';mmCtx.fillRect(0,0,W,H);
  mmCtx.strokeStyle='rgba(0,255,136,.06)';mmCtx.lineWidth=.5;
  for(let i=0;i<W;i+=20){
    mmCtx.beginPath();mmCtx.moveTo(i,0);mmCtx.lineTo(i,H);mmCtx.stroke();
    mmCtx.beginPath();mmCtx.moveTo(0,i);mmCtx.lineTo(W,i);mmCtx.stroke();
  }
  const sc=W/700;
  if(C.mode==='m') getMT().forEach((t,i)=>{
    const sx=Math.max(3,Math.min(W-3,W/2+t[0]*sc));
    const sz=Math.max(3,Math.min(H-3,H/2+t[2]*sc));
    mmCtx.fillStyle=i===0?'#00ff88':'#ff3300';
    mmCtx.fillRect(sx-3,sz-3,6,6);
  });
  mmCtx.strokeStyle='rgba(0,255,136,.5)';mmCtx.lineWidth=1;
  mmCtx.strokeRect(W/2-3,H/2-3,6,6);
  const dx=Math.max(5,Math.min(W-5,W/2+GS.x*sc));
  const dz=Math.max(5,Math.min(H-5,H/2+GS.z*sc));
  mmCtx.save();mmCtx.translate(dx,dz);mmCtx.rotate(GS.yaw);
  mmCtx.fillStyle='#00ffcc';
  mmCtx.beginPath();mmCtx.moveTo(0,-7);mmCtx.lineTo(4,5);mmCtx.lineTo(-4,5);mmCtx.closePath();mmCtx.fill();
  mmCtx.restore();
  if(GMS&&GMS.enemies){GMS.enemies.forEach(e=>{
    const ex2=Math.max(3,Math.min(W-3,W/2+e.x*sc)),ez2=Math.max(3,Math.min(H-3,H/2+e.z*sc));
    mmCtx.fillStyle='#ff3300';mmCtx.beginPath();mmCtx.arc(ex2,ez2,3.5,0,Math.PI*2);mmCtx.fill();
  });}
  // 보급드론 (파란 마름모)
  if(GMS&&GMS.supplyDrone&&!GMS.supplyDrone.reached){
    const sd=GMS.supplyDrone;
    const sx2=Math.max(4,Math.min(W-4,W/2+sd.x*sc)),sz2=Math.max(4,Math.min(H-4,H/2+sd.z*sc));
    mmCtx.save();mmCtx.translate(sx2,sz2);mmCtx.rotate(Math.PI/4);
    mmCtx.fillStyle='#0088ff';mmCtx.fillRect(-4,-4,8,8);
    mmCtx.restore();
    // 라벨
    mmCtx.fillStyle='#4488ff';mmCtx.font='7px Orbitron,monospace';
    mmCtx.fillText('LS-1',sx2+6,sz2+4);
  }
  if(GMS&&GMS.targets){GMS.targets.filter(t=>t.mesh.visible).forEach(t=>{
    const tx=Math.max(3,Math.min(W-3,W/2+t.x*sc)),tz=Math.max(3,Math.min(H-3,H/2+t.z*sc));
    mmCtx.fillStyle='#ffaa00';mmCtx.fillRect(tx-3,tz-3,6,6);
  });}
  mmCtx.fillStyle='rgba(0,255,136,.5)';mmCtx.font='9px Orbitron,monospace';
  mmCtx.fillText(GS.alt+'m',4,H-4);
}

// ════════════════════════════════════════
// MISSION LOGIC
// ════════════════════════════════════════
function updateMission(dt){
  if(C.mode!=='m'||GS.done) return;
  GS.tl-=dt;

  if(GMS.misType==='attack'){
    SCN.traverse(o=>{if(o.name==='atgtring')o.rotation.z+=dt*.55;});
    if(GS.tl<=0) endMis(false);
    // 탄약 소진 + 남은 목표 있으면 실패 알림 (즉시 종료는 안 함 — 비유도탄 가능성)
    return;
  }
  if(GMS.misType==='defense'){
    // 보급드론 회전 애니메이션
    if(GMS.supplyDrone&&GMS.supplyDrone.mesh){
      GMS.supplyDrone.mesh.rotation.y+=dt*.6;
      const bNode=GMS.supplyDrone.mesh.getObjectByName('beacon');
      if(bNode)bNode.material.emissiveIntensity=1.5+Math.sin(GS.ft*5)*1.3;
    }
    // 보급드론 접근 체크 (escort 미션)
    if(C.mis==='escort'&&GMS.supplyDrone&&!GMS.supplyDrone.reached){
      const sd=GMS.supplyDrone;
      const dd=Math.sqrt((GS.x-sd.x)**2+(GS.z-sd.z)**2);
      if(dd<32){
        GMS.supplyDrone.reached=true;
        GMS.supplyReached=true;
        $('supply-cnt')&&($('supply-cnt').textContent='✅ 합류!');
        // 합류 후 보급드론 효과 변경 (녹색)
        sd.mesh.traverse(o=>{
          if(o.isMesh&&o.material&&o.material.color){
            const mc=o.material.color.getHex();
            if(mc===0x0088ff||mc===0x1a2a44||mc===0x223355)
              o.material.color.set(0x00cc44);
          }
        });
        const hw=$('h-wrn');hw.style.display='block';hw.style.color='var(--g)';
        hw.textContent='✅ 보급 드론과 합류 성공!';
        setTimeout(()=>{hw.style.display='none';hw.style.color='var(--r)';},2500);
      }
    }
    if(GS.tl<=0&&!GS.done){
      // escort: 보급드론 합류 + 적 탈출 3기 미만이어야 성공
      if(C.mis==='escort') endMis(GMS.supplyReached && GMS.escaped<3);
      else endMis(GMS.escaped<3);
    }
    return;
  }
  const tgts=getMT().slice(1);
  GS.objs.forEach((obj,i)=>{
    if(obj.done) return;
    let near=false;
    if(i<tgts.length){const t=tgts[i];near=Math.sqrt((GS.x-t[0])**2+(GS.z-t[2])**2)<100&&GS.alt<80;}
    else{if(GS.objs.slice(0,i).every(o=>o.done))near=Math.sqrt(GS.x*GS.x+GS.z*GS.z)<36;}
    if(near){
      GS.tmrs[i]=(GS.tmrs[i]||0)+dt;
      const pct=Math.min(100,Math.round(GS.tmrs[i]/3*100));
      $('scan-wrap').style.display='block';
      $('scan-fill').style.width=pct+'%';
      if(GS.tmrs[i]>3){
        obj.done=true;renderObjs();$('scan-wrap').style.display='none';
        // GMS.targets에도 done 반영
        if(GMS.targets[i]) GMS.targets[i].done=true;
        // 스캔 카운터 업데이트
        const done=GS.objs.filter(o=>o.done).length;
        $('scan-cnt')&&($('scan-cnt').textContent=done+'/'+GS.objs.length);
      }
    } else {
      GS.tmrs[i]=0;
      if(i===GS.objs.findIndex(o=>!o.done)) $('scan-wrap').style.display='none';
    }
  });
  SCN.traverse(o=>{if(o.name&&o.name.startsWith('tgt'))o.rotation.z+=dt*.65;});
  if(GS.objs.every(o=>o.done)){
    GS.score=(MISSIONS[C.mis]||MISSIONS.recon).sc+Math.round(Math.max(0,GS.tl)*.5);
    endMis(true);
  } else if(GS.tl<=0){endMis(false);}
}

// ════════════════════════════════════════
// MISSION GAMEPLAY — WEAPONS / ENEMIES
// ════════════════════════════════════════
const GMS={ammo:0,missiles:[],targets:[],enemies:[],explosions:[],
  spawnTimer:0,enemyCount:0,intercepted:0,escaped:0,misType:'free',
  supplyDrone:null,supplyReached:false};

function getMisType(){
  if(C.mode!=='m') return 'free';
  const cat=(MISSIONS[C.mis]||{}).cat;
  return {정찰:'recon',타격:'attack',방어:'defense'}[cat]||'free';
}

function initMisGameplay(){
  if(SCN){
    GMS.missiles.forEach(m=>SCN.remove(m.mesh));
    GMS.targets.forEach(t=>SCN.remove(t.mesh));
    GMS.enemies.forEach(e=>SCN.remove(e.mesh));
    GMS.explosions.forEach(e=>{if(e.isLight)SCN.remove(e.lt);else SCN.remove(e.mesh);});
  }
  const d=DRONES.find(x=>x.id===C.did)||DRONES[0];
  const mt=getMisType();
  // cleanup previous supply drone if exists
  if(GMS.supplyDrone&&SCN) SCN.remove(GMS.supplyDrone.mesh);
  Object.assign(GMS,{ammo:0,missiles:[],targets:[],enemies:[],explosions:[],
    spawnTimer:0,enemyCount:0,intercepted:0,escaped:0,misType:mt,
    supplyDrone:null,supplyReached:false});
  // lw(대형무장)=6발, 기타공격=4발 — 목표 2기 대비 충분한 여유
  if(mt==='attack') GMS.ammo=d.shape==='lw'?6:4;
  // INT-K 탄약 12발 (적 스폰 최대와 동일 — 완전 격추 가능)
  else if(mt==='defense') GMS.ammo=d.id==='intk'?12:99;
  // 미션 타이머 div 동적 생성
  let timerEl=$('mis-timer');
  if(!timerEl){
    timerEl=document.createElement('div');timerEl.id='mis-timer';
    $('hud').appendChild(timerEl);
  }
  // 공격 가이드 바 동적 생성
  let atkGuide=$('atk-guide');
  if(!atkGuide){
    atkGuide=document.createElement('div');atkGuide.id='atk-guide';
    $('hud').appendChild(atkGuide);
  }

  $('h-ammo').style.display='none';$('h-def').style.display='none';$('scan-wrap').style.display='none';
  timerEl.style.display='none';atkGuide.style.display='none';
  const dg=$('def-guide');if(dg)dg.style.display='none';
  if(mt==='attack'){buildAtkTargets();$('h-ammo').style.display='block';updAmmoHUD();atkGuide.style.display='block';}
  if(mt==='defense'){
    $('h-def').style.display='block';updDefHUD();
    if(d.id==='intk'){$('h-ammo').style.display='block';updAmmoHUD();}
    if(C.mode==='m'){
      if(C.mis==='escort'){
        // 호위 미션: 보급드론 스폰 + 전용 패널
        spawnSupplyDrone();
        $('m-n').textContent='보급 드론 호위';
        $('m-objs').innerHTML=`<div class="m-o">보급드론 합류: <span id="supply-cnt">대기</span></div><div class="m-o">요격: <span id="def-cnt">0/10</span></div><div class="m-o">탈출허용: <span id="esc-cnt">0</span>/3</div><div class="m-o" style="font-size:.6rem">📦 방향표시기로 보급드론 위치 확인</div>`;
        if(dg) dg.style.display='block';
      } else {
        $('m-n').textContent='방어 작전';
        $('m-objs').innerHTML='<div class="m-o">요격: <span id="def-cnt">0/10</span></div><div class="m-o">탈출허용: <span id="esc-cnt">0</span>/3</div><div class="m-o" style="font-size:.6rem">NET-1=접근포획 | INT-K=F키발사</div>';
      }
    }
  }
  if(mt==='attack'&&C.mode==='m'){
    $('m-n').textContent='타격 미션';
    $('m-objs').innerHTML='<div class="m-o">목표 파괴: <span id="atk-cnt">'+GMS.targets.length+'/'+GMS.targets.length+'</span> 남음</div><div class="m-o" style="font-size:.6rem">🚀 F키로 미사일 발사</div>';
  }
  if(mt==='attack'||mt==='defense'){
    const base=isFPV
      ?'W/S 전진후진 | A/D 좌우 | Q/E 회전 | Space 상승 | X 하강 | V 3인칭전환'
      :'W/S 전진후진 | A/D 좌우 | Q/E 회전 | Space 상승 | X 하강 | V FPV전환';
    $('h-hnt').textContent=base+' | 🚀 F=발사 | ESC 일시정지';
  }
  if(mt==='recon') buildReconTargets();

  // 미션 타이머 표시 (미션 모드만)
  if(C.mode==='m'){
    const timerEl2=$('mis-timer');
    if(timerEl2) timerEl2.style.display='block';
  }

  // 미션 브리핑 표시 (0.5초 후 — 씬 로딩 후)
  if(C.mode==='m') setTimeout(showMissionBrief, 500);
}

// ════════════════════════════════════════
// MISSION BRIEFING
// ════════════════════════════════════════
function showMissionBrief(){
  if(C.mode!=='m') return;
  const mt=getMisType();
  const mis=MISSIONS[C.mis]||MISSIONS.recon;
  GS.run=false; // 브리핑 중 일시정지

  const catName={recon:'🔵 정찰 작전',attack:'🔴 타격 작전',defense:'🟢 방어 작전'}[mt]||'자유 비행';
  const tl=mis.tl;
  const tlStr=Math.floor(tl/60)+'분'+(tl%60?' '+tl%60+'초':'');

  let controlsHtml='';
  if(mt==='attack'){
    const ammoCount=GMS.ammo;
    controlsHtml=`
      <div class="brief-ctrl"><span class="ck">접근</span> 목표 800m 이내 접근 → 화면에 🔴 LOCK 표시</div>
      <div class="brief-ctrl"><span class="ck">F키</span> Lock-on 상태에서 미사일 발사 → 자동 유도</div>
      <div class="brief-ctrl"><span class="ck">화살표</span> 화면 하단 방향 표시기로 목표 위치 확인</div>
      <div class="brief-warn">⚠ 총 미사일 ${ammoCount}발 — 각 목표에 신중하게 발사하세요</div>
      <div class="brief-warn" style="color:var(--g);border-color:rgba(0,255,136,.22);background:rgba(0,255,136,.06);margin-top:.4rem">💡 미사일은 Lock-on 후 발사하면 목표까지 자동 유도됩니다</div>
    `;
  } else if(mt==='recon'){
    controlsHtml=`
      <div class="brief-ctrl"><span class="ck">화살표</span> 하단 방향 표시기로 정찰 목표 방향 확인</div>
      <div class="brief-ctrl"><span class="ck">접근</span> 목표 100m 이내 + 고도 80m 이하 접근</div>
      <div class="brief-ctrl"><span class="ck">유지</span> 3초 유지 → 자동 스캔 완료 → 다음 목표 이동</div>
      <div class="brief-warn">⚠ 제한 시간 ${tlStr} 이내 모든 목표 스캔 필요</div>
    `;
  } else if(mt==='defense'){
    const isIntk=C.did==='intk';
    const isEscort=C.mis==='escort';
    if(isEscort){
      controlsHtml=`
        <div class="brief-ctrl"><span class="ck">화살표</span> 하단 <b style="color:var(--b)">파란 방향 표시기</b>로 보급드론 위치 탐색</div>
        <div class="brief-ctrl"><span class="ck">합류</span> 보급드론 32m 이내 접근 시 자동 합류 완료</div>
        <div class="brief-ctrl"><span class="ck">방어</span> ${isIntk?'F키 미사일(12발)':'22m 이내 자동 그물 포획'}으로 적 드론 격퇴</div>
        <div class="brief-ctrl"><span class="ck">미니맵</span> 🟠 주황 화살표=보급드론 | 🔴 적색 점=적 드론</div>
        <div class="brief-warn">⚠ 보급드론 합류 + 적 3기 이하 도달 → 미션 성공</div>
        <div class="brief-warn" style="color:var(--b);border-color:rgba(0,136,255,.22);background:rgba(0,136,255,.06);margin-top:.4rem">💡 파란 수직 빔과 파란 화살표가 보급드론 위치입니다</div>
      `;
    } else {
      controlsHtml=isIntk?`
        <div class="brief-ctrl"><span class="ck">접근</span> 적 드론 1200m 이내 → 🔴 LOCK 표시</div>
        <div class="brief-ctrl"><span class="ck">F키</span> 요격 미사일 발사 → 자동 유도 격추 (12발)</div>
        <div class="brief-ctrl"><span class="ck">화살표</span> 하단 방향 표시기로 적 드론 방향 추적</div>
        <div class="brief-warn">⚠ 적 3기 기지 도달 시 미션 실패 | 10기 격추 시 성공</div>
      `:`
        <div class="brief-ctrl"><span class="ck">접근</span> 적 드론에 22m 이내로 접근</div>
        <div class="brief-ctrl"><span class="ck">자동</span> 22m 이내 진입 시 그물 자동 발사·포획</div>
        <div class="brief-ctrl"><span class="ck">화살표</span> 하단 방향 표시기로 적 드론 방향 추적</div>
        <div class="brief-warn">⚠ 적 3기 기지 도달 시 미션 실패 | 10기 포획 시 성공</div>
      `;
    }
  }

  const objHtml=mis.objs.map((o,i)=>
    `<div class="brief-obj"><span class="no">0${i+1}</span>${o}</div>`
  ).join('');

  let ov=$('miss-brief-ov');
  if(!ov){
    ov=document.createElement('div');
    ov.id='miss-brief-ov';ov.className='miss-brief';
    $('sg').appendChild(ov);
  }
  ov.innerHTML=`
    <div class="brief-box">
      <div class="brief-ttl">${mis.nm}</div>
      <div class="brief-cat">${catName} &nbsp;·&nbsp; 제한시간: ${tlStr} &nbsp;·&nbsp; 목표점수: ${mis.sc}점</div>
      ${objHtml}
      <hr class="brief-sep">
      <div class="brief-ctrl-hdr">◈ 조작 가이드</div>
      ${controlsHtml}
      <button class="brief-start" onclick="closeMissionBrief()">▶ 작전 개시</button>
    </div>
  `;
  ov.classList.add('on');
}

function closeMissionBrief(){
  const ov=$('miss-brief-ov');
  if(ov){ov.classList.remove('on');}
  GS.run=true;
  lastT=performance.now();
  aniId=requestAnimationFrame(loop);
}

function buildAtkTargets(){
  const pts=getMT().slice(1);
  pts.forEach((p,i)=>{
    // 지형 높이에 맞춰 목표 배치 (지형 아래 묻히는 버그 수정)
    const th=getTerrainH(p[0],p[2]);
    const g=new THREE.Group();g.position.set(p[0],th,p[2]);

    // ── 군사 차량 본체 (더 밝은 색으로 식별성 향상) ──
    const bdy=new THREE.Mesh(new THREE.BoxGeometry(4.5,1.8,2.8),M(0x3a4828));bdy.position.y=.9;bdy.castShadow=true;g.add(bdy);
    const rf=new THREE.Mesh(new THREE.BoxGeometry(4,.55,2.4),M(0x2a3818));rf.position.y=1.98;g.add(rf);
    // 포탑
    const turret=new THREE.Mesh(new THREE.CylinderGeometry(.6,.7,.7,8),M(0x2e3e1e));turret.position.set(0,2.5,0);g.add(turret);
    const barrel=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2.2,6),M(0x222222));barrel.rotation.z=Math.PI/2;barrel.position.set(1.2,2.65,0);g.add(barrel);
    // 바퀴
    [[-1.6,1],[-1.6,-1],[1.6,1],[1.6,-1]].forEach(([wx,wz])=>{
      const w=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.78,8),M(0x111111));w.position.set(wx,.39,wz);g.add(w);
    });

    // ── 원거리 식별 마커 ──
    // 지면 타겟 링 (넓고 밝은 빨간 링 2중)
    const ring=new THREE.Mesh(new THREE.TorusGeometry(9,.5,8,24),M(0xff2200,0xff2200,.7));ring.rotation.x=Math.PI/2;ring.position.y=.12;ring.name='atgtring';g.add(ring);
    const ring2=new THREE.Mesh(new THREE.TorusGeometry(5.5,.3,8,18),M(0xff6600,0xff6600,.55));ring2.rotation.x=Math.PI/2;ring2.position.y=.14;ring2.name='atgtring';g.add(ring2);
    // 수직 빔 (높이 90m — 원거리에서 보임, 반투명)
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,90,5),M(0xff3300));
    beam.material.transparent=true;beam.material.opacity=.22;beam.position.y=45;g.add(beam);
    // 상단 경고등 (빨간 구체 — 멀리서 보임)
    const topLight=new THREE.Mesh(new THREE.SphereGeometry(.8,8,8),M(0xff2200,0xff2200,2.5));topLight.position.y=4;g.add(topLight);
    // 포인트 라이트 (주변 조명)
    const pl=new THREE.PointLight(0xff2200,1.5,35);pl.position.y=4;g.add(pl);

    SCN.add(g);
    // hp=1: 유도 정밀 타격 1발 1파괴 (헬파이어 실전 기준)
    GMS.targets.push({mesh:g,hp:1,x:p[0],z:p[2]});
  });
}

function fireWeapon(){
  if(!GS.run||GS.paused) return;
  const mt=GMS.misType;
  if(mt==='free'||mt==='recon') return;
  if(GMS.ammo<=0){
    const w=$('h-wrn');w.style.display='block';w.textContent='⚠ 탄약 소진 ⚠';
    setTimeout(()=>{if(GS.alt<5)w.textContent='⚠ 저고도 위험 ⚠';else w.style.display='none';},1800);return;
  }

  // 잠금 목표 확인
  const tgt=_lockTarget;
  if(!tgt && mt==='attack'){
    // 잠금 없어도 발사는 가능 — 직진 비유도탄으로 발사
    const w=$('h-wrn');w.style.display='block';w.style.color='var(--w)';
    w.textContent='⚠ 비유도 발사 — 500m 이내 접근 시 자동 유도';
    setTimeout(()=>{w.style.display='none';w.style.color='var(--r)';},1800);
  }

  GMS.ammo--;updAmmoHUD();
  const fwdX=Math.sin(GS.yaw),fwdZ=-Math.cos(GS.yaw),spd=90;
  const m={
    x:GS.x+fwdX*2, y:GS.y-.1, z:GS.z+fwdZ*2,
    vx:fwdX*spd, vy:2, vz:fwdZ*spd,
    life:18,
    guided: !!tgt,   // Fire-and-Forget 유도 여부
    target: tgt,     // 잠금 목표 (attack=건물/defense=적드론)
    armed: false,    // 발사 후 0.5초 뒤 유도 활성
    armT: 0
  };
  const mg=new THREE.Group();
  // 동체
  const mb=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,.72,8),M(0x3a4a5e));mb.rotation.z=Math.PI/2;mg.add(mb);
  // 앞 시커
  const mf=new THREE.Mesh(new THREE.SphereGeometry(.062,6,6),M(0x0c1824,0x000e20,.14));mf.position.x=.4;mg.add(mf);
  // 후방 로켓 화염
  const mtr=new THREE.Mesh(new THREE.CylinderGeometry(.02,.004,.52,4),M(0xffaa44,0xff8800,2.2));mtr.rotation.z=Math.PI/2;mtr.position.x=-.6;mg.add(mtr);
  // 전방 제어핀 ×4
  for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;
    const fin=new THREE.Mesh(new THREE.BoxGeometry(.12,.003,.045),M(0x1e2e3e));fin.position.set(.22,Math.sin(a)*.06,Math.cos(a)*.06);fin.rotation.x=a;mg.add(fin);}
  // 후방 안정핀 ×4
  for(let i=0;i<4;i++){const a=i*Math.PI/2;
    const fin=new THREE.Mesh(new THREE.BoxGeometry(.18,.003,.08),M(0x1e2e3e));fin.position.set(-.26,Math.sin(a)*.08,Math.cos(a)*.08);fin.rotation.x=a;mg.add(fin);}
  mg.position.set(m.x,m.y,m.z);SCN.add(mg);m.mesh=mg;
  GMS.missiles.push(m);

  // 발사 피드백
  const w=$('h-wrn');
  w.style.color='var(--g)';w.style.display='block';
  w.textContent=tgt?'🚀 미사일 발사 — 자동 유도 중':'🚀 미사일 발사';
  setTimeout(()=>{w.style.display='none';w.style.color='var(--r)';},1200);
}

function updAmmoHUD(){
  const el=$('h-ammo');if(!el) return;
  el.textContent='🚀 '+(GMS.ammo>0?GMS.ammo:'—');
}
function updDefHUD(){
  $('def-cnt')&&($('def-cnt').textContent=GMS.intercepted+'/10');
  $('esc-cnt')&&($('esc-cnt').textContent=GMS.escaped);
}

const _fwdV=new THREE.Vector3();

// ── 카메라 흔들림 ──
let _shakeT=0, _shakeAmt=0;
function triggerShake(intensity){_shakeT=0.55;_shakeAmt=intensity;}

// ── 미사일 연기 트레일 ──
const _smokePool=[];
function spawnSmoke(x,y,z){
  const geo=new THREE.SphereGeometry(0.28+Math.random()*.2,5,5);
  const mat=new THREE.MeshBasicMaterial({color:0x999999,transparent:true,opacity:.35});
  const mesh=new THREE.Mesh(geo,mat);
  mesh.position.set(x+(Math.random()-.5)*.3,y+(Math.random()-.5)*.3,z+(Math.random()-.5)*.3);
  SCN.add(mesh);
  _smokePool.push({mesh,mat,t:0,maxT:.8+Math.random()*.5});
}
function updateSmoke(dt){
  for(let i=_smokePool.length-1;i>=0;i--){
    const s=_smokePool[i];s.t+=dt;
    const p=s.t/s.maxT;
    s.mesh.scale.setScalar(1+p*2.8);
    s.mat.opacity=Math.max(0,.35*(1-p*1.1));
    s.mesh.position.y+=dt*.5;
    if(p>=1){SCN.remove(s.mesh);s.mat.dispose();s.mesh.geometry.dispose();_smokePool.splice(i,1);}
  }
}

function updateProjectiles(dt){
  if(!GMS.missiles.length&&!_smokePool.length)return;
  updateSmoke(dt);
  if(!GMS.missiles.length)return;

  GMS.missiles=GMS.missiles.filter(m=>{
    m.life-=dt;
    m.armT+=dt;
    if(!m.armed&&m.armT>0.35)m.armed=true;

    // ── 비례 항법 유도 (Proportional Navigation) ──
    if(m.guided&&m.armed&&m.target){
      let tx,ty,tz;
      if(m.target.x!==undefined){
        // 공격 목표: mesh.position = 지형 높이 반영된 세계 좌표
        const tg=m.target.mesh;
        if(tg&&tg.visible){
          tx=tg.position.x; tz=tg.position.z;
          ty=tg.position.y+1.8; // 지형높이 + 차량 중심 (핵심 수정)
        } else { m.guided=false; }
      } else {
        // 방어: 이동 적 드론
        if(m.target.mesh){
          tx=m.target.mesh.position.x;
          ty=m.target.mesh.position.y;
          tz=m.target.mesh.position.z;
        } else { m.guided=false; }
      }

      if(m.guided&&tx!==undefined){
        const dx=tx-m.x, dy=ty-m.y, dz=tz-m.z;
        const dist3=Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(dist3>1.0){
          const curSpd=Math.sqrt(m.vx*m.vx+m.vy*m.vy+m.vz*m.vz)||85;
          // 조향 강도 10.0 (이전 3.5의 3배 — 고속에서도 정확 추적)
          const turn=Math.min(1,dt*10.0);
          m.vx+=(dx/dist3*curSpd-m.vx)*turn;
          m.vy+=(dy/dist3*curSpd-m.vy)*turn;
          m.vz+=(dz/dist3*curSpd-m.vz)*turn;
          // 속도 85m/s 일정 유지
          const ns=Math.sqrt(m.vx*m.vx+m.vy*m.vy+m.vz*m.vz);
          if(ns>0.1){const n=curSpd/ns;m.vx*=n;m.vy*=n;m.vz*=n;}
        }
      }
    } else if(!m.guided){
      m.vy-=5*dt; // 비유도 중력
    }

    m.x+=m.vx*dt;m.y+=m.vy*dt;m.z+=m.vz*dt;
    m.mesh.position.set(m.x,m.y,m.z);

    _fwdV.set(m.vx,m.vy,m.vz);
    if(_fwdV.lengthSq()>.01){_fwdV.normalize();m.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0),_fwdV);}

    // 연기 트레일 (유도탄만)
    if(m.guided){m.smokeT=(m.smokeT||0)+dt;if(m.smokeT>0.045){m.smokeT=0;spawnSmoke(m.x,m.y,m.z);}}

    // 수명·지면 충돌
    if(m.y<.3||m.life<=0){if(m.y<.3)spawnExp(m.x,.4,m.z,false);SCN.remove(m.mesh);return false;}

    // ── 타격 목표 명중 (3D 거리 + 지형 높이 반영) ──
    for(let i=GMS.targets.length-1;i>=0;i--){
      const t=GMS.targets[i];if(!t.mesh.visible)continue;
      const tWorldY=t.mesh.position.y; // 지형 높이 포함된 세계 Y
      const d3=Math.sqrt((m.x-t.x)**2+(m.y-(tWorldY+1.8))**2+(m.z-t.z)**2);
      if(d3<14){ // 14m 반경 (이전 8m — 폭발 범위 현실화)
        t.hp--;spawnExp(t.x,tWorldY+2.5,t.z,true);
        triggerShake(1.8);
        if(t.hp<=0){t.mesh.visible=false;checkAtkWin();}
        SCN.remove(m.mesh);return false;
      }
    }
    // ── 적 드론 명중 ──
    for(let i=GMS.enemies.length-1;i>=0;i--){
      const e=GMS.enemies[i];
      if(Math.sqrt((m.x-e.x)**2+(m.y-e.y)**2+(m.z-e.z)**2)<9){
        spawnExp(e.x,e.y,e.z,true);triggerShake(1.2);
        SCN.remove(e.mesh);GMS.enemies.splice(i,1);
        GMS.intercepted++;updDefHUD();checkDefWin();
        SCN.remove(m.mesh);return false;
      }
    }
    return true;
  });
}

function spawnExp(x,y,z,big){
  const sc=big?5.5:2.5,maxT=big?.8:.4;
  const geo=new THREE.SphereGeometry(1,8,8);
  const mat=new THREE.MeshStandardMaterial({color:0xff5500,emissive:new THREE.Color(0xff6600),emissiveIntensity:2.5,transparent:true,opacity:1,roughness:.9});
  const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);SCN.add(mesh);
  GMS.explosions.push({mesh,mat,t:0,maxT,sc});
  const lt=new THREE.PointLight(0xff6600,big?10:5,big?35:18);lt.position.set(x,y,z);SCN.add(lt);
  GMS.explosions.push({isLight:true,lt,t:0,maxT:.35});
}

function updateExplosions(dt){
  if(!GMS.explosions.length) return;
  GMS.explosions=GMS.explosions.filter(e=>{
    e.t+=dt;const p=e.t/e.maxT;
    if(e.isLight){e.lt.intensity*=(1-dt*5);if(p>=1){SCN.remove(e.lt);return false;}return true;}
    const sc=e.sc*(p<.2?p/.2:Math.max(0,(1-p)/.8));
    e.mesh.scale.setScalar(Math.max(.001,sc));
    e.mat.opacity=Math.max(0,1-p*1.15);
    if(p>=1){SCN.remove(e.mesh);e.mat.dispose();e.mesh.geometry.dispose();return false;}
    return true;
  });
}

function updateEnemySystem(dt){
  if(GMS.misType!=='defense') return;
  // INT-K는 12발 → 최대 12기 스폰, NET-1/기타는 10기
  const maxSpawn=C.did==='intk'?12:10;
  if(GMS.enemyCount<maxSpawn){GMS.spawnTimer+=dt;if(GMS.spawnTimer>=6){GMS.spawnTimer=0;spawnEnemy();}}
  const dId=C.did;
  GMS.enemies=GMS.enemies.filter(e=>{
    e.x+=e.vx*dt;e.z+=e.vz*dt;
    e.mesh.position.set(e.x,e.y,e.z);
    e.mesh.rotation.y=Math.atan2(-e.vx,-e.vz);
    if(dId==='net1'){
      const dd=Math.sqrt((e.x-GS.x)**2+(e.y-GS.y)**2+(e.z-GS.z)**2);
      if(dd<22){spawnExp(e.x,e.y,e.z,false);SCN.remove(e.mesh);GMS.intercepted++;updDefHUD();checkDefWin();return false;}
    }
    if(Math.sqrt(e.x*e.x+e.z*e.z)<18){
      GMS.escaped++;SCN.remove(e.mesh);updDefHUD();
      if(GMS.escaped>=3)endMis(false);
      return false;
    }
    return true;
  });
  const hasNear=GMS.enemies.some(e=>Math.sqrt(e.x*e.x+e.z*e.z)<200);
  const w=$('h-wrn');
  if(hasNear&&GS.alt>=5&&GS.bat>=20){
    w.style.display='block';w.style.color='var(--w)';w.textContent='⚠ 적 드론 기지 접근 중 ⚠';
  }
}

function spawnEnemy(){
  const a=Math.random()*Math.PI*2,dist=500+Math.random()*80;
  const ex=Math.cos(a)*dist,ez=Math.sin(a)*dist,ey=18+Math.random()*20;
  const g=new THREE.Group();
  const bd=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.13,6),M(0xcc2200));bd.rotation.x=Math.PI/2;g.add(bd);
  const wd=new THREE.Mesh(new THREE.BoxGeometry(2.1,.05,.5),M(0xaa1800));g.add(wd);
  const lt=new THREE.Mesh(new THREE.SphereGeometry(.1,6,6),M(0xff3300,0xff3300,2.5));lt.position.y=.14;g.add(lt);
  g.position.set(ex,ey,ez);SCN.add(g);
  const len=Math.sqrt(ex*ex+ez*ez),spd=13+Math.random()*8;
  GMS.enemies.push({mesh:g,x:ex,y:ey,z:ez,vx:-ex/len*spd,vy:0,vz:-ez/len*spd});
  GMS.enemyCount++;
}

function checkAtkWin(){
  const left=GMS.targets.filter(t=>t.mesh.visible).length;
  $('atk-cnt')&&($('atk-cnt').textContent=left+'/'+GMS.targets.length);
  if(left===0){GS.score=(MISSIONS[C.mis]||MISSIONS.recon).sc;setTimeout(()=>endMis(true),1000);}
}
function checkDefWin(){
  // jamming 미션: 10기 요격 시 즉시 성공
  // escort 미션: 보급드론 합류 + 10기 요격 시 성공
  if(GMS.intercepted>=10){
    const ok = C.mis==='escort' ? GMS.supplyReached : true;
    GS.score=(MISSIONS[C.mis]||MISSIONS.recon).sc;
    setTimeout(()=>endMis(ok),800);
  }
}

function buildReconTargets(){
  const pts=getMT().slice(1);
  pts.forEach((p,i)=>{
    // 지형 높이에 맞춰 정찰 목표 배치
    const th=getTerrainH(p[0],p[2]);
    const grp=new THREE.Group();grp.position.set(p[0],th,p[2]);
    const base=new THREE.Mesh(new THREE.BoxGeometry(3,.5,3),M(0x283220));base.position.y=.25;grp.add(base);
    const bldg=new THREE.Mesh(new THREE.BoxGeometry(2,2.2,2),M(0x2a3a22));bldg.position.y=1.35;grp.add(bldg);
    const tower=new THREE.Mesh(new THREE.CylinderGeometry(.1,.15,7,8),M(0x3a4a2e));tower.position.set(.5,3.5,.5);grp.add(tower);
    const ant=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,2.5,6),M(0x888888));ant.position.set(.5,7.25,.5);grp.add(ant);
    const dish=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,.08,12),M(0x555555));dish.position.set(.5,6.5,.8);dish.rotation.x=Math.PI/4;grp.add(dish);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(6,.28,8,20),M(0x0088ff,0x0088ff,.55));
    ring.rotation.x=Math.PI/2;ring.name='tgt'+i;grp.add(ring);
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,35,5),M(0x0088ff));
    beam.material.transparent=true;beam.material.opacity=.12;beam.position.y=17;grp.add(beam);
    SCN.add(grp);
    GMS.targets.push({mesh:grp,x:p[0],z:p[2],done:false,idx:i,type:'recon'});
  });
  const cnt=pts.length;
  $('m-n').textContent='정찰 임무';
  $('m-objs').innerHTML=`<div class="m-o">스캔 목표: <span id="scan-cnt">0/${cnt}</span> 완료</div><div class="m-o" style="font-size:.6rem">🔵 목표 100m 이내 + 고도 80m 이하 → 자동 스캔 (3초)</div>`;
}

// ─── 보급드론 스폰 (escort 미션) ───
function spawnSupplyDrone(){
  const angle=Math.random()*Math.PI*2;
  const dist=280+Math.random()*180;
  const sx=Math.cos(angle)*dist, sz=Math.sin(angle)*dist;
  const th=getTerrainH(sx,sz);
  const sy=th+12+Math.random()*8;
  const g=new THREE.Group();

  // 6각 몸체
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.16,6),M(0x223355));g.add(body);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.38,.42,.09,6),M(0x1a2a44));cap.position.y=.12;g.add(cap);
  // 화물 상자
  const cargo=new THREE.Mesh(new THREE.BoxGeometry(.72,.52,.72),M(0x334466));cargo.position.y=-.32;g.add(cargo);
  const strap1=new THREE.Mesh(new THREE.BoxGeometry(.76,.04,.1),M(0xff8800));strap1.position.y=-.12;g.add(strap1);
  const strap2=new THREE.Mesh(new THREE.BoxGeometry(.1,.04,.76),M(0xff8800));strap2.position.y=-.12;g.add(strap2);
  // 6암 + 프롭
  for(let i=0;i<6;i++){
    const a=i*Math.PI/3;
    const ax=Math.cos(a)*.9, az=Math.sin(a)*.9;
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(.028,.028,1.8,4),M(0x1a2a44));
    arm.position.set(ax/2,0,az/2);arm.lookAt(ax,0,az);arm.rotateX(Math.PI/2);g.add(arm);
    const mot=new THREE.Mesh(new THREE.CylinderGeometry(.065,.075,.07,8),M(0x1a1a1a));mot.position.set(ax,.07,az);g.add(mot);
    const pd=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.007,12),M(0x334466,0,0,true,.28));pd.position.set(ax,.14,az);pd.name='prop';g.add(pd);
    // 항법등
    const lc=i%2===0?0x0055ff:0x00ff88;
    const ll=new THREE.Mesh(new THREE.SphereGeometry(.025,5,5),M(lc,lc,1.8));ll.position.set(ax,.08,az);g.add(ll);
  }
  // 식별 신호등 (파란 점멸)
  const beacon=new THREE.Mesh(new THREE.SphereGeometry(.11,8,8),M(0x0088ff,0x0088ff,2.8));beacon.position.y=.22;beacon.name='beacon';g.add(beacon);
  const pl=new THREE.PointLight(0x0088ff,1.8,40);pl.position.y=.3;g.add(pl);
  // 원거리 식별 빔 (수직 파란 빔 50m)
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,50,5),M(0x0088ff));
  beam.material.transparent=true;beam.material.opacity=.18;beam.position.y=25;g.add(beam);
  // 탐색 링
  const ring=new THREE.Mesh(new THREE.TorusGeometry(4.5,.3,8,18),M(0x0088ff,0x0088ff,.6));
  ring.rotation.x=Math.PI/2;ring.position.y=.08;g.add(ring);

  g.position.set(sx,sy,sz);
  SCN.add(g);
  GMS.supplyDrone={mesh:g,x:sx,y:sy,z:sz,reached:false};
}

// ─── Lock-on 인디케이터 ───
let _lockTarget=null;
const _lockV=new THREE.Vector3();
function updateLockOn(){
  const box=$('lock-box');if(!box||!CAM) return;
  const mt=GMS.misType;
  if(mt!=='attack'&&mt!=='defense'){box.style.display='none';_lockTarget=null;return;}
  const targets=mt==='attack'?GMS.targets.filter(t=>t.mesh.visible):GMS.enemies;
  if(!targets.length){box.style.display='none';_lockTarget=null;return;}

  // 화면 정중앙과 가장 가까운 목표를 우선 선택 (시야 기반 Lock-on)
  let best=null,bestScore=Infinity;
  targets.forEach(t=>{
    const tx3=t.x!==undefined?t.x:t.mesh.position.x;
    const ty3=(t.y!==undefined?t.y:t.mesh.position.y)||1.5;
    const tz3=t.z!==undefined?t.z:t.mesh.position.z;
    // 3D→2D 프로젝션으로 화면 중앙 거리 계산
    const v=new THREE.Vector3(tx3,ty3+1.5,tz3);v.project(CAM);
    if(v.z>=1) return;
    const screenDist=Math.sqrt(v.x*v.x+v.y*v.y); // 화면 중앙 기준 거리 (0~√2)
    const worldDist=Math.sqrt((tx3-GS.x)**2+(tz3-GS.z)**2);
    // 화면 거리 80% + 실제 거리 20% 조합 (화면 중앙 우선)
    const score=screenDist*0.8+worldDist/1000*0.2;
    if(score<bestScore){bestScore=score;best=t;}
  });
  if(!best){box.style.display='none';_lockTarget=null;return;}

  const tx=best.x!==undefined?best.x:best.mesh.position.x;
  const ty=(best.y!==undefined?best.y:best.mesh.position.y)||1.5;
  const tz=best.z!==undefined?best.z:best.mesh.position.z;
  const worldDist=Math.round(Math.sqrt((tx-GS.x)**2+(tz-GS.z)**2));

  _lockV.set(tx,ty+1.5,tz);_lockV.project(CAM);
  if(_lockV.z>=1){box.style.display='none';_lockTarget=null;return;}
  const sx=(_lockV.x+1)/2*innerWidth, sy=(-_lockV.y+1)/2*innerHeight;
  if(sx<-60||sx>innerWidth+60||sy<-60||sy>innerHeight+60){box.style.display='none';_lockTarget=null;return;}

  // 잠금 범위: 타격=800m, 방어(INT-K)=1200m, 방어(NET-1)=30m
  const lockRange = mt==='defense'?(C.did==='intk'?1200:35):800;
  const isLocked=worldDist<lockRange;
  // 잠금 시 박스 수축 (54px), 탐색 시 확장 (70px)으로 시각적 피드백
  const boxSize=isLocked?54:70;
  box.style.display='block';
  box.style.width=boxSize+'px';box.style.height=boxSize+'px';
  box.style.left=(sx-boxSize/2)+'px';box.style.top=(sy-boxSize/2)+'px';
  box.style.borderColor=isLocked?'var(--r)':worldDist<lockRange*1.6?'var(--w)':'rgba(0,255,136,.45)';
  box.classList.toggle('locked',isLocked);
  $('lock-status').textContent=isLocked?'🔴 LOCK':worldDist<lockRange*1.6?'🟡 TRACK':'⬜ SEARCH';
  $('lock-status').style.color=isLocked?'var(--r)':worldDist<lockRange*1.6?'var(--w)':'var(--g)';
  $('lock-dist').textContent=worldDist+'m';
  _lockTarget=isLocked?best:null;
}

// ─── 정찰 내비게이션 화살표 ───
function updateNavArrow(){
  const wrap=$('nav-wrap');if(!wrap) return;
  const mt=GMS.misType;

  // ── 정찰 ──
  if(mt==='recon'){
    const unscanned=GMS.targets.filter(t=>!t.done);
    if(!unscanned.length){wrap.style.display='none';return;}
    wrap.style.display='block';
    wrap.style.left='50%';
    const t=unscanned[0];
    _setNavArrow(t.x,t.z);
    const dist=Math.round(Math.sqrt((t.x-GS.x)**2+(t.z-GS.z)**2));
    $('nav-dist').textContent=dist+'m';
    const scanning=dist<100&&GS.alt<80;
    const nearRange=dist<150&&GS.alt<80;
    $('nav-status').textContent=scanning?'✅ 스캔 중...':nearRange?'📡 거의 다 왔음':GS.alt>80?'⬇ 고도 낮추기 (80m 이하)':'🎯 접근 중 (100m 이내)';
    $('nav-status').style.color=scanning?'var(--g)':nearRange?'var(--w)':'var(--gx)';
    const nc=$('nav-circle');if(nc)nc.style.borderColor='rgba(0,255,136,.3)';
    const pt=document.querySelector('#nav-tri polygon');if(pt)pt.setAttribute('fill','rgba(0,255,136,.85)');
    return;
  }

  // ── 공격 ──
  if(mt==='attack'){
    const alive=GMS.targets.filter(t=>t.mesh&&t.mesh.visible);
    if(!alive.length){wrap.style.display='none';return;}
    // Lock-on 활성 중엔 화살표를 우측으로 이동해 겹침 방지
    wrap.style.display='block';
    wrap.style.left=_lockTarget?'65%':'50%';
    // 가장 가까운 목표
    let closest=alive[0],minD=Infinity;
    alive.forEach(t=>{
      const d=Math.sqrt((t.x-GS.x)**2+(t.z-GS.z)**2);
      if(d<minD){minD=d;closest=t;}
    });
    _setNavArrow(closest.x,closest.z);
    const dist=Math.round(minD);
    $('nav-dist').textContent=dist+'m';
    const canLock=dist<800;
    $('nav-status').textContent=canLock?'🔴 LOCK 가능 — F키 발사':dist<1500?'🎯 접근 중 (800m 목표)':'⬆ 이동';
    $('nav-status').style.color=canLock?'var(--r)':'var(--gx)';
    const nc=$('nav-circle');if(nc)nc.style.borderColor=canLock?'rgba(255,50,50,.5)':'rgba(0,255,136,.3)';
    const pt=document.querySelector('#nav-tri polygon');if(pt)pt.setAttribute('fill',canLock?'rgba(255,50,50,.9)':'rgba(0,255,136,.85)');
    return;
  }

  // ── 방어 ──
  if(mt==='defense'){
    // escort 미션: 보급드론 합류 전에는 보급드론 방향 화살표
    if(C.mis==='escort'&&GMS.supplyDrone&&!GMS.supplyDrone.reached){
      wrap.style.display='block';
      wrap.style.left='50%';
      const sd=GMS.supplyDrone;
      _setNavArrow(sd.x,sd.z);
      const dist=Math.round(Math.sqrt((sd.x-GS.x)**2+(sd.z-GS.z)**2));
      $('nav-dist').textContent=dist+'m';
      const near=dist<32;
      $('nav-status').textContent=near?'✅ 합류!':(dist<120?'📦 접근 중':'📦 보급드론 탐색');
      $('nav-status').style.color=near?'var(--g)':'var(--b)';
      const nc=$('nav-circle');if(nc)nc.style.borderColor='rgba(0,136,255,.45)';
      const pt=document.querySelector('#nav-tri polygon');if(pt)pt.setAttribute('fill','rgba(0,136,255,.85)');
      // def-guide 업데이트
      const dg=$('def-guide');
      if(dg&&dg.style.display!=='none'){
        dg.innerHTML=near
          ?`✅ 보급드론 합류 완료 — 기지 귀환 후 미션 성공`
          :`📦 보급드론 방향 <span class="bl">${dist}m</span> — 접근하여 합류 (32m 이내)`;
      }
      return;
    }
    // 적 드론 방향 표시 (모든 방어 미션 공통)
    if(GMS.enemies.length){
      let closest=GMS.enemies[0],minD=Infinity;
      GMS.enemies.forEach(e=>{
        const d=Math.sqrt((e.x-GS.x)**2+(e.z-GS.z)**2);
        if(d<minD){minD=d;closest=e;}
      });
      wrap.style.display='block';
      wrap.style.left=_lockTarget?'65%':'50%';
      _setNavArrow(closest.x,closest.z);
      const dist=Math.round(minD);
      $('nav-dist').textContent=dist+'m';
      const lockRange=C.did==='intk'?1200:22;
      const inRange=dist<lockRange;
      $('nav-status').textContent=inRange?'🎯 사거리 내':'⚡ 추적 중';
      $('nav-status').style.color=inRange?'var(--r)':'var(--gx)';
      const nc=$('nav-circle');if(nc)nc.style.borderColor=inRange?'rgba(255,50,50,.45)':'rgba(255,136,0,.3)';
      const pt=document.querySelector('#nav-tri polygon');if(pt)pt.setAttribute('fill',inRange?'rgba(255,50,50,.9)':'rgba(255,136,0,.85)');
      return;
    }
    wrap.style.display='none';
    return;
  }

  wrap.style.display='none';
}

function _setNavArrow(tx,tz){
  const dx=tx-GS.x, dz=tz-GS.z;
  const worldBear=Math.atan2(dx,-dz);
  const relBear=(worldBear-GS.yaw)*180/Math.PI;
  const tri=$('nav-tri');
  if(tri) tri.style.transform=`translate(-50%,-50%) rotate(${relBear}deg)`;
}

function endMis(ok, customReason){
  GS.done=true;GS.run=false;
  $('me-t').textContent=ok?'임무 완료':'임무 실패';
  $('me-t').style.color=ok?'var(--g)':'var(--r)';
  let failReason=customReason||'시간 초과 — 임무 실패';
  if(!customReason){
    if(!ok&&GMS.misType==='defense'&&GMS.escaped>=3) failReason='적 드론 3기 기지 도달 — 방어 실패';
    if(!ok&&C.mis==='escort'&&!GMS.supplyReached) failReason='보급 드론 합류 실패 — 호위 임무 실패';
    if(!ok&&GMS.misType==='attack'&&GMS.ammo<=0&&GMS.targets.filter(t=>t.mesh.visible).length>0) failReason='탄약 소진 — 타격 실패';
  }
  $('me-s').textContent=ok
    ?`점수: ${GS.score}점 · 비행: ${p2(Math.floor(GS.ft/60))}:${p2(Math.floor(GS.ft%60))}`
    :failReason;
  $('m-end').classList.add('on');
}

// ════════════════════════════════════════
// MAIN LOOP
// ════════════════════════════════════════
let lastT=0;
function loop(ts=0){
  if(!GS.run){lastT=ts;return;}
  aniId=requestAnimationFrame(loop);
  const dt=Math.min((ts-lastT)/1000,.05);
  lastT=ts; _dt=dt;

  handleInput(dt);
  updatePhys(dt);
  updateCamera();
  updateHUD(dt);
  updateMini();
  updateMission(dt);
  updateProjectiles(dt);
  updateExplosions(dt);
  updateEnemySystem(dt);
  updateLockOn();
  updateNavArrow();

  const pSpeed=.18+GS.thrt/100*.45;
  SCN.traverse(o=>{
    if(o.name==='prop')  o.rotation.y+=pSpeed;
    if(o.name==='pDisc') o.rotation.y+=pSpeed*1.8;
  });

  R.render(SCN,CAM);
}

// ════════════════════════════════════════
// PAUSE / EXIT
// ════════════════════════════════════════
function togglePause(){
  if(!SCN) return; // 게임 장면이 없을 때(메뉴·로딩 화면)는 일시정지 무시
  if($('m-end').classList.contains('on')) return;
  GS.paused=!GS.paused;
  $('esc-mod').classList.toggle('on',GS.paused);
  if(GS.paused){GS.run=false;camDrag=false;}
  else closeEsc();
}
function closeEsc(){
  $('esc-mod').classList.remove('on');
  GS.paused=false;GS.run=true;
  lastT=performance.now();
  aniId=requestAnimationFrame(loop);
}
function exitGame(){$('esc-mod').classList.remove('on');toMenu();}
function stopGame(){
  GS.run=false;
  if(aniId)cancelAnimationFrame(aniId);
  GMS.missiles=[]; GMS.targets=[]; GMS.enemies=[]; GMS.explosions=[];
  if(GMS.supplyDrone&&SCN) SCN.remove(GMS.supplyDrone.mesh);
  GMS.supplyDrone=null; GMS.supplyReached=false;
  _smokePool.forEach(s=>{if(SCN)SCN.remove(s.mesh);});_smokePool.length=0;
  _shakeT=0;_shakeAmt=0;
  if(R){R.dispose();R=null;}
  SCN=null;CAM=null;DRONE=null;mmCtx=null;
  camDrag=false;
  $('m-end').classList.remove('on');
  $('esc-mod').classList.remove('on');
  $('fpv-ov').classList.remove('on');
  const ov=$('miss-brief-ov');if(ov)ov.remove();
  const atg=$('atk-guide');if(atg)atg.style.display='none';
  const mtt=$('mis-timer');if(mtt)mtt.style.display='none';
}

// ════════════════════════════════════════
// BOOT
// ════════════════════════════════════════
buildDGrid();
buildManDrones();
