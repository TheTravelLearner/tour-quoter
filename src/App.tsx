import React, { useEffect, useMemo, useRef, useState } from "react";

// 多日游报价器（稳定版）
export default function TourQuotation() {
  // —— 语言 ——
  const [lang, setLang] = useState<'zh'|'en'>('zh');
  
  const L = {
    zh: {
      title:'多日游报价器（终版）', 
      intro:'币种 THB；汇率手填；两位小数。酒店价按"间/晚"折算；单房差自动计入团总。',
      base:'基础设置 (THB)', 
      people:'人数', 
      days:'行程天数', 
      flight:'机票/人（往返）', 
      room:'酒店/间/晚',
      guideCar:'导游与车辆 (THB)', 
      gTrans:'导游接送/次', 
      gTransCnt:'接送次数', 
      gFull:'导游全天/天', 
      gFullCnt:'全天天数', 
      gLodge:'导游住宿/晚', 
      dLodge:'司机住宿/晚',
      gLodgeN:'导游住宿晚数', 
      dLodgeN:'司机住宿晚数', 
      carTrans:'车辆接送/次', 
      carTransCnt:'车辆接送次数', 
      carFull:'车辆全天/天', 
      carFullDays:'车辆全天天数',
      meals:'餐饮 (THB/人/餐 + 次数)', 
      b:'早餐餐标', 
      l:'午餐餐标', 
      d:'晚餐餐标', 
      bc:'早餐次数', 
      lc:'午餐次数', 
      dc:'晚餐次数',
      single:'单房差 (自动)', 
      singleRooms:'单房间数',
      tickets:'门票库（永久保存，可改名/改价）', 
      addTicket:'新增门票', 
      name:'门票名称', 
      price:'价格(THB)',
      templates:'行程模板库（本地）', 
      tplName:'模板名', 
      saveTpl:'保存为模板', 
      applyTpl:'套用模板', 
      delTpl:'删除模板', 
      none:'（无）',
      markup:'加价(每人)', 
      mtype:'方式', 
      mpercent:'按百分比', 
      mamount:'按金额', 
      mvalueP:'每人加价（%）', 
      mvalueA:'每人加价金额（THB）',
      rates:'汇率（手填，THB/外币）', 
      cny:'1 人民币 ≈ ? 泰铢', 
      usd:'1 美元 ≈ ? 泰铢',
      brand:'公司抬头', 
      company:'公司名', 
      logo:'Logo 链接（可选）', 
      contact:'联系方式（电话/微信/地址）',
      storage:'存档与导入/导出', 
      saveName:'档名/客户名', 
      saveNew:'保存新档', 
      saveUpdate:'更新当前', 
      load:'载入', 
      del:'删除', 
      exportJson:'导出 JSON', 
      importJson:'导入 JSON', 
      noneSave:'（无存档）',
      itinEditor:'行程编辑器', 
      addDayBtn:'新增一天', 
      delDay:'删除当天', 
      addItem:'添加条目', 
      delItem:'删除', 
      syncDays:'同步天数 = 行程天数', 
      datePH:'日期如 10/31',
      result:'报价结果', 
      percap:'人均价', 
      total:'总团价', 
      expl:'含机票/酒店(按间/晚)/餐饮/门票/导游与车/单房差', 
      r2:'人均≈ ', 
      r3:'总团≈ ', 
      exportPdf:'导出 PDF 报价单', 
      copy:'复制摘要',
      sec1:'一、价格汇总', 
      sec2:'二、行程（参考）', 
      sec3:'三、费用明细（摘要）', 
      sec4:'四、报价说明', 
      iAir:'机票', 
      iHotel:'酒店', 
      iMeals:'餐饮', 
      iTickets:'门票（按人）', 
      iLocal:'地接与用车', 
      iSingle:'单房差',
      inc:'包含：行程所列酒店（双人间/或同级）、境内交通与中文导游（含接送/全天）、所勾选门票、按设置餐标与次数的餐饮、司机与导游住宿补助、基础服务费。',
      exc:'不含：国际段机票税费、签证/落地签、行程外个人消费与自选升级、不可抗力所致费用、旅游保险及未提及项目；单房差如产生按上列计入。'
    },
    en: {
      title:'Multi-day Tour Quoter (Final)', 
      intro:'Currency THB; manual FX; 2 decimals. Hotel per room/night split by 2; single supplement auto-included.',
      base:'Basics (THB)', 
      people:'Pax', 
      days:'Days', 
      flight:'Airfare /pax (RT)', 
      room:'Hotel /room/night',
      guideCar:'Guide & Vehicle (THB)', 
      gTrans:'Guide transfer /trip', 
      gTransCnt:'Transfer trips', 
      gFull:'Guide full-day /day', 
      gFullCnt:'Full-day count', 
      gLodge:'Guide lodging /night', 
      dLodge:'Driver lodging /night',
      gLodgeN:'Guide lodging nights', 
      dLodgeN:'Driver lodging nights', 
      carTrans:'Vehicle transfer /trip', 
      carTransCnt:'Vehicle transfers', 
      carFull:'Vehicle full-day /day', 
      carFullDays:'Vehicle full-day days',
      meals:'Meals (THB/pax/meal + counts)', 
      b:'Breakfast rate', 
      l:'Lunch rate', 
      d:'Dinner rate', 
      bc:'Breakfast count', 
      lc:'Lunch count', 
      dc:'Dinner count',
      single:'Single Supplement (auto)', 
      singleRooms:'Single rooms',
      tickets:'Ticket Library (persistent, rename/price editable)', 
      addTicket:'Add Ticket', 
      name:'Ticket name', 
      price:'Price(THB)',
      templates:'Itinerary Templates (local)', 
      tplName:'Template name', 
      saveTpl:'Save Template', 
      applyTpl:'Apply Template', 
      delTpl:'Delete Template', 
      none:'(None)',
      markup:'Markup (per-pax)', 
      mtype:'Mode', 
      mpercent:'Percent', 
      mamount:'Amount', 
      mvalueP:'Per-pax (%)', 
      mvalueA:'Per-pax (THB)',
      rates:'Rates (manual, THB/FX)', 
      cny:'1 CNY ≈ ? THB', 
      usd:'1 USD ≈ ? THB',
      brand:'Branding', 
      company:'Company', 
      logo:'Logo URL (optional)', 
      contact:'Contact',
      storage:'Storage & Import/Export', 
      saveName:'Title/Client', 
      saveNew:'Save New', 
      saveUpdate:'Update Current', 
      load:'Load', 
      del:'Delete', 
      exportJson:'Export JSON', 
      importJson:'Import JSON', 
      noneSave:'(No saves)',
      itinEditor:'Itinerary Editor', 
      addDayBtn:'Add a day', 
      delDay:'Delete day', 
      addItem:'Add item', 
      delItem:'Delete', 
      syncDays:'Sync Days = Itinerary Days', 
      datePH:'Date e.g. 10/31',
      result:'Quotation', 
      percap:'Per-pax', 
      total:'Total', 
      expl:'Incl. airfare/hotel(room-night)/meals/tickets/guide&vehicle/single sup', 
      r2:'Per-pax≈ ', 
      r3:'Total≈ ', 
      exportPdf:'Export PDF', 
      copy:'Copy Summary',
      sec1:'1) Price Summary', 
      sec2:'2) Itinerary', 
      sec3:'3) Cost Breakdown (Summary)', 
      sec4:'4) Inclusions', 
      iAir:'Airfare', 
      iHotel:'Hotel', 
      iMeals:'Meals', 
      iTickets:'Tickets (per pax)', 
      iLocal:'Local services & vehicle', 
      iSingle:'Single supplement',
      inc:'Includes: hotel as listed (twin share or similar), local transport & Chinese guide (transfers/full-day), selected tickets, meals per rates & counts, guide/driver lodging, basic service fee.',
      exc:'Excludes: international airfare taxes, visa/on-arrival, personal expenses & optional upgrades, force majeure costs, travel insurance, items not listed; single supplement charged as above if any.'
    }
  };
  
  const t = (k: string) => (L[lang] as any)[k] || k;

  // —— Branding ——
  const [company, setCompany] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [contact, setContact] = useState('');
  
  // —— 基础（THB） ——
  const [people, setPeople] = useState(6);
  const [flight, setFlight] = useState(2500);
  const [hotelRoomPerNight, setHotelRoomPerNight] = useState(2400);
  const [days, setDays] = useState(4);
  const nights = useMemo(() => Math.max(days - 1, 0), [days]);
  
  // —— 餐饮 ——
  const [breakfast, setBreakfast] = useState(100);
  const [lunch, setLunch] = useState(200);
  const [dinner, setDinner] = useState(300);
  const [breakfastCount, setBreakfastCount] = useState(3);
  const [lunchCount, setLunchCount] = useState(3);
  const [dinnerCount, setDinnerCount] = useState(3);
  
  // —— 导游/车辆 ——
  const [guideTransfer, setGuideTransfer] = useState(500);
  const [gTransferCount, setGTransferCount] = useState(2);
  const [guideFull, setGuideFull] = useState(800);
  const [gFullCount, setGFullCount] = useState(2);
  const [guideLodge, setGuideLodge] = useState(500);
  const [driverLodge, setDriverLodge] = useState(400);
  const [guideLodgeNights, setGuideLodgeNights] = useState(3);
  const [driverLodgeNights, setDriverLodgeNights] = useState(3);
  const [carTransferFee, setCarTransferFee] = useState(900);
  const [carTransferCount, setCarTransferCount] = useState(2);
  const [carFullDayFee, setCarFullDayFee] = useState(2500);
  const [carFullDays, setCarFullDays] = useState(2);
  
  // —— 单房差（自动） ——
  const singlePerNight = useMemo(() => hotelRoomPerNight / 2, [hotelRoomPerNight]);
  const [singleRooms, setSingleRooms] = useState(1);
  const singleSuppTotalTHB = useMemo(() => singlePerNight * nights * singleRooms, [singlePerNight, nights, singleRooms]);
  
  // —— 汇率 ——
  const [thbPerCNY, setThbPerCNY] = useState(4.529);
  const [thbPerUSD, setThbPerUSD] = useState(32.36);
  
  // —— 加价（每人） ——
  const [markupType, setMarkupType] = useState<'percent'|'amount'>('percent');
  const [markupValue, setMarkupValue] = useState(10);
  
  // —— 门票库（永久化） ——
  type Ticket = { name: string; price: number };
  const TICKET_LIB_KEY = 'tourQuoterTicketLibV1';
  const defaultTickets: Ticket[] = [
    { name: '真理寺', price: 500 },
    { name: 'Tiffany人妖秀', price: 800 },
    { name: '大象村体验', price: 1000 },
    { name: '珊瑚岛（水上组合）', price: 1500 },
    { name: '大皇宫+玉佛寺', price: 600 },
  ];
  
  const readTicketLib = (): Ticket[] => {
    try {
      const stored = localStorage.getItem(TICKET_LIB_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.length ? parsed : defaultTickets;
      }
      return defaultTickets;
    } catch {
      return defaultTickets;
    }
  };
  
  const [catalog, setCatalog] = useState<Ticket[]>(() => readTicketLib());
  
  useEffect(() => {
    localStorage.setItem(TICKET_LIB_KEY, JSON.stringify(catalog));
  }, [catalog]);
  
  const [selectedTickets, setSelectedTickets] = useState<string[]>(() => 
    catalog.map(c => c.name)
  );
  
  const setCatalogPrice = (i: number, p: number) => {
    const arr = [...catalog];
    arr[i] = { ...arr[i], price: Math.max(0, Number(p) || 0) };
    setCatalog(arr);
  };
  
  const setCatalogName = (i: number, nm: string) => {
    const old = catalog[i].name;
    const arr = [...catalog];
    arr[i] = { ...arr[i], name: nm };
    setCatalog(arr);
    setSelectedTickets(prev => prev.map(n => n === old ? nm : n));
  };
  
  const toggleTicket = (name: string) => 
    setSelectedTickets(prev => 
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    );
  
  const [newTicketName, setNewTicketName] = useState('');
  const [newTicketPrice, setNewTicketPrice] = useState(0);
  
  const addTicket = () => {
    const nm = newTicketName.trim();
    const pr = Number(newTicketPrice) || 0;
    if (!nm || pr <= 0) return;
    if (!catalog.find(c => c.name === nm)) {
      setCatalog([...catalog, { name: nm, price: pr }]);
    }
    setNewTicketName('');
    setNewTicketPrice(0);
  };
  
  // —— 行程 ——
  type DayPlan = { date: string; title: string; items: string[] };
  const [itinerary, setItinerary] = useState<DayPlan[]>([
    {
      date: '10/31',
      title: lang === 'zh' ? 'D1 抵达曼谷 – 芭堤雅' : 'D1 Arrive BKK – Pattaya',
      items: [
        lang === 'zh' ? '入境会合导游' : 'Meet guide on arrival',
        lang === 'zh' ? '真理寺、海鲜晚餐、Tiffany Show' : 'Sanctuary of Truth, seafood dinner, Tiffany Show'
      ]
    },
    {
      date: '11/01',
      title: lang === 'zh' ? 'D2 芭堤雅探险' : 'D2 Pattaya Adventure',
      items: [
        lang === 'zh' ? '大象村体验、珊瑚岛活动/休闲' : 'Elephant Village, Coral Island activities/relax',
        lang === 'zh' ? 'Terminal 21 自由晚餐' : 'Terminal 21 dinner (own)'
      ]
    },
    {
      date: '11/02',
      title: lang === 'zh' ? 'D3 芭堤雅 – 曼谷' : 'D3 Pattaya – Bangkok',
      items: [
        lang === 'zh' ? '大皇宫玉佛寺、暹罗广场自由、郑王庙日落、夜市' : 'Grand Palace & Emerald Buddha, Siam area, Wat Arun sunset, night market'
      ]
    },
    {
      date: '11/03',
      title: lang === 'zh' ? 'D4 离境' : 'D4 Departure',
      items: [
        lang === 'zh' ? '早餐，送机' : 'Breakfast, airport transfer'
      ]
    },
  ]);
  
  const [newLine, setNewLine] = useState<Record<number, string>>({});
  
  const addDay = () => setItinerary(prev => [
    ...prev,
    { date: '', title: `D${prev.length + 1} ${lang === 'zh' ? '标题' : 'Title'}`, items: [] }
  ]);
  
  const removeDay = (idx: number) => setItinerary(prev => prev.filter((_, i) => i !== idx));
  
  const updateDayField = (idx: number, field: keyof DayPlan, val: string) =>
    setItinerary(prev => prev.map((d, i) => i === idx ? { ...d, [field]: val } : d));
  
  const addLine = (idx: number) => {
    const text = (newLine[idx] || '').trim();
    if (!text) return;
    setItinerary(prev => prev.map((d, i) => 
      i === idx ? { ...d, items: [...d.items, text] } : d
    ));
    setNewLine(s => ({ ...s, [idx]: '' }));
  };
  
  const removeLine = (dIdx: number, itemIdx: number) =>
    setItinerary(prev => prev.map((d, i) => 
      i === dIdx ? { ...d, items: d.items.filter((_, k) => k !== itemIdx) } : d
    ));
  
  const syncDays = () => setDays(Math.max(1, itinerary.length));
  
  const dateRange = itinerary.length > 0 ? 
    `${itinerary[0].date}–${itinerary[itinerary.length - 1].date}` : 
    '未填写日期';
  
  // —— 行程模板库 ——
  type Tpl = { id: string; name: string; createdAt: number; itinerary: DayPlan[]; tickets: string[] };
  const TPL_KEY = 'tourQuoterTemplatesV1';
  
  const readTpls = (): Tpl[] => {
    try {
      return JSON.parse(localStorage.getItem(TPL_KEY) || '[]');
    } catch {
      return [];
    }
  };
  
  const writeTpls = (arr: Tpl[]) => localStorage.setItem(TPL_KEY, JSON.stringify(arr));
  
  const [tpls, setTpls] = useState<Tpl[]>(() => readTpls());
  const [tplName, setTplName] = useState('');
  const [tplId, setTplId] = useState<string>('');
  
  const saveTpl = () => {
    const id = Date.now().toString(36);
    const pack: Tpl = {
      id,
      name: tplName || `模板_${new Date().toLocaleString()}`,
      createdAt: Date.now(),
      itinerary,
      tickets: selectedTickets
    };
    const arr = [pack, ...tpls];
    setTpls(arr);
    writeTpls(arr);
    setTplId(id);
  };
  
  const deleteTpl = () => {
    if (!tplId) return;
    const arr = tpls.filter(t => t.id !== tplId);
    setTpls(arr);
    writeTpls(arr);
    setTplId('');
  };
  
  const applyTpl = () => {
    const tpl = tpls.find(x => x.id === tplId);
    if (!tpl) return;
    setItinerary(tpl.itinerary);
    let lib = [...catalog];
    tpl.tickets.forEach(name => {
      if (!lib.find(c => c.name === name)) {
        lib.push({ name, price: 0 });
      }
    });
    setCatalog(lib);
    setSelectedTickets(tpl.tickets);
  };
  
  // —— 存档 ——
  type SavePack = { id: string; name: string; createdAt: number; data: any };
  const STORAGE_KEY = 'tourQuoterSavesV1';
  
  const readSaves = (): SavePack[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  };
  
  const writeSaves = (arr: SavePack[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  
  const [saves, setSaves] = useState<SavePack[]>(() => readSaves());
  const [saveName, setSaveName] = useState('');
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const snapshot = () => ({
    lang, company, logoUrl, contact, people, flight, hotelRoomPerNight, days,
    breakfast, lunch, dinner, breakfastCount, lunchCount, dinnerCount,
    guideTransfer, gTransferCount, guideFull, gFullCount, guideLodge, driverLodge,
    guideLodgeNights, driverLodgeNights,
    carTransferFee, carTransferCount, carFullDayFee, carFullDays,
    singleRooms, thbPerCNY, thbPerUSD, markupType, markupValue,
    catalog, selectedTickets, itinerary
  });
  
  const apply = (d: any) => {
    if (!d) return;
    setLang(d.lang || 'zh');
    setCompany(d.company || '');
    setLogoUrl(d.logoUrl || '');
    setContact(d.contact || '');
    setPeople(d.people || 6);
    setFlight(d.flight || 2500);
    setHotelRoomPerNight(d.hotelRoomPerNight || 2400);
    setDays(d.days || 4);
    setBreakfast(d.breakfast || 100);
    setLunch(d.lunch || 200);
    setDinner(d.dinner || 300);
    setBreakfastCount(d.breakfastCount || 3);
    setLunchCount(d.lunchCount || 3);
    setDinnerCount(d.dinnerCount || 3);
    setGuideTransfer(d.guideTransfer || 500);
    setGTransferCount(d.gTransferCount || 2);
    setGuideFull(d.guideFull || 800);
    setGFullCount(d.gFullCount || 2);
    setGuideLodge(d.guideLodge || 500);
    setDriverLodge(d.driverLodge || 400);
    setGuideLodgeNights(d.guideLodgeNights || 3);
    setDriverLodgeNights(d.driverLodgeNights || 3);
    setCarTransferFee(d.carTransferFee || 900);
    setCarTransferCount(d.carTransferCount || 2);
    setCarFullDayFee(d.carFullDayFee || 2500);
    setCarFullDays(d.carFullDays || 2);
    setSingleRooms(d.singleRooms || 1);
    setThbPerCNY(d.thbPerCNY || 4.529);
    setThbPerUSD(d.thbPerUSD || 32.36);
    setMarkupType(d.markupType || 'percent');
    setMarkupValue(d.markupValue || 10);
    if (Array.isArray(d.catalog) && d.catalog.length) {
      setCatalog(d.catalog);
    }
    setSelectedTickets(d.selectedTickets || []);
    setItinerary(d.itinerary || []);
  };
  
  const saveNew = () => {
    const id = Date.now().toString(36);
    const pack: SavePack = {
      id,
      name: saveName || `报价_${new Date().toLocaleString()}`,
      createdAt: Date.now(),
      data: snapshot()
    };
    const arr = [pack, ...saves];
    setSaves(arr);
    writeSaves(arr);
    setCurrentId(id);
  };
  
  const updateCurrent = () => {
    if (!currentId) {
      saveNew();
      return;
    }
    const arr = saves.map(s => 
      s.id === currentId ? { ...s, name: saveName || s.name, data: snapshot() } : s
    );
    setSaves(arr);
    writeSaves(arr);
  };
  
  const loadById = (id: string) => {
    const s = saves.find(x => x.id === id);
    if (!s) return;
    setCurrentId(id);
    setSaveName(s.name);
    apply(s.data);
  };
  
  const deleteById = (id: string) => {
    const arr = saves.filter(s => s.id !== id);
    setSaves(arr);
    writeSaves(arr);
    if (currentId === id) {
      setCurrentId(null);
      setSaveName('');
    }
  };
  
  const exportJSON = () => {
    const data = snapshot();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (saveName || 'quotation') + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  
  const importJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const d = JSON.parse(String(reader.result || ''));
        apply(d);
      } catch (e) {
        console.error('Import failed:', e);
      }
    };
    reader.readAsText(file);
  };
  
  // —— 计算 ——
  const ticketTotalPerPerson = useMemo(() => {
    const map = Object.fromEntries(catalog.map(c => [c.name, c.price]));
    return selectedTickets.reduce((s, n) => s + (map[n] || 0), 0);
  }, [catalog, selectedTickets]);
  
  const mealsPerPerson = useMemo(() => 
    breakfast * breakfastCount + lunch * lunchCount + dinner * dinnerCount,
    [breakfast, lunch, dinner, breakfastCount, lunchCount, dinnerCount]
  );
  
  const hotelPerPerson = useMemo(() => singlePerNight * nights, [singlePerNight, nights]);
  
  const guideTHB = useMemo(() => 
    guideTransfer * gTransferCount + 
    guideFull * gFullCount + 
    guideLodge * guideLodgeNights + 
    driverLodge * driverLodgeNights,
    [guideTransfer, gTransferCount, guideFull, gFullCount, guideLodge, driverLodge, guideLodgeNights, driverLodgeNights]
  );
  
  const carTHB = useMemo(() => 
    carTransferFee * carTransferCount + carFullDayFee * carFullDays,
    [carTransferFee, carTransferCount, carFullDayFee, carFullDays]
  );
  
  const perPersonBaseTHB = useMemo(() => 
    flight + hotelPerPerson + mealsPerPerson + ticketTotalPerPerson,
    [flight, hotelPerPerson, mealsPerPerson, ticketTotalPerPerson]
  );
  
  const groupBaseTHB = useMemo(() => 
    perPersonBaseTHB * people + guideTHB + carTHB + singleSuppTotalTHB,
    [perPersonBaseTHB, people, guideTHB, carTHB, singleSuppTotalTHB]
  );
  
  const perPersonBeforeMarkup = people > 0 ? groupBaseTHB / people : 0;
  
  const perPersonTHB = useMemo(() => {
    const mv = Number(markupValue) || 0;
    return markupType === 'percent' ? 
      perPersonBeforeMarkup * (1 + mv / 100) : 
      perPersonBeforeMarkup + mv;
  }, [markupType, markupValue, perPersonBeforeMarkup]);
  
  const finalTHB = perPersonTHB * (people || 0);
  
  // —— 汇率换算 ——
  const toCNY = (thb: number) => thb / (thbPerCNY || 1);
  const toUSD = (thb: number) => thb / (thbPerUSD || 1);
  
  // —— PDF ——
  const previewRef = useRef<HTMLDivElement | null>(null);
  
  const exportPDF = async () => {
    const el = previewRef.current;
    if (!el) return;
    
    try {
      const [jsPDFModule, html2canvas] = await Promise.all([
        import('jspdf'),
        import('html2canvas').then(m => m.default)
      ]);
      
      // 修复 jsPDF 导入方式
      const jsPDF = jsPDFModule.default || (jsPDFModule as any).jsPDF;
      
      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      const w = W - 60;
      const h = canvas.height * w / canvas.width;
      
      if (h <= H - 60) {
        pdf.addImage(img, 'PNG', 30, 30, w, h);
      } else {
        const s = (H - 60) / h;
        const fw = w * s;
        const fh = h * s;
        pdf.addImage(img, 'PNG', (W - fw) / 2, (H - fh) / 2, fw, fh);
      }
      
      pdf.save(`Quotation_${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF导出失败，请检查网络连接或重试');
    }
  };
  
  // —— 一键复制摘要 ——
  const copySummary = async () => {
    const lines = [
      `${company ? company + '｜' : ''}${lang === 'zh' ? '报价摘要' : 'Quotation Summary'}`,
      `${lang === 'zh' ? '行程' : 'Itinerary'}：${dateRange}`,
      `${lang === 'zh' ? '人均' : 'Per-pax'} ${fmt(perPersonTHB)} THB（≈ ${fmt(toCNY(perPersonTHB))} CNY ／ ${fmt(toUSD(perPersonTHB))} USD）`,
      `${lang === 'zh' ? '总团' : 'Total'} ${fmt(finalTHB)} THB（≈ ${fmt(toCNY(finalTHB))} CNY ／ ${fmt(toUSD(finalTHB))} USD）`,
      `${lang === 'zh' ? '汇率' : 'Rates'}：1 人民币≈${fmt(thbPerCNY)} THB，1 USD≈${fmt(thbPerUSD)} THB`,
      `${lang === 'zh' ? '行程简表' : 'Itinerary brief'}：`,
      ...itinerary.map((d, i) => `D${i + 1} ${d.date} ${d.title}`),
      `${lang === 'zh' ? '包含' : 'Includes'}：${t('inc')}`,
      `${lang === 'zh' ? '不含' : 'Excludes'}：${t('exc')}`
    ];
    
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      alert(lang === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard');
    } catch (error) {
      console.error('Copy failed:', error);
      alert('复制失败，请手动复制');
    }
  };
  
  // 格式化数字
  const fmt = (n: number) => (Number(n || 0)).toFixed(2);
  
  // 生成PDF标题
  const pdfTitle = (company: string, days: number, nights: number) => 
    `${company ? company + '｜' : ''}泰国曼谷+芭堤雅 ${days}天${nights}晚 报价单`;
  
  const pdfRate = (cnyRate: number, usdRate: number, peopleCount: number) =>
    `汇率：1 人民币≈${fmt(cnyRate)} 泰铢、1 美元≈${fmt(usdRate)} 泰铢 ｜ 人数：${peopleCount} 人`;
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 font-sans">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <div className="text-sm flex items-center gap-2">
          <span>{lang === 'zh' ? '语言' : 'Language'}:</span>
          <select 
            className="border rounded px-2 py-1" 
            value={lang} 
            onChange={(e) => setLang(e.target.value as 'zh' | 'en')}
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{t('intro')}</p>
      
      {/* 公司抬头 */}
      <Card title={t('brand')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Field label={t('company')}>
            <Input value={company} set={setCompany} />
          </Field>
          <Field label={t('logo')}>
            <Input value={logoUrl} set={setLogoUrl} />
          </Field>
          <Field label={t('contact')}>
            <Input value={contact} set={setContact} />
          </Field>
        </div>
      </Card>
      
      {/* 存档 */}
      <Card title={t('storage')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <input 
            className="border rounded px-3 py-2" 
            placeholder={t('saveName')} 
            value={saveName} 
            onChange={(e) => setSaveName(e.target.value)} 
          />
          <div className="flex gap-2">
            <button className="border rounded px-3 py-2" onClick={saveNew}>
              {t('saveNew')}
            </button>
            <button className="border rounded px-3 py-2" onClick={updateCurrent}>
              {t('saveUpdate')}
            </button>
          </div>
          <div className="flex gap-2">
            <select 
              className="border rounded px-2 py-2" 
              value={currentId || ''} 
              onChange={(e) => loadById(e.target.value)}
            >
              <option value="">{t('noneSave')}</option>
              {saves.map(s => (
                <option key={s.id} value={s.id}>
                  {new Date(s.createdAt).toLocaleDateString()}｜{s.name}
                </option>
              ))}
            </select>
            <button 
              className="border rounded px-3 py-2" 
              onClick={() => currentId && deleteById(currentId)}
            >
              {t('del')}
            </button>
          </div>
        </div>
        <div className="mt-2 flex gap-2 items-center">
          <button className="border rounded px-3 py-2" onClick={exportJSON}>
            {t('exportJson')}
          </button>
          <label className="border rounded px-3 py-2 cursor-pointer">
            {t('importJson')}
            <input 
              type="file" 
              accept="application/json" 
              className="hidden" 
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJSON(f);
                e.currentTarget.value = '';
              }} 
            />
          </label>
        </div>
      </Card>
      
      {/* 基础设置 + 导游车辆 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title={t('base')}>
          <Field label={t('people')}>
            <Num value={people} set={setPeople} min={1} />
          </Field>
          <Field label={t('days')}>
            <Num value={days} set={setDays} min={1} />
          </Field>
          <Field label={t('flight')}>
            <Num value={flight} set={setFlight} min={0} />
          </Field>
          <Field label={t('room')}>
            <Num value={hotelRoomPerNight} set={setHotelRoomPerNight} min={0} />
          </Field>
        </Card>
        
        <Card title={t('guideCar')}>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('gTrans')}>
              <Num value={guideTransfer} set={setGuideTransfer} min={0} />
            </Field>
            <Field label={t('gTransCnt')}>
              <Num value={gTransferCount} set={setGTransferCount} min={0} />
            </Field>
            <Field label={t('gFull')}>
              <Num value={guideFull} set={setGuideFull} min={0} />
            </Field>
            <Field label={t('gFullCnt')}>
              <Num value={gFullCount} set={setGFullCount} min={0} />
            </Field>
            <Field label={t('gLodge')}>
              <Num value={guideLodge} set={setGuideLodge} min={0} />
            </Field>
            <Field label={t('gLodgeN')}>
              <Num value={guideLodgeNights} set={setGuideLodgeNights} min={0} />
            </Field>
            <Field label={t('dLodge')}>
              <Num value={driverLodge} set={setDriverLodge} min={0} />
            </Field>
            <Field label={t('dLodgeN')}>
              <Num value={driverLodgeNights} set={setDriverLodgeNights} min={0} />
            </Field>
            <Field label={t('carTrans')}>
              <Num value={carTransferFee} set={setCarTransferFee} min={0} />
            </Field>
            <Field label={t('carTransCnt')}>
              <Num value={carTransferCount} set={setCarTransferCount} min={0} />
            </Field>
            <Field label={t('carFull')}>
              <Num value={carFullDayFee} set={setCarFullDayFee} min={0} />
            </Field>
            <Field label={t('carFullDays')}>
              <Num value={carFullDays} set={setCarFullDays} min={0} />
            </Field>
          </div>
        </Card>
      </div>
      
      {/* 餐饮 + 单房差 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title={t('meals')}>
          <div className="grid grid-cols-3 gap-3">
            <Cell label={t('b')}>
              <Num value={breakfast} set={setBreakfast} min={0} />
            </Cell>
            <Cell label={t('l')}>
              <Num value={lunch} set={setLunch} min={0} />
            </Cell>
            <Cell label={t('d')}>
              <Num value={dinner} set={setDinner} min={0} />
            </Cell>
            <Cell label={t('bc')}>
              <Num value={breakfastCount} set={setBreakfastCount} min={0} />
            </Cell>
            <Cell label={t('lc')}>
              <Num value={lunchCount} set={setLunchCount} min={0} />
            </Cell>
            <Cell label={t('dc')}>
              <Num value={dinnerCount} set={setDinnerCount} min={0} />
            </Cell>
          </div>
        </Card>
        
        <Card title={t('single')}>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-sm text-gray-700">
              {lang === 'zh' 
                ? `单房差/间/晚（自动）：${fmt(singlePerNight)} THB`
                : `Single sup /room/night (auto): ${fmt(singlePerNight)} THB`
              }
            </div>
            <Field label={t('singleRooms')}>
              <Num value={singleRooms} set={setSingleRooms} min={0} />
            </Field>
            <div className="text-sm text-gray-700 col-span-3">
              {lang === 'zh' 
                ? `合计：${fmt(singleSuppTotalTHB)} THB（${fmt(singlePerNight)}×${nights}晚×${singleRooms}间）`
                : `Total: ${fmt(singleSuppTotalTHB)} THB (${fmt(singlePerNight)}×${nights} nights×${singleRooms} rooms)`
              }
            </div>
          </div>
        </Card>
      </div>
      
      {/* 门票库 */}
      <Card title={t('tickets')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {catalog.map(({ name, price }, i) => (
            <div key={i} className="flex items-center gap-2 border rounded px-3 py-2">
              <input 
                type="checkbox" 
                checked={selectedTickets.includes(name)} 
                onChange={() => toggleTicket(name)} 
              />
              <input 
                className="flex-1 border rounded px-2 py-1 text-sm" 
                value={name} 
                onChange={(e) => setCatalogName(i, e.target.value)} 
              />
              <input 
                type="number" 
                className="w-28 border rounded px-2 py-1 text-sm" 
                step={0.01} 
                value={price} 
                onChange={(e) => setCatalogPrice(i, Number(e.target.value))} 
              />
              <span className="text-sm">THB</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          <input 
            className="col-span-3 border rounded px-3 py-2" 
            placeholder={t('name')} 
            value={newTicketName} 
            onChange={(e) => setNewTicketName(e.target.value)} 
          />
          <input 
            type="number" 
            step={0.01} 
            className="col-span-1 border rounded px-3 py-2" 
            placeholder={t('price')} 
            value={newTicketPrice} 
            onChange={(e) => setNewTicketPrice(Number(e.target.value))} 
          />
          <button className="col-span-1 border rounded px-3 py-2" onClick={addTicket}>
            {t('addTicket')}
          </button>
        </div>
      </Card>
      
      {/* 行程模板库 */}
      <Card title={t('templates')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <input 
            className="border rounded px-3 py-2" 
            placeholder={t('tplName')} 
            value={tplName} 
            onChange={(e) => setTplName(e.target.value)} 
          />
          <div className="flex gap-2">
            <button className="border rounded px-3 py-2" onClick={saveTpl}>
              {t('saveTpl')}
            </button>
            <button className="border rounded px-3 py-2" onClick={applyTpl}>
              {t('applyTpl')}
            </button>
          </div>
          <div className="flex gap-2">
            <select 
              className="border rounded px-2 py-2" 
              value={tplId} 
              onChange={(e) => setTplId(e.target.value)}
            >
              <option value="">{t('none')}</option>
              {tpls.map(s => (
                <option key={s.id} value={s.id}>
                  {new Date(s.createdAt).toLocaleDateString()}｜{s.name}
                </option>
              ))}
            </select>
            <button className="border rounded px-3 py-2" onClick={deleteTpl}>
              {t('delTpl')}
            </button>
          </div>
        </div>
      </Card>
      
      {/* 行程编辑器 */}
      <Card title={`${t('itinEditor')}（${itinerary.length} ${lang === 'zh' ? '天' : 'days'}）`}>
        <div className="mb-2 text-xs text-gray-600">
          {lang === 'zh' 
            ? '提示：完成编辑后可点击"同步天数"，将费用计算中的天数与行程保持一致。'
            : 'Tip: Click "Sync Days" to align pricing days with itinerary days.'
          }
        </div>
        {itinerary.map((d, idx) => (
          <div key={idx} className="mb-4 border rounded p-3 bg-white">
            <div className="flex gap-2 mb-2">
              <input 
                className="w-28 border rounded px-2 py-1" 
                placeholder={t('datePH')} 
                value={d.date} 
                onChange={(e) => updateDayField(idx, 'date', e.target.value)} 
              />
              <input 
                className="flex-1 border rounded px-2 py-1" 
                placeholder={`D${idx + 1} ${lang === 'zh' ? '标题' : 'Title'}`} 
                value={d.title} 
                onChange={(e) => updateDayField(idx, 'title', e.target.value)} 
              />
              <button 
                className="px-2 py-1 border rounded" 
                onClick={() => removeDay(idx)}
              >
                {t('delDay')}
              </button>
            </div>
            <ul className="list-disc pl-5 text-sm">
              {d.items.map((it, k) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="flex-1">{it}</span>
                  <button 
                    className="text-xs border rounded px-2 py-0.5" 
                    onClick={() => removeLine(idx, k)}
                  >
                    {t('delItem')}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2">
              <input 
                className="flex-1 border rounded px-2 py-1 text-sm" 
                placeholder={lang === 'zh' ? '新增行程条目…' : 'Add an item…'} 
                value={newLine[idx] || ''} 
                onChange={(e) => setNewLine(s => ({ ...s, [idx]: e.target.value }))} 
              />
              <button 
                className="px-3 py-1 bg-gray-800 text-white rounded" 
                onClick={() => addLine(idx)}
              >
                {t('addItem')}
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={addDay}>
            {t('addDayBtn')}
          </button>
          <button className="px-3 py-1 border rounded" onClick={syncDays}>
            {t('syncDays')}
          </button>
        </div>
      </Card>
      
      {/* 加价 */}
      <Card title={t('markup')}>
        <Field label={t('mtype')}>
          <select 
            className="w-full border rounded px-2 py-2" 
            value={markupType} 
            onChange={(e) => setMarkupType(e.target.value as 'percent' | 'amount')}
          >
            <option value="percent">{t('mpercent')}</option>
            <option value="amount">{t('mamount')}</option>
          </select>
        </Field>
        <Field label={markupType === 'percent' ? t('mvalueP') : t('mvalueA')}>
          <Num value={markupValue} set={setMarkupValue} />
        </Field>
      </Card>
      
      {/* 汇率 */}
      <Card title={t('rates')}>
        <Field label={t('cny')}>
          <Num value={thbPerCNY} set={setThbPerCNY} step={0.01} min={0} />
        </Field>
        <Field label={t('usd')}>
          <Num value={thbPerUSD} set={setThbPerUSD} step={0.01} min={0} />
        </Field>
      </Card>
      
      {/* 报价结果 */}
      <Card title={t('result')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <KPI label={t('percap')} value={`${fmt(perPersonTHB)} THB`} />
          <KPI label={t('total')} value={`${fmt(finalTHB)} THB`} />
          <KPI label="" value={t('expl')} small />
        </div>
        <div className="text-sm text-gray-700 mt-3">
          <div>
            {lang === 'zh' 
              ? `汇率：1 人民币 ≈ ${fmt(thbPerCNY)} 泰铢；1 美元 ≈ ${fmt(thbPerUSD)} 泰铢`
              : `Rates: 1 CNY≈${fmt(thbPerCNY)} THB; 1 USD≈${fmt(thbPerUSD)} THB`
            }
          </div>
          <div className="mt-1">
            {t('r2')}{fmt(toCNY(perPersonTHB))} CNY ／ {fmt(toUSD(perPersonTHB))} USD
          </div>
          <div>
            {t('r3')}{fmt(toCNY(finalTHB))} CNY ／ {fmt(toUSD(finalTHB))} USD
          </div>
        </div>
        
        {/* 预览（PDF 截图源） */}
        <div ref={previewRef} className="mt-4 border rounded-lg p-4 bg-white">
          {/* 抬头 */}
          <div className="flex items-center gap-3">
            {logoUrl && (
              <img src={logoUrl} alt="logo" className="w-12 h-12 object-contain" />
            )}
            <div>
              <div className="text-lg font-semibold">
                {pdfTitle(company, days, nights)}
              </div>
              {contact && (
                <div className="text-xs text-gray-600">{contact}</div>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {pdfRate(thbPerCNY, thbPerUSD, people)} ｜ 
            {lang === 'zh' ? `日期：${dateRange}` : `Dates: ${dateRange}`}
          </div>
          
          <div className="mt-2 text-sm">
            <div className="font-medium">{t('sec1')}</div>
            <div>
              {lang === 'zh' 
                ? `总团价：${fmt(finalTHB)} THB（人均：${fmt(perPersonTHB)} THB）`
                : `Total: ${fmt(finalTHB)} THB (Per-pax: ${fmt(perPersonTHB)} THB)`
              }
            </div>
            <div>≈ {fmt(toCNY(finalTHB))} CNY ／ {fmt(toUSD(finalTHB))} USD</div>
          </div>
          
          <div className="mt-2 text-sm">
            <div className="font-medium">{t('sec2')}（{dateRange}）</div>
            {itinerary.map((d, i) => (
              <div key={i} className="mt-1">
                <div className="font-medium">{d.title}（{d.date || `D${i + 1}`}）</div>
                <ul className="list-disc pl-5">
                  {d.items.map((x, k) => (
                    <li key={k}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm">
            <div className="font-medium">{t('sec3')}</div>
            <ul className="list-disc pl-5">
              <li>{t('iAir')}：{fmt(flight)} THB/人</li>
              <li>{t('iHotel')}：{fmt(hotelRoomPerNight)} THB/间/晚 → {fmt(hotelPerPerson)} THB/人</li>
              <li>
                {t('iMeals')}：B{breakfastCount}×{fmt(breakfast)} + L{lunchCount}×{fmt(lunch)} + D{dinnerCount}×{fmt(dinner)} THB/人
              </li>
              <li>
                {t('iTickets')}：{selectedTickets.join('、')}（合计 {fmt(ticketTotalPerPerson)} THB/人）
              </li>
              <li>
                {t('iLocal')}：
                {lang === 'zh' 
                  ? `导游接送×${gTransferCount}、全天×${gFullCount}、导游住宿×${guideLodgeNights}晚、司机住宿×${driverLodgeNights}晚；车辆接送×${carTransferCount}、车辆全天×${carFullDays}`
                  : `Guide transfer×${gTransferCount}, full-day×${gFullCount}, guide lodging×${guideLodgeNights} nights, driver lodging×${driverLodgeNights} nights; vehicle transfer×${carTransferCount}, vehicle full-day×${carFullDays}`
                }
              </li>
              <li>
                {t('iSingle')}：{fmt(singlePerNight)}×{nights}×{singleRooms} = {fmt(singleSuppTotalTHB)} THB
              </li>
            </ul>
          </div>
          
          <div className="mt-2 text-sm">
            <div className="font-medium">{t('sec4')}</div>
            <div>{t('inc')}</div>
            <div>{t('exc')}</div>
            <div className="text-xs text-gray-500 mt-1">
              {lang === 'zh' 
                ? '本报价为估算参考，最终以确认单/合同为准；结算币种 THB。'
                : 'This is an estimate; final terms per Confirmation/Contract; settlement in THB.'
              }
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex gap-2">
          <button className="border rounded px-3 py-2" onClick={exportPDF}>
            {t('exportPdf')}
          </button>
          <button className="border rounded px-3 py-2" onClick={copySummary}>
            {t('copy')}
          </button>
        </div>
      </Card>
    </div>
  );
}

// —— UI 组件 ——
function Card({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mt-4 border rounded-2xl shadow-sm bg-gray-50">
      <div className="px-4 py-3 border-b bg-white rounded-t-2xl font-medium">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <div className="text-sm text-gray-700 mb-1">{label}</div>
      {children}
    </label>
  );
}

function Cell({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      {children}
    </div>
  );
}

function Num({ 
  value, 
  set, 
  min = 0, 
  step = 0.01 
}: { 
  value: number, 
  set: (v: number) => void, 
  min?: number, 
  step?: number 
}) {
  return (
    <input 
      type="number" 
      className="w-full border rounded px-3 py-2" 
      value={value} 
      min={min} 
      step={step} 
      onChange={(e) => set(Number(e.target.value))} 
    />
  );
}

function Input({ value, set }: { value: string, set: (v: string) => void }) {
  return (
    <input 
      className="w-full border rounded px-3 py-2" 
      value={value} 
      onChange={(e) => set(e.target.value)} 
    />
  );
}

function KPI({ 
  label, 
  value, 
  small 
}: { 
  label: string, 
  value: string, 
  small?: boolean 
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`font-semibold ${small ? "text-base" : "text-xl"}`}>{value}</div>
    </div>
  );
}