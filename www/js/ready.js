///----------------------------------------------------------------------------------------------------
///	Mobile App Built & Owned by: Vensatile Technologies 
/// URL: http://www.vensatile.com
/// - Custom js code, html-css markup created/developed are part of this mobile app.
///	- Do not reuse or share any code from this app without permission from concern person or company.
///----------------------------------------------------------------------------------------------------
///	Disclaimer:
/// - We does not claim ownership for html-css, js, mobile gui, or any framework used in this app.
/// - Html, css, javascript, and app gui framework are property of the company who built and own it.
///----------------------------------------------------------------------------------------------------
		if (window.cordova){
			document.addEventListener('deviceready', function() {				
				angular.bootstrap(document.body, ['vtApp']);
			}, false);			
		}else{	
			angular.element(document).ready(function() {				
				angular.bootstrap(document, ['vtApp']);	
			});			
		} 
///----------------------------------------------------------------------------------------------------  	