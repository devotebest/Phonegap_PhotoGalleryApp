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


angular.module('vtApp.controllers', [])

///----------------------------------------------------------------------
/// Side Menu Content Ctrl
///----------------------------------------------------------------------
.controller('SideMenuContentCtrl', function($scope, $rootScope, $ionicSideMenuDelegate) {

//	myconsolelog('SideMenuContentCtrl');

	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.toggleRightSideMenu = function() {
		$ionicSideMenuDelegate.toggleRight();
	};

	$scope.main = {};
    $scope.main.allowSideMenuDrag = false;
	
	// Create shared variable list.
	$rootScope.sharedVars = {	
		app_platform : APP_PLATFORM,
		
	}

	// Create shared variable list.
	$rootScope.user = {	
		userobjectid : '',
		username : '',
		firstname : 'Guest',		
		lastname : '' 
	}

	//initialise parse object. so you can use it anywhere
	Parse.initialize( PARSE_APP_ID , PARSE_JS_KEY );

})


///----------------------------------------------------------------------
/// Side Menu Left Data Ctrl
///----------------------------------------------------------------------
.controller('SideMenuLeftDataCtrl', function($scope, $ionicSideMenuDelegate) {

//	myconsolelog('SideMenuLeftDataCtrl');   // Debug only			

	// Side menu left close button
	$scope.closeSideMenuLeft = function() {
		if($ionicSideMenuDelegate.isOpenLeft())
		{
			$ionicSideMenuDelegate.toggleLeft();
		}
	}

})
///----------------------------------------------------------------------



///----------------------------------------------------------------------
/// Side Menu Right Data Ctrl
///----------------------------------------------------------------------
.controller('SideMenuRightDataCtrl', function($scope, $ionicSideMenuDelegate, $location ) {

//	myconsolelog('SideMenuRightDataCtrl');

	// Set app title and version
	$scope.apptitle = APP_TITLE;
	$scope.appversion = 'v' + APP_VERSION;

	$scope.closeSideMenuRight = function() {
		if($ionicSideMenuDelegate.isOpenRight())
		{
			$ionicSideMenuDelegate.toggleRight();
		}
	}


	$scope.logoutClicked = function() {
		Parse.User.logOut();		
		// redirect to login page 
		$location.path("/sidemenu/login");
	}


})
///----------------------------------------------------------------------


///----------------------------------------------------------------------
/// About Ctrk
///----------------------------------------------------------------------
.controller('AboutCtrl', function($scope, $ionicSideMenuDelegate) {

	//myconsolelog('AboutCtrl');   // Debug only			

	$scope.main.allowSideMenuDrag = true;
	$scope.navTitle = "About App";


})
///----------------------------------------------------------------------



///----------------------------------------------------------------------
/// Login Ctrl
///----------------------------------------------------------------------
.controller('LoginCtrl', function($scope, $rootScope, $location, usSpinnerService ){ 

	//myconsolelog('LoginCtrl');

	$scope.main.allowSideMenuDrag = false;
	$scope.navTitle = APP_TITLE;

	// stop spinner
	usSpinnerService.stop('myspinner');

	//Hide page header bar
	//StatusBar.hide(); 

	//if user already logged in then redirect to photo gallery page.
	var currentUser = Parse.User.current();
	if (currentUser) {					
		// debug
		// alert("Already logged in. User Info: " + JSON.stringify(currentUser));		
		// alert("objectId" + currentUser.id);
		
		// set login parameter in right panel
		$rootScope.user.userobjectid = currentUser.id;
		$rootScope.user.username = currentUser.get("username");
		$rootScope.user.firstname = currentUser.get("firstname");
		$rootScope.user.lastname = currentUser.get("lastname");				
		
		// redirect to photo gallery page
		$location.path("/sidemenu/photogallery");		
	} else {		
		// show the signup or login page, or redirect etc.
		// Debug
		//alert("Please login to continue.");	
	}

})

