function startLogin() {
    var url = "sign?doWork=checkLogin";
	
    ajax({
        type : "GET",
        url : url,
        onSuccess : function(data){
            var jsonData =  eval('(' + data + ')');
            if(jsonData == undefined) return;			
            if(jsonData.status == "sucesses"){				
                params.loadjscssfile("js/home.js", "js");
            }
            else{
                removeAll(params.MainContainer);
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
    lblUserName.innerHTML="user Name";
    var txtUserName = ce("input");
    txtUserName.setAttribute("id","txtUserName");
    li.appendChild(txtUserName);
    ul.appendChild(li);
	
    li = ce("li");
    var lblPassword = ce("label");
    li.appendChild(lblPassword);
    lblPassword.innerHTML="password";
    var txtPassword = ce("input");	
    txtPassword.setAttribute("id","txtPassword");
    txtPassword.setAttribute("type","password");
    li.appendChild(txtPassword);
    ul.appendChild(li);
	
    li = ce("li");
    var btnSubmit = ce("input");	
    btnSubmit.type = "button";
    btnSubmit.value = " OK ";		
    btnSubmit.onclick = function(){
        fnLogin("Login");
    };
    li.appendChild(btnSubmit);	
    ul.appendChild(li);
	
    li = ce("li");
    var spanRegister = ce("button");
    spanRegister.onclick = function(){
        fnLogin("Register");
    };	
    spanRegister.innerHTML="Register";		
    li.appendChild(spanRegister);
    ul.appendChild(li);
	
    div.appendChild(ul);
    div.setAttribute("class","loginform");
    return div;
}

function fnLogin(doWork) {	
	
    var url = "sign?doWork=" + doWork + "&userName=" + $("#txtUserName").value + "&password="+$("#txtPassword").value;
    removeAll(params.MainContainer);
    ajax({
        type : "GET",
        url : url,
        onSuccess : function(data){
            var jsonData =  eval('(' + data + ')');
            if(jsonData == undefined) return;			
            if(jsonData.status == "sucesses"){				
                params.loadjscssfile(jsonData.pageUrl, "js");
            }
            else
            {
                alert(jsonData.errorMsg);				
                var loginFrm = CreateLoginForm();
                removeAll(params.MainContainer);
                params.MainContainer.appendChild(loginFrm);
            }
        }	
    });    
}

(function(){
    startLogin();
})();
