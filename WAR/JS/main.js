var params = null;

function Main(){
    params = new Global();
    params.MainContainer = $("#divMain");
	
    if(!params.isValid()) return 0;
    params.MainContainer.innerHTML = "Loading...";
    params.loadjscssfile("js/login.js", "js");
}

function Global(){
    var MainContainer  = null;	
    var xmlhttp = null;	
    var jsFiles = {};
}

Global.prototype.isValid = function isValid(){
    return this.MainContainer != null;
};

Global.prototype.loadAjax = function loadAjax(){
    if (window.XMLHttpRequest){
        // code for IE7+, Firefox, Chrome, Opera, Safari
        this.xmlhttp=new XMLHttpRequest();		
    }
    else{
        // code for IE6, IE5
        this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");		
    }	
};

function ajax(inputParam){
    params.loadAjax();
    if(inputParam == undefined) return;
    params.xmlhttp.open(inputParam.type == undefined || inputParam.type == "GET" ? "GET": "POST",inputParam.url,true);
    params.xmlhttp.onreadystatechange=function(){
        if (params.xmlhttp.readyState == 4 && params.xmlhttp.status == 200) {	        
            inputParam.onSuccess(params.xmlhttp.responseText)
        }
    }
    params.xmlhttp.send(inputParam.type == undefined || inputParam.type == "GET" ? null: inputParam.param);
}

Global.prototype.loadjscssfile = function loadjscssfile(filename, filetype){
    var fileref;
    if (filetype=="js"){ 
        fileref=ce('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ 
        fileref=ce("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        $("head")[0].appendChild(fileref)
}

function $(name){
    if(name == undefined) return document;
    if(typeof(name) != "string" || name == "") return document;
    if(name.substring(0,1) == "#") return document.getElementById(name.substring(1));
    return document.getElementsByTagName(name);	
}

function ce(tagName) {
    return document.createElement(tagName);
}

function removeAll(x) {

    while(x.childNodes.length > 0){
        while (x.childNodes[0].childNodes.length > 0) {
            x.childNodes[0].removeChild(x.childNodes[0].childNodes[0]);
        }	
        x.removeChild(x.childNodes[0]);
    }
}

