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
/* App Module */
angular.module('vtApp', ['ionic', 'ngResource', 'ngSanitize','vtApp.controllers','vtApp.services', 'vtApp.filter', 'angularSpinner'])

.run(function($ionicPlatform) {

	$ionicPlatform.ready(function() {

		/// Add device specific stuff here		
        myconsolelog('Cordova is ready');																

		/// Hide Splash Screen
		navigator.splashscreen.hide();  	// for app

		/// Load App Settings												
		LoadAppSettings();					// for app

		/// Check Internet Connection
		 CheckInternetConnection();			// for app

		/// Enable Push Notification
		// initPushService();				// for app

	});
})

.config(function($stateProvider, $urlRouterProvider)
{

    //myconsolelog('State Provider');

	$stateProvider
		.state('sidemenu', {
			url: "/sidemenu",
			abstract: true,
			templateUrl: "view/side-menu.html"
		})

		.state("sidemenu.about", {
			url: "/about",
			views: {
				"sidemenuContent" :{
					templateUrl: "view/about.html",
					controller: "AboutCtrl"
				}
			}
		})

		.state("sidemenu.login", {
			url: "/login",
			views: {
				"sidemenuContent" :{
					templateUrl: "view/login.html",
					controller: "LoginCtrl"
				}
			}
		})

		.state("sidemenu.forgotpassword", {
			url: "/forgotpassword",
			views: {
				"sidemenuContent" :{
					templateUrl: "view/forgot-password.html",
					controller: "ForgotPasswordCtrl"
				}
			}
		})

		.state("sidemenu.register", {
			url: "/register",
			views: {
				"sidemenuContent" :{
					templateUrl: "view/register.html",
					controller: "RegisterCtrl"
				}
			}
		})


		.state("sidemenu.updateprofile", {
			url: "/updateprofile",
			views: {
				"sidemenuContent" :{
					templateUrl: "view/update-profile.html",
					controller: "UpdateProfileCtrl"
				}
			}
		})



		.state("sidemenu.photogallery", {
			url: "/photogallery",
			views: {
				"sidemenuContent" :{
					templateUrl: "view/photogallery.html",
					controller: "PhotoGalleryCtrl"
				}
			}
		})

		.state("sidemenu.photoupload", {
			url: "/photoupload",
            views: {
				"sidemenuContent" :{
					templateUrl: "view/photo-upload.html",
					controller: "PhotoUploadCtrl"
				}
			}
		})

		;	//State Provider End

    	$urlRouterProvider.otherwise("/sidemenu/login");		// Default route

});
