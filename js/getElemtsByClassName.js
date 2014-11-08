function getElemtsByClassName(node,classname){
     if(node.getElemsByClassName){
         return node.getElemsByClassName(classname);
                                 }
     else{
         var results=new Array();
         var elems=node.getElemtsByTagName("*");
              for(var i=0;i<elems.length;i++){
                 if(elems[i].className.indexOf(classname) !=-1){
                     results[results.length]=elems[i]
                       }
                  return results;
                                              }
           }
}