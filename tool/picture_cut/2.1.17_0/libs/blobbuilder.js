if(window.WebKitBlobBuilder)var BlobBuilder=BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder||function(e){"use strict";var t=function(e){return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},o=function(e,t,n){this.data=e,this.size=e.length,this.type=t,this.encoding=n},a=n.prototype,r=o.prototype,i=e.FileReaderSync,c=function(e){this.code=this[this.name=e]},l="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),s=l.length,u=e.URL||e.webkitURL||e,d=(u.createObjectURL,u.revokeObjectURL,u),R=e.btoa,f=e.atob,b=!1,p=e.ArrayBuffer,h=e.Uint8Array;for(n.fake=r.fake=!0;s--;)c.prototype[l[s]]=s+1;try{h&&function(e){b=!e}.apply(0,new h(1))}catch(e){}return u.createObjectURL||(d=e.URL={}),d.createObjectURL=function(e){var t,n=e.type;return null===n&&(n="application/octet-stream"),e instanceof o?(t="data:"+n,"base64"===e.encoding?t+";base64,"+e.data:"URI"===e.encoding?t+","+decodeURIComponent(e.data):R?t+";base64,"+R(e.data):t+","+encodeURIComponent(e.data)):real_create_object_url?real_create_object_url.call(u,e):void 0},d.revokeObjectURL=function(e){"data:"!==e.substring(0,5)&&real_revoke_object_url&&real_revoke_object_url.call(u,e)},a.append=function(e){var n=this.data;if(h&&e instanceof p)if(b)n.push(String.fromCharCode.apply(String,new h(e)));else for(var a=new h(e),r=0,l=a.length;r<l;r++)String.fromCharCode(a[r]);else if("Blob"===t(e)||"File"===t(e)){if(!i)throw new c("NOT_READABLE_ERR");var s=new i;n.push(s.readAsBinaryString(e))}else e instanceof o?"base64"===e.encoding&&f?n.push(f(e.data)):"URI"===e.encoding?n.push(decodeURIComponent(e.data)):"raw"===e.encoding&&n.push(e.data):("string"!=typeof e&&(e+=""),n.push(unescape(encodeURIComponent(e))))},a.getBlob=function(e){return arguments.length||(e=null),new o(this.data.join(""),e,"raw")},a.toString=function(){return"[object BlobBuilder]"},r.slice=function(e,t,n){var a=arguments.length;return a<3&&(n=null),new o(this.data.slice(e,a>1?t:this.data.length),n,this.encoding)},r.toString=function(){return"[object Blob]"},n}(self);