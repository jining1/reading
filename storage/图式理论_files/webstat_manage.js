(function(){
         _hdCO();
        if (window.top.frames.length == window.frames.length) {
			window.setTimeout(function(){
				FilterLM();
			}, 2000);
        }

})();

(function(){
	var hdClickS = document.createElement('script');
	hdClickS.type = 'text/javascript';
	hdClickS.async = true;
	var _isStatAdClick = false;
	if(window.location.host.indexOf(".baike.com")>0){
		hdClickS.src = '//www.huimg.cn/stat/js/XBKClickMonitor.js';
		_isStatAdClick = true;
	}else if(window.location.host.indexOf(".hudong.com")>0){
		hdClickS.src = '//www.huimg.cn/stat/js/HDClickMonitor20111102.js';
		_isStatAdClick = true;
	}
	if(_isStatAdClick){
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(hdClickS, s);
	}
})();

function _hdCO() {
	//Filter Non Hudong And Baike
	if(!window.location.host.indexOf(".hudong.com")>0 || !window.location.host.indexOf(".baike.com")>0){
		return;
	}
	if (window.top.frames.length != window.frames.length) {
		if ( typeof(_hd_virtual_iframe) != "undefined" && _hd_virtual_iframe != null) {
			try {
				StatIframeTraffic(_hd_virtual_iframe);
			}
			catch (e) {
			}
		}		
		return;
	}
	
	if (GetCookie("hd_uid") == null) {
		setCookies("hd_uid", genHDUID(), 365);
	}
	var _hd_refer = document.referrer.replace(/,/g, "%2c");
	if(_hd_refer==""){
		_hd_refer="-";
	}
	var _hd_refer_cookie = GetCookie("hd_referer");
	
	var query = window.location.search.substring();
	
	//hudong.com stat
	if(window.location.host.indexOf(".hudong.com")>0){
		if (_hd_refer_cookie!=null && judgeOwn(_hd_refer) && (!query.match("[?&]hf=")) && (!_hd_refer.match("[?&]hf="))){

		}else{
			var _hd_src=judgeTGPage(query);
			if(_hd_src==null){
				_hd_src=judgeTGPage(_hd_refer);
			}
			if(_hd_src!=null ){
				if(_hd_src!=_hd_refer_cookie){			
					setCookies("hd_referer", _hd_src,1);
				}			
			}else{
				setCookies("hd_referer", _hd_refer,1);
			}
		}
	}else if(window.location.host.indexOf(".baike.com")>0){
		if(query.match("[?&]uid=") && query.match("[?&]qid=")){
			var _tgds_src=judgeTGDSPage(query);
			if(_tgds_src!=null ){
				var names_values = _tgds_src.split(/[&]/);
				var names = new Array();
				var values = new Array();
				for(var i = 0; i < names_values.length; i++)
				{
					names[i] = "tgds"+names_values[i].split(/[=]/)[0];
					values[i] = names_values[i].split(/[=]/)[1];
				}
				setMultCookies(names, values,1);
			}
		}
		if ( _hd_refer_cookie!=null && judgeOwn(_hd_refer) && (!query.match("[?&]hf=")) && (!_hd_refer.match("[?&]hf="))   ){
	
		}else{
			var _hd_src=judgeTGPage(query);
			if(_hd_src==null){
				_hd_src=judgeTGPage(_hd_refer);
			}
			if(_hd_src!=null ){
				if(_hd_src!=_hd_refer_cookie){			
					setCookies("hd_referer", _hd_src,1);
				}			
			}else{
				setCookies("hd_referer", _hd_refer,1);
			}
		}
	}
	
	var hd_accessurl = window.location.href.replace(/,/g, "%2c");		

	if (GetCookie("hd_firstaccessurl") == null) {
		setCookies("hd_firstaccessurl", hd_accessurl,1);
	}
	var hd_res = "-";
	try {
		hd_res = getClientRes();
	}
	catch (e) {
	}
	
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.id = "_hdssojs";
    sc.async = true;
	if(window.location.host.indexOf(".hudong.com")>0){
		sc.src = "//stat.hudong.com/hdWebStat.do?random=" + Math.random() + "&hd_accessrefer=" + encodeURIComponent(_hd_refer) + "&hd_accessurl=" + encodeURIComponent(hd_accessurl) + "&hd_res=" + hd_res;
	}else if(window.location.host.indexOf(".baike.com")>0){
		sc.src = "//stat.baike.com/hdWebXBKStat.do?random=" + Math.random() + "&hd_accessrefer=" + encodeURIComponent(_hd_refer) + "&hd_accessurl=" + encodeURIComponent(hd_accessurl) + "&hd_res=" + hd_res;
	}
	
	document.getElementsByTagName("head")[0].appendChild(sc);
}



function setCookies(name, value, day) {
	var d = new Date(); 

	d.setTime(d.getTime() + (day *  86400000 ));
	try{
		if(window.location.host.indexOf(".hudong.com")>0){
			document.cookie = name + "=" + value + "; expires=" + d.toGMTString() + "; path=/;domain=.hudong.com";
		}else if(window.location.host.indexOf(".baike.com")>0){
			document.cookie = name + "=" + value + "; expires=" + d.toGMTString() + "; path=/;domain=.baike.com";
		}
	}
	catch (e) {
	}
}

