function startLogin() {
    var url = "sign?doWork=checkLogin";
	
    ajax({
        type : "GET",
        url : url,
        onSuccess : function(data){
            var jsonData =  eval('(' + data + ')');
            if(jsonData == undefined) return;			
            if(jsonData.status == "sucesses"){			
				params.userName = jsonData.userData.userName;
                params.loadjscssfile("js/home.js", "js");
            }
            else{
               
                var loginFrm = CreateLoginForm();
                removeAll(params.MainContainer);
                params.MainContainer.appendChild(loginFrm);
				
            }
        }	
    });    
    
}

function CreateLoginForm(){
    var div = ce("div");
    var ul = ce("ul");
	
	var li = ce("li");
    var lblUserName = ce("label");
    li.appendChild(lblUserName); 
    ul.appendChild(li);
	
    li = ce("li");
    lblUserName = ce("label");
    li.appendChild(lblUserName);
    lblUserName.innerHTML="Name";
    var txtUserName = ce("input");
    txtUserName.setAttribute("id","txtUserName");
	txtUserName.setAttribute("type","text");
	txtUserName.onkeyup = function(event){
        if(event.keyCode == 13){
			fnLogin("Login");
		}
    };
    li.appendChild(txtUserName);
    ul.appendChild(li);
	
    li = ce("li");
    var lblPassword = ce("label");
    li.appendChild(lblPassword);
    lblPassword.innerHTML="Password";
    var txtPassword = ce("input");	
    txtPassword.setAttribute("id","txtPassword");
    txtPassword.setAttribute("type","password");
	txtPassword.onkeyup = function(event){
        if(event.keyCode == 13){
			fnLogin("Login");
		}
    };
    li.appendChild(txtPassword);
    ul.appendChild(li);
	
    li = ce("li");
    var btnSubmit = ce("input");	
    btnSubmit.type = "button";
    btnSubmit.value = " Log In ";		
    btnSubmit.onclick = function(){
        fnLogin("Login");
    };
    li.appendChild(btnSubmit);	
    ul.appendChild(li);
	
    //li = ce("li");
    var spanRegister = ce("input");
    spanRegister.onclick = function(){
				var loginFrm = fnSignupForm();
                removeAll(params.MainContainer);
                params.MainContainer.appendChild(loginFrm);
    };	
	spanRegister.type = "button";
    spanRegister.value="Sign Up";		
    li.appendChild(spanRegister);
    ul.appendChild(li);
	
	////	
	li = ce("li");
    lblPassword = ce("label");
    li.appendChild(lblPassword);    
    lblPassword.setAttribute("id","lblstatus");
    ul.appendChild(li);
	////
	
    div.appendChild(ul);
    div.setAttribute("class","loginform");
    return div;
}
function fnSignupForm(){
    var div = ce("div");
    var ul = ce("ul");
	
	var li = ce("li");
    var lblUserName = ce("label");
    li.appendChild(lblUserName); 
    ul.appendChild(li);
	
    li = ce("li");
    lblUserName = ce("label");
    li.appendChild(lblUserName);
    lblUserName.innerHTML="Name";
    var txtUserName = ce("input");
    txtUserName.setAttribute("id","txtUserName2");
	txtUserName.setAttribute("type","text");
	txtUserName.onkeyup = function(event){
        if(event.keyCode == 13){
			fnLogin("Register");
		}
    };
    li.appendChild(txtUserName);
    ul.appendChild(li);
	
    li = ce("li");
    var lblPassword = ce("label");
    li.appendChild(lblPassword);
    lblPassword.innerHTML="Password";
    var txtPassword = ce("input");	
    txtPassword.setAttribute("id","txtPassword2");
    txtPassword.setAttribute("type","password");
	txtPassword.onkeyup = function(event){
        if(event.keyCode == 13){
			fnLogin("Register");
		}
    };
    li.appendChild(txtPassword);
    ul.appendChild(li);
	
	////
	li = ce("li");
    lblPassword = ce("label");
    li.appendChild(lblPassword);
    lblPassword.innerHTML="Retype Password";
    txtPassword = ce("input");	
    txtPassword.setAttribute("id","txtPassword3");
    txtPassword.setAttribute("type","password");
	txtPassword.onkeyup = function(event){
        if(event.keyCode == 13){
			fnLogin("Register");
		}
    };
    li.appendChild(txtPassword);
    ul.appendChild(li);
	////
		
    //li = ce("li");
    var spanRegister = ce("input");
    spanRegister.onclick = function(){
        fnLogin("Register");
    };	
	spanRegister.type = "button";
    spanRegister.value="Sign Up";		
    li.appendChild(spanRegister);
    ul.appendChild(li);
	
	spanRegister = ce("input");
    spanRegister.onclick = function(){
				var loginFrm = CreateLoginForm();
                removeAll(params.MainContainer);
                params.MainContainer.appendChild(loginFrm);
    };	
	spanRegister.type = "button";
    spanRegister.value="Back";		
    li.appendChild(spanRegister);
    ul.appendChild(li);
	
	////	
	li = ce("li");
    lblPassword = ce("label");
    li.appendChild(lblPassword);    
    lblPassword.setAttribute("id","lblstatus2");
    ul.appendChild(li);
	////
	
    div.appendChild(ul);
    div.setAttribute("class","signform");
    return div;
}
function fnLoginValidation(doWork){
	var username;
	var password,password2;
	if(doWork == "Login"){
		username = $("#txtUserName").value;
		password = $("#txtPassword").value;
		if(username == "" || password == "") return false;
		return true;
	}
	else if(doWork == "Register"){
		username = $("#txtUserName2").value;
		password = $("#txtPassword2").value;
		password2 = $("#txtPassword3").value;
		if(username == "" || password == "" || password2 == "") return false;
		if(password != password2) return false;
		return true;
	}
	return false;
}
function fnLogin(doWork) {	
	
	if(!fnLoginValidation(doWork)){
		if(doWork == "Login"){
			$("#lblstatus").innerHTML = "* Invalid Login.";
		}
		else if(doWork == "Register"){
			$("#lblstatus2").innerHTML = "* Enter valid data.";
		}
		return;
	}
    var url;
	if(doWork == "Login"){
		$("#lblstatus").innerHTML = "<img src='/img/loading.gif' />";
		url = "sign?doWork=" + doWork + "&userName=" + $("#txtUserName").value + "&password="+$("#txtPassword").value;
		params.userName = $("#txtUserName").value ;
	}
	else if(doWork == "Register"){
		$("#lblstatus2").innerHTML = "<img src='/img/loading.gif />";
		url = "sign?doWork=" + doWork + "&userName=" + $("#txtUserName2").value + "&password="+$("#txtPassword2").value;
		params.userName = $("#txtUserName2").value ;
	}
    
    ajax({
        type : "GET",
        url : url,
        onSuccess : function(data){
            var jsonData =  eval('(' + data + ')');
            if(jsonData == undefined) return;			
            if(jsonData.status == "sucesses"){	
				removeAll(params.MainContainer);
                params.loadjscssfile(jsonData.pageUrl, "js");
            }
            else
            {
                //alert(jsonData.errorMsg);	
				
                if(doWork == "Login"){
					$("#lblstatus").innerHTML = jsonData.errorMsg;					
				}
				else if(doWork == "Register"){
					$("#lblstatus2").innerHTML = jsonData.errorMsg;					
				}
            }
        }	
    });    
}

(function(){
    startLogin();
})();
