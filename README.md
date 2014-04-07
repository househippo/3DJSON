3DJSON
======

Simple syntax system for three dimensional JSON object.

3DJSON puts JSON on a BOX or SPHERE

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


Loads the 3DJSON to be interpretered
```javascript
jQuery.threeDLoad(json_obj);
```

This outputs the 3DJSON with syntax removed.

```javascript
jQuery.threeDShow(true);
```

OUTPUT
```javascript  
     {
     "DocType":"Invoice",
     "Customer":"Rocky The Moose",
     "Products":["Gummy Bears","Comic Books"],
     "PromoCode":"10 OFF",
     "Vender":"Abc Inc.",
     "DateCreated":"2010-11-21 17:45:22"
     }
```

FRONT - This shows the front face of the box.

```javascript
var Front = JQuery.threeDGet(1);
```

OUTPUT
```javascript
      {
      "DocType":"Invoice",
      "Customer":"Rocky The Moose"
      }
```    
LEFT - This show the left face of the box.

```javascript
var Left1 = jQuery.threeDGet(2);
```

OUTPUT
```javascript 
      {
      "Products":["Gummy Bears","Comic Books"]
      }
```    
You can get to face 2 by with degress too

```javascript
var Left2 = jQuery.threeDGet([90,0]);
```

OUTPUT
```javascript
      {
      "Products":["Gummy Bears","Comic Books"]
      }
```

TOP - Boxes have tops too
```javascript
var Top1 = jQuery.threeDGet([0,90]);
var Top2 = jQuery.threeDGet(5);
```

OUTPUT
```javascript
      {
      "DateCreated":"2010-11-21 17:45:22"
      }
```     
FACES 
  1 = Front
  2 = Left side of box
  3 = Back side of box
  4 = Right side of box
  5 = Top of Box
  6 = Bottom of Box
