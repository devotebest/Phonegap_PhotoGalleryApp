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

angular.module('vtApp.filter', [])
	
	///////////////////////////////////////////////
	// Truncate Filter
	// Usage:
	// var myText = "This is an example.";
	// {{myText|truncate:10:true}}	 Output: This is an...
	// myText = String to be truncated
	// 10 = number of character returns
	// true = truncate in between words also.
	///////////////////////////////////////////////  
	.filter('truncate', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '...';
            }
            return input;
        };
    })
    ///////////////////////////////////////////////	
					
	///////////////////////////////////////////////
	// Word Filter
	// Usage:
	// var myText = "This is an example.";
	// {{myText|words:2}}	 Output: This is...
	// myText = String to be truncated
	// 2 = words to be truncated
	///////////////////////////////////////////////	
	.filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '...';
                }
            }
            return input;
        };
    })
	///////////////////////////////////////////////

; // END - angular.module
///////////////////////////////////////////////	

