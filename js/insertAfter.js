// JavaScript Document
function insertAfter(new_element,target_element){
	var parent=target_elememt.parent.Node;
	if(target_element==parent.lastChild){
		parent.appendChild(new_element);
		}
		else{
			parent.insertBefore(new_element,target_element.nextSibling);
			}
		}