function startHome(arr) {
    removeAll(params.MainContainer);    
    var logout = ce("button");						
    logout.innerHTML = "logout";
    logout.onclick = function(){
        fnLogout();
    };
    params.MainContainer.appendChild(logout);
	
    var btnAdd = ce("button");						
    btnAdd.innerHTML = "Add";
    btnAdd.onclick = function(){
        fnAdd();
    };
    params.MainContainer.appendChild(btnAdd);
	
    fnCreateDashBoard(arr);
	
	
}

function fnAdd(){
    var el = null;
    var obj = {
        "AccountName":"",
        "Amount":0
    };
    initDMO(obj,function(data){
        var myJSONText = JSON.stringify(data);
        var url = "Account?doWork=AddAccount";
        ajax({
            type : "POST",
            url : url,
            onSuccess : function(data){
                var url2 = "Account?doWork=GetAccount";
                ajax({
                    type : "GET",
                    url : url2,
                    onSuccess : function(data2){
                        var arr = eval('(' + data2 + ')');
                        startHome(arr);
                    }
                });
        },
        param : myJSONText
        });   
    });
}

function fnCreateDashBoard(arrValue1){
    var div,tbl,td,tr,th,thead,span;
    div = ce("div");
    tbl = ce("table");
					 
    fnAddHeadRow(tbl,arrValue1);  
    fnAddRows(tbl,arrValue1,fnUpdate);
    tbl.setAttribute("class","tblCash");
    div.appendChild(tbl);	
    params.MainContainer.appendChild(div);
    var totalValue =0;
    for(var i=0;i<arrValue1.length;i++){
        var obj = arrValue1[i];
        totalValue += parseFloat(obj.Amount);
    }
    fnAddTotalRow(tbl,totalValue.toFixed(2),5);
    params.loadjscssfile("js/dmo.js", "js");
	
    div = ce("div");	
    div.setAttribute("class","divtotal");
	
    span = ce("span");
    span.innerHTML = totalValue.toFixed(2);
    div.appendChild(span);
    params.MainContainer.appendChild(div);
	
}

function fnUpdate(el){
    initDMO(getCurrentObject(el),function(data){
			
        for(var i = 1; i< el.childNodes.length; i++){
            el.childNodes[i].innerHTML =getAttributeByIndex(data,i-1);
        }
			
        var myJSONText = JSON.stringify(getCurrentObject(el));	
			
        var url = "Account?doWork=UpdateAccount";
        ajax({
            type : "POST",
            url : url,
            onSuccess : function(obj1){
                var url2 = "Account?doWork=GetAccount";
                ajax({
                    type : "GET",
                    url : url2,
                    onSuccess : function(data2){
                        var arr = eval('(' + data2 + ')');
                        startHome(arr);
                    }
                });
        },
        param : myJSONText
        });
    });
}

function getAttributeByIndex(obj, index){
    var i = 0;
    for (var attr in obj){
        if (index === i){
            return obj[attr];
        }
        i++;
    }
    return null;
}

function getCurrentObject(el){
    var object = {};
    var tbl = el.parentElement;
    var thead = tbl.firstChild.childNodes;
    var trs =  el.childNodes;
    for(var i = 1; i< thead.length; i++){
        if(thead[i].innerHTML.toLowerCase().search("key") > -1){
			
            object[thead[i].innerHTML] = getCurrentSubObject(thead[i].innerHTML,trs[i].innerHTML);
        }
        else{
            object[thead[i].innerHTML] = trs[i].innerHTML;
        }
    }
    return object;
}
function getCurrentSubObject(hdr,val){
    var object = {};
    if("key" == hdr.toLowerCase() ){
        object["kind"] = "BankAccount";
    }
    else if("userkey" == hdr.toLowerCase() ){
        object["kind"] = "User";
    }
    object["id"] = val;
    return object;
}

function fnAddTotalRow(tbl,value,idx){
    if(tbl.childNodes[0] == undefined) return;
    var len = tbl.childNodes[0].childNodes.length;
    var tr,td;	
    tr = ce("tr");		
    tbl.appendChild(tr);
    for(var i=0;i<len;i++){
        td = ce("td");
        if(i == (idx - 1)){
            td.innerHTML = value;
        }
        else if(i == (idx - 2)){
            td.innerHTML = "Total";
        }
        else
        {
            td.innerHTML = "&nbsp;";
        }
        tr.appendChild(td);
    }
}

function fnAddRows(tbl,arrValue1,fnCallback){
    var td,tr;
	
    for(var i=0;i<arrValue1.length;i++){
        var obj = arrValue1[i];
        tr = ce("tr");		
        tbl.appendChild(tr);		
        td = ce("td");
        td.innerHTML = i+1;
        tr.appendChild(td);
        if(fnCallback != undefined){
            tr.ondblclick = function(){
                fnCallback(this);
            };
        }
        tr.addEventListener('contextmenu', function(ev) { 
            ev.preventDefault(); 
            var selobj = getCurrentObject(this);
            if(confirm("Do you want to delete the record "+ selobj.AccountName +"?")){
                var myJSONText = JSON.stringify(selobj);	
                var url = "Account?doWork=DeleteAccount";
                ajax({
                    type : "POST",
                    url : url,
                    onSuccess : function(data){
                        var url2 = "Account?doWork=GetAccount";
                        ajax({
                            type : "GET",
                            url : url2,
                            onSuccess : function(data2){
                                var arr = eval('(' + data2 + ')');
                                startHome(arr);
                            }
                        });
                },
                param : myJSONText
                });
        }
        return false; 
        }, false); 
    for(var key in obj){
        var attrName = key;
        var attrValue = obj[key];
			
        td = ce("td");
        td.innerHTML = typeof(attrValue)== "object" ? getObjectValue(attrValue) :attrValue;
        tr.appendChild(td);
    }
    }
}

function getObjectValue(obj){
    var val="";
    for(var key in obj){
        var attrName = key;
        var attrValue = obj[key];
        if(attrName == "id")
            val =  attrValue;
    }
    return val;
}
	
function fnAddHeadRow(tbl,arrValue1){
    var th,thead;	
    for(var i=0;i<arrValue1.length;i++){
        var obj = arrValue1[i];
		
        thead = ce("thead");		
        tbl.appendChild(thead);
		
        th = ce("th");
        th.innerHTML = "S.No";
        thead.appendChild(th);
		
        for(var key in obj){
            var attrName = key;
            var attrValue = obj[key];
			
            th = ce("th");
            th.innerHTML = attrName;
            thead.appendChild(th);
        }
        return;
    }
}

function fnLogout(){
    var url = "sign?doWork=Logout";	
    ajax({
        type : "GET",
        url : url,
        onSuccess : function(data){
            var jsonData =  eval('(' + data + ')');
            if(jsonData == undefined) return;			
            if(jsonData.status == "sucesses"){				
                params.loadjscssfile(jsonData.pageUrl, "js");
            }
        }	
    });    
}

(function(){
    var url = "Account?doWork=GetAccount";
	
    ajax({
        type : "GET",
        url : url,
        onSuccess : function(data){
            var arr = eval('(' + data + ')');
            startHome(arr);
        }	
    });    
	
})();