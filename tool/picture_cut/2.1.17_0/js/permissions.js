var premissions={checkPermissions:function(s,i,e){i?s=settings.permissions:(i=s,s=settings.permissions),chrome.permissions.contains(s,function(s){s?i():e||premissions.requestPermissions(i)})},requestPermissions:function(s,i){i||(i=s,s=settings.permissions),chrome.permissions.request(s,function(s){s?i():premissions.requestPermissionsFailed()})},removePermissions:function(){chrome.permissions.remove(settings.permissions)},requestPermissionsFailed:function(){alert("Permission was not granted.")}};