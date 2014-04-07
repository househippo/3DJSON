3DJSON
======

Simple syntax system for three dimensional JSON object.

Via CUBE or Sphere.


/********************************************* 3DJSON *********************************************/

// 3DJSON  put JSON on a BOX or SPHERE

//SAMPLE
```javascript
var  json_obj = {
                 "0,0~DocType":"Invoice",
                 "0,0~Customer":"Rocky The Moose",
                 "90,0~Products":["Gummy Bears","Comic Books"],
                 "180,0~PromoCode":"10 OFF",
                 "270,0~Vender":"Abc Inc.",
                 "0,90~DateCreated":"2010-11-21 17:45:22"
                 }
```

json_obj = '{"0,0~DocType":"Invoice","0,0~Customer":"Rocky The Moose","90,0~Products":["Gummy Bears","Comic Books"],"180,0~PromoCode":"10 OFF","270,0~Vender":"Abc Inc.","0,90~DateCreated":"2010-11-21 17:45:22"}';


var json = jQuery.threeDShow(json_obj);
// This outputs the 3DJSON with syntax removed.

  /*
   * json //output  
   */
    
    {
     "DocType":"Invoice",
     "Customer":"Rocky The Moose",
     "Products":["Gummy Bears","Comic Books"],
     "PromoCode":"10 OFF",
     "Vender":"Abc Inc.",
     "DateCreated":"2010-11-21 17:45:22"
     }



var faceFace = 3djson_obj.threeDFace(1);
// This show the first face of the box.

    /*
     *   faceFace //output  
     */
     {
      "DocType":"Invoice",
      "Customer":"Rocky The Moose"
      }
    

var faceLeft1 = 3djson_obj.threeDFace(2);
// This show the second face of the box.
    /*
     *   faceFront OUTPUT
     */   
     {
      "Products":["Gummy Bears","Comic Books"]
      }
      

var faceLeft2 = 3djson_obj.threeDFace([90,0]);
// You can get to face 2 by with degress too
    /*
     *  faceLeft OUTPUT  
     */
     {
      "Products":["Gummy Bears","Comic Books"]
      }

var faceTop = 3djson_obj.threeDFace([0,90]);
var faceTop = 3djson_obj.threeDFace(5);
// Your boxes have tops too
    /*
     *    faceTop OUTPUT
     */
     {
      "DateCreated":"2010-11-21 17:45:22"
      }
     
     
FACES
 1. Front
 2. Left side of box
 3. Back side of box
 4. Right side of box
 5. Top of Box
 6. Bottom of Box
