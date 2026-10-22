const escapeHtml=AppCore.escapeHtml;
const companies=[  {
  ticker: 'PZU',
  name: 'PZU',
  sector: 'Ubezpieczenia',
  dividend: 4.80,
  year: 2026,
  quoteSymbol: 'PZU.WA'
},
 {
  ticker: 'PEO',
  name: 'Bank Pekao',
  sector: 'Banki',
  dividend: 19.77,
  year: 2026,
  quoteSymbol: 'PEO.WA'
},
 {
  ticker: 'ALR',
  name: 'Alior Bank',
  sector: 'Banki',
  dividend: 8.93,
  year: 2026,
  quoteSymbol: 'ALR.WA'
},
 {
  ticker: 'ACP',
  name: 'Asseco Poland',
  sector: 'Technologie',
  dividend: 13.05,
  year: 2026,
  quoteSymbol: 'ACP.WA'
},
 {
  ticker: 'BUD',
  name: 'Budimex',
  sector: 'Budownictwo',
  dividend: 32.42,
  year: 2026,
  quoteSymbol: 'BDX.WA'
},
 {
  ticker: 'DOM',
  name: 'Dom Development',
  sector: 'Nieruchomości',
  dividend: 7.00,
  year: 2025,
  quoteSymbol: 'DOM.WA'
},
 {
  ticker: 'GPW',
  name: 'GPW',
  sector: 'Finanse',
  dividend: 3.40,
  year: 2026,
  quoteSymbol: 'GPW.WA'
},
 {
  ticker: 'KTY',
  name: 'Grupa Kęty',
  sector: 'Przemysł',
  dividend: 55.46,
  year: 2025,
  quoteSymbol: 'KTY.WA'
},
 {
  ticker: 'XTB',
  name: 'XTB',
  sector: 'Finanse',
  dividend: 4.07,
  year: 2026,
  quoteSymbol: 'XTB.WA'
},
 {
  ticker: 'PKN',
  name: 'ORLEN',
  sector: 'Energetyka',
  dividend: 8.00,
  year: 2026,
  quoteSymbol: 'PKN.WA'
},
 {
  ticker: 'NEU',
  name: 'NEUCA',
  sector: 'Ochrona zdrowia',
  dividend: 17.80,
  year: 2025,
  quoteSymbol: 'NEU.WA'
},
 {
  ticker: 'SKA',
  name: 'Śnieżka',
  sector: 'Przemysł',
  dividend: 5.15,
  year: 2025,
  quoteSymbol: 'SKA.WA'
},
 {
  ticker: 'ABS',
  name: 'Asseco Business Solutions',
  sector: 'Technologie',
  dividend: 3.75,
  year: 2025,
  quoteSymbol: 'ABS.WA'
},
 {
  ticker: 'ASE',
  name: 'Asseco South Eastern Europe',
  sector: 'Technologie',
  dividend: 1.95,
  year: 2025,
  quoteSymbol: 'ASE.WA'
},
 {
  ticker: 'AMB',
  name: 'Ambra',
  sector: 'Dobra konsumenckie',
  dividend: 1.10,
  year: 2025,
  quoteSymbol: 'AMB.WA'
},
 {
  ticker: 'ASB',
  name: 'ASBIS',
  sector: 'Technologie',
  dividend: 1.31,
  year: 2026,
  quoteSymbol: 'ASB.WA'
},
 {
  ticker: 'EBP',
  name: 'Erste Bank Polska',
  sector: 'Banki',
  dividend: 49.98,
  year: 2026,
  quoteSymbol: 'EBP.WA'
},
 {
  ticker: 'OPL',
  name: 'Orange Polska',
  sector: 'Telekomunikacja',
  dividend: 0.61,
  year: 2026,
  quoteSymbol: 'OPL.WA'
},
 {
  ticker: 'KRU',
  name: 'Kruk',
  sector: 'Finanse',
  dividend: 20.00,
  year: 2026,
  quoteSymbol: 'KRU.WA'
},
 {
  ticker: 'LPP',
  name: 'LPP',
  sector: 'Handel',
  dividend: 400.00,
  year: 2026,
  quoteSymbol: 'LPP.WA'
},
 {
  ticker: 'GPP',
  name: 'Grupa Pracuj',
  sector: 'Technologie',
  dividend: 3.00,
  year: 2026,
  quoteSymbol: 'GPP.WA'
},
 {
  ticker: 'ELT',
  name: 'Elektrotim',
  sector: 'Przemysł',
  dividend: 2.00,
  year: 2026,
  quoteSymbol: 'ELT.WA'
},
 {
  ticker: 'DVL',
  name: 'Develia',
  sector: 'Nieruchomości',
  dividend: 0.73,
  year: 2026,
  quoteSymbol: 'DVL.WA'
},
 {
  ticker: 'PKO',
  name: 'PKO BP',
  sector: 'Banki',
  dividend: 6.14,
  year: 2026,
  quoteSymbol: 'PKO.WA'
},
 {
  ticker: 'CDR',
  name: 'CD Projekt RED',
  sector: 'Technologie',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'CDR.WA'
},
 {
  ticker: 'DIG',
  name: 'Digital Network',
  sector: 'Media',
  dividend: 5.00,
  year: 2026,
  quoteSymbol: 'DIG.WA'
},
 {
  ticker: 'PCR',
  name: 'PCC Rokita',
  sector: 'Przemysł',
  dividend: 2.65,
  year: 2026,
  quoteSymbol: 'PCR.WA'
},
 {
  ticker: 'RBW',
  name: 'Rainbow Tours',
  sector: 'Turystyka',
  dividend: 8.60,
  year: 2026,
  quoteSymbol: 'RBW.WA'
},
 {
  ticker: 'TAR',
  name: 'Tarczyński',
  sector: 'Dobra konsumenckie',
  dividend: 3.30,
  year: 2026,
  quoteSymbol: 'TAR.WA'
},
 {
  ticker: 'SNT',
  name: 'Synektik',
  sector: 'Ochrona zdrowia',
  dividend: 10.75,
  year: 2026,
  quoteSymbol: 'SNT.WA'
},
 {
  ticker: 'ING',
  name: 'ING Bank Śląski',
  sector: 'Banki',
  dividend: 26.71,
  year: 2026,
  quoteSymbol: 'ING.WA'
},
 {
  ticker: 'AMC',
  name: 'Amica',
  sector: 'Dobra konsumenckie',
  dividend: 2.50,
  year: 2026,
  quoteSymbol: 'AMC.WA'
},
 {
  ticker: 'APT',
  name: 'Apator',
  sector: 'Przemysł',
  dividend: 1.20,
  year: 2026,
  quoteSymbol: 'APT.WA'
},
 {
  ticker: 'UNI',
  name: 'Unibep',
  sector: 'Budownictwo',
  dividend: 0.40,
  year: 2026,
  quoteSymbol: 'UNI.WA'
},
 {
  ticker: 'BHW',
  name: 'Citi Handlowy',
  sector: 'Banki',
  dividend: 9.80,
  year: 2026,
  quoteSymbol: 'BHW.WA'
},
 {
  ticker: 'WTN',
  name: 'Wittchen',
  sector: 'Handel',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'WTN.WA'
},
 {
  ticker: 'DCR',
  name: 'Decora',
  sector: 'Przemysł',
  dividend: 4.00,
  year: 2026,
  quoteSymbol: 'DCR.WA'
},
 {
  ticker: 'BBT',
  name: 'Boombit',
  sector: 'Technologie',
  dividend: 0.24,
  year: 2026,
  quoteSymbol: 'BBT.WA'
},
 {
  ticker: 'ZMT',
  name: 'Zamet',
  sector: 'Przemysł',
  dividend: 0.29,
  year: 2026,
  quoteSymbol: 'ZMT.WA'
},
 {
  ticker: 'VOT',
  name: 'Votum',
  sector: 'Finanse',
  dividend: 5.00,
  year: 2026,
  quoteSymbol: 'VOT.WA'
},
 {
  ticker: 'TOR',
  name: 'Torpol',
  sector: 'Budownictwo',
  dividend: 3.39,
  year: 2026,
  quoteSymbol: 'TOR.WA'
},
 {
  ticker: 'CBF',
  name: 'Cyber_Folks',
  sector: 'Technologie',
  dividend: 2.50,
  year: 2026,
  quoteSymbol: 'CBF.WA'
},
 {
  ticker: 'PAS',
  name: 'Passus',
  sector: 'Technologie',
  dividend: 2.50,
  year: 2026,
  quoteSymbol: 'PAS.WA'
},
 {
  ticker: 'TXT',
  name: 'Text',
  sector: 'Technologie',
  dividend: 4.26,
  year: 2026,
  quoteSymbol: 'TXT.WA'
},
 {
  ticker: 'KGH',
  name: 'KGHM',
  sector: 'Surowce',
  dividend: 1.50,
  year: 2026,
  quoteSymbol: 'KGH.WA'
},
 {
  ticker: 'TPE',
  name: 'Tauron',
  sector: 'Energetyka',
  dividend: 0.20,
  year: 2026,
  quoteSymbol: 'TPE.WA'
},
 {
  ticker: 'ENA',
  name: 'Enea',
  sector: 'Energetyka',
  dividend: 0.56,
  year: 2026,
  quoteSymbol: 'ENA.WA'
},
 {
  ticker: 'MUR',
  name: 'Murapol',
  sector: 'Nieruchomości',
  dividend: 4.91,
  year: 2026,
  quoteSymbol: 'MUR.WA'
},
 {
  ticker: 'SON',
  name: 'Sonel',
  sector: 'Przemysł',
  dividend: 0.70,
  year: 2026,
  quoteSymbol: 'SON.WA'
},
 {
  ticker: 'STX',
  name: 'Stalexport Autostrady',
  sector: 'Infrastruktura',
  dividend: 0.73,
  year: 2026,
  quoteSymbol: 'STX.WA'
},
 {
  ticker: 'DBC',
  name: 'Dębica',
  sector: 'Przemysł',
  dividend: 6.79,
  year: 2026,
  quoteSymbol: 'DBC.WA'
},
 {
  ticker: 'FRO',
  name: 'Ferro',
  sector: 'Przemysł',
  dividend: 2.36,
  year: 2026,
  quoteSymbol: 'FRO.WA'
},
 {
  ticker: 'BNP',
  name: 'BNP Paribas Bank Polska',
  sector: 'Banki',
  dividend: 10.20,
  year: 2026,
  quoteSymbol: 'BNP.WA'
},
 {
  ticker: 'PGE',
  name: 'PGE',
  sector: 'Energetyka',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'PGE.WA'
},
 {
  ticker: 'JSW',
  name: 'Jastrzębska Spółka Węglowa',
  sector: 'Surowce',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'JSW.WA'
},
 {
  ticker: 'MBK',
  name: 'mBank',
  sector: 'Banki',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'MBK.WA'
},
 {
  ticker: 'MIL',
  name: 'Bank Millennium',
  sector: 'Banki',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'MIL.WA'
},
 {
  ticker: 'ATT',
  name: 'Grupa Azoty',
  sector: 'Chemia',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'ATT.WA'
},
 {
  ticker: 'CPS',
  name: 'Cyfrowy Polsat',
  sector: 'Media',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'CPS.WA'
},
 {
  ticker: 'COG',
  name: 'Cognor',
  sector: 'Surowce',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'COG.WA'
},
 {
  ticker: 'HUG',
  name: 'Huuuge',
  sector: 'Technologie',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'HUG.WA'
},
 {
  ticker: 'TEN',
  name: 'Ten Square Games',
  sector: 'Technologie',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'TEN.WA'
},
 {
  ticker: 'GTC',
  name: 'GTC',
  sector: 'Nieruchomości',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'GTC.WA'
},
 {
  ticker: 'EAT',
  name: 'AmRest',
  sector: 'Dobra konsumenckie',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'EAT.WA'
},
 {
  ticker: 'MRC',
  name: 'Mercator Medical',
  sector: 'Ochrona zdrowia',
  dividend: 1.64,
  year: 2026,
  quoteSymbol: 'MRC.WA'
},
 {
  ticker: 'LWB',
  name: 'Lubelski Węgiel Bogdanka',
  sector: 'Surowce',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'LWB.WA'
},
 {
  ticker: 'DNP',
  name: 'Dino Polska',
  sector: 'Handel',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'DNP.WA'
},
 {
  ticker: 'ZAB',
  name: 'Żabka Group',
  sector: 'Handel',
  dividend: 0,
  year: 2026,
  quoteSymbol: 'ZAB.WA'
},
 {
  ticker: 'MBR',
  name: 'Mo-Bruk',
  sector: 'Przemysł',
  dividend: 15.23,
  year: 2026,
  quoteSymbol: 'MBR.WA'
},
 { ticker: 'WORLD', name: 'iShares Core MSCI World', sector: 'ETF · akcje globalne', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'EUNL.DE' },
 { ticker: 'EIMI', name: 'iShares Core MSCI EM IMI', sector: 'ETF · rynki wschodzące', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'IS3N.DE' },
 { ticker: 'SP500', name: 'iShares Core S&P 500', sector: 'ETF · USA', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'SXR8.DE' },
 { ticker: 'VHYL', name: 'Vanguard FTSE All-World High Dividend Yield', sector: 'ETF · dywidendowy', assetType: 'etf', dividend: 0, year: 2026, quoteSymbol: 'VGWD.DE' },
 { ticker: 'NASDAQ', name: 'iShares NASDAQ 100', sector: 'ETF · USA', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'SXRV.DE' },
 { ticker: 'GOLD', name: 'iShares Physical Gold ETC', sector: 'ETC · złoto', assetType: 'etf', distributes: false, distributionNote: 'ETC na złoto nie wypłaca dywidend; jego kurs odzwierciedla cenę złota.', dividend: 0, year: 2026, quoteSymbol: 'PPFB.DE' },
 { ticker: 'VWCE', name: 'Vanguard FTSE All-World', sector: 'ETF · akcje globalne', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'VWCE.DE' },
 { ticker: 'ACWI', name: 'iShares MSCI ACWI', sector: 'ETF · akcje globalne', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'IUSQ.DE' },
 { ticker: 'MWIG40TR', name: 'BETA ETF mWIG40TR', sector: 'ETF · Polska', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'ETFBM40TR.WA' },
 { ticker: 'SWIG80TR', name: 'BETA ETF sWIG80TR', sector: 'ETF · Polska', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'ETFBS80TR.WA' },
 { ticker: 'WIG20TR', name: 'BETA ETF WIG20TR', sector: 'ETF · Polska', assetType: 'etf', distributes: false, dividend: 0, year: 2026, quoteSymbol: 'ETFBW20TR.WA' }
];
const defaultPortfolio=[];
let portfolio=JSON.parse(safeStorage.get('dividend-ike-portfolio')||'null')||defaultPortfolio;
const emptyStartupTickers=['PZU','PEO','ACP','GPW'];
if(Array.isArray(portfolio)&&portfolio.length===emptyStartupTickers.length&&emptyStartupTickers.every(ticker=>portfolio.some(item=>item?.ticker===ticker&&item.shares===0))) {
  portfolio=[];
  safeStorage.set('dividend-ike-portfolio','[]');
}
let prices=JSON.parse(safeStorage.get('dividend-ike-prices')||'{}');
let priceTimes=JSON.parse(safeStorage.get('dividend-ike-price-times')||'{}');
if(!Object.keys(priceTimes).length)prices= {
};
function migrateSantanderData() {
  const legacy=portfolio.find(h=>h.ticker==='SPL'),
  erste=portfolio.find(h=>h.ticker==='EBP'),
  company=companies.find(c=>c.ticker==='EBP');
  if(legacy) {
    if(erste) {
      erste.shares+=legacy.shares;
      portfolio=portfolio.filter(h=>h!==legacy)
    }
    else {
      legacy.ticker='EBP';
      legacy.dividend=company.dividend;
      legacy.year=company.year
    }
  }
  if(prices.SPL!=null&&prices.EBP==null)prices.EBP=prices.SPL;
  if(priceTimes.SPL&&!priceTimes.EBP)priceTimes.EBP=priceTimes.SPL;
  delete prices.SPL;
  delete priceTimes.SPL;
  portfolioActivity=portfolioActivity.map(item=>item.ticker==='SPL'? {
    ...item,ticker: 'EBP'
  }
  : item);
  safeStorage.set('dividend-ike-portfolio',JSON.stringify(portfolio));
  safeStorage.set('dividend-ike-prices',JSON.stringify(prices));
  safeStorage.set('dividend-ike-price-times',JSON.stringify(priceTimes));
  safeStorage.set('dividend-ike-activity',JSON.stringify(portfolioActivity))
}
let assetFilter='stock',
editTicker=null,
formOpener=null,
sortDirection='asc',
portfolioSort= {
  column: null,
  direction: 'asc'
};
let portfolioHistory=JSON.parse(safeStorage.get('dividend-ike-history')||'[]');
if(!Array.isArray(portfolioHistory))portfolioHistory=[];
let portfolioActivity=JSON.parse(safeStorage.get('dividend-ike-activity')||'[]');
if(!Array.isArray(portfolioActivity))portfolioActivity=[];
migrateSantanderData();
let statsPeriod='week';
let historyStartedAt=safeStorage.get('dividend-ike-history-started')||new Date().toISOString();
safeStorage.set('dividend-ike-history-started',historyStartedAt);
const depositStorageKey='dividend-ike-deposits',inflationStorageKey='dividend-ike-inflation',depositRateStorageKey='dividend-ike-deposit-rate';
const simulationStorageKey='dividend-ike-simulation';
const emptySimulation=()=>({mode:null,existing:{value:null,deposits:null,profit:null},plan:{monthlyDeposit:null,annualReturnPct:null,years:null,birthYear:null,firstDepositYear:null,annualInflationPct:null},withdrawalAmount:null,annualLimit:IkeSimulation.IKE_RULES.annualLimit,enabled:false,capToLimit:false});
function validSimulationState(value) {
  const numeric=(item,min,max)=>item===null||Number.isFinite(item)&&item>=min&&item<=max;
  return value&&typeof value==='object'&&!Array.isArray(value)&&[null,'new','existing'].includes(value.mode)&&typeof value.enabled==='boolean'&&typeof (value.capToLimit??false)==='boolean'&&value.existing&&numeric(value.existing.value,0,1e12)&&numeric(value.existing.deposits,0,1e12)&&numeric(value.existing.profit,-1e12,1e12)&&value.plan&&numeric(value.plan.monthlyDeposit,0,1e9)&&numeric(value.plan.annualReturnPct,-100,100)&&numeric(value.plan.years,1,80)&&numeric(value.plan.birthYear,1900,new Date().getFullYear())&&numeric(value.plan.firstDepositYear,1900,new Date().getFullYear()+80)&&numeric(value.plan.annualInflationPct,-99,1000)&&numeric(value.withdrawalAmount,0,1e12)&&(value.annualLimit===null||Number.isFinite(value.annualLimit)&&value.annualLimit>=0&&value.annualLimit<=1e9);
}
function readSimulationState() {
  try {
    const saved=JSON.parse(safeStorage.get(simulationStorageKey));
    if(!validSimulationState(saved))return emptySimulation();
    const defaults=emptySimulation();
    return {mode:saved.mode,enabled:saved.enabled,capToLimit:saved.capToLimit??false,annualLimit:saved.annualLimit,withdrawalAmount:saved.withdrawalAmount,existing:Object.fromEntries(Object.keys(defaults.existing).map(key=>[key,saved.existing[key]??null])),plan:Object.fromEntries(Object.keys(defaults.plan).map(key=>[key,saved.plan[key]??null]))};
  }
  catch { return emptySimulation() }
}
const simulationState=readSimulationState();
function readAnalysisStorage(key,fallback) {
  try { return JSON.parse(safeStorage.get(key)??JSON.stringify(fallback)) }
  catch { return fallback }
}
let analysisEntries=DividendAnalysis.normalizeEntries(readAnalysisStorage(depositStorageKey,[]));
let analysisInflation=readAnalysisStorage(inflationStorageKey,{});
let monthlyInflation={};
if(!analysisInflation||typeof analysisInflation!=='object'||Array.isArray(analysisInflation))analysisInflation={};
analysisInflation=Object.fromEntries(Object.entries(analysisInflation).filter(([key,value])=>/^\d{4}-Q[1-4]$/.test(key)&&Number.isFinite(value)&&value>=-1&&value<=10));
const savedDepositRate=safeStorage.get(depositRateStorageKey);
let depositRate=savedDepositRate===null?0.03:Number(savedDepositRate);
if(!Number.isFinite(depositRate)||depositRate<0||depositRate>10)depositRate=0.03;
function saveAnalysisStorage() {
  safeStorage.set(depositStorageKey,JSON.stringify(analysisEntries));
  safeStorage.set(inflationStorageKey,JSON.stringify(analysisInflation));
  safeStorage.set(depositRateStorageKey,String(depositRate));
}
const money=AppCore.money;
const roundMoney=value=>Math.round((value+Number.EPSILON)*100)/100;
const roundDividend=value=>Number((Math.round((value+Number.EPSILON)*100)/100).toFixed(2));
portfolio.forEach(holding=>{if(Number.isFinite(holding.dividend))holding.dividend=roundDividend(holding.dividend)});
safeStorage.set('dividend-ike-portfolio',JSON.stringify(portfolio));
const getCompany=t=>companies.find(c=>c.ticker===t);
const ikeRulesWarning=document.querySelector('#ikeRulesWarning');
if(new Date().getFullYear()>IkeSimulation.IKE_RULES.year){ikeRulesWarning.textContent=`Limit wpłat dotyczy roku ${IkeSimulation.IKE_RULES.year} — sprawdź aktualne obwieszczenie.`;ikeRulesWarning.classList.remove('hidden')}
const ikeInputs={monthly:document.querySelector('#ikeMonthlyDeposit'),annualReturn:document.querySelector('#ikeAnnualReturn'),years:document.querySelector('#ikeYears')};
document.querySelector('#ikeRuleYear').textContent=IkeSimulation.IKE_RULES.year;
ikeInputs.monthly.value=simulationState.plan.monthlyDeposit??'';
ikeInputs.annualReturn.value=simulationState.plan.annualReturnPct??'';
ikeInputs.years.value=simulationState.plan.years??'';
document.querySelector('#ikeCapToLimit').checked=simulationState.capToLimit;
function renderIkeScenarios() {
  const monthlyDeposit=AppCore.parseDecimal(ikeInputs.monthly.value),annualReturnPct=AppCore.parseDecimal(ikeInputs.annualReturn.value),years=Number(ikeInputs.years.value),valid=Number.isFinite(monthlyDeposit)&&monthlyDeposit>=0&&Number.isFinite(annualReturnPct)&&annualReturnPct>=-100&&annualReturnPct<=100&&Number.isInteger(years)&&years>=1&&years<=80,
  note=document.querySelector('#ikeScenarioNote'),container=document.querySelector('#ikeScenarios');
  container.replaceChildren();
  if(!valid){note.textContent='Wpisz miesięczną wpłatę, stopę zwrotu od −100% do 100% i okres od 1 do 80 lat.';return}
  const scenarios=IkeSimulation.projectScenarios({monthlyDeposit,annualReturnPct,years,annualLimit:IkeSimulation.IKE_RULES.annualLimit,capToLimit:simulationState.capToLimit});
  if(monthlyDeposit*12>IkeSimulation.IKE_RULES.annualLimit&&!simulationState.capToLimit)note.textContent=`Roczna suma wpłat przekracza limit ${money(IkeSimulation.IKE_RULES.annualLimit)}. Włącz ograniczenie, aby uwzględnić limit.`;
  else note.textContent=`Scenariusze pokazują stopę ${Math.max(-100,annualReturnPct-2).toLocaleString('pl-PL')}%, ${annualReturnPct.toLocaleString('pl-PL')}% i ${Math.min(100,annualReturnPct+2).toLocaleString('pl-PL')}% rocznie.`;
  for(const [index,scenario] of scenarios.entries()) {
    const result=scenario.rows.at(-1),card=document.createElement('article');card.className='ike-scenario';
    const title=document.createElement('h3'),rate=document.createElement('p'),value=document.createElement('strong'),detail=document.createElement('small');
    title.textContent=['Ostrożny','Bazowy','Optymistyczny'][index];rate.textContent=`${Math.max(-100,annualReturnPct+scenario.delta).toLocaleString('pl-PL')}% rocznie`;value.textContent=money(result.value);detail.textContent=`Wpłaty ${money(result.deposits)} · wynik ${money(result.profit)}`;
    card.append(title,rate,value,detail);container.append(card)
  }
}
Object.values(ikeInputs).forEach(input=>input.addEventListener('input',()=>{
  const monthlyDeposit=AppCore.parseDecimal(ikeInputs.monthly.value),annualReturnPct=AppCore.parseDecimal(ikeInputs.annualReturn.value),years=ikeInputs.years.value.trim()===''?null:Number(ikeInputs.years.value);
  simulationState.plan.monthlyDeposit=Number.isFinite(monthlyDeposit)&&monthlyDeposit>=0?monthlyDeposit:null;
  simulationState.plan.annualReturnPct=Number.isFinite(annualReturnPct)&&annualReturnPct>=-100&&annualReturnPct<=100?annualReturnPct:null;
  simulationState.plan.years=Number.isInteger(years)&&years>=1&&years<=80?years:null;
  simulationState.annualLimit=IkeSimulation.IKE_RULES.annualLimit;safeStorage.set(simulationStorageKey,JSON.stringify(simulationState));renderIkeScenarios()
}));
document.querySelector('#ikeCapToLimit').addEventListener('change',event=>{simulationState.capToLimit=event.target.checked;simulationState.annualLimit=IkeSimulation.IKE_RULES.annualLimit;safeStorage.set(simulationStorageKey,JSON.stringify(simulationState));renderIkeScenarios()});
renderIkeScenarios();
const percent=AppCore.percent;
const analysisInputDate=date=>new Date(`${date}T12:00:00`).toLocaleDateString('pl-PL');
let showAllDepositEntries=false,showAllQuarterRows=false;
function renderAnalysis() {
  const result=DividendAnalysis.calculateAnalysis(analysisEntries,analysisInflation,monthlyInflation),hasEntries=result.rows.length>0;
  document.querySelector('#analysisBalance').textContent=hasEntries?money(result.balance):'—';
  document.querySelector('#analysisBalanceDate').textContent=hasEntries?`Stan na ${result.rows.at(-1).date}`:'Dodaj pierwszy wpis';
  document.querySelector('#analysisDeposits').textContent=hasEntries?money(result.totalDeposits):'—';
  document.querySelector('#analysisProfit').textContent=hasEntries?money(result.totalProfit):'—';
  document.querySelector('#analysisReturn').textContent=percent(result.totalReturn);
  const annualized=hasEntries&&result.days>=365;
  document.querySelector('.analysis-cards').classList.toggle('has-annualized',annualized);
  document.querySelector('#analysisCagrCard').classList.toggle('hidden',!annualized);
  document.querySelector('#analysisXirrCard').classList.toggle('hidden',!annualized);
  document.querySelector('#analysisCagr').textContent=percent(result.cagr);
  document.querySelector('#analysisXirr').textContent=percent(result.xirr);
  const depositRows=document.querySelector('#depositRows');depositRows.replaceChildren();
  const depositMore=document.querySelector('#showDepositRows'),showAllDeposits=showAllDepositEntries&&result.rows.length>3;
  depositMore.classList.toggle('hidden',result.rows.length<=3);depositMore.setAttribute('aria-expanded',String(showAllDeposits));depositMore.textContent=showAllDeposits?'Pokaż mniej':`Pokaż więcej (${Math.max(0,result.rows.length-3)})`;
  if(!showAllDeposits)showAllDepositEntries=false;
  document.querySelector('#depositEmpty').classList.toggle('hidden',hasEntries);
  const depositStart=showAllDeposits?0:Math.max(0,result.rows.length-3);
  for(let index=depositStart;index<result.rows.length;index++) {
    const row=result.rows[index];
    const tr=document.createElement('tr');
    [analysisInputDate(row.date),money(row.deposit),money(row.cumulativeDeposits),money(row.balance),money(row.profit),row.positionProfit===undefined?'—':money(row.positionProfit),percent(row.returnRate),percent(row.inflation)].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});
    const actions=document.createElement('td'),edit=document.createElement('button'),remove=document.createElement('button');
    edit.type=remove.type='button';edit.className='edit';remove.className='delete';edit.innerHTML='<svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>';remove.innerHTML='<svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>';edit.dataset.editDeposit=index;remove.dataset.deleteDeposit=index;edit.setAttribute('aria-label',`Edytuj wpis ${row.date}`);remove.setAttribute('aria-label',`Usuń wpis ${row.date}`);edit.title='Edytuj';remove.title='Usuń';actions.append(edit,remove);tr.append(actions);depositRows.append(tr);
  }
  const quarterRows=document.querySelector('#quarterRows');quarterRows.replaceChildren();
  const quarterMore=document.querySelector('#showQuarterRows'),showAllQuarters=showAllQuarterRows&&result.quarters.length>3;
  quarterMore.classList.toggle('hidden',result.quarters.length<=3);quarterMore.setAttribute('aria-expanded',String(showAllQuarters));quarterMore.textContent=showAllQuarters?'Pokaż mniej':`Pokaż więcej (${Math.max(0,result.quarters.length-3)})`;
  if(!showAllQuarters)showAllQuarterRows=false;
  document.querySelector('#quarterEmpty').classList.toggle('hidden',result.quarters.length>0);
  const quarterStart=showAllQuarters?0:Math.max(0,result.quarters.length-3);
  for(const row of result.quarters.slice(quarterStart)) {
    const tr=document.createElement('tr');
    [row.key,money(row.deposit),money(row.cumulativeDeposits),money(row.balance),money(row.change),percent(row.returnRate)].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});
    const inflationCell=document.createElement('td'),inflationInput=document.createElement('input');inflationInput.type='text';inflationInput.inputMode='decimal';inflationInput.className='quarter-inflation';inflationInput.value=row.inflation===null?'':(row.inflation*100).toFixed(2);inflationInput.setAttribute('aria-label',`Inflacja r/r dla ${row.key}, procent`);inflationInput.dataset.quarter=row.key;inflationCell.append(inflationInput);tr.append(inflationCell);
    const adjusted=document.createElement('td');adjusted.textContent=row.depositsWithInflation===null?'—':money(row.depositsWithInflation);tr.append(adjusted);quarterRows.append(tr);
  }
  if(result.quarters.length) {
    const row=result.summary,tr=document.createElement('tr');tr.className='analysis-total';
    [ 'Razem / Średnia',money(row.deposit),money(row.cumulativeDeposits),row.balance===null?'—':money(row.balance),money(row.change),percent(row.returnRate),percent(row.inflation),row.depositsWithInflation===null?'—':money(row.depositsWithInflation) ].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});quarterRows.append(tr);
  }
  renderAnalysisChart('investmentChart','investmentChartEmpty',result.rows,[{className:'analysis-line-balance',values:result.rows.map(row=>row.balance),label:'Stan konta'},{className:'analysis-line-deposits',values:result.rows.map(row=>row.cumulativeDeposits),label:'Suma wpłat'}],false);
  renderAnalysisChart('returnsChart','returnsChartEmpty',result.rows,[{className:'analysis-line-return',values:result.rows.map(row=>row.returnRate),label:'Stopa zwrotu'},{className:'analysis-line-inflation',values:result.rows.map(row=>row.inflation),label:'Inflacja'}],true);
}
function renderAnalysisChart(svgId,emptyId,rows,series,asPercent) {
  const svg=document.querySelector(`#${svgId}`),empty=document.querySelector(`#${emptyId}`),values=series.flatMap(item=>item.values.filter(Number.isFinite));
  svg.replaceChildren();
  if(rows.length<1||!values.length){svg.classList.add('hidden');empty.classList.remove('hidden');return}
  svg.classList.remove('hidden');empty.classList.add('hidden');
  let low=Math.min(0,...values),high=Math.max(0,...values);if(low===high){low-=1;high+=1}const pad=(high-low)*.12;low-=pad;high+=pad;
  const left=130,right=740,top=22,bottom=210,x=index=>rows.length===1?(left+right)/2:left+(right-left)*index/(rows.length-1),y=value=>bottom-(value-low)/(high-low)*(bottom-top),format=asPercent?percent:money;
  let markup='';
  for(let index=0;index<3;index++){const value=high-(high-low)*index/2,pos=top+(bottom-top)*index/2;markup+=`<line class="history-grid" x1="${left}" y1="${pos}" x2="${right}" y2="${pos}"/><text class="history-label" text-anchor="end" x="112" y="${pos+4}">${format(value)}</text>`}
  for(const item of series){let segment=[];const flush=()=>{if(segment.length)markup+=`<polyline class="analysis-series ${item.className}" points="${segment.join(' ')}"/>`;segment=[]};item.values.forEach((value,index)=>{if(!Number.isFinite(value)){flush();return}const cx=x(index),cy=y(value);segment.push(`${cx},${cy}`);markup+=`<circle class="analysis-point ${item.className}" cx="${cx}" cy="${cy}" r="4"><title>${escapeHtml(rows[index].date)} · ${escapeHtml(item.label)}: ${format(value)}</title></circle>`});flush()}
  markup+=`<text class="history-label" x="${left}" y="244">${escapeHtml(rows[0].date)}</text><text class="history-label" text-anchor="end" x="${right}" y="244">${escapeHtml(rows.at(-1).date)}</text><text class="history-label" text-anchor="middle" x="420" y="258">Data</text><text class="history-label" text-anchor="middle" transform="translate(15 116) rotate(-90)">${asPercent?'Stopa (%)':'Kwota (zł)'}</text>`;svg.innerHTML=markup;
}
async function refreshInflation() {
  try {
    const response=await fetch('/api/inflation',{cache:'no-store'});
    if(!response.ok)throw Error('Inflation data unavailable');
    monthlyInflation=(await response.json()).inflation||{};
    document.querySelector('#inflationUnavailable').classList.toggle('hidden',Object.keys(monthlyInflation).length>0);
    if(!document.querySelector('#analysisView').classList.contains('hidden'))renderAnalysis();
  } catch {
    document.querySelector('#inflationUnavailable').classList.remove('hidden');
  }
}
async function refreshDividends(tickers=portfolio.map(holding=>holding.ticker)) {
  const symbols=[...new Set(tickers)].filter(ticker=>getCompany(ticker));
  if(!symbols.length)return;
  try {
    const response=await fetch(`/api/dividends?symbols=${encodeURIComponent(symbols.join(','))}`, {
      cache: 'no-store'
    });
    if(!response.ok)throw Error('Dividend data unavailable');
    const data=await response.json();
    let changed=false;
    for(const [ticker,dividendData] of Object.entries(data.dividends|| {
    })) {
      const company=getCompany(ticker);
      if(!company||!Number.isFinite(dividendData?.amount)||dividendData.amount<0)continue;
      const previousDividend=company.dividend;
      company.dividend=roundDividend(dividendData.amount);
      company.year=dividendData.year;
      company.dividendStatus=dividendData.status;
      company.dividendAsOf=dividendData.asOf;
      company.dividendSourceUrl=dividendData.sourceUrl;
      for(const holding of portfolio) {
        if(holding.ticker===ticker&&holding.year!=='własna') {
          holding.dividend=company.dividend;
          holding.year=dividendData.year;
        }
      }
      const selectedTicker=document.querySelector('#company')?.value;
      const dividendInput=document.querySelector('#dividend');
      if(selectedTicker===ticker&&Number(dividendInput.value)===previousDividend) {
        dividendInput.value=company.dividend.toFixed(2);
      }
      changed=true;
    }
    if(changed) {
      safeStorage.set('dividend-ike-portfolio',JSON.stringify(portfolio));
      render();
      if(document.querySelector('#modalback').open)options();
    }
  }
  catch {
    // Keep the most recently saved dividend values when the data source is unavailable.
  }
}
function logoMarkup(ticker,className) {
  const logo=window.companyLogos?.[ticker];
  return`<span class="${className}" aria-hidden="true">${logo?`<img src="${logo}" alt="" loading="lazy">`:`<span class="ticker-fallback">${ticker}</span>`}</span>`
}
function sortedPortfolio()  {
  const getCompanyName = (ticker) => getCompany(ticker)?.name || ticker;
  const getSortValue = (holding) =>  {
    const company = getCompany(holding.ticker);
    const price = prices[holding.ticker];
    const dividend = holding.dividend ?? company?.dividend ?? 0;
    const hasPrice = Number.isFinite(price) && price > 0;
    switch (portfolioSort.column)  {
      case 'shares': return holding.shares;
      case 'price': return hasPrice ? price : null;
      case 'value': return hasPrice ? holding.shares * price : null;
      case 'dividend': return dividend;
      case 'income': return holding.shares * dividend;
      case 'yield': return hasPrice ? dividend / price * 100 : null;
      default: return getCompanyName(holding.ticker);
    }
  };
  return [...portfolio].sort((left, right) =>  {
    const leftValue = getSortValue(left); const rightValue = getSortValue(right); const nameOrder = getCompanyName(left.ticker).localeCompare(getCompanyName(right.ticker), "pl"); if (leftValue === null || rightValue === null)  {
      if (leftValue === rightValue) return nameOrder; return leftValue === null ? 1 : -1;
    }
    const comparison = typeof leftValue === "string" ? leftValue.localeCompare(rightValue, "pl") : leftValue - rightValue; const direction = portfolioSort.direction === "asc" ? 1 : -1; return comparison * direction || nameOrder;
  });
}
function updatePortfolioSortIndicators()  {
  document.querySelectorAll(".table-sort").forEach((button) =>  {
    const isActive = button.dataset.sort === portfolioSort.column; const indicator = button.querySelector(".sort-indicator"); const header = button.closest("th"); indicator.textContent = portfolioSort.direction === "asc" ? "↑" : "↓"; indicator.classList.toggle("hidden", !isActive); header.setAttribute("aria-sort", isActive ? (portfolioSort.direction === "asc" ? "ascending" : "descending") : "none"); button.setAttribute("aria-label", `Sortuj według ${button.dataset.label} ${portfolioSort.direction === "asc" ? "rosnąco" : "malejąco"}`);
  });
}
function dividendStatusMarkup(holding, company) {
  if(holding.year==='własna')return '<span class="dividend-status custom">Własna</span>';
  if(company.distributes===false)return `<span class="dividend-status none">Brak wypłat</span><small class="dividend-note">${escapeHtml(company.distributionNote||'Dochód pozostaje w funduszu; jego wynik widać w kursie.')}</small>`;
  const label=company.dividendStatus==='approved'?`Zatwierdzona (${escapeHtml(company.year)})`:company.dividendStatus==='last-paid'?`Ostatnia wypłata (${escapeHtml(company.year)})`:'Domyślna (brak danych)';
  const source=typeof company.dividendSourceUrl==='string'&&/^https:\/\//i.test(company.dividendSourceUrl)?`<a href="${escapeHtml(company.dividendSourceUrl)}" target="_blank" rel="noreferrer">Źródło ↗</a>`:'';
  const asOf=company.dividendAsOf&&Number.isFinite(Date.parse(company.dividendAsOf))?`<small class="dividend-note">Dane z ${escapeHtml(new Date(company.dividendAsOf).toLocaleDateString('pl-PL'))}</small>`:'';
  return `<span class="dividend-status">${label}</span>${source}${asOf}`;
}
function render() {
  const rows=document.querySelector('#rows');
  rows.innerHTML='';
  document.querySelector('#count').textContent=`(${portfolio.length})`;
  document.querySelector('#empty').classList.toggle('hidden',portfolio.length>0);
  const totals=AppCore.summarizePortfolio(portfolio,prices,Object.fromEntries(companies.map(company=>[company.ticker,company])));
  for(const holding of sortedPortfolio()) {
    const c=getCompany(holding.ticker);
    if(!c)continue;
    const row=document.createElement('tr');
    const price=prices[c.ticker];
    const dividend=holding.dividend??c.dividend;
    const calculations=AppCore.calculateHolding(holding.shares,price,dividend),
    income=calculations.income,
    yieldRate=calculations.yieldRate,
    warning=yieldRate>10?'<button type="button" class="yield-warning" aria-label="Uwaga: stopa dywidendy powyżej 10%. Może to być pułapka dywidendowa." data-tooltip="Stopa dywidendy przekracza 10%. Może wynikać z jednorazowej wypłaty, problemów spółki lub spadku kursu. Sprawdź, czy dywidenda jest trwała.">!</button>': '';
    const priceTitle=priceTimes[c.ticker]?`Ostatnie notowanie: ${new Date(priceTimes[c.ticker]).toLocaleString('pl-PL')}`:'Brak czasu notowania';
    const dividendAmount=c.distributes===false&&holding.year!=='własna'?'—':`${roundDividend(dividend).toLocaleString('pl-PL',{minimumFractionDigits:2,maximumFractionDigits:2})} zł`;
    row.innerHTML=`
      <td><div class="company">${logoMarkup(c.ticker,'ticker')}<span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.sector)}</small></span></div></td>
      <td class="num" data-label="Jednostki">${escapeHtml(holding.shares.toLocaleString('pl-PL',{maximumFractionDigits:6}))}</td>
      <td class="num" data-label="Kurs" title="${escapeHtml(priceTitle)}">${price?money(price):'—'}</td>
      <td class="num" data-label="Wartość">${price?money(holding.shares*price):'—'}</td>
      <td class="num" data-label="Dywidenda / akcję">${dividendAmount}${dividendStatusMarkup(holding,c)}</td>
      <td class="num" data-label="Rocznie">${money(income)}</td>
      <td class="yield" data-label="Stopa">${yieldRate!=null?yieldRate.toFixed(2).replace('.',',')+'%'+warning:'—'}</td>
      <td><button type="button" class="edit" aria-label="Edytuj pozycję ${escapeHtml(c.name)}" title="Edytuj" data-edit="${escapeHtml(c.ticker)}"><svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg></button> <button type="button" class="delete" aria-label="Usuń ${escapeHtml(c.name)}" title="Usuń" data-delete="${escapeHtml(c.ticker)}"><svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg></button></td>`;
    rows.append(row)
  }
  document.querySelector('#annual').textContent=money(totals.annual);
  document.querySelector('#taxSavings').textContent=money(totals.annual*.19);
  document.querySelector('#value').textContent=totals.value?money(totals.value): '—';
  document.querySelector('#value-sub').textContent=totals.value?'Na podstawie ostatnich pobranych kursów': 'Dodaj liczbę akcji i sprawdź kurs';
  document.querySelector('#yield').textContent=totals.value?`${(totals.annual/totals.value*100).toFixed(2).replace('.',',')}%`: '—';
  renderSectorChart();
  renderStats();
  safeStorage.set('dividend-ike-portfolio',JSON.stringify(portfolio));
}
function recordActivity(action,ticker,shares,valueChange=null) {
  portfolioActivity.unshift( {
    at: new Date().toISOString(),action,ticker,shares,valueChange:Number.isFinite(valueChange)?roundMoney(valueChange):null
  });
  portfolioActivity=portfolioActivity.slice(0,500);
  safeStorage.set('dividend-ike-activity',JSON.stringify(portfolioActivity))
}
function saveHistorySnapshot(allowEmpty=false) {
  const active=portfolio.filter(h=>h.shares>0);
  if(!active.length&&!allowEmpty)return;
  if(active.some(h=>!Number.isFinite(prices[h.ticker])||prices[h.ticker]<=0))return;
  const value=active.reduce((sum,h)=>sum+h.shares*prices[h.ticker],0),
  annualIncome=portfolio.reduce((sum,h)=>sum+h.shares*(h.dividend??getCompany(h.ticker)?.dividend??0),0),
  now=new Date(),
  dateKey=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`,
  snapshot= {
    at: now.toISOString(),
    dateKey,
    value,
    annualIncome
  },
  sameDay=portfolioHistory.findIndex(item=>item.dateKey===dateKey);
  if(sameDay>=0)portfolioHistory[sameDay]=snapshot;
  else portfolioHistory.push(snapshot);
  portfolioHistory=portfolioHistory.sort((a,b)=>a.at.localeCompare(b.at)).slice(-400);
  safeStorage.set('dividend-ike-history',JSON.stringify(portfolioHistory))
}
function renderStats() {
  const currentValue=portfolio.reduce((sum,h)=>sum+(Number.isFinite(prices[h.ticker])&&prices[h.ticker]>0?h.shares*prices[h.ticker]: 0),0),
  annualIncome=portfolio.reduce((sum,h)=>sum+h.shares*(h.dividend??getCompany(h.ticker)?.dividend??0),0),
  active=portfolio.filter(h=>h.shares>0),
  complete=active.every(h=>Number.isFinite(prices[h.ticker])&&prices[h.ticker]>0);
  document.querySelector('#statsValue').textContent=currentValue?money(currentValue): '—';
  document.querySelector('#statsDividend').textContent=money(annualIncome);
  document.querySelector('#statsYield').textContent=complete&&currentValue?`${(annualIncome/currentValue*100).toFixed(2).replace('.',',')}%`: '—';
  document.querySelector('#statsDividendNote').textContent='Aktualny szacunek z ostatnich znanych wypłat';
  const days= {
    week: 7,
    month: 30,
    year: 365
  }
  [statsPeriod],
  cutoff=Date.now()-days*86400000,
  points=portfolioHistory.filter(item=>Date.parse(item.at)>=cutoff),
  first=points[0],
  last=points.at(-1),
  delta=first&&complete?currentValue-first.value: null;
  document.querySelector('#statsChange').textContent=delta==null?'—': `${delta>0?'+':''}${money(delta)}`;
  document.querySelector('#statsChangeNote').textContent=delta==null?'Historia tego okresu dopiero się zbiera': `${first.value?((delta/first.value)*100).toFixed(2).replace('.',',')+'%':'—'} od ${new Date(first.at).toLocaleDateString('pl-PL')}`;
  document.querySelector('#periodStartValue').textContent=first?money(first.value): '—';
  document.querySelector('#periodEndValue').textContent=currentValue?money(currentValue): '—';
  document.querySelector('#historyEmpty').classList.toggle('hidden',points.length>0);
  document.querySelector('#historyChart').classList.toggle('hidden',!points.length);
  document.querySelector('#historyEmpty').textContent=active.length?'Historia wartości zacznie się po pobraniu kursów i zapisze pierwszy punkt.': 'Dodaj pozycje z liczbą akcji większą od zera; od tego momentu zacznę zapisywać historię.';
  if(points.length)renderHistoryChart(points);
  document.querySelector('#activityCount').textContent=`(${Math.min(3,portfolioActivity.length)}${portfolioActivity.length>3?` z ${portfolioActivity.length}`:''})`;
  document.querySelector('#activityEmpty').classList.toggle('hidden',portfolioActivity.length>0);
  document.querySelector('#activityList').innerHTML=portfolioActivity.length?portfolioActivity.slice(0,3).map(item=>`<li><span>${escapeHtml(item.action)}: ${escapeHtml(getCompany(item.ticker)?.name||item.ticker)}<small>${Number(item.shares).toLocaleString('pl-PL',{maximumFractionDigits:6})} jednostek · Zmiana wartości portfela: ${Number.isFinite(item.valueChange)?`${item.valueChange>0?'+':''}${money(item.valueChange)}`:'brak danych'}</small></span><time datetime="${escapeHtml(item.at)}">${escapeHtml(new Date(item.at).toLocaleString('pl-PL'))}</time></li>`).join(''): '';
  document.querySelector('.period-tabs').dataset.active=statsPeriod;
  document.querySelectorAll('.period-tab').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.period===statsPeriod)));
}
function renderHistoryChart(points) {
  const svg=document.querySelector('#historyChart'),
  width=760,
  left=105,
  right=740,
  top=22,
  bottom=177,
  values=points.map(item=>item.value),
  min=Math.min(...values),
  max=Math.max(...values),
  pad=Math.max((max-min)*.15,max*.025,1),
  low=min-pad,
  high=max+pad,
  x=i=>points.length===1?(left+right)/2: left+(right-left)*i/(points.length-1),
  y=value=>bottom-(value-low)/(high-low)*(bottom-top),
  coords=points.map((item,i)=>`${x(i)},${y(item.value)}`).join(' '),
  grid=[0,
  1,
  2].map(i=> {
    const value=high-(high-low)*i/2,pos=top+(bottom-top)*i/2;return`<line class="history-grid" x1="${left}" y1="${pos}" x2="${right}" y2="${pos}"/><text class="history-label" x="0" y="${pos+4}">${money(value)}</text>`
  }).join(''),
  dots=points.map((item,i)=>`<circle class="history-point" cx="${x(i)}" cy="${y(item.value)}" r="5"><title>${escapeHtml(new Date(item.at).toLocaleString('pl-PL'))}: ${money(item.value)}</title></circle>`).join(''),
  start=escapeHtml(new Date(points[0].at).toLocaleDateString('pl-PL')),
  end=escapeHtml(new Date(points.at(-1).at).toLocaleDateString('pl-PL'));
  svg.innerHTML=`${grid}<polyline class="history-line" points="${coords}"/>${dots}<text class="history-label" x="${left}" y="207">${start}</text><text class="history-label" text-anchor="end" x="${right}" y="207">${end}</text>`;
  document.querySelector('#statsChangeNote').textContent=firstSnapshotNote(points)
}
function firstSnapshotNote(points) {
  if(points.length<2)return'Potrzebne są co najmniej dwa zapisy, aby policzyć zmianę';
  const change=points.at(-1).value-points[0].value,
  pct=points[0].value?(change/points[0].value)*100: 0;
  return`${change>0?'+':''}${pct.toFixed(2).replace('.',',')}% · ${points.length} zapisów w okresie`
}
function renderSectorChart() {
  const values=new Map();
  let unpriced=false;
  for(const holding of portfolio) {
    if(holding.shares<=0)continue;
    const company=getCompany(holding.ticker),
    price=prices[holding.ticker];
    if(!company)continue;
    if(!Number.isFinite(price)||price<=0) {
      unpriced=true;
      continue
    }
    values.set(company.sector,(values.get(company.sector)||0)+holding.shares*price)
  }
  const entries=[...values].sort(([a],[b])=>a.localeCompare(b,'pl')),
  total=entries.reduce((sum,[,value])=>sum+value,0),
  svg=document.querySelector('#sectorChart'),
  legend=document.querySelector('#sectorLegend'),
  empty=document.querySelector('#sectorEmpty');
  document.querySelector('#sectorPartial').classList.toggle('hidden',!unpriced);
  empty.classList.toggle('hidden',Boolean(total));
  legend.innerHTML='';
  if(!total) {
    svg.innerHTML='<circle cx="160" cy="160" r="125" fill="var(--surface-2)"/><circle class="sector-hole" cx="160" cy="160" r="70"/>';
    svg.classList.add('hidden');
    return
  }
  svg.classList.remove('hidden');
  const radius=100,
  circumference=2*Math.PI*radius,
  palette=['--chart-1','--chart-2','--chart-3','--chart-4','--chart-5','--chart-6','--chart-7','--chart-8','--chart-9','--chart-10'],
  colors=entries.map((_,i)=>palette[i%palette.length]);
  let offset=0;
  const slices=entries.map(([sector,value],i)=> {
    const fraction=value/total,share=fraction*100,length=fraction*circumference,start=offset/circumference*360-90;offset+=length;return`<circle class="sector-slice" cx="160" cy="160" r="${radius}" fill="none" stroke="var(${colors[i]})" stroke-width="76" stroke-dasharray="${length} ${circumference-length}" transform="rotate(${start} 160 160)" data-sector="${escapeHtml(sector)}" data-share="${share.toLocaleString('pl-PL',{maximumFractionDigits:1})}%" data-value="${value}" data-color="${colors[i]}" tabindex="0" role="img" aria-label="${escapeHtml(sector)}: ${share.toLocaleString('pl-PL',{maximumFractionDigits:1})}%, ${money(value)}"></circle>`
  }).join('');
  svg.innerHTML=`${slices}<circle class="sector-hole" cx="160" cy="160" r="61"/>`;
  svg.setAttribute('aria-label','Alokacja portfela według sektorów spółek i grup ETF-ów');
  legend.innerHTML=entries.map(([sector],i)=>`<li><span class="sector-dot" style="background:var(${colors[i]})"></span><span>${escapeHtml(sector)}</span></li>`).join('')
}
const sectorTooltip=document.querySelector('#sectorTooltip'),
sectorChart=document.querySelector('#sectorChart');
let activeSectorTarget=null;
function showSectorTooltip(target,event) {
  if(activeSectorTarget&&activeSectorTarget!==target)activeSectorTarget.removeAttribute('aria-describedby');
  activeSectorTarget=target;
  sectorTooltip.replaceChildren();
  const dot=document.createElement('i');
  dot.className='sector-tooltip-dot';
  dot.style.background=getComputedStyle(target).stroke;
  const copy=document.createElement('div'),
  name=document.createElement('strong'),
  detail=document.createElement('span');
  name.textContent=target.dataset.sector;
  detail.textContent=`${target.dataset.share} · ${money(Number(target.dataset.value))}`;
  copy.append(name,detail);
  sectorTooltip.append(dot,copy);
  sectorTooltip.classList.remove('hidden');
  target.setAttribute('aria-describedby','sectorTooltip');
  const rect=target.getBoundingClientRect(),
  x=event?.clientX||rect.left+rect.width/2,
  y=event?.clientY||rect.top+rect.height/2,
  left=Math.max(10,Math.min(innerWidth-sectorTooltip.offsetWidth-10,x-sectorTooltip.offsetWidth/2)),
  top=y>sectorTooltip.offsetHeight+14?y-sectorTooltip.offsetHeight-12: y+14;
  sectorTooltip.style.left=`${left}px`;
  sectorTooltip.style.top=`${Math.max(10,Math.min(innerHeight-sectorTooltip.offsetHeight-10,top))}px`
}
function hideSectorTooltip(target) {
  target?.removeAttribute('aria-describedby');
  sectorTooltip.classList.add('hidden');activeSectorTarget=null
}
sectorChart.addEventListener('pointerover',e=> {
  const slice=e.target.closest('.sector-slice');if(slice)showSectorTooltip(slice,e)
});
sectorChart.addEventListener('pointerout',e=> {
  const slice=e.target.closest('.sector-slice');if(slice&&e.pointerType!=='touch'&&slice!==document.activeElement&&!slice.contains(e.relatedTarget))hideSectorTooltip(slice)
});
sectorChart.addEventListener('focusin',e=> {
  const slice=e.target.closest('.sector-slice');if(slice)showSectorTooltip(slice)
});
sectorChart.addEventListener('focusout',e=> {
  const slice=e.target.closest('.sector-slice');if(slice)hideSectorTooltip(slice)
});
function updateSortDirection() {
  const button=document.querySelector('#sortDirection'),
  label=sortDirection==='asc'?'Sortuj rosnąco': 'Sortuj malejąco';
  button.setAttribute('aria-label',label);
  button.title=label;
  button.setAttribute('aria-pressed',String(sortDirection==='desc'))
}
function options() {
  const query=document.querySelector('#companySearch').value.trim().toLocaleLowerCase('pl-PL'),
  field=document.querySelector('#companySort').value,
  direction=sortDirection;
  const list=document.querySelector('#companyList');
  const filtered=companies.filter(c=>(assetFilter==='etf'?c.assetType==='etf':c.assetType!=='etf')&&`${c.name} ${c.ticker}`.toLocaleLowerCase('pl-PL').includes(query));
  filtered.sort((a,b)=> {
    if(field==='name')return direction==='asc'?a.name.localeCompare(b.name,'pl'): b.name.localeCompare(a.name,'pl');const av=field==='price'?prices[a.ticker]: a.dividend,bv=field==='price'?prices[b.ticker]: b.dividend;if(av==null)return bv==null?a.name.localeCompare(b.name,'pl'): 1;if(bv==null)return-1;return direction==='asc'?av-bv: bv-av
  });
  list.innerHTML=filtered.length?filtered.map(c=>`<button type="button" class="company-option" id="option-${escapeHtml(c.ticker)}" role="option" aria-selected="${document.querySelector('#company').value===c.ticker}" tabindex="-1" data-company="${escapeHtml(c.ticker)}" title="${escapeHtml(priceTimes[c.ticker]?`Ostatnie notowanie: ${new Date(priceTimes[c.ticker]).toLocaleString('pl-PL')}`:'Brak czasu notowania')}">${logoMarkup(c.ticker,'picker-logo')}<span class="option-name">${escapeHtml(c.name)}</span><span class="option-price">${prices[c.ticker]?money(prices[c.ticker]):'—'}</span></button>`).join(''): '<div class="picker-empty">Nie znaleziono instrumentów.</div>'
}
function setCompany(ticker) {
  const company=getCompany(ticker);
  if(!company)return;
  document.querySelector('#company').value=ticker;
  document.querySelector('#selectedCompany').textContent=company.name;
  document.querySelector('#selectedPrice').textContent=prices[ticker]?money(prices[ticker]): '—';
  document.querySelector('#companyOptions').querySelectorAll('[role="option"]').forEach(option=>option.setAttribute('aria-selected',String(option.dataset.company===ticker)));
  document.querySelector('#companyTrigger').setAttribute('aria-activedescendant',`option-${ticker}`)
}
function togglePicker(open) {
  const trigger=document.querySelector('#companyTrigger'),
  list=document.querySelector('#companyOptions'),
  modal=document.querySelector('.modal');
  const expanded=open??trigger.getAttribute('aria-expanded')!=='true';
  trigger.setAttribute('aria-expanded',String(expanded));
  list.classList.toggle('hidden',!expanded);
  modal.classList.toggle('picker-open',expanded);
  if(expanded){document.querySelector('#companySearch').focus();refreshPrices(false,true)}
}
function openForm(ticker=null) {
  formOpener=document.activeElement;
  editTicker=ticker;
  document.querySelector('#companySearch').value='';
  document.querySelector('#companySort').value='name';
  assetFilter=getCompany(ticker)?.assetType==='etf'?'etf':'stock';
  document.querySelectorAll('[data-asset-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.assetFilter===assetFilter)));
  sortDirection='asc';
  updateSortDirection();
  options();
  const h=ticker&&portfolio.find(x=>x.ticker===ticker);
  document.querySelector('#formTitle').textContent=h?'Edytuj pozycję': 'Dodaj pozycję';
  const company=ticker||companies.find(c=>!portfolio.some(p=>p.ticker===c.ticker))?.ticker||companies[0].ticker;
  document.querySelector('#companyTrigger').disabled=!!h;
  document.querySelector('#shares').value=h?.shares??'';
  document.querySelector('#dividend').value=h?.dividend??getCompany(company).dividend;
  setCompany(company);
  togglePicker(false);
  document.querySelector('#modalback').showModal();
  document.querySelector('#shares').focus()
}
function closeForm() {
  const dialog=document.querySelector('#modalback');
  if(dialog.open)dialog.close();
  togglePicker(false);
  document.querySelector('#companyTrigger').disabled=false;
  (formOpener?.isConnected?formOpener:document.querySelector('#add'))?.focus();
  formOpener=null
}
document.querySelector('#companyTrigger').addEventListener('click',()=>togglePicker());
document.querySelector('#companySearch').addEventListener('input',options);
document.querySelector('#companySort').addEventListener('change',options);
document.querySelectorAll('[data-asset-filter]').forEach(button=>button.addEventListener('click',()=>{
  assetFilter=button.dataset.assetFilter;
  document.querySelectorAll('[data-asset-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  options();
}));
document.querySelector('#sortDirection').addEventListener('click',()=> {
  sortDirection=sortDirection==='asc'?'desc': 'asc';updateSortDirection();options()
});
document.querySelector('#companyOptions').addEventListener('click',e=> {
  const option=e.target.closest('[data-company]');if(!option)return;setCompany(option.dataset.company);document.querySelector('#dividend').value=roundDividend(getCompany(option.dataset.company).dividend).toFixed(2);togglePicker(false);document.querySelector('#companyTrigger').focus();refreshDividends([option.dataset.company])
});
document.querySelectorAll('#shares,#dividend').forEach(input=>input.addEventListener('input',()=>input.setCustomValidity('')));
document.querySelector('#dividend').addEventListener('change',event=>{
  const value=AppCore.parseDecimal(event.target.value);
  if(Number.isFinite(value)&&value>=0)event.target.value=roundDividend(value).toFixed(2);
});
document.querySelector('#companyTrigger').addEventListener('keydown',e=> {
  if(e.key==='ArrowDown'||e.key==='Enter'||e.key===' ') {
    e.preventDefault();togglePicker(true)
  }
});
document.querySelector('#companyOptions').addEventListener('keydown',e=> {
  if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();const options=[...document.querySelectorAll('#companyOptions [role="option"]')],index=options.indexOf(document.activeElement);if(!options.length)return;const next=e.key==='Home'?0: e.key==='End'?options.length-1: (index+(e.key==='ArrowDown'?1: -1)+options.length)%options.length;options[next].focus()
});
document.querySelector('#form').addEventListener('submit',e=> {
  e.preventDefault();const sharesInput=document.querySelector('#shares'),dividendInput=document.querySelector('#dividend'),ticker=editTicker||document.querySelector('#company').value,company=getCompany(ticker),shares=AppCore.parseDecimal(sharesInput.value),rawDividend=AppCore.parseDecimal(dividendInput.value);for(const [input,value] of [[sharesInput,shares],[dividendInput,rawDividend]])input.setCustomValidity(Number.isFinite(value)&&value>=0?'':'Wpisz nieujemną liczbę, używając przecinka lub kropki.');if(!e.currentTarget.reportValidity())return;const dividend=roundDividend(rawDividend);dividendInput.value=dividend.toFixed(2);const holding=portfolio.find(x=>x.ticker===ticker),action=holding?'Zaktualizowano pozycję': 'Dodano pozycję',valueChange=Number.isFinite(prices[ticker])?(shares-(holding?.shares??0))*prices[ticker]:null;if(holding) {
    holding.shares=shares;holding.dividend=dividend;holding.year=dividend===company.dividend?company.year: 'własna'
  }
  else portfolio.push( {
    ticker,shares,dividend,year: dividend===company.dividend?company.year: 'własna'
  });recordActivity(action,ticker,shares,valueChange);saveHistorySnapshot(true);closeForm();render();refreshPrices()
});
document.querySelector('#rows').closest('table').querySelector('thead').addEventListener('click', (event) =>  {
  const button = event.target.closest('.table-sort'); if (!button) return; if (portfolioSort.column === button.dataset.sort)  {
    portfolioSort.direction = portfolioSort.direction === 'asc' ? 'desc' : 'asc';
  }
  else  {
    portfolioSort =  {
      column: button.dataset.sort, direction: 'asc'
    };
  }
  updatePortfolioSortIndicators(); render();
});
document.querySelector('#add').onclick=()=>openForm();
document.querySelector('#cancel').onclick=closeForm;
document.querySelector('#close-modal').onclick=closeForm;
document.querySelector('#modalback').addEventListener('click',e=> { if(e.target===e.currentTarget)closeForm() });
document.querySelector('#modalback').addEventListener('cancel',closeForm);
document.querySelector('#form').addEventListener('click',e=> {
  if(!e.target.closest('#companyPicker')&&document.querySelector('#companyTrigger').getAttribute('aria-expanded')==='true')togglePicker(false)
});
document.addEventListener('keydown',e=> {
  if(e.key==='Escape') {
    const yieldButton=document.querySelector('[aria-describedby="yieldTooltip"]');
    if(yieldButton){hideYieldTooltip(yieldButton);yieldButton.focus();return}
    if(!sectorTooltip.classList.contains('hidden')){const target=activeSectorTarget;hideSectorTooltip(target);target?.focus();return}
    if(document.activeElement.matches('.analysis-cards [data-help]'))document.activeElement.blur();
  }
  const modalOpen=document.querySelector('#modalback').open,dialogOpen=document.querySelector('#settingsDialog').open||document.querySelector('#depositDialog').open,isShortcut=(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k',isSearchShortcut=e.key==='/'&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!e.target.closest('input,textarea,select,[contenteditable="true"]');
  if((isShortcut||isSearchShortcut)&&!modalOpen&&!dialogOpen) {
    e.preventDefault();openForm();togglePicker(true);return
  }
});
let activeYieldTooltip=null;
function showYieldTooltip(button) {
  activeYieldTooltip?.remove();
  const tooltip=document.createElement('div');
  tooltip.className='yield-tooltip';
  tooltip.id='yieldTooltip';
  tooltip.setAttribute('role','tooltip');
  tooltip.textContent=button.dataset.tooltip;
  document.body.append(tooltip);
  const rect=button.getBoundingClientRect(),
  tip=tooltip.getBoundingClientRect(),
  left=Math.max(10,Math.min(innerWidth-tip.width-10,rect.left+rect.width/2-tip.width/2)),
  top=rect.top>=tip.height+12?rect.top-tip.height-10: Math.min(innerHeight-tip.height-10,rect.bottom+10);
  tooltip.style.left=`${left}px`;
  tooltip.style.top=`${Math.max(10,top)}px`;
  button.setAttribute('aria-describedby',tooltip.id);
  activeYieldTooltip=tooltip
}
function hideYieldTooltip(button) {
  if(!button)return;
  button.removeAttribute('aria-describedby');
  activeYieldTooltip?.remove();
  activeYieldTooltip=null
}
document.querySelector('#rows').addEventListener('pointerover',e=> {
  const button=e.target.closest('.yield-warning');if(button)showYieldTooltip(button)
});
document.querySelector('#rows').addEventListener('pointerout',e=> {
  const button=e.target.closest('.yield-warning');if(button&&e.pointerType!=='touch'&&button!==document.activeElement&&!button.contains(e.relatedTarget))hideYieldTooltip(button)
});
document.querySelector('#rows').addEventListener('focusin',e=> {
  const button=e.target.closest('.yield-warning');if(button)showYieldTooltip(button)
});
document.querySelector('#rows').addEventListener('focusout',e=> {
  const button=e.target.closest('.yield-warning');if(button)hideYieldTooltip(button)
});
document.querySelector('#rows').addEventListener('click', (event) =>  {
  const button = event.target.closest('[data-edit], [data-delete]'); if (!button) return; const ticker = button.dataset.edit || button.dataset.delete; if (button.dataset.edit)  {
    openForm(ticker); return;
  }
  confirmAction('Usunąć pozycję?', `Pozycja ${getCompany(ticker)?.name||ticker} zostanie usunięta z portfela.`, 'Usuń pozycję', true).then(confirmed=>{
    if(!confirmed)return;
    const holding=portfolio.find(item=>item.ticker===ticker),valueChange=Number.isFinite(prices[ticker])?-(holding?.shares||0)*prices[ticker]:null;
    recordActivity('Usunięto pozycję',ticker,holding?.shares||0,valueChange);portfolio=portfolio.filter(item=>item.ticker!==ticker);saveHistorySnapshot(true);render();document.querySelector('#add').focus();
  });
});
function setView(view) {
  const stats=view==='stats'||view==='analysis';
  document.querySelector('#portfolioView').classList.toggle('hidden',stats);
  document.querySelector('#statsView').classList.toggle('hidden',!stats);
  document.querySelector('#portfolioTab').setAttribute('aria-selected',String(!stats));
  document.querySelector('#statsTab').setAttribute('aria-selected',String(stats));
  document.querySelector('#portfolioTab').tabIndex=stats?-1:0;
  document.querySelector('#statsTab').tabIndex=stats?0:-1;
  if(stats){renderStats();renderAnalysis()}
}
const themeToggle=document.querySelector('#themeToggle');
const savedTheme=safeStorage.get('dividend-ike-theme');
let darkMode=savedTheme==='dark'||savedTheme===null&&matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(dark) {
  darkMode=dark;
  document.body.classList.toggle('dark-mode',dark);
  themeToggle.setAttribute('aria-checked',String(dark));
  themeToggle.title=dark?'Włącz tryb jasny': 'Włącz tryb ciemny';
  safeStorage.set('dividend-ike-theme',dark?'dark': 'light')
}
setTheme(darkMode);
themeToggle.addEventListener('click',()=>setTheme(!darkMode));
document.querySelector('#portfolioTab').addEventListener('click',()=>setView('portfolio'));
document.querySelector('#statsTab').addEventListener('click',()=>setView('stats'));
document.querySelector('.view-tabs').addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();const tabs=[...document.querySelectorAll('.view-tab')],index=tabs.indexOf(document.activeElement),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  tabs[next].focus();tabs[next].click()
});
document.querySelector('.period-tabs').addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();const tabs=[...document.querySelectorAll('.period-tab')],index=tabs.indexOf(document.activeElement),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  tabs[next].focus();tabs[next].click()
});
window.addEventListener('scroll',()=>document.body.classList.toggle('scrolled',window.scrollY>24),{passive:true});
document.querySelector('#startTour').setAttribute('aria-keyshortcuts','F1');
document.querySelector('#startTour').addEventListener('click',()=>window.AppTutorial?.start({setView}));
document.addEventListener('keydown',event=>{
  if(event.key==='F1'&&!event.target.closest('input,textarea,select,[contenteditable="true"]')){event.preventDefault();window.AppTutorial?.start({setView})}
});
const depositDialog=document.querySelector('#depositDialog'),depositForm=document.querySelector('#depositForm');
let editingDepositIndex=null;
function openDepositForm(index=null) {
  editingDepositIndex=index;
  const currentValue=portfolio.reduce((sum,item)=>sum+(Number.isFinite(prices[item.ticker])&&prices[item.ticker]>0?item.shares*prices[item.ticker]:0),0);
  document.querySelector('#depositFormTitle').textContent=index===null?'Dodaj wpis':'Edytuj wpis';
  document.querySelector('#depositDate').value=index===null?new Date().toISOString().slice(0,10):analysisEntries[index].date;
  document.querySelector('#depositBalance').value=roundMoney(index===null?currentValue:analysisEntries[index].balance).toFixed(2);
  document.querySelector('#depositAmount').value=index===null?'':roundMoney(analysisEntries[index].deposit).toFixed(2);
  document.querySelector('#depositProfit').value=index===null||analysisEntries[index].positionProfit===undefined?'':roundMoney(analysisEntries[index].positionProfit).toFixed(2);
  depositDialog.showModal();
}
document.querySelector('#addDeposit').addEventListener('click',()=>openDepositForm());
['#depositAmount','#depositBalance','#depositProfit'].forEach(selector=>document.querySelector(selector).addEventListener('input',event=>event.currentTarget.setCustomValidity('')));
['#depositAmount','#depositBalance','#depositProfit'].forEach(selector=>document.querySelector(selector).addEventListener('change',event=>{
  const value=AppCore.parseDecimal(event.currentTarget.value);if(Number.isFinite(value))event.currentTarget.value=roundMoney(value).toFixed(2);
}));
document.querySelector('#closeDeposit').addEventListener('click',()=>depositDialog.close());
document.querySelector('#cancelDeposit').addEventListener('click',()=>depositDialog.close());
depositForm.addEventListener('submit',event=>{
  event.preventDefault();
  const profitInput=document.querySelector('#depositProfit'),amountInput=document.querySelector('#depositAmount'),balanceInput=document.querySelector('#depositBalance'),entry={date:document.querySelector('#depositDate').value,deposit:roundMoney(AppCore.parseDecimal(amountInput.value)),balance:roundMoney(AppCore.parseDecimal(balanceInput.value)),...(profitInput.value===''?{}:{positionProfit:roundMoney(AppCore.parseDecimal(profitInput.value))})};
  for(const input of [amountInput,balanceInput,profitInput])input.setCustomValidity(input.value===''&&input===profitInput||Number.isFinite(AppCore.parseDecimal(input.value))?'':'Wpisz poprawną liczbę, używając przecinka lub kropki.');if(!depositForm.reportValidity())return;
  if(!DividendAnalysis.validEntry(entry)){toast('Wpisz poprawną datę oraz kwoty nieujemne i skończone.');return}
  if(editingDepositIndex===null&&analysisEntries.length>=DividendAnalysis.MAX_ENTRIES){toast('Możesz zapisać maksymalnie 400 wpisów.');return}
  const entries=[...analysisEntries];if(editingDepositIndex===null)entries.push(entry);else entries[editingDepositIndex]=entry;
  analysisEntries=DividendAnalysis.normalizeEntries(entries);saveAnalysisStorage();depositDialog.close();renderAnalysis();
});
document.querySelector('#depositRows').addEventListener('click',event=>{
  const button=event.target.closest('[data-edit-deposit], [data-delete-deposit]');if(!button)return;
  const index=Number(button.dataset.editDeposit??button.dataset.deleteDeposit);if(!Number.isInteger(index)||index<0||index>=analysisEntries.length)return;
  if(button.hasAttribute('data-edit-deposit')){openDepositForm(index);return}
  analysisEntries.splice(index,1);saveAnalysisStorage();renderAnalysis();
});
document.querySelector('#showDepositRows').addEventListener('click',()=>{showAllDepositEntries=!showAllDepositEntries;renderAnalysis()});
document.querySelector('#showQuarterRows').addEventListener('click',()=>{showAllQuarterRows=!showAllQuarterRows;renderAnalysis()});
document.querySelector('#quarterRows').addEventListener('change',event=>{
  const input=event.target.closest('[data-quarter]');if(!input||!/^\d{4}-Q[1-4]$/.test(input.dataset.quarter))return;const value=input.value===''?null:roundMoney(AppCore.parseDecimal(input.value))/100;
  if(value!==null&&(!Number.isFinite(value)||value< -1||value>10)){toast('Inflacja musi mieścić się w zakresie od −100% do 1000%.');renderAnalysis();return}
  if(value===null)delete analysisInflation[input.dataset.quarter];else analysisInflation[input.dataset.quarter]=value;
  saveAnalysisStorage();renderAnalysis();
});
document.querySelectorAll('.period-tab').forEach(button=>button.addEventListener('click',()=> {
  statsPeriod=button.dataset.period;renderStats()
}));
function setMarketStatus(status,state,message) {
  const changed=state!=='loading'&&state!==status.dataset.announcedState;
  status.setAttribute('aria-live',changed?'polite':'off');
  status.textContent=message;
  if(changed)status.dataset.announcedState=state
}
async function refreshPrices(showToast=false,allCompanies=false) {
  if(!allCompanies&&!portfolio.length)return;
  const button=document.querySelector('#refresh'),
  status=document.querySelector('#dataStatus');
  button.disabled=true;
  status.classList.add('is-loading');
  button.textContent='Pobieram…';
  if(!allCompanies)setMarketStatus(status,'loading','Pobieram kursy GPW…');
  let updated=0,latestQuoteTime=0;
  try {
    const symbols=allCompanies?[]:portfolio.map(holding=>holding.ticker);
    const endpoint=allCompanies?'/api/quotes':`/api/quotes?symbols=${encodeURIComponent(symbols.join(','))}`;
    const response=await fetch(endpoint, {
      cache: 'no-store'
    });
    if(!response.ok)throw Error();
    const data=await response.json();
    for(const c of companies) {
      const quote=data.quotes?.[c.ticker];
      if(quote?.currency==='PLN'&&Number.isFinite(quote.price)&&quote.price>0) {
        prices[c.ticker]=quote.price;
        priceTimes[c.ticker]=quote.asOf||data.updatedAt;
        latestQuoteTime=Math.max(latestQuoteTime,Date.parse(priceTimes[c.ticker])||0);
        updated++
      }
    }
    const staleQuote=Object.values(data.quotes||{}).find(quote=>quote?.stale),marketOpen=AppCore.isMarketOpen(portfolio.map(holding=>getCompany(holding.ticker)?.quoteSymbol).filter(Boolean));
    const savedQuoteTime=Math.max(0,...portfolio.map(holding=>Date.parse(priceTimes[holding.ticker])||0)),quoteTime=latestQuoteTime||savedQuoteTime;
    const quoteLabel=quoteTime?`Ostatnie notowanie ${new Date(quoteTime).toLocaleString('pl-PL',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})}`:'Brak zapisanych kursów';
    if(data.updatedAt&&!allCompanies) {
      if(staleQuote)setMarketStatus(status,'stale',Number.isFinite(Date.parse(staleQuote.asOf))?`Kursy sprzed ${Math.max(1,Math.floor((Date.now()-Date.parse(staleQuote.asOf))/60000))} min · źródło chwilowo niedostępne.`:'Ostatnie kursy są nieaktualne · źródło chwilowo niedostępne.');
      else if(!marketOpen)setMarketStatus(status,'closed',`Rynek jest poza typowymi godzinami sesji. ${quoteLabel}.`);
      else if(updated)setMarketStatus(status,'fresh',`Kursy: Yahoo Finance · ${quoteLabel}. Dane mogą być opóźnione.`);
      else setMarketStatus(status,'unavailable','Źródło nie zwróciło teraz kursów; spróbuję ponownie za minutę.');
    } else throw Error()
  }
  catch {
    setMarketStatus(status,'error','Nie udało się pobrać kursów. Uruchom aplikację przez lokalny serwer (instrukcja w README).')
  }
  safeStorage.set('dividend-ike-prices',JSON.stringify(prices));
  safeStorage.set('dividend-ike-price-times',JSON.stringify(priceTimes));
  if(updated)saveHistorySnapshot();
  render();
  for(const c of companies) {
    const option=document.querySelector(`#option-${c.ticker}`),
    quote=option?.querySelector('.option-price');
    if(quote) {
      quote.textContent=prices[c.ticker]?money(prices[c.ticker]): '—';
      option.title=priceTimes[c.ticker]?`Ostatnie notowanie: ${new Date(priceTimes[c.ticker]).toLocaleString('pl-PL')}`: 'Brak czasu notowania'
    }
  }
  if(document.querySelector('#modalback').open)setCompany(document.querySelector('#company').value);
  button.disabled=false;
  status.classList.remove('is-loading');
  button.textContent='↻  Odśwież kursy';
  if(showToast&&updated)toast('Kursy odświeżone');
}
function validateBackup(backup) {
  return AppCore.validateBackup(backup, { tickers: companies.map(company => company.ticker), validAnalysisFields: DividendAnalysis.validBackupFields, validSimulationState });
}
const settingsDialog=document.querySelector('#settingsDialog');
const backupDateStorageKey='dividend-ike-backup-date';
function updateBackupDate() {
  const value=safeStorage.get(backupDateStorageKey),time=Date.parse(value),days=Number.isFinite(time)?Math.max(0,Math.floor((Date.now()-time)/86400000)):null;
  document.querySelector('#backupDateStatus').textContent=days===null?'Nie zapisano jeszcze kopii zapasowej.':`Ostatnia kopia: ${days===0?'dzisiaj':days===1?'1 dzień temu':`${days} dni temu`}.`;
  document.querySelector('#backupReminder').classList.toggle('hidden',!portfolio.length||days!==null&&days<=30);
}
document.querySelector('#settingsToggle').addEventListener('click',()=>{updateBackupDate();settingsDialog.showModal()});
document.querySelector('#openBackupSettings').addEventListener('click',()=>{updateBackupDate();settingsDialog.showModal()});
document.querySelector('#dismissBackupReminder').addEventListener('click',()=>document.querySelector('#backupReminder').classList.add('hidden'));
document.querySelector('#closeSettings').addEventListener('click',()=>settingsDialog.close());
settingsDialog.addEventListener('click',e=> {
  if(e.target===settingsDialog)settingsDialog.close()
});
document.querySelector('#exportBackup').addEventListener('click',()=> {
  const backup= {
    app: 'Dividend Tracker',version: 1,createdAt: new Date().toISOString(),data:  {
      portfolio,prices,priceTimes,history: portfolioHistory,activity: portfolioActivity,historyStartedAt,theme: darkMode?'dark': 'light',deposits: analysisEntries,inflation: analysisInflation,depositRate,simulation:simulationState,tour:window.AppTutorial?.readState()??{completed:false,lastStep:-1}
    }
  },url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)], {
    type: 'application/json'
  })),link=document.createElement('a');link.href=url;link.download=`dividend-tracker-kopia-${new Date().toISOString().slice(0,10)}.json`;link.click();safeStorage.set(backupDateStorageKey,new Date().toISOString());updateBackupDate();setTimeout(()=>URL.revokeObjectURL(url),1000)
});
document.querySelector('#importBackup').addEventListener('click',()=> {
  settingsDialog.close();document.querySelector('#backupFile').click()
});
document.querySelector('#resetApp').addEventListener('click',async()=>{
  if(!await confirmAction('Zresetować dane?', 'Zostaną usunięte portfel, notowania, historia, dziennik i ustawienia zapisane w tej przeglądarce.', 'Usuń dane', true))return;
  const removed=['dividend-ike-portfolio','dividend-ike-prices','dividend-ike-price-times','dividend-ike-history','dividend-ike-history-started','dividend-ike-activity','dividend-ike-theme','dividend-ike-deposits','dividend-ike-inflation','dividend-ike-deposit-rate','dividend-ike-simulation','dividend-ike-tour',backupDateStorageKey].map(key=>safeStorage.remove(key));
  if(removed.includes(false)){toast('Nie udało się usunąć wszystkich danych z tej przeglądarki.');return}
  location.reload();
});
document.querySelector('#backupFile').addEventListener('change',async e=> {
  const file=e.target.files[0];e.target.value='';if(!file)return;if(file.size>5_000_000) {
    toast('Plik kopii jest za duży');return
  }
  try {
    const backup=JSON.parse(await file.text());if(!validateBackup(backup)) {
      toast('Plik nie jest prawidłową kopią Dividend Tracker');return
    }
    if(!await confirmAction('Przywrócić kopię?', 'Kopia zastąpi obecny portfel, historię i dane analizy zapisane w tej przeglądarce.', 'Przywróć kopię'))return;const values= {
      'dividend-ike-portfolio': backup.data.portfolio,'dividend-ike-prices': backup.data.prices,'dividend-ike-price-times': backup.data.priceTimes,'dividend-ike-history': backup.data.history,'dividend-ike-activity': backup.data.activity,'dividend-ike-history-started': backup.data.historyStartedAt,'dividend-ike-theme': backup.data.theme,'dividend-ike-deposits': backup.data.deposits??[],'dividend-ike-inflation': backup.data.inflation??{},'dividend-ike-deposit-rate': backup.data.depositRate??0.03,'dividend-ike-simulation':backup.data.simulation??emptySimulation(),'dividend-ike-tour':backup.data.tour??{completed:false,lastStep:-1}
    };if(!Object.entries(values).every(([key,value])=>safeStorage.set(key,typeof value==='string'?value:JSON.stringify(value)))){toast('Import nie został dokończony. Sprawdź miejsce w przeglądarce i zapisz kopię zapasową.');return}location.reload()
  }
  catch {
    toast('Nie udało się odczytać pliku kopii')
  }
});
function toast(message) {
  const el=document.querySelector('#toast');
  el.textContent=message;
  el.classList.remove('hidden');
  setTimeout(()=>el.classList.add('hidden'),2400)
}
const confirmDialog=document.querySelector('#confirmDialog');
let finishConfirmation=null;
confirmDialog.addEventListener('close',()=>{finishConfirmation?.(confirmDialog.returnValue==='confirm');finishConfirmation=null});
function confirmAction(title,message,actionLabel='Kontynuuj',destructive=false) {
  document.querySelector('#confirmTitle').textContent=title;
  document.querySelector('#confirmMessage').textContent=message;
  const button=document.querySelector('#confirmActionButton');button.textContent=actionLabel;button.classList.toggle('danger-button',destructive);button.classList.toggle('add',!destructive);
  confirmDialog.returnValue='';
  confirmDialog.showModal();
  return new Promise(resolve=>finishConfirmation=resolve);
}
document.querySelector('#refresh').onclick=()=>refreshPrices(true);
render();
updateBackupDate();
refreshDividends();
refreshInflation();
refreshPrices();
setInterval(()=> {
  if(!document.hidden)refreshPrices()
},60_000);
setInterval(()=> {
  if(!document.hidden)refreshDividends()
},6*60*60*1000);
document.addEventListener('visibilitychange',()=> {
  if(!document.hidden)refreshPrices()
});
