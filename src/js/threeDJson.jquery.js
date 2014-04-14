(function($){
	 //focusing on box first will do sphere later 	
	var threeDJson = new Object();
        var threeDErrors = false;
        
 	$.threeDLoad = function(obj){
 		//Load a JS object or JSON String to begin.
		if(typeof obj === 'object'){
			threeDJson = obj;
		}else{
			try { var jsonObject = jQuery.parseJSON(obj); }catch(e){return false;}
		  	threeDJson = jsonObject;
		  	return true;
		}
 	}
        
        $.threeDDebug = function(debug_on){if(debug_on){threeDErrors = true;}}

 	$.threeDShow = function(remove){
 		//I show the whole JSON with & without Prefex.
	 	if(typeof remove === 'undefined' || remove === true){ return threeDJson; }
	 	if(remove === false){ return jQuery.threeDRemove(); }
	 	return threeDJson;
 	}

 	$.threeDSplit = function(string){
 		//interna function to split prefex if you passed a string instead of Array
 		var data = string.split('~');
    	return data[1];
 	}

 	$.threeDRemove = function(){
 		//goes through JSON and removes 3DJSON prefex EX."-190,0~element":"data" => "element":"data"
 		//You can add decimal numbers up  4th place EX. 1.1234
 		return jQuery.parseJSON(JSON.stringify(threeDJson).replace(/["]-?[\d+.]{1,8}[\/,]-?[\d+.]{1,8}[\/~]/g ,'"'));
 		//TEST return jQuery.parseJSON(JSON.stringify(threeDJson).replace(/["]-?[\d+.]{1,8}[\/,]-?[\d+.]{1,8}[\/~][\w\d\W\D]{0,}["][:]/g ,'"'));
 	}

 	$.threeDStringToArray = function(string){
 		//  '90,0' => [90,0]
 	 	if(typeof string !== 'undefined'){ 
 			//assumes it a string of '90,0'
 			var data = string.split('~');
 			if(data.length !== 2 || !jQuery.isNumeric(data[0]) || !jQuery.isNumeric(data[1]) ){
 				return false;
 			}else{
 				return data;
 			}
 	    }
 	    return false;
 	}

 	$.threeDArrayToString = function(array1){
 	 	// [90,0] => '90,0'
 	 	if(typeof array1 !== 'undefined' && array1.length === 2 && jQuery.isNumeric(array1[0]) && jQuery.isNumeric(array1[1]) && jQuery.threeDCheckDegree(array1[0]) && jQuery.threeDCheckDegree(array1[1])){ 
 			var data = array1[0]+','+array1[1];
 			return data;
 	    }
 	    return false;
 	}

 	$.threeDCheckDegree = function(degree){
 		//check that its in the right range #NO number over 359 and under -359 please
 		if(degree >= -360 && degree <= 360){return true;}else{ return false;}
 		return true;
 	}

 	$.threeDAdd = function(face,element,data){
 		if(typeof face === 'undefined' ){return false;}
 		if(typeof element === 'undefined' ){return false;}
 		if(typeof data === 'undefined' ){return false;}
	var face_add = '0,0'; // Front of box
	var obj = new Object();

	 	if(typeof face !== 'undefined'){
	 		// if you just pass a number as face
	 		if(jQuery.isNumeric(face) && face <= 6 && face >= 1){
	 			face_add = jQuery.threeDFaceId(face);
	 		}else{
			// Pass a string or Array as face
	 		//check if its array has two elements (Future)

	 			if(jQuery.isArray(face)){
	 				var array_to_string = $.threeDArrayToString(face);
	 				if(array_to_string){
	 					face_add =  array_to_string;
	 				}
	 			}else{
	 				face_add = face;
	 			}
	 		}
	 	}
	 threeDJson[face_add+'~'+element] = data;
	 return threeDJson;
 	}
 	
 	$.threeDReplace = function(face,element,data){
 		if(typeof face === 'undefined' ){return false;}
 		if(typeof element === 'undefined' ){return false;}
 		if(typeof data === 'undefined' ){return false;}
 		var show_face = jQuery.threeDFaceId(face);
 	}
 	
 	$.threeDGet = function(face,show_prefix){
 		var show = false;
 		if(typeof show_prefix === 'undefined' || show_prefix === true){show = true;}
 		if(typeof face === 'undefined' || (face < 1 && face > 6)){return false;}
 		var data = new Object();
 		jQuery.each(threeDJson,function(key,value){
 			var prefix = key.split('~');
 			var face_id = jQuery.threeDFaceId(face);
 			if(face_id === prefix[0]){ 
 				if(show){data[key] = value; }else{data[prefix[1]] = value; }
 			}
 		});
 		return data;
 	}

 	$.threeDFaceId = function(face){
 		face_add = '0,0';
 			if(jQuery.isNumeric(face) && face <= 6 && face >= 1){
	 			switch(parseInt(face)){
	 			case 2: //left of box 
	 			face_add = '90,0';
	 			break;	
	 			case 3: //back of box 
	 			face_add = '180,0';
	 			break;	
	 			case 4: //right of box 
	 			face_add = '270,0';
	 			break;	
	 			case 5: //top of box 
	 			face_add = '0,90';
	 			break;	
	 			case 6: //bottom of box 
	 			face_add = '0,270';
	 			break;		 
	 			case -1: //backside of front of box
	 			face_add = '360,0';	
	 			break;
	 			case -2:
	 			face_add = '-270,0';
	 			break;	
	 			case -3:
	 			face_add = '-180,0';
	 			break;	
	 			case -4:
	 			face_add = '-90,0';
	 			break;	
	 			case -5:
	 			face_add = '0,-90';
	 			break;	
	 			case -6:
	 			face_add = '0,-180';
	 			break;	
	 			default: //front of box
	 			//case 1:
	 			break;	
	 			//"0,0~data":"data"	
	 			}
	 		}
                if(threeDErrors){console.log("Debug FaceId: GIVEN: " + face + " TESTED: "+face_add)}
	 	return face_add;
 	}
                                // range       = degree you want to fudge
                                // array_data  = data in  [x,y] or [x,y,z] from your input
                                // show_prefix = return 3DJSON prefix 
        $.threeDRange = function(range,array_data,show_prefix){

 		if(typeof show_prefix === 'undefined' || show_prefix === true){show_prefix = true;}else{show_prefix = false;}
                     // X,Y,Z
            var show = [0,0,0];
             		if(typeof array_data === 'undefined' || !jQuery.isArray(array_data)){show = [0,0,0];}
            var x_min = array_data[0] - range;
            var x_max = array_data[0] + range;
            var y_min = array_data[1] - range;
            var y_max = array_data[1] + range;
 
            if(threeDErrors){console.log("Debug RANGE: " + array_data+' x-min:'+x_min+' x-max:'+x_max+' y-min:'+y_min+' y-max'+y_max);}
            
             var data = new Object();
 		jQuery.each(threeDJson,function(key,value){
 			var prefix_full = key.split('~');
                        var prefix = prefix_full[0].split(',');
                        //x-range & y-range

 			if(prefix[0] <= x_max  &&  prefix[0] >= x_min && prefix[1] <= y_max  &&  prefix[1] >= y_min){ 
 				if(show_prefix){data[key] = value; }else{data[prefix_full[1]] = value; }
                                if(threeDErrors){console.log("Debug RANGE: IN RANGE");}
 			}
                      
 		});
                
             return data;
        }
        
        
 	$.threeDInside = function(noInside){
 		//paper documents have a back side. In 3dJson to denote its on back side or Inside the box or sphere use negative
 		// Ex."-90,0~data":"data"  => face 2, inside of box or sphere
 		// ZERO problem you can not have -0 or negative zero ...  Thinking about the best way to solve this.
 		// I want face 1 or "0,0~data":"data" to have a back side
 	}
 	
}(jQuery));