.controller('LoginFormCtrl', function($scope, $rootScope, $window, usSpinnerService ) {

	// Define Default Value
	$scope.m_myemail = '';
	$scope.m_mypassword = '';
	
	//Define VAlidation Pattern
	$scope.p_mypassword = /^\s*\w*\s*$/;   	// Allow one word only

	// A Confirm Form Submit dialog
    $scope.ConfirmFormSubmit = function(){         						
		// validate form status
		if($scope.myForm.$valid == false ){ 
			return;
		}else{
			$scope.DoFormSubmit2(); 
			return;
		}		    
	} // ConfirmFormSubmit


	// Form Submit Function
    $scope.DoFormSubmit2 = function(){					
		/// show spinner
		usSpinnerService.spin('myspinner');

		/// submit login info for validation
		Parse.User.logIn( 
			$scope.m_myemail , 
			$scope.m_mypassword , 
			{
				success: function(user) {
					// successful login.					
					// stop spinner 
					usSpinnerService.stop('myspinner');
				
					// set right panel parameter
					$rootScope.user.userobjectid = user.id;					
					$rootScope.user.username = user.get("username");
					$rootScope.user.firstname = user.get("firstname");
					$rootScope.user.lastname = user.get("lastname");			
				
					// redirect to photo gallery 
					//$location.path("/sidemenu/photogallery");	  //(Not work with parse)			
					$window.location.href = "#/sidemenu/photogallery";																																						
				},
				error: function(user, error) {
					// The login failed.					
					// stop spinner
					usSpinnerService.stop('myspinner');
				
					// Show error message.							
					if( typeof window.plugins === 'undefined' ){
						alert("Login Error: " + error.code + " \n" + error.message, null,'Login Error','Ok');  // Debug only
					}else{
						navigator.notification.alert("Login Error: " + " \n" + error.message, null,'Login Error','Ok');  //  For APP Version											
					}					
				}
			}
		); // END - Parse.User.logIn

    } /// End - $scope.DoFormSubmit2

})
///----------------------------------------------------------------------



///----------------------------------------------------------------------
/// Forgot Password Ctrl
///----------------------------------------------------------------------
.controller('ForgotPasswordCtrl', function($scope, usSpinnerService){ 

//	myconsolelog('ForgotPasswordCtrl');
	
	$scope.main.allowSideMenuDrag = false;
	$scope.navTitle = "Forgot Password";

//	usSpinnerService.stop('myspinner');

})

.controller('ForgotPasswordBackButtonCtrl', function($scope, $ionicNavBarDelegate) {
	$scope.backToLogin = function() {
		$ionicNavBarDelegate.back();
	}	// End - backToLogin
})

.controller('ForgotPasswordFormCtrl', function( $scope, $window, $ionicPopup, usSpinnerService ) {
		
	//set variable default value
	$scope.m_myemailid = ""; 	
							
	// A Confirm Form Submit dialog
    $scope.ConfirmFormSubmit = function(){
		// validate form status
		if($scope.myForm.$valid == false ){ 
			return;
		}else{
			$scope.DoFormSubmit2(); 
			return;
		}								    
	} // END - ConfirmFormSubmit

	// Form Submit Function
    $scope.DoFormSubmit2 = function(){					
		/// show spinner
		usSpinnerService.spin('myspinner');

		/// submit password reset request
		Parse.User.requestPasswordReset( 
			$scope.m_myemailid , 
			{
				success: function() {
					// Password reset request send successfully.					
					// stop the spinner 
					usSpinnerService.stop('myspinner');
										
					// Show error message.							
					if( typeof window.plugins === 'undefined' ){
						alert("Password reset request was sent to email successfully", null,'Confirmation','Ok');  // Debug only
					}else{
						navigator.notification.alert("Password reset request was sent to email successfully", null,'Confirmation','Ok');  //  For APP Version											
					}		
	
					// redirect to login page
					//$location.path("/sidemenu/login");	  //(Not work with parse)				
					$window.location.href = "#/sidemenu/login";																																																								
				},
				error: function(error) {
					// error for password reset request 					
					// stop spinner
					usSpinnerService.stop('myspinner');
				
					// Show error message.							
					if( typeof window.plugins === 'undefined' ){
						alert("Error: " + error.code + " \n" + error.message, null,'Error','Ok');  // for browser
					}else{
						navigator.notification.alert("Error: " + " \n" + error.message, null,'Error','Ok');  //  For APP											
					}										
				}
			}
		); // END - Parse.User.requestPasswordReset

    } /// End - $scope.DoFormSubmit2

})
///----------------------------------------------------------------------



///----------------------------------------------------------------------
/// User Register Ctrl
///----------------------------------------------------------------------
.controller('RegisterCtrl', function($scope){ 

	//myconsolelog('RegisterCtrl');
	
    $scope.main.allowSideMenuDrag = false;
	$scope.navTitle = "New User Register";

	//usSpinnerService.stop('myspinner');

})

.controller('RegisterBackButtonCtrl', function($scope, $ionicNavBarDelegate) {
	$scope.backToLogin = function() {
		$ionicNavBarDelegate.back();
	}	// End - backToLogin
})

.controller('RegisterFormCtrl', function( $scope, $window, $ionicPopup, usSpinnerService ) {
		
	//set variable default value
	$scope.m_myemailid = ""; 	
	$scope.m_mypassword = "";	
	$scope.m_mypassword2 = "";				
	$scope.m_myfirstname = "";		
	$scope.m_mylastname = "";
		
	//Define Validation Pattern	
	$scope.p_mypassword = /^\s*\w*\s*$/;   		// Allow one word only	
	$scope.p_mypassword2 = /^\s*\w*\s*$/;   	// Allow one word only	
	$scope.p_myfirstname = /^\s*\w*\s*$/;   	// Allow one word only
	$scope.p_mylastname = /^\s*\w*\s*$/;   		// Allow one word only

	// validation for newpassword and confirm new password same
	$scope.isCofirmPasswordValid = function(){					
		return $scope.m_mypassword != $scope.m_mypassword2; 
	};				

							
	// A Confirm Form Submit dialog
    $scope.ConfirmFormSubmit = function(){				      
   		// validate form status
		if( $scope.myForm.$valid == false ){						
			if( typeof device === 'undefined' ){ 							
				alert('Please fillup required/valid information.', 'Invalid Info.' , 'Ok' );	
			}else{
				window.plugins.toast.showLongCenter('Please fillup required/valid information.');  
			}																					
			return;		
		}										
		
		// Ask for Form submit confirmation			
		if( typeof window.plugins === 'undefined' ){ 	
			////////////////////////// for Browser ///////////////////////////////
			// Ask for Form submit confirmation
			$ionicPopup.confirm( { title: 'Confirm', content: 'Are you sure to submit?' })
							.then( function(response){
									if(response){ 
										$scope.DoFormSubmit(); 
									}
							  });
			//////////////////////////////////////////////////////////////////			
		}else{
			///////////////////// for App /////////////////////////////
			// Ask for Form submit confirmation
			navigator.notification.confirm('Are you sure to submit?', HandleConfirmResponse, 'Confirm', 'Ok, Cancel');
			function HandleConfirmResponse(buttonIndex){
			   if( buttonIndex == 1 ){	
					$scope.DoFormSubmit();	// Ok clicked
			   }else if( buttonIndex == 2 ){					
					return false;		   // Cancel Clicked
			   }
			}
			//////////////////////////////////////////////////////////////////	
		}
		
							    
	} // END - ConfirmFormSubmit


	// Form Submit Function
    $scope.DoFormSubmit = function()
	{
		/// show spinner 
		usSpinnerService.spin('myspinner');

		// perform sign up process
		var user = new Parse.User();
		user.set("username", $scope.m_myemailid );
		user.set("password", $scope.m_mypassword );
		user.set("email", $scope.m_myemailid );

		// other fields can be set just like with Parse.Object
		user.set("firstname", $scope.m_myfirstname );
		user.set("lastname", $scope.m_mylastname );
		
		// do sigun up action 
		user.signUp( null, {
			success: function(user) {				
				// Debug
				//console.log("Registered Successfully \n " + JSON.stringify(user) );
				
				// stop spinner
				usSpinnerService.stop('myspinner');	
				
				// show message
				if( typeof window.plugins === 'undefined' ){
					alert("Registered Successfully", null,'Confirmation','Ok');  // Debug only
				}else{
					navigator.notification.alert("Registered Successfully", null,'Confirmation','Ok');  //  For APP Version											
				}													
				
				// redirect to login page.
				//$location.path("/sidemenu/login");   //  //(Not work with parse)
				$window.location.href = "#/sidemenu/login";					
			},
			error: function(user, error) {				
				// debug
				//console.log("Registration Error: " + error.code + " \n " + error.message );
								
				// stop spinner
				usSpinnerService.stop('myspinner');
									
				// Show the error message.
				if( typeof window.plugins === 'undefined' ){
					alert("Registration Error: " + " \n " + error.message, null,'Error','Ok');  // Debug only
				}else{
					navigator.notification.alert("Registration Error: " + " \n " + error.message, null,'Error','Ok');  //  For APP Version											
				}													
				
			}
		});   /// END - user.signUp

	} /// End - $scope.DoFormSubmit

})
///----------------------------------------------------------------------






///----------------------------------------------------------------------
/// Update user profile
///----------------------------------------------------------------------
.controller('UpdateProfileCtrl', function($scope){ 

	//myconsolelog('UpdateProfileCtrl');
	
    $scope.main.allowSideMenuDrag = false;
	$scope.navTitle = "Update Profile";

	//usSpinnerService.stop('myspinner');

})

.controller('UpdateProfileFormCtrl', function( $scope, $rootScope, $window, $ionicPopup, usSpinnerService ) {
		
	//set variable default value
	$scope.m_myemailid = ""; 	
	$scope.m_myfirstname = "";		
	$scope.m_mylastname = "";
	$scope.m_mypassword = "";		
		
	//Define Validation Pattern	
	$scope.p_myfirstname = /^\s*\w*\s*$/;   	// Allow one word only
	$scope.p_mylastname = /^\s*\w*\s*$/;   		// Allow one word only
	$scope.p_mypassword = /^\s*\w*\s*$/;   		// Allow one word only	

	//Set default value to form
	var currentUser = Parse.User.current();
	if (currentUser) {	
		$scope.m_myemailid = currentUser.get("username");	
		$scope.m_myfirstname = currentUser.get("firstname"); 	
		$scope.m_mylastname = currentUser.get("lastname"); 
	} else {		
		// redirect to login page if current user not available.
		//$location.path("/sidemenu/login");   //  //(Not work with parse)
		$window.location.href = "#/sidemenu/login";
	}

							
	// Form Submit Function
    $scope.DoFormSubmit = function()
	{
		/// show loader 
		usSpinnerService.spin('myspinner');

		/// submit login info to receive updatable user object
		Parse.User.logIn( 
			$scope.m_myemailid , 
			$scope.m_mypassword , 
			{
				success: function(user) {
					
					// stop spinner
					usSpinnerService.stop('myspinner');
					
					// chnage information in object					
					user.set("firstname", $scope.m_myfirstname );  // attempt to change username
					user.set("lastname", $scope.m_mylastname );  // attempt to change username					
					
					// call save function
					user.save( null, 
					{
						success: function(user) {							
							//update value in global scope for right panel
							$rootScope.user.firstname = user.get("firstname");
							$rootScope.user.lastname = user.get("lastname");																	
							
							// display message
							if( typeof window.plugins === 'undefined' ){
								alert("Profile Updated", null,"Confirm",'Ok');  // browser
							}else{
								navigator.notification.alert("Profile Updated", null,"Confirm",'Ok');  //  For APP Version											
							}					
						}
					}); // END - user.save
					
				},
				error: function(user, error) {	
					// stop spinner
					usSpinnerService.stop('myspinner');
				
					// Show error message.							
					if( typeof window.plugins === 'undefined' ){
						alert("Error: " + error.code + " \n" + error.message, null,'Error','Ok');  // Debug only
					}else{
						navigator.notification.alert("Error: " + " \n" + error.message, null,'Error','Ok');  //  For APP Version											
					}					
				}
			}
		); // END - Parse.User.logIn


	} /// End - $scope.DoFormSubmit

})
///----------------------------------------------------------------------






///----------------------------------------------------------------------
/// Photo Gallery Ctrl
///----------------------------------------------------------------------
.controller('PhotoGalleryCtrl', function( $scope, $rootScope, $ionicModal, usSpinnerService ){ 

	//myconsolelog('RegisterCtrl');
	
    $scope.main.allowSideMenuDrag = false;
	$scope.navTitle = "Photo Gallery";

	//usSpinnerService.stop('myspinner');

	// refresh photo list  
    $scope.refreshPhotoList = function()
	{	
		// create class
		var clsPhotos = Parse.Object.extend("Photos");
			
		// create query
		var queryPhoto = new Parse.Query(clsPhotos);
		
		// set query parameter
		queryPhoto.equalTo("userobjectid", $rootScope.user.userobjectid );
		queryPhoto.limit(100);
		queryPhoto.descending("createdAt");
		
		// fire query
		queryPhoto.find({
			success:function(results) {
				//alert(JSON.stringify(results));  // Debug
				strresult = JSON.stringify(results);
				objresult = JSON.parse(strresult);	
				
				//alert(objresult.length);
				$scope.photocount = objresult.length;
	
				$scope.photos = objresult; 
				$scope.$apply(); 												
			},
			error:function(error) {
				alert('Error: ' + error.code + error.message); 
			}
		});	
	
	}
	
	// this will show/refresh photo list
	$scope.refreshPhotoList();


	$scope.doPageRefresh = function()
	{
		$scope.refreshPhotoList();
		$scope.$broadcast('scroll.refreshComplete'); 
	}
	
	
	$scope.photoDeleteClicked = function(objectId) {

		/// stop spinner 
		usSpinnerService.spin('myspinner');

		//alert("Delete Clicked - Object Id: " + objectId);	
		var clsPhotos = Parse.Object.extend("Photos");
		var query = new Parse.Query(clsPhotos);
		query.get(objectId, {
		  success: function(objPhoto) { 
			$scope.deletePhotoRecordFromServer(objPhoto);
		  },
		  error: function(objectPhoto, error) {
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and message.
			alert("Get Error: " + error.code + "\n" + error.message );	
		  }
		});					
		
	}	// End - photoDelete

	$scope.deletePhotoRecordFromServer = function(objPhotoToDelete)
	{		
		objPhotoToDelete.destroy({
		  success: function(myObject) {		
			/// stop spinner 
			usSpinnerService.stop('myspinner');

			// object deleted from Parse Cloud.
			$scope.refreshPhotoList(); 		  	
			if( typeof device === 'undefined' ){ 
				alert("Photo deleted.");
			}else{
				window.plugins.toast.showLongCenter("Photo deleted."); 
			}																				
		  },
		  error: function(myObject, error) {			  
			// The delete failed.
			// error is a Parse.Error with an error code and message.	
			alert("Delete error: " + error.code + "\n" + error.message );
		  }
		});	
	}


	///////////////////////////////////////////////////////////////////////////	
	// Show photo large image
	///////////////////////////////////////////////////////////////////////////	
	$scope.openPhotoLargeModalPage =  function(objPhoto){
		//console.log("openPhotoLargeModalPage");
		
		// set clicked photo as active photo
		$scope.activePhoto = objPhoto;
		
		// clickedIndex not used at present
		$ionicModal.fromTemplateUrl('view/photo-large-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modalPagePhoto = modal;
			$scope.modalPagePhoto.show()
		});
	}

	$scope.closePhotoLargeModalPage = function() {
		if( typeof $scope.modalPagePhoto != 'undefined' )
		{
			$scope.modalPagePhoto.remove();
			//myconsolelog("closePhotoLargeModalPage() Called");
		}
	}

	//Cleanup modal when scope unload  i.e. poge  unload
	$scope.$on('$destroy', function() {
		if( typeof $scope.modalPagePhoto != 'undefined' )
		{
			$scope.modalPagePhoto.remove();
			//myconsolelog("$destroy - modalPagePhoto.remove() Called"); //Debug
		}
	});
	///////////////////////////////////////////////////////////////////////////

})
///----------------------------------------------------------------------



///----------------------------------------------------------------------
/// Photo Upload Ctrl
///----------------------------------------------------------------------
.controller('PhotoUploadCtrl', function( $scope, $rootScope, $stateParams, $location, $timeout, usSpinnerService ) {

//	myconsolelog('RegisterCtrl');
	
    $scope.main.allowSideMenuDrag = false;
	$scope.navTitle = "Upload Photo";

	// set variable to keep track for upload in progress	
	$scope.uploadStatusText = "";		// show upload status text during file upload. e.g. Uploading 14% 	
	$scope.isPhotoUploading = "NO";		// it will set YES when photo upload in progress		
	
	// variable for member used for module
	$scope.photoFolderUrl = "photogallery/";
	
	// set default image for preview
	$scope.previewPhotoSource = "./img/upload_photo_preview.png";
	
	$scope.showPhotoSelectButton = true ;
	$scope.showPhotoUploadButton = false ;
	$scope.showPhotoCancelButton = false ;


	////////////////////////////Photo Uplaod///////////////////////////////////
	
	// Function -  Select Photo from Source 
	$scope.selectPhotoFromSource = function(selectedSourceType) {	
		
		// selectedSourceType = 0  for Photo Gallery  
		// selectedSourceType = 1 for Camera 
		
		if( typeof window.plugins === 'undefined' ){ 
			alert('Photo Source Type: ' + selectedSourceType ); // Debug + Browser
			return; 
		} 			
						
		// Retrieve image file location from specified source
       var cameraPopoverHandle = navigator.camera.getPicture( 	
										// success callback
										$scope.previewSelectedPhoto,
																				
										// Cancel Callback ( Cancel Clicked OR Camera Initialise Error etc)
										function(message) {											
											//alert('Cancel Clicked');	// Debug
											//showAdMobBottomBanner();   // Start AdMob Banner													
										},										
										
										// camera Options 
										{ 
											// NOT USED // sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY, // 0 - PHOTOLIBRARY, 1 - CAMERA, 2 - SAVEDPHOTOALBUM										
											// NOT USED // destinationType : navigator.camera.DestinationType.FILE_URI ,	// 0 - DATA_URL ( base 64) , 1 - FILE_URI, 2 - NATIVE_URI 													
											quality : 50,													// image quality, default 50
											destinationType : navigator.camera.DestinationType.FILE_URI ,	// 0 - DATA_URL ( base 64) , 1 - FILE_URI, 2 - NATIVE_URI 													
											sourceType : selectedSourceType ,								// 0 - PHOTOLIBRARY, 1 - CAMERA, 2 - SAVEDPHOTOALBUM	
											mediaType : navigator.camera.MediaType.PICTURE,   				// 0 - PICTURE, 1 - VIDEO ,  2 - ALLMEDIA
											//allowEdit : true,												// support in iOS only
											encodingType: navigator.camera.EncodingType.JPEG,				// JPEG, PNG
											targetWidth: 800,												// iOS only
											targetHeight: 600,												// iOS only
											//popoverOptions: new CameraPopoverOptions(300,300,480,640, 2 ),   // IOS - iPAD Only	
										 	cameraDirection: navigator.camera.Direction.BACK,				//  iOS only - BACK, FRONT, Android support BACK all time										 	
											saveToPhotoAlbum: false	
										}
																																																
									); // END - navigator.camera.getPicture									
	
	}  // END - $scope.uploadPhotoWithSource 


	// Function - Upload selected photo using file transfer
	$scope.previewSelectedPhoto = function (imageURI){ 
	
		// if ios then set preview image source as imageURI
		if( $rootScope.sharedVars.app_platform == "IOS" ){
			$scope.previewPhotoSource = imageURI;	
		}
	
		// save image uri in variable for fuurther use
		$scope.selectedPhotoURI = imageURI;  		// Image URI will be file url.
		$scope.selectedPhotoBase64Data  =  "" ; 	// it will be converted by function and set.
		
		// convert imageURI to base64 Data 
		$scope.convertImgToBase64( $scope.selectedPhotoURI, $scope.setSelectedPhotoBase64Data,"image/jpeg" ); 	
				
		$scope.showPhotoSelectButton = false ;
		$scope.showPhotoUploadButton = true ;
		$scope.showPhotoCancelButton = true ;				
		$scope.$apply();
		
	}	//END - $scope.uploadPhoto			

	// It will receive base64 image data and set to scope variblale	
    $scope.setSelectedPhotoBase64Data = function(base64ImgData) { 		
		$scope.selectedPhotoBase64Data = base64ImgData;
		// if android then set preview image as base64 data
		if( $rootScope.sharedVars.app_platform == "ANDROID" ){
			$scope.previewPhotoSource =  base64ImgData;			
			$scope.$apply();
		}
	}
	
	
	// Function - Callback - Upload Photo Success 	
    $scope.cancelSelectedPhoto = function() {

		// set upload text null
		$scope.uploadStatusText = "" ;
				
		// set default preview image.
		$scope.previewPhotoSource = "./img/upload_photo_preview.png";
		
		//set selected photo URI and Base64Data empty.
		$scope.selectedPhotoURI = "";
		$scope.selectedPhotoBase64Data = "";	
		
		$scope.showPhotoSelectButton = true ;
		$scope.showPhotoUploadButton = false ;
		$scope.showPhotoCancelButton = false ;
		//$scope.$apply();
		
		//return;
	}

	// Function - Callback - Upload Photo Success 	
    $scope.hideUploadButton = function() {
		$scope.showPhotoSelectButton = false;
		$scope.showPhotoUploadButton = false ;
		$scope.showPhotoCancelButton = false ;				
		//return;
	}
	
	
	// Function - Upload selected photo using file transfer
	$scope.uploadSelectedPhoto = function () {

		/// show spinner 
		usSpinnerService.spin('myspinner');
				
		// set uploading status to YES
		$scope.isPhotoUploading = "YES";	
				
		// hide upload button
		$scope.hideUploadButton();
		
		$scope.uploadStatusText = "Uploading...." ;
		
		$scope.uploadSelectedPhotoOnServer();				
	
	}	//END - $scope.uploadPhoto			
	

	// uploadPhotoOnServer 
    $scope.uploadSelectedPhotoOnServer = function()
	{																
		// if base64 data not available then show error.
		if( $scope.selectedPhotoBase64Data == "")
		{			
			/// stop spinner 
			usSpinnerService.stop('myspinner');
						
			alert("Image Base64 Data Not Found.");
			$scope.cancelSelectedPhoto();
			return;
		}
		
		// create File object
		var objImageFile = new Parse.File("photo.jpg", {base64: $scope.selectedPhotoBase64Data }, "image/jpg");	
		
		objImageFile.save().then(
			// file saved then add record
			function() 
			{					
		    	var clsPhotos = Parse.Object.extend("Photos");						
				var objPhoto = new clsPhotos();	

				objPhoto.set("phototitle", "Default Title");
				objPhoto.set( "photoimage", objImageFile);
				objPhoto.set("userobjectid", $rootScope.user.userobjectid ); 
				
				objPhoto.save( null, {					
					success:function(ob) {
						$scope.uploadPhotoSuccess();																		 
					}, 
					error:function(error) {
						$scope.uploadPhotoFail(error);
					}
				});
				
			}, 
			function(error) {
				console.log("Photo Save error:" + error); 
			});
					  
    } /// End - uploadPhotoOnServer


	// Function - Callback - Upload Photo Success 	
    $scope.uploadPhotoSuccess = function() {

		/// stop spinner 
		usSpinnerService.stop('myspinner');

		//set selected photo URI and Base64Data empty.
		$scope.selectedPhotoURI = "";
		$scope.selectedPhotoBase64Data = "";	
				
		$scope.isPhotoUploading = "NO";
		$scope.uploadStatusText = "Photo Uploaded.";
		$scope.$apply();							

		if( typeof device === 'undefined' ){ 
			alert("Photo Uploaded.");
		}else{
			window.plugins.toast.showLongCenter("Photo Uploaded."); 
		}											

		// redirect to photogallery
		$location.path("/sidemenu/photogallery"); 
															
		$timeout(function() {
					$scope.uploadStatusText = "";
					$scope.$apply();
				}, 6000);
	
		// reset button to upload new photo.
		$scope.cancelSelectedPhoto();
				
	}	// END - $scope.uploadPhotoSuccess
	

	// Function - Upload Photo Fail
	$scope.uploadPhotoFail =  function(error) {

		/// stop spinner 
		usSpinnerService.stop('myspinner');
	
		$scope.isPhotoUploading = "NO";		
		$scope.uploadStatusText = "Upload Failed.";	
		$scope.$apply();
				
		$timeout(function() {
					$scope.uploadStatusText = "";
					$scope.$apply();
				}, 8000);				
		   																					
		if( typeof device === 'undefined' ){ 
			alert("Upload Failed, Record Save Error.");
		}else{
			window.plugins.toast.showLongCenter("Upload Failed, Record Save Error : " + error.message ); 
		}
		
		// reset button to upload new photo.	
		$scope.cancelSelectedPhoto();
		
	}  // END - $scope.uploadPhotoFail


	// this function will convert image to base64 string 
    $scope.convertImgToBase64 = function(url, callback, outputFormat)
	{														
		var canvas = document.createElement('CANVAS'),
		ctx = canvas.getContext('2d'),
		img = new Image;
		img.crossOrigin = 'Anonymous';		
		img.onload = function()
		{
			var dataURL;
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			dataURL = canvas.toDataURL(outputFormat);
			callback(dataURL);
			canvas = null; 
		};
		img.src = url;		
    } /// End 

	////////////////////////////Photo Uplaod///////////////////////////////////


})
///----------------------------------------------------------------------



; // END - angular.module