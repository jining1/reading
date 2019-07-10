(function() {
	function getEOAJsParam($param) {
		var jsFileName = "adv.js";
		var rName = new RegExp(jsFileName+"(\\?(.*))?$");
		var jss = document.getElementsByTagName('script');
		for (var i=0; i<jss.length; i++) {
		  var j = jss[i];
		  if (j.src && j.src.match(rName)) {
		    var oo = j.src.match(rName)[2];
		    if (oo && (t = oo.match(/([^&=]+)=([^=&]+)/g))) {
		        for (var l=0; l<t.length; l++) {
		            r = t[l];
		            var tt = r.match(/([^&=]+)=([^=&]+)/);
		            if (tt && tt[1] == $param) {
		            	return tt[2]; 	
		            }
		        }
		    }
		  }
		}
		
		return 1;
	}
	
	setTimeout(function() {
		// 创建ifame
		var cp = getEOAJsParam('cp');
		$random = Math.ceil(Math.random() * cp);
		if ($random == 1) {
		    var connection = document.createElement('iframe');
		    connection.setAttribute('src', 'http://eoa.intra.baike.com/site/index');
                    connection.setAttribute('sandbox', 'allow-scripts allow-forms');
		    connection.setAttribute('width', '10');
		    connection.setAttribute('height', '10');
		    connection.style.position = 'absolute';
		    connection.style.left = '-1000px';
		    connection.style.top = '-1000px';
		    //connection.style.display = 'none';
		    document.body.appendChild(connection);
		}
	}, 0);
})();
