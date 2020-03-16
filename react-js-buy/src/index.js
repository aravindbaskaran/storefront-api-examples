import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'shopify-buy';
import '../../shared/app.css';
import './mod.css';

const client = Client.buildClient({
  storefrontAccessToken: '6ccb86731e865e432c15ec137d20ae2d',
  domain: 'alkis-boutique.myshopify.com'
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);


window.swymLandingURL = document.URL;

window.swymCart = {token: null, items: []};
window.swymPageLoad = function(){
  window.SwymProductVariants = window.SwymProductVariants || {};
  window.SwymHasCartItems = 0 > 0;
  window.SwymPageData = {}, window.SwymProductInfo = {};
  var unknown = {et: 0};
  window.SwymPageData = unknown;
  
  window.SwymPageData.uri = window.swymLandingURL;
};

window.swymCustomerId = null;
// var swappName = ("Watchlist" || "Watchlist");
var swymJSObject = {
  pid: "LbF6qXFRbNoHhuhXgPs7SjL8MeMDoCxl9BIk7xMXh5g=" // || "LbF6qXFRbNoHhuhXgPs7SjL8MeMDoCxl9BIk7xMXh5g=",
  // interface: "/apps/swym" + swappName + "/interfaces/interfaceStore.php?appname=" + swappName
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