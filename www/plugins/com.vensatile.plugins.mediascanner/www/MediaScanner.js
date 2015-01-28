cordova.define("com.vensatile.plugins.mediascanner.MediaScanner", function(require, exports, module) { ///----------------------------------------------------------------------------------------
///	Built & Owned by: Vensatile Technologies 
/// URL: http://www.vensatile.com
/// email: info@vensatile.com
///----------------------------------------------------------------------------------------
var MediaScanner = {	    
	scanSingleFile: function(string, successCallback, errorCallback) {
        cordova.exec(
					successCallback, 	// success callback function
					errorCallback, 		// error callback function
					"MediaScanner", 	// mapped to native Java class called "MediaScanner"
					"scanSingleFile", 	// with this action name
					[string]
        ); 
    }
}
module.exports = MediaScanner;

});
