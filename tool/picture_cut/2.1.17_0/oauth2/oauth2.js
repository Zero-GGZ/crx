var OAuth2=function(e,t,a){this.adapterName=e;var o=this;OAuth2.loadAdapter(e,function(){if(o.adapter=OAuth2.adapters[e],t==OAuth2.FINISH)o.finishAuth();else if(t){o.updateLocalStorage();var r=o.get();r.clientId=t.client_id,r.clientSecret=t.client_secret,r.apiScope=t.api_scope,o.setSource(r)}a&&a.call(o)})};OAuth2.FINISH="finish",OAuth2.adapters={},OAuth2.adapterReverse=localStorage.oauth2_adapterReverse&&JSON.parse(localStorage.oauth2_adapterReverse)||{},localStorage.adapterReverse&&(OAuth2.adapterReverse=JSON.parse(localStorage.adapterReverse),delete localStorage.adapterReverse),OAuth2.prototype.updateLocalStorage=function(){if(!this.getSource()){for(var e,t={},a=["accessToken","accessTokenDate","apiScope","clientId","clientSecret","expiresIn","refreshToken"],o=0;o<a.length;o++)e=this.adapterName+"_"+a[o],localStorage.hasOwnProperty(e)&&(t[a[o]]=localStorage[e],delete localStorage[e]);this.setSource(t)}},OAuth2.prototype.openAuthorizationCodePopup=function(e){window["oauth-callback"]=e,chrome.tabs.create({url:this.adapter.authorizationCodeURL(this.getConfig())},function(e){})},OAuth2.prototype.getAccessAndRefreshTokens=function(e,t){var a=this,o=new XMLHttpRequest;o.addEventListener("readystatechange",function(e){4==o.readyState&&200==o.status&&t(a.adapter.parseAccessToken(o.responseText))});var r=a.adapter.accessTokenMethod(),n=a.adapter.accessTokenParams(e,a.getConfig()),s=null;if("POST"==r){var c=new FormData;for(s in n)c.append(s,n[s]);o.open(r,a.adapter.accessTokenURL(),!0),o.send(c)}else{if("GET"!=r)throw r+" is an unknown method";var i=a.adapter.accessTokenURL(),p="?";for(s in n)p+=encodeURIComponent(s)+"="+encodeURIComponent(n[s])+"&";o.open(r,i+p,!0),o.send()}},OAuth2.prototype.refreshAccessToken=function(e,t){var a=new XMLHttpRequest;a.onreadystatechange=function(e){if(4==a.readyState&&200==a.status){var o=JSON.parse(a.responseText);t(o.access_token,o.expires_in)}};var o=this.get(),r=new FormData;r.append("client_id",o.clientId),o.clientSecret&&r.append("client_secret",o.clientSecret),r.append("refresh_token",e),r.append("grant_type","refresh_token"),a.open("POST",this.adapter.accessTokenURL(),!0),a.send(r)},OAuth2.prototype.finishAuth=function(){var e=null,t=this;function a(e){for(var t,a=chrome.extension.getViews(),o=0;t=a[o];o++)t["oauth-callback"]&&t["oauth-callback"](e);window.open("","_self",""),window.close()}try{e=t.adapter.parseAuthorizationCode(window.location.href),console.log(e)}catch(e){console.error(e),a(e)}t.getAccessAndRefreshTokens(e,function(e){var o=t.get();for(var r in o.accessTokenDate=(new Date).valueOf(),e)e.hasOwnProperty(r)&&e[r]&&(o[r]=e[r]);t.setSource(o),a()})},OAuth2.prototype.isAccessTokenExpired=function(){var e=this.get();return(new Date).valueOf()-e.accessTokenDate>1e3*e.expiresIn},OAuth2.prototype.get=function(e){var t=this.getSource(),a=t?JSON.parse(t):{};return e?a[e]:a},OAuth2.prototype.set=function(e,t){var a=this.get();a[e]=t,this.setSource(a)},OAuth2.prototype.clear=function(e){if(e){var t=this.get();delete t[e],this.setSource(t)}else delete localStorage["oauth2_"+this.adapterName]},OAuth2.prototype.getSource=function(){return localStorage["oauth2_"+this.adapterName]},OAuth2.prototype.setSource=function(e){e&&("string"!=typeof e&&(e=JSON.stringify(e)),localStorage["oauth2_"+this.adapterName]=e)},OAuth2.prototype.getConfig=function(){var e=this.get();return{clientId:e.clientId,clientSecret:e.clientSecret,apiScope:e.apiScope}},OAuth2.loadAdapter=function(e,t){if(OAuth2.adapters[e])t();else{var a=document.querySelector("head"),o=document.createElement("script");o.type="text/javascript",o.src="/oauth2/adapters/"+e+".js",o.addEventListener("load",function(){t()}),a.appendChild(o)}},OAuth2.adapter=function(e,t){"authorizationCodeURL redirectURL accessTokenURL accessTokenMethod accessTokenParams accessToken".split(" ").forEach(function(e,a){if(!e in t)throw"Invalid adapter! Missing method: "+e}),OAuth2.adapters[e]=t,OAuth2.adapterReverse[t.redirectURL()]=e,localStorage.oauth2_adapterReverse=JSON.stringify(OAuth2.adapterReverse)},OAuth2.lookupAdapterName=function(e){return JSON.parse(localStorage.oauth2_adapterReverse)[e]},OAuth2.prototype.authorize=function(e){var t=this;OAuth2.loadAdapter(t.adapterName,function(){t.adapter=OAuth2.adapters[t.adapterName];var a=t.get();a.accessToken?t.isAccessTokenExpired()?a.refreshToken?t.refreshAccessToken(a.refreshToken,function(a,o){var r=t.get();r.accessTokenDate=(new Date).valueOf(),r.accessToken=a,r.expiresIn=o,t.setSource(r),e&&e()}):t.openAuthorizationCodePopup(e):e&&e():t.openAuthorizationCodePopup(e)})},OAuth2.prototype.getAccessToken=function(){return this.get("accessToken")},OAuth2.prototype.hasAccessToken=function(){return!!this.get("accessToken")},OAuth2.prototype.clearAccessToken=function(){this.clear("accessToken")};