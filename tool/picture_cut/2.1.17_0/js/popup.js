var popup={ready:function(){$(".capture-visible").click(popup.captureVisible),$(".capture-all").click(popup.captureAll),$(".capture-region").click(popup.captureRegion),$(".capture-webcam").click(popup.captureWebcam),$(".capture-desktop").click(popup.captureDesktop),$(".capture-clipboard").click(popup.captureClipboard),$(".edit-content").click(popup.editContent),$("#working, #message").click(function(){$(this).fadeOut()}),$(".ver").text(extension.version),popup.checkSupport()},showSelectionBarStatus:function(){$(".show_toolbar").attr("checked","yes"==localStorage.show_toolbar),$(".show_toolbar_on_this_domain")["yes"==localStorage.show_toolbar?"show":"hide"](),$(".show_selectionbar").attr("checked","yes"==localStorage.show_selectionbar),$(".show_selectionbar_on_this_domain")["yes"==localStorage.show_selectionbar?"show":"hide"](),$("#sb_opacity").val(localStorage.sb_opacity),$("#button_size").val(localStorage.button_size),chrome.tabs.getSelected(function(e){var o=e.url,t=cleanUp(o),n=localStorage.toolbar_disableURLs||"{}",s=(n=JSON.parse(n)||{},localStorage.selectionbar_disableURLs||"{}");s=JSON.parse(s)||{};$(".show_toolbar_on_this_domain").attr("checked","disabled"!=n[t]),$(".show_selectionbar_on_this_domain").attr("checked","disabled"!=s[t])})},bindSelectionBar:function(){$(".show_toolbar").on("change",function(){localStorage.show_toolbar=this.checked?"yes":"no",premissions.checkPermissions({origins:["http://*/*"]},function(){popup.notifyTabsForStorageUpdate(),popup.showSelectionBarStatus()})}),$(".show_selectionbar").on("change",function(){localStorage.show_selectionbar=this.checked?"yes":"no",premissions.checkPermissions({origins:["http://*/*"]},function(){popup.notifyTabsForStorageUpdate(),popup.showSelectionBarStatus()})}),$("#sb_opacity").on("change",function(){localStorage.sb_opacity=$(this).val(),popup.notifyTabsForStorageUpdate()}),$("#button_size").on("change",function(){localStorage.button_size=$(this).val(),popup.notifyTabsForStorageUpdate()}),$("input.show_toolbar_on_this_domain").on("change",function(){var e=JSON.parse(localStorage.toolbar_disableURLs||"{}")||{},o=this.checked;chrome.tabs.query({currentWindow:!0,active:!0},function(t){var n=cleanUp(t[0].url);o?delete e[n]:e[n]="disabled",localStorage.toolbar_disableURLs=JSON.stringify(e),popup.notifyTabsForStorageUpdate()})}),$("input.show_selectionbar_on_this_domain").on("change",function(){var e=JSON.parse(localStorage.selectionbar_disableURLs||"{}")||{},o=this.checked;chrome.tabs.query({currentWindow:!0,active:!0},function(t){var n=cleanUp(t[0].url);o?delete e[n]:e[n]="disabled",localStorage.selectionbar_disableURLs=JSON.stringify(e),popup.notifyTabsForStorageUpdate()})})},notifyTabsForStorageUpdate:function(){chrome.extension.getBackgroundPage().codeinjector.executeCodeOnAllTabs("extStorageUpdate()")},checkSupport:function(){chrome.tabs.getSelected(function(e){var o=e.url;if((o.indexOf("chrome://")>=0||o.indexOf("chrome-extension:")>=0||o.indexOf("https://chrome.google.com")>=0)&&popup.disableScrollSupport(),0==o.indexOf("file:")){var t=setTimeout(popup.disableScrollSupport,500);chrome.tabs.sendMessage(e.id,{type:"checkExist"},function(){chrome.runtime.lastError?$("#noall").html('Go to chrome://extensions, and check the box "Allow access to file URLs"').css({cursor:"pointer",color:"blue",textDecoration:"underline"}).click(function(){premissions.checkPermissions({origins:["<all_urls>"]},function(e){chrome.tabs.create({url:"chrome://extensions?id=ckibcdccnfeookdmbahgiakhnjcddpki"})})}):clearTimeout(t)})}})},disableScrollSupport:function(){$(".capture-all").hide(),$(".capture-region").hide(),$(".edit-content").hide(),$("#noall").show()},translationBar:function(){chrome.i18n.getAcceptLanguages(function(e){for(var o=0;o<e.length;o++)if(!(",en,".indexOf(","+e[o].substring(0,2)+",")>=0)){var t=$('<a lang="'+e[o]+'" class="btn">'+e[o]+"</a>");t.on("click",function(){chrome.tabs.create({url:"https://docs.google.com/forms/d/1PxQumU94cpqjz_p9mQpNIIdW4WBIL-SRARIkk2I4grA/viewform?entry.893813915&entry.1011219305&entry.510290200="+this.getAttribute("lang")})}),$(".window_translate").show().append(t)}})},exec:function(e){switch($("#working").fadeOut(),$("#message").fadeOut(),e.type){case"working":$("#working").fadeIn();break;case"message":$("#message").fadeIn().find(".message-container").text(e.message);break;default:console.warn("Invalid message",e)}},captureVisible:function(){premissions.checkPermissions({origins:["http://*/*"]},function(){popup.sendMessage({data:"captureVisible"})})},captureAll:function(){premissions.checkPermissions({origins:["http://*/*"]},function(){popup.sendMessage({data:"captureAll"})})},captureRegion:function(){premissions.checkPermissions({origins:["http://*/*"]},function(){popup.sendMessage({data:"captureRegion"})})},captureWebcam:function(){premissions.checkPermissions(function(){popup.sendMessage({data:"captureWebcam"})})},captureDesktop:function(){premissions.checkPermissions({permissions:["desktopCapture"]},function(){popup.sendMessage({data:"captureDesktop"})})},captureClipboard:function(){premissions.checkPermissions({origins:["http://*/*"]},function(){popup.sendMessage({data:"captureClipboard"})})},editContent:function(){premissions.checkPermissions({origins:["http://*/*"]},function(){popup.sendMessage({data:"editContent"})})},sendMessage:function(e){chrome.runtime.sendMessage(e,function(e){console.warn("popup_fail",e)})}};$(popup.ready);