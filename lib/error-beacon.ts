/*
  Captador de erros de JavaScript do navegador, inline no <head> (roda antes
  do React, então pega também os erros do carregamento). Para cada erro:

  1. marca a sessão no Microsoft Clarity (`js_error` = mensagem curta e
     `js_error_kind` = origem), para filtrar as gravações pela mensagem;
  2. manda o detalhe (arquivo, linha, stack, página, navegador) por
     sendBeacon para /api/client-error, que grava nos logs da Vercel.

  Classifica a origem (pelo arquivo ou pela primeira URL do stack) para
  separar o nosso código do ruído: `own` (scripts do próprio site),
  `third_party` (outro domínio ou "Script error." sem detalhe), `extension`,
  `in_app` (sem URL ou fora de /_next/ no navegador do Facebook/Instagram,
  que injeta scripts próprios) e `unknown`. No máximo 5 envios por página e sem repetir a mesma
  mensagem. Só roda quando um erro acontece: não pesa no INP.
*/
export const ERROR_BEACON_SCRIPT = `(function(){try{
var w=window,sent=0,seen={},MAX=5;
var ua=navigator.userAgent||'';
var inApp=/FBAN|FBAV|FB_IAB|FBIOS|Instagram/i.test(ua);
w.clarity=w.clarity||function(){(w.clarity.q=w.clarity.q||[]).push(arguments)};
function kind(msg,file,stack){
  var src=String(file||'')+' '+String(stack||'');
  if(/(chrome|moz|safari|safari-web)-extension:/.test(src))return 'extension';
  if(msg==='Script error.'||msg==='Script error')return 'third_party';
  var m=String(file||'').match(/^https?:\\/\\/[^\\s)]+/)||String(stack||'').match(/https?:\\/\\/[^\\s):]+/);
  if(!m)return inApp?'in_app':'unknown';
  try{if(new URL(m[0]).origin!==location.origin)return 'third_party'}catch(e){return 'unknown'}
  if(/\\/_next\\//.test(m[0]))return 'own';
  return inApp?'in_app':'own';
}
function report(msg,file,line,col,stack,type){
  msg=String(msg||'unknown').slice(0,300);
  if(seen[msg]||sent>=MAX)return;seen[msg]=1;sent++;
  var k=kind(msg,file,stack);
  try{w.clarity('set','js_error',msg.slice(0,100));w.clarity('set','js_error_kind',k);w.clarity('event','js_error')}catch(e){}
  var body=JSON.stringify({type:type,kind:k,message:msg,file:String(file||'').slice(0,300),line:line||0,col:col||0,
    stack:String(stack||'').slice(0,2000),page:location.pathname,ref:document.referrer?new URL(document.referrer).hostname:'',
    inApp:inApp,ua:ua.slice(0,300),t:Date.now()});
  try{if(navigator.sendBeacon){navigator.sendBeacon('/api/client-error',new Blob([body],{type:'application/json'}))}
  else{fetch('/api/client-error',{method:'POST',body:body,keepalive:true,headers:{'content-type':'application/json'}})}}catch(e){}
}
w.addEventListener('error',function(e){
  if(e.target&&e.target!==w&&!e.message){return}
  report(e.message,e.filename,e.lineno,e.colno,e.error&&e.error.stack,'error');
},true);
w.addEventListener('unhandledrejection',function(e){
  var r=e.reason;report(r&&r.message?r.message:String(r),r&&r.fileName||'',0,0,r&&r.stack,'unhandledrejection');
});
}catch(e){}})();`;
