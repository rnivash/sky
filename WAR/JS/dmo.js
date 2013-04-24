function initDMO(data,callback){
    var loginFrm = CreateDMOForm(data,callback);
    removeAll(params.MainContainer);
    params.MainContainer.appendChild(loginFrm);
}


function CreateDMOForm(data,callback){
    var div = ce("div");
    var ul = ce("ul");
	
    for(var key in data){
        var attrName = key;
        var attrValue = data[key];
		
        var li = ce("li");
        var lblUserName = ce("label");
        li.appendChild(lblUserName);
        lblUserName.innerHTML=attrName;
        var txtUserName = ce("input");
        txtUserName.setAttribute("id","txt"+attrName);
        txtUserName.value = typeof(attrValue)== "object" ? getObjectValue(attrValue) :attrValue;
        li.appendChild(txtUserName);
		if(attrName == "key" || attrName == "userKey")
			li.setAttribute("class","hideme");
        ul.appendChild(li);
    }
	
    li = ce("li");
    var btnSubmit = ce("input");	
    btnSubmit.type = "button";
    btnSubmit.value = " OK ";		
    btnSubmit.onclick = function(){
        if(callback != undefined){
			$("#lblstatus").innerHTML = "<img src='/img/loading.gif' />";
            var data1 = getData(this);
            callback(data1,"");
        }
    };
    li.appendChild(btnSubmit);	
	
	btnSubmit = ce("input");	
    btnSubmit.type = "button";
    btnSubmit.value = " Cancel ";		
    btnSubmit.onclick = function(){
        if(callback != undefined){
            
            callback({},"cancel");
        }
    };
    li.appendChild(btnSubmit);	
    ul.appendChild(li);
	
	li = ce("li");
    var lblPassword = ce("span");
    li.appendChild(lblPassword);    
    lblPassword.setAttribute("id","lblstatus");
    ul.appendChild(li);
	
    div.setAttribute("class","loginform");
    div.appendChild(ul);	
    return div;
}

function getData(el)
{
    var object = {};
    var ul = el.parentElement.parentElement;
    var labels = ul.getElementsByTagName("label");
    var txts =  ul.getElementsByTagName("input");
    for(var i = 0; i< labels.length; i++){
        object[labels[i].innerHTML] = txts[i].value;
    }
    return object;
}