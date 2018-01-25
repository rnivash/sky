(function(){
	
	'use strict';
	
	var featherapp = angular.module("featherapp",[]);
	
	featherapp.controller("LoginController", LoginController);
	
	function LoginController($scope, $LoginService){
		var $self = this;
		$self.username = "";
		$self.password = "";
        
        $scope.getLoginStatus = function(){	
            return $LoginService.LogginStatus;
        }
		
		$scope.Login = function(){	           
			
            $LoginService.Login($self.username, $self.password)
            .then(function(jsonData){
                if (jsonData !== undefined)
                {
                    if (jsonData.status == "sucesses") {
                       $LoginService.LogginStatus = true;
                    }
                    else{
                        $self.message = jsonData.errorMsg;
                        $LoginService.LogginStatus = false;
                    }                                    
                }
            });
		}

        $scope.Logout = function(){
            
            $LoginService.Logout()
            .then(function(jsonData){
                if (jsonData !== undefined)
                {
                    if (jsonData.status == "sucesses") {
                       $LoginService.LogginStatus = false;
                    }           
                }
            });
        }		
		
	}
	
	LoginController.$inject = ["$scope", "LoginService"];

    featherapp.factory("LoginService", LoginService);

    function LoginService($http, $q){
        return {
            LogginStatus : false,

            Login : function(usr,pas){
                var deferred = $q.defer();
                var config = { params: { userName : usr, password: pas, doWork: 'Login'} };

                $http.get("sign", config)
                    .then(function(data){
                        deferred.resolve(data.data);
                    });                     
                return deferred.promise;
            },
            Logout : function(){
                var deferred = $q.defer();
                var config = { params: { doWork: 'Logout'} };

                $http.get("sign", config)
                    .then(function(data){
                        deferred.resolve(data.data);
                    });                     
                return deferred.promise;
            }
        };
	}

    LoginService.$inject = ["$http", "$q"];
	
})();

(function(){

    'use strict';

    var featherapp = angular.module("featherapp");

    featherapp.controller("MainController", MainController);

    function MainController($scope, $LoginService, $MainService){
        $scope.getLoginStatus = function(){	
            return $LoginService.LogginStatus;
        }

        $scope.$watch(
            function(){	
                return $LoginService.LogginStatus;
            }, 
            function(newValue, oldValue) {            
            if ( newValue !== oldValue ) {                
                $MainService.GetAccounts()
                    .then(function(){
//[{"key":{"kind":"BankAccount","id":5689232328753152},"userKey":{"kind":"User","id":78002},"AccountName":"Devika DOB in voteid 24/02/1961","Amount":0.0,"createdDate":"Oct 30, 2017 11:24:14 AM"},{"key":{"kind":"BankAccount","id":5669390116716544},"userKey":{"kind":"User","id":78002},"AccountName":"Ramachandran DOB 19 Apr 1955 in voterid","Amount":0.0,"createdDate":"Oct 30, 2017 11:25:48 AM"},{"key":{"kind":"BankAccount","id":5712744053473280},"userKey":{"kind":"User","id":78002},"AccountName":"Darshan DOB 16 June 2016","Amount":0.0,"createdDate":"Nov 17, 2017 6:26:00 PM"},{"key":{"kind":"BankAccount","id":5726709944942592},"userKey":{"kind":"User","id":78002},"AccountName":"Lakshmi DOB 09-01-1989","Amount":0.0,"createdDate":"Nov 17, 2017 6:29:24 PM"}]

                        var jsonData = eval('(' + data + ')');
				        if (jsonData == undefined)
					        return;
				        var localdata = {};
				        for(var i=0; i< jsonData.length; i++){					        
					        if(localdata[jsonData[i].userKey.id] == undefined){
						        localdata[jsonData[i].userKey.id] = [];
					        }
					        localdata[jsonData[i].userKey.id].push(jsonData[i]);
				        }
				
				        for(var key in localdata){					
					       //localdata[key]
				        }
                    });
            }
        });
        
    }
    
    MainController.$inject = ["$scope", "LoginService", "MainService"];
    
    featherapp.factory("MainService", MainService);

    function MainService($http, $q){
        return {            

            GetAccounts : function(){
                var deferred = $q.defer();
                var config = { params: { doWork: 'GetAccount'} };

                $http.get("Account", config)
                    .then(function(data){
                        deferred.resolve(data.data);
                    });                     
                return deferred.promise;
            }
        };
	}

    MainService.$inject = ["$http", "$q"];

})();
