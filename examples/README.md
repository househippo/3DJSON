```text
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../src/js/threeDJson.jquery.js"></script>
```
```javascript
<script type="text/javascript">
var  jsonData = '{"0,0~DocType":"Invoice","0,0~Customer":"Rocky The Moose","90,0~Products":["Gummy Bears","Comic Books"],"180,0~PromoCode":"10 OFF","270,0~Vender":"Abc Inc.","0,90~DateCreated":"2010-11-21 17:45:22"}';

var threeDObj = $.threeDLoad(jsonData); //Put JSON string into 3DJSON interpreter

if(threeDObj){

	//Adding face 1 - 6 , All six sides of the box
	var list = [1,2,3,4,5,6]
	$.each(list,function(key,value){
	    //www = jQuery.threeDAdd(2,'test','water now'); //Pass Face Number
	    $.threeDAdd(value,'test-'+key,value);
	   //www = jQuery.threeDAdd([90,0],'test','water now'); // Pass Array
	    //www = jQuery.threeDAdd('90,0','test','water now'); //Pass String
	});

	console.log($.threeDShow()); //show full JSON
	console.log($.threeDShow(true)); //show full JSON w/3DJSON prefix removed

}else{
	console.log('This is not JSON String or JS object');
}

</script>
```
