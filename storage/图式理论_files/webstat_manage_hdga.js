function getPageGACode(){
    var myJSONHudongDomainsObject = [{
        "name": "www",
        "gavalue": "1"
    }, {
        "name": "wiki",
        "gavalue": "2"
    }, {
        "name": "wikibar",
        "gavalue": "3"
    }, {
        "name": "group",
        "gavalue": "4"
    }, {
        "name": "kaiyuan",
        "gavalue": "5"
    }, {
        "name": "bbs",
        "gavalue": "15"
    }, {
        "name": "tupian",
        "gavalue": "19"
    }, {
        "name": "paihangbang",
        "gavalue": "20"
    }, {
        "name": "top",
        "gavalue": "24"
    }, {
        "name": "time",
        "gavalue": "25"
    }, {
        "name": "yun",
        "gavalue": "26"
    }, {
        "name": "task",
        "gavalue": "27"
    }, {
        "name": "dajiang",
        "gavalue": "28"
    }, {
        "name": "pic",
        "gavalue": "29"
    }, {
        "name": "gongyi",
        "gavalue": "30"
    }, {
        "name": "bwg",
        "gavalue": "31"
    }, {
        "name": "ceshi",
        "gavalue": "32"
    }, {
        "name": "123",
        "gavalue": "33"
    }, {
        "name": "renwu",
        "gavalue": "34"
    }, {
        "name": "shenghuo",
        "gavalue": "35"
    }, {
        "name": "jingji",
        "gavalue": "36"
    }, {
        "name": "redian",
        "gavalue": "37"
    }, {
        "name": "ziran",
        "gavalue": "38"
    }, {
        "name": "wenhua",
        "gavalue": "39"
    }, {
        "name": "lishi",
        "gavalue": "40"
    }, {
        "name": "shehui",
        "gavalue": "41"
    }, {
        "name": "yishu",
        "gavalue": "42"
    }, {
        "name": "dili",
        "gavalue": "43"
    }, {
        "name": "kexue",
        "gavalue": "44"
    }, {
        "name": "tiyu",
        "gavalue": "45"
    }, {
        "name": "jishu",
        "gavalue": "46"
    }, {
        "name": "reci",
        "gavalue": "49"
    }, {
        "name": "so",
        "gavalue": "51"
    }, {
        "name": "photo",
        "gavalue": "52"
    }, {
        "name": "v",
        "gavalue": "53"
    }, {
        "name": "zt",
        "gavalue": "55"
    }, {
        "name": "jiaoshi",
        "gavalue": "56"
    }, {
        "name": "i",
        "gavalue": "57"
    }, {
        "name": "w",
        "gavalue": "58"
    }, {
        "name": "zutu",
        "gavalue": "59"
    }, {
        "name": "c",
        "gavalue": "60"
    }, {
        "name": "passport",
        "gavalue": "66"
    }, {
        "name": "fenlei",
        "gavalue": "68"
    }];
	
	var myJSONBaikeDomainsObject = [{
        "name": "www",
        "gavalue": "2"
    }, {
        "name": "123",
        "gavalue": "3"
    }, {
        "name": "apps",
        "gavalue": "4"
    }, {
        "name": "fenlei",
        "gavalue": "5"
    }, {
        "name": "group",
        "gavalue": "6"
    }, {
        "name": "i",
        "gavalue": "7"
    }, {
        "name": "photo",
        "gavalue": "8"
    }, {
        "name": "pic",
        "gavalue": "9"
    }, {
        "name": "so",
        "gavalue": "10"
    }, {
        "name": "task",
        "gavalue": "11"
    }, {
        "name": "time",
        "gavalue": "12"
    }, {
        "name": "top",
        "gavalue": "13"
    }, {
        "name": "tupian",
        "gavalue": "14"
    }, {
        "name": "wap",
        "gavalue": "15"
    }, {
        "name": "zt",
        "gavalue": "16"
    }, {
        "name": "pics",
        "gavalue": "20"
    }, {
        "name": "x",
        "gavalue": "21"
    }, {
        "name": "qiye",
        "gavalue": "22"
    }, {
        "name": "byte",
        "gavalue": "23"
    }];
    
    var _gaValue;
    var  _gaDomain;
	
	if(window.location.host.indexOf(".hudong.com")>0){
		_gaValue = "UA-5479642-";
		_gaDomain = ".hudong.com";
		for (var i = 0; i < myJSONHudongDomainsObject.length; i++) {
	        if (window.location.host == (myJSONHudongDomainsObject[i].name +  _gaDomain)) {
	            _gaValue = _gaValue + myJSONHudongDomainsObject[i].gavalue;
	            return _gaValue;
	            break;
	        }
    	}
	}else if(window.location.host.indexOf(".baike.com")>0){
		_gaValue = "UA-20697937-";
		_gaDomain = ".baike.com";
		for (var i = 0; i < myJSONBaikeDomainsObject.length; i++) {
	        if (window.location.host == (myJSONBaikeDomainsObject[i].name +  _gaDomain)) {
	            _gaValue = _gaValue + myJSONBaikeDomainsObject[i].gavalue;
	            return _gaValue;
	            break;
	        }
    	}
	}
	
    return 0;
}

if(window.location.host.indexOf(".hudong.com")>0 || window.location.host.indexOf(".baike.com")>0){
	if (window.top.frames.length == window.frames.length) {
	    _uacct = getPageGACode();
	    if (_uacct != null) {
	        var access_host = window.location.host;
	//        var access_host_end = access_host.indexOf(".hudong.com");
	//        if (access_host_end > 0) {
	//            access_host = access_host.substring(0, access_host_end);
	//        }
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			var _gaIsStat = false;
			if (_uacct == 0) {
				if(window.location.host.indexOf(".baike.com")>0){
                    ga('create', 'UA-20697937-1', 'auto');
					_gaIsStat = true;
				}
            }
            else {
				if (window.location.host.indexOf(".baike.com") > 0) {
                    ga('create', _uacct, 'auto');
					_gaIsStat = true;
				}else if (window.location.host.indexOf(".hudong.com") > 0){
                    ga('create', _uacct, 'auto');
					_gaIsStat = true;
				}
            }
			if(_gaIsStat){
                ga('require', 'displayfeatures');
		        ga('send', 'pageview');

			}
	    }
	}
}