function getCookieVal(offset) { 
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) { 
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal(j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	return null;
}
function judgeTGPage(query) {
	if (query.indexOf("hf=") < 0) {
		return null;
	}
	//query=query.substring(1);
	var pairs = query.split(/[?&]/);
	var tgPara='hf=';
	if(query.indexOf("pf=") > 0){
		tgPara="pf=";
	}
	for(var i = 0; i < pairs.length; i++) {	
        var pos = pairs[i].indexOf(tgPara);
        if (pos != 0) continue;
        return pairs[i].substring(3); 
    }	
}

function genHDUID() {
	var _hddt = new Date();
	var _hdst = Math.round(_hddt.getTime() / 1000);
	var _hdu = Math.round(Math.random() * 2147483647);
	return _hdu + "" + _hdst;
}

function getClientRes() {
	if (self.screen) {
		sr = screen.width + "x" + screen.height;
	} else {
		if (self.java) {
			var j = java.awt.Toolkit.getDefaultToolkit();
			var s = j.getScreenSize();
			sr = s.width + "x" + s.height;
		}
	}
	return sr;
}
function StatVirtualTraffic(hd_accessrefer, hd_accessurl, hd_virtual) {
	//set screen res
	var hd_res = "-";
	try {
		hd_res = getClientRes();
	}
	catch (e) {
	}
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.id = "_hdsvsojs";
	sc.async = true;
    var _isStatVirtual = false;
	if(window.location.host.indexOf(".hudong.com")>0){
		sc.src = "//stat.hudong.com/hdWebStatVirtual.do?random=" + Math.random() + "&hd_virtual=" + hd_virtual + "&hd_accessrefer=" + encodeURIComponent(hd_accessrefer) + "&hd_accessurl=" + encodeURIComponent(hd_accessurl) + "&hd_res=" + hd_res;
		_isStatVirtual = true;
	}else if(window.location.host.indexOf(".baike.com")>0){
		sc.src = '//stat.baike.com/hdWebXBKStatVirtual.do?random=' + Math.random()+'&hd_virtual='+hd_virtual+'&hd_accessrefer='+encodeURIComponent(hd_accessrefer)+'&hd_accessurl='+encodeURIComponent(hd_accessurl)+"&hd_res="+ hd_res;
		_isStatVirtual = true;
	}
	if(_isStatVirtual){
		document.getElementsByTagName("head")[0].appendChild(sc);
	}
}
function StatIframeTraffic(hd_virtual) {
	if (parent.window.frames.length > 0) {
		var hd_accessrefer = parent.document.referrer;
		var hd_accessurl = parent.window.location.href;
		StatVirtualTraffic(hd_accessrefer, hd_accessurl, hd_virtual);
	}
}

function FilterLM(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	if(window.location.host.indexOf(".hudong.com")>0){
		if (judgeLM() == 1) {
			ga('create', 'UA-5479642-64', 'auto');
    	}
    	else {
    		ga('create', 'UA-5479642-65', 'auto');
		}
	}else if(window.location.host.indexOf(".baike.com")>0){
		if (judgeLM() == 1) {
			ga('create', 'UA-20697937-18', 'auto');
    	}
    	else {
    		ga('create', 'UA-20697937-17', 'auto');
		}
	}

	ga('require', 'displayfeatures');
	//ga('send', 'pageview');
    
}

//Filter LM Traffic
function judgeLM(){
    var hdReferFromCookie = GetCookie("hd_referer");
	if(hdReferFromCookie == null || hdReferFromCookie == ""){
		return 0;
	}
	if(hdReferFromCookie.indexOf("lm") == 0){
        return 1;
    }else if(hdReferFromCookie.match(/^(wlgynewtop|qidiannewtop|dlmnewtop|dlmwww|wlgywww|qidianwww|niutop|wlgy|dlm|qidian)$/)){
		return 1;
    }
    return 0;
}

function isLMID(s){
    var patrn = /^[0-9A-Za-z]+$/;
    if (!patrn.exec(s)) {
        return false;
    }
    else {
        return true;
    }
}

//Filter TGDS
function judgeTGDSPage(query) {
	if (query.indexOf("uid=") < 0 || query.indexOf("qid=") < 0) {
		return null;
	}
	var pairs = query.split(/[?&]/);
	var tgdsParau='uid=';
	var tgdsParaq='qid=';
	var names='';

	for(var i = 0; i < pairs.length; i++) {
        var pou = pairs[i].indexOf(tgdsParau);
        var poq = pairs[i].indexOf(tgdsParaq);
        if(pou == 0){
        	names += pairs[i];
        }
        if(poq == 0){
        	names += "&";
        	names += pairs[i];
        }
    }
	return names;
}

//Filter Own Stat
function judgeOwn(refer) {
	if(refer=="-"){
		return true;
	}else{
		var re;
		
		if(window.location.host.indexOf(".baike.com")>0){
			re = /^\w+:\/\/[^\/?&:]+\.baike\.com(([^.\w]+)|$)/;
		}else if(window.location.host.indexOf(".hudong.com")>0){
			re = /^\w+:\/\/[^\/?&:]+\.hudong\.com(([^.\w]+)|$)/;
		}
		 
		if(refer.match(re)){
			return true;
		}else{
			re=/^http:\/\/passport\.hudong\.com\/((log(in|out)\.do)|(user\/(user|xbkUser)Register\.jsp))/;
			if(refer.match(re)){
				return true;
			}
		}
	}
	return false;
}
