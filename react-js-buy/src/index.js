import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'shopify-buy';
import '../../shared/app.css';

const client = Client.buildClient({
  storefrontAccessToken: '6ccb86731e865e432c15ec137d20ae2d',
  domain: 'alkis-boutique.myshopify.com'
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);



window.swymLandingURL = document.URL;
(function loadSwymFaster(){
  var elScripts = document.querySelectorAll("script:not([src]):not([class]):not([id])"), scriptLoadScript, scriptLoadScriptText;
  for(var i = 0; i < elScripts.length; i++){
    var elScript = elScripts[i];
    // TODO change swym- check to script metafield
    if(elScript.innerText.indexOf('swym-shopify.js') > -1){
      scriptLoadScriptText = elScript.innerText;
      break;
    }
  }
  if(scriptLoadScriptText) {
    var startStr = 'var urls =';
    var startIdx = scriptLoadScriptText.indexOf(startStr);
    var endStr = '"];';
    var endIdx = scriptLoadScriptText.indexOf(endStr,startIdx);
    var listOfUrlsText = scriptLoadScriptText.slice(startIdx + startStr.length, endIdx + endStr.length);
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = ("\/\/swymprem.azureedge.net\/code\/swym-shopify.js" || "//swymprem.azureedge.net/code/swym-shopify.js") + "?shop=alkis-boutique.myshopify.com";
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
})();
window.swymCart = {token: null, items: []};
window.swymPageLoad = function(){
  window.SwymProductVariants = window.SwymProductVariants || {};
  window.SwymHasCartItems = 0 > 0;
  window.SwymPageData = {}, window.SwymProductInfo = {};
  var unknown = {et: 0};
  window.SwymPageData = unknown;
  
  window.SwymPageData.uri = window.swymLandingURL;
};

if(window.selectCallback){
  (function(){
    // Variant select override
    var originalSelectCallback = window.selectCallback;
    window.selectCallback = function(variant){
      originalSelectCallback.apply(this, arguments);
      try{
        if(window.triggerSwymVariantEvent){
          window.triggerSwymVariantEvent(variant.id);
        }
      }catch(err){
        console.warn("Swym selectCallback", err);
      }
    };
  })();
}
window.swymCustomerId = null;
var swappName = ("Watchlist" || "Watchlist");
var swymJSObject = {
  pid: "LbF6qXFRbNoHhuhXgPs7SjL8MeMDoCxl9BIk7xMXh5g=" || "LbF6qXFRbNoHhuhXgPs7SjL8MeMDoCxl9BIk7xMXh5g=",
  interface: "/apps/swym" + swappName + "/interfaces/interfaceStore.php?appname=" + swappName
};
window.swymJSShopifyLoad = function(){
  if(window.swymPageLoad) window.swymPageLoad();
  if(!window._swat) {
    (function (s, w, r, e, l, a, y) {
      r['SwymRetailerConfig'] = s;
      r[s] = r[s] || function (k, v) {
        r[s][k] = v;
      };
    })('_swrc', '', window);
    window._swrc('RetailerId', swymJSObject.pid);
    window._swrc('Callback', function(){
      //window._swat.storage.primaryDomain = "";
      window._swat.retailerSettings.UI.LauncherOpenHosted = "popup"
      window.initSwymShopify();
    });
  }else if(window._swat.postLoader){
    window._swrc = window._swat.postLoader;
    window._swrc('RetailerId', swymJSObject.pid);
    window._swrc('Callback', function(){
      //window._swat.storage.primaryDomain = "";
      window._swat.retailerSettings.UI.LauncherOpenHosted = "popup"
      window.initSwymShopify();
    });
  }else{
    //window._swat.storage.primaryDomain = "";
    window._swat.retailerSettings.UI.LauncherOpenHosted = "popup"
    window.initSwymShopify();
  }
}
if(!window._SwymPreventAutoLoad) {
  window.swymJSShopifyLoad();
}
window.swymGetCartCookies = function(){
  return {};
}

window.swymGetCustomerData = function(){
  
  return {status:1};
  
}