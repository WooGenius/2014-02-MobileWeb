var MOBILE_CSSPATH = "css/parallax-genius-mobile.css";
var CSSPATH = "css/parallax-genius.css";
var ISCROLLPATH = "lib/iscroll.js";


function detectBrowser() { 

	// for mobile
	if(navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)){
		return "Mobile";

	// for IE
  	} else if(navigator.appName == 'Microsoft Internet Explorer') {
  		var ver;
  		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			ver = parseFloat( RegExp.$1 );

	    if ( ver >= 9.0 ) 
	      	return "IE9 over";
	    else
	    	return "IE9 under";

  	};

	// for moderm browser
  	return "Modern Browser";
};

if (detectBrowser() == "Modern Browser") {

	// import parallax-genius.css
	var fileref=document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", CSSPATH);
	document.getElementsByTagName("head")[0].appendChild(fileref);

} else {

	var fileref, scrollerDiv, parallaxDiv, myScroll, setIScroll;

	// import iscroll.js
	fileref = document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", ISCROLLPATH);
	document.getElementsByTagName("head")[0].appendChild(fileref);;

	// import parallax-genius-mobile.css
	fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", MOBILE_CSSPATH);
	document.getElementsByTagName("head")[0].appendChild(fileref);

	// // set Scroller Div
	// document.addEventListener("DOMContentLoaded", function(e) {
	// 	scrollerDiv = document.createElement("div");
	// 	scrollerDiv.setAttribute("id", "scroller");
	// 	parallaxDiv = document.querySelector(".parallax");
	// 	scrollerDiv.innerHTML = parallaxDiv.innerHTML;
	// 	parallaxDiv.innerHTML = scrollerDiv.outerHTML;
	// });



	function loaded () {
		myScroll = new IScroll('#wrapper', {
			mouseWheel: true,
			indicators: [{
				el: document.querySelector('.parallax-group'),
				resize: false,
				ignoreBoundaries: true,
				speedRatioY: -1
			}]
		});
	}


	// prevent touchmove event
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	window.addEventListener('load', loaded);
};