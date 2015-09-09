/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-10-07 15:01:20
 * @version $Id$
 */
 	function addLoadEvent(func)
   {
      var oldonload = window.onload;
      if(typeof window.onload != "function")
       {
         window.onload = func;
      } 
      else
       {
         window.onload = function() 
         {
         oldonload();
         func();
         }
      }
   }

      // window.onload=prepareGallery;
      // function prepareGallery(){
      //    if(!document.getElementsByTagName) alert("error1");
      //    if(!document.getElementById) alert("error2");

      //    if(!document.getElementById("imagegallery")) alert("error3");
      //    var gallery = document.getElementById("imagegallery");

      //    var links = gallery.getElementsByTagName("a");

      //    for(var i=0;i<links.length;i++){
      //       links[i].onclick = function(){
      //          return showPic(this)? false:true;
      //       }
      //    }
      // }
      // function showPic(whichpic){
      //    if(!document.getElementById("placeholder")) alert("error10");
      //    var source =whichpic.getAttribute("href");
      //    var placeholder = document.getElementById("placeholder");
      //    placeholder.setAttribute("src",source);

      //    if(document.getElementById("description")){
      //       var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
      //       var description = document.getElementById("description");
      //       if(description.firstChild.nodeType==3){
      //          description.firstChild.nodeValue = text;
      //       }
      //    }
      //    return true;
      // }


