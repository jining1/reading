/*
大图页js
*/
var timeOutID=0;
function logger(data, method) {
		method = method || 'log'
		if ( location.href.indexOf('&debug') > 0 && typeof console === 'object' ) {
			if ( data instanceof Array && console[method].apply ) {
				console[method].apply(console, data)
			} else {
				console[method](data)
			}
			
		}
}
$(document).ready(function(){
	$(window).resize(function(){
		imageResize();
	});

	$('.btn-info').off('click').on('click',function(){
		$('.info-panel').toggle();
	})

/*
功能：1,上下页样式变化，如果图片不止一页，则可翻页
	 2,如果处于第一页、第一张，则隐藏鼠标箭头
*/
	var noInPage = Number($("#noInPage").val());
	var pageNow=Number($("#pageNow").val());
	var pageCount=Number($("#pageCount").val());
	
	if(pageNow>1){
		//上一页可点击
		toggleDisable("prevPage",true);
	}else{
		toggleDisable("prevPage",false);
	}
	
	if(pageNow<pageCount){
		//下一页可点击
		toggleDisable("nextPage",true);
	}else{
		toggleDisable("nextPage",false);
	}
	
	//右侧导航图片焦点显示
	$("div.pic-list a.pic-item").each(function(i){
		if(i==noInPage)$(this).addClass("selected");
	});
	
	//从最后一张图跳到第一张图时，tip提示
	var tip=getCookieValue("jumpToFirstFromLast");
	if(tip=="true" && pageNow==1 && noInPage==0){
		$(".img-show-tips2").fadeIn();
		//如果点击立即关闭
		$(".img-show-tips2").click(function(){$(this).hide();});
		//不点击3秒后自动消失
		window.setTimeout(function(){$(".img-show-tips2").fadeOut();},3000);
	}
	

	function mousewheelHandle(event, delta){
		 logger(delta);
		 if (delta > 0){
			prevImage();
		 }else{
			nextImage();
		 }
	}
	try{
		$(document).mousewheel(function(event, delta) {
                        mousewheelHandle(event, delta);
		});
	}catch(e){
	}




/*
功能：点击图片列表
*/
$('div.pic-list').on('click','a.pic-item',function(){
//$("li[name='picIcon']").live("click",function(){
	var resultCount=$("#resultCount").val();
	//如果只有一张图片，说明就是它自己	?
	if(Number(resultCount)==1){
		location.reload();
		return;
	}
	var index=$(this).attr("index");//点击导航的第几张
	var pageNow = $("#pageNow").val();
	var queryString = $("#queryString").val();
	var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + pageNow + "/" + index+"?target="+getOriginUrlBySmallImageSrc($("div.pic-list a.pic-item img:eq("+index+")").attr("src"));
	window.location=urlTmp;
});



/*
功能：前一张图片
*/
$(".img-show-pre").live("click",prevImage);

function prevImage(){
	var queryString = $("#queryString").val();
	var noInPage = $("#noInPage").val();
	var pageNow = $("#pageNow").val();
	
	if(Number(noInPage)!=0){
		var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + pageNow + "/" + (Number(noInPage)-1)+"?target="+getOriginUrlBySmallImageSrc($("div.pic-list a.pic-item  img:eq("+(Number(noInPage)-1)+")").attr("src"));
		window.location=urlTmp;
	}else if(Number(pageNow)>1){
		//翻上一页
		var smallImageList=getSmallImageListByAjax(queryString,Number(pageNow)-1);
		var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + (Number(pageNow)-1) + "/" + 4 +"?target="+getOriginUrlBySmallImageSrc(smallImageList[4]);
		window.location=urlTmp;
	}
}


/*
功能：下一张图片
*/
$(".img-show-next").live("click",nextImage);

function nextImage(){
	var resultCount=$("#resultCount").val();
	//如果只有一张图片，说明就是它自己	
	if(Number(resultCount)==1){
		location.reload();
		return;
	}
	
	var queryString = $("#queryString").val();
	var noInPage = $("#noInPage").val();
	var pageNow = $("#pageNow").val();
	var pageCount = $("#pageCount").val();
	var resultCount = $("#resultCount").val();
	
	//一，非最后一页
	if(Number(pageNow)<Number(pageCount)){
		//1.1，非最后一张
		if(Number(noInPage)<4){
			var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + pageNow + "/" + (Number(noInPage)+1)+"?target="+getOriginUrlBySmallImageSrc($("div.pic-list a.pic-item  img:eq("+(Number(noInPage)+1)+")").attr("src"));
			window.location=urlTmp;
		}else{
			//1.2，最后一张，翻下一页
			var smallImageList=getSmallImageListByAjax(queryString,Number(pageNow)+1);
			var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + (Number(pageNow)+1) + "/" + 0 +"?target="+getOriginUrlBySmallImageSrc(smallImageList[0]);
			window.location=urlTmp;
		}
	}else if(Number(pageNow)==Number(pageCount)){
	//二，最后一页
		//2.1，最后一张，跳到第一页第一张
		if((Number(pageNow)-1)*5+Number(noInPage)+1==Number(resultCount)){
			//往cookie写一个标志位,有效期为10秒
			var expires=new Date();
			expires.setTime(expires.getTime()+10000);
			document.cookie="jumpToFirstFromLast=true;expires="+expires.toGMTString()+";path=/;domain=.baike.com";
			
			var smallImageList=getSmallImageListByAjax(queryString,1);
			var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + 1 + "/" + 0+"?target="+getOriginUrlBySmallImageSrc(smallImageList[0]);
			window.location=urlTmp;
		}else{
			//2.2，非最后一张
			var urlTmp = "http://tupian.baike.com/doc/" + queryString + "/tctupian/" + pageNow + "/" + (Number(noInPage)+1)+"?target="+getOriginUrlBySmallImageSrc($("div.pic-list a.pic-item  img:eq("+(Number(noInPage)+1)+")").attr("src"));
			window.location=urlTmp;
		}
	}	
		
}



/*
功能：下一页
*/
$("#nextPage").live("click",function(){
	nextPage();
	var pageNow = $("#pageNow").val();
	try{
		StatVirtualTraffic(document.referrer,window.location,pageNow);
	}catch(e){}
});

function nextPage(){
	var queryString = $("#queryString").val();
	var pageNow = $("#pageNow").val();
	var pageCount = $("#pageCount").val();
	
	if(Number(pageNow) < Number(pageCount)){
			var smallImageList=getSmallImageListByAjax(queryString,Number(pageNow)+1)
			//遍历picArray，创建相应li节点
			createSmallImageNode(smallImageList);
				
			//如果从第一页跳到第二页，上一页可点击
			if(Number(pageNow)==1){
				toggleDisable("prevPage",true);
			}
				
			//如果跳到了最后一页，下一页不可点击
			if(Number(pageNow)+1==Number(pageCount)){
				toggleDisable("nextPage",false);
			}
				
			//页面无刷新，手动改页面上pageNow的值，因为翻了若干页后，点击图片列表，需要pageNow参数
			$("#pageNow").val(Number(pageNow)+1);
	}
}

/*
功能：上一页
*/
$("#prevPage").live("click",function(){
	prevPage();
	var pageNow = $("#pageNow").val();
	try{
		StatVirtualTraffic(document.referrer,window.location,pageNow);
	}catch(e){}
});

function prevPage(){
	var queryString = $("#queryString").val();
	var pageNow = $("#pageNow").val();
	var pageCount = $("#pageCount").val();
	
	if(Number(pageNow) >1){	
			var smallImageList=getSmallImageListByAjax(queryString,Number(pageNow)-1)
			//遍历picArray，创建相应li节点
			createSmallImageNode(smallImageList);
				
			//如果从最后一页跳到倒数第二页，下一页可点击
			if(Number(pageNow)==Number(pageCount)){
				toggleDisable("nextPage",true);
			}
				
			//如果跳到了第一页，上一页不可点击
			if(Number(pageNow)-1==1){
				toggleDisable("prevPage",false);
			}
				
			//页面无刷新，手动改页面上pageNow的值，因为翻了若干页后，点击图片列表，需要pageNow参数
			$("#pageNow").val(Number(pageNow)-1);			
	}
}


/*
功能：Ajax获取某一页的的小图数组
*/
function getSmallImageListByAjax(queryString,pageNow){
	var smallImageList;
	$.ajax({
			type:"GET",
			url:"/tupian/getTuceListAjax",
			data:"queryString="+queryString+"&pageNow="+pageNow,
			dataType:"xml",
			async:false,
			success:function(xml){
				var searchResult=$(xml).find("searchResult").text();
				var picArray=searchResult.split("---");//长度为6，最后一项无用
				smallImageList= picArray;
			}
		});	
	
	return smallImageList;
}


/*
功能：创建导航小图的5个li节点
*/
function createSmallImageNode(smallImageArray){
	var pic_list = $("div.pic-list"),smallImageArray_divs = [];
	pic_list.empty();
	for(var i=0;i<smallImageArray.length-1;i++){
		var newSrc=smallImageArray[i].replace("\.jpg", "_140.jpg").replace("\.gif", "_140.gif").replace("\.jpeg", "_140.jpeg");
		var str="<a index="+i+" class='pic-item' href='javascript:void(0);'>";
			str+="<img src='"+newSrc+"'  onload='thumbnailResizeImage(this)' />";
			str+="<em></em></a>";
			smallImageArray_divs.push(str);
	}
	pic_list.append(smallImageArray_divs.join(''));	
}

/*
功能：上下页是否可点击
*/
function toggleDisable(selector,disable){
	if(disable){
		if(selector=='prevPage'){
			$('#'+selector).removeClass().addClass("prev-pic").css("cursor","pointer");
		}else{
			$('#'+selector).removeClass().addClass("next-pic").css("cursor","pointer");
		}
	}else{
		if(selector=='prevPage'){
			$('#'+selector).removeClass().addClass("prev-disabled").css("cursor","default");
		}else{
			$('#'+selector).removeClass().addClass("next-disabled").css("cursor","default");
		}
	}
}



/*
功能：为了pv统计，带上参数imageOriginUrl，由小图的src转换得到
*/
function getOriginUrlBySmallImageSrc(smallImageSrc){
	if(smallImageSrc==null || smallImageSrc=="")return "";
	var originUrl=smallImageSrc.replace("http://","").replace(".att.hudong.com/","_").replace(".att.hoodong.com/","_").replace("/","_").replace("/","_").replace("_140","");
	return originUrl;
}

var keyboard = {
	init : function() {
		if ($.browser.opera) {
			document.onkeypress = this.showKey;
		} else if ($.browser.msie) {
			document.onkeydown = this.showKeyIE;
		} else {
			document.onkeyup = this.showKey;
		}
	},
	KEY : {
			UP : 38,
			DOWN : 40
	},
	keyWhich : function(keyCode) {
		switch (keyCode) {
			case this.KEY.UP :
				prevImage();
				break;
			case this.KEY.DOWN :
				nextImage();
				break;
		};
	},
	showKeyIE : function() {
		var keyCode = event.keyCode;
		keyboard.keyWhich(keyCode);
	},
	showKey : function(event) {
		var keyCode = event.keyCode;
		keyboard.keyWhich(keyCode);
	}
}

try {
	keyboard.init();
} catch (e) {
}

});

/*
功能：直接截取cookie值
*/
function getCookieValue(cookieName){
	var index=document.cookie.indexOf(cookieName);
	if(index==-1)return "";
	//value的开始下标
	var start=index+cookieName.length+1;
	//value的结束下标
	var end=document.cookie.indexOf(";",start);
	
	if(end==-1){
		end=document.cookie.length;
	}
	
	return document.cookie.substring(start,end);
}









function getCookie(name){
	var start = document.cookie.indexOf(name + "=");
	var len = start + name.length + 1;
	if ((!start) && (name != document.cookie.substring(0, name.length))) {
		return null;
	}
	if (start == -1) 
		return null;
	var end = document.cookie.indexOf(';', len);
	if (end == -1) 
		end = document.cookie.length;
	return unescape(document.cookie.substring(len, end));
}


function checkURIDotitle(doctitle){
	if (doctitle == null || doctitle.length <=0) {
			return "";
		}else if(true == checkDocTitle(doctitle)){
			doctitle = doctitle.replace(/(^\s*)|(\s*$)/g, "");
			doctitle = doctitle.replace(/\/|\%|\\/g, "");
			doctitle = doctitle.replace(/\&/g, "%26");
			doctitle = doctitle.replace(/\+/g, "%2B");
			return encodeURIComponent(doctitle);
		}else{
			return encodeURI(doctitle);
		}
}
//检查doctitle是否含有特殊字符
function checkDocTitle(doctitle){
	var reg =/[\+|\#|\&]+/;
	if(reg.test(doctitle)){
		return true;
	}
	return false;
}