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
  	}

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

	var fileref, parallaxDiv, myScroll, setIScroll;

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

	// set Scroller Div
	document.addEventListener("DOMContentLoaded", function(e) {
		var scrollerDiv;
		parallaxDiv = document.querySelector(".parallax");
		var scrollerDiv = document.createElement("div");
		scrollerDiv.setAttribute("class", 'scroller');
		scrollerDiv.innerHTML = parallaxDiv.innerHTML;
		parallaxDiv.innerHTML = scrollerDiv.outerHTML;

		// initial setting
		var groups = document.querySelectorAll('.parallax-group');
		for (var i = 0; i < groups.length; i++) {
			// childNode for IE >= 8
			var details = groups[i].childNodes;
			for (var j = 0; j < details.length; j++) {
				if (details[j].nodeName == '#text') {
					continue;
				} else if (details[j].classList.contains('parallax-layer-back')) {
					var top = -50 * i;
					details[j].style.top = top+'vh';

					scrollerDiv = document.createElement("div");
					scrollerDiv.setAttribute("class", 'scroller-back');
					scrollerDiv.innerHTML = details[j].outerHTML;
					details[j].outerHTML = scrollerDiv.outerHTML;
				} else if (details[j].classList.contains('parallax-layer-fore')) {
					var top = 100 * i;
					details[j].style.top = top+'vh';
					scrollerDiv = document.createElement("div");
					scrollerDiv.setAttribute("class", 'scroller-fore');
					scrollerDiv.innerHTML = details[j].outerHTML;
					details[j].outerHTML = scrollerDiv.outerHTML;
				}
			}
		}
	});

	function loaded () {
		var indicators = [];
		var scrollerBackDiv = document.querySelectorAll('.scroller-back');
		var scrollerForeDiv = document.querySelectorAll('.scroller-fore');

		for (var i = 0; i < scrollerBackDiv.length; i++) {
			indicators.push({
				el: scrollerBackDiv[i],
				resize: false,
				ignoreBoundaries: true,
				speedRatioY: -0.5
			});
		}

		for (var i = 0; i < scrollerForeDiv.length; i++) {
			indicators.push({
				el: scrollerForeDiv[i],
				resize: false,
				ignoreBoundaries: true,
				speedRatioY: 1
			});
		}

		console.log(indicators);

		myScroll = new IScroll('.parallax', {
			mouseWheel: true,
			indicators: indicators
		});
	}


	// prevent touchmove event
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	window.addEventListener('load', loaded);
};