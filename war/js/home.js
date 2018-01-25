var gridList = {
	totalAmount : 0
};
function test($tbl,dt){
	
	gridList.totalAmount = 0;
			$(dt).each(function (idx, itm) {
				gridList.totalAmount = parseFloat(gridList.totalAmount) + parseFloat(itm.Amount);
				itm["key"] = itm["key"].id;
			});
			dt.push({
				"key" :0,
				"userKey" : 0,
				"AccountName" : "Total",
				"Amount" : gridList.totalAmount,
				"createdDate" : ""
			});	
				console.log(dt.length);
	$tbl.jqGrid({
		data:dt,
		datatype : "local",
		rowNum: (dt.length + 1),
		width : 900,
height: 900,		
		rownumbers : true,
		loadui : "disable",
		colNames : ['Remark', 'Amount', 'Date', '', ''],
		colModel : [{	name : 'AccountName',sortable : false,width : 260}, 
				    {	name : 'Amount',	sortable : false,align : "right",width : 60}, 
				   {	name : 'createdDate',	sortable : false,align : "center",width : 100, hidden : true	}, 
				   {	name : 'key',hidden : true	}, 
				   {	name : 'userKey',	hidden : true	}],		
		loadError : function (xhr, status, error) {
			if ($.trim(xhr.responseText) == "login") {
				window.location.href = "index.html";
			}
		},
		ondblClickRow : function (rowid, iRow, iCol, e) {
		
			var data = $(this).getRowData(rowid);
			$("#txtAmount").val(data.Amount);
			$("#txtRemarks").val(data.AccountName);
			$("#hdnDialogOperation").val("Edit");

			$("#hdnKey").val(data.key);
			$("#dialog").dialog("open");

		}
	});
}
$(function () {
	$.ajax({
			url : "Account",
			type : "GET",
			data : {
				doWork : "GetAccount"
			},
			dataType : "html"
		})
		.done(function (data) {
			if ($.trim(data) == "login") {
				window.location.href = "index.html";
			}
			else{
				var jsonData = eval('(' + data + ')');
				if (jsonData == undefined)
					return;
				var localdata = {};
				for(var i=0; i< jsonData.length; i++){
					//console.log(jsonData[i].userKey.id);
					if(localdata[jsonData[i].userKey.id] == undefined){
						localdata[jsonData[i].userKey.id] = [];
					}
					localdata[jsonData[i].userKey.id].push(jsonData[i]);
				}
				
				for(var key in localdata){
					
					var $tbl = $("<table></table>").attr("id","gridAmount"+key);
					$("div.divgridcontent").append($tbl).append($("<br/>"));
					test($tbl, localdata[key]);
				}
				
			}			
		})
		.fail(function () {});
	
		$("#dialog").dialog({
		autoOpen : false,
		width : 400,
		buttons : [{
				text : "Ok",
				click : function () {
					SaveAccountDetails();
					$(this).dialog("close");
				}
			}, {
				text : "Cancel",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});
	// Link to open the dialog
	$("#dialog-link").click(function (event) {
		$("#hdnDialogOperation").val("Add");
		$("#dialog").dialog("open");
		event.preventDefault();
	});

	// Link to open the dialog
	$("#logout-link").click(function (event) {
		$.ajax({
			url : "sign",
			type : "GET",
			data : {
				doWork : "Logout"
			},
			dataType : "html"
		})
		.done(function (data) {

			var jsonData = eval('(' + data + ')');
			if (jsonData == undefined)
				return;
			if (jsonData.status == "sucesses") {
				window.location.href = "index.html";
			} else {
				alert(jsonData.errorMsg);
			}
		})
		.fail(function () {});
		event.preventDefault();
	});

});

function fnDelete(el) {
	var myGrid = $('#gridAmount');
	var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
	var celValue = myGrid.jqGrid('getCell', selRowId, 'key');
	var data = {
		key : {
			kind : "BankAccount",
			id : celValue
		}
	};
	var myJSONText = JSON.stringify(data);
	$.ajax({
		url : "Account?doWork=DeleteAccount",
		type : "POST",
		data : myJSONText,
		processData : false,
		contentType : "application/json; charset=utf-8"
	})
}

function SaveAccountDetails() {
	var operation = "";
	var data = {
		AccountName : $("#txtRemarks").val(),
		Amount : $("#txtAmount").val()
	};

	if ($("#hdnDialogOperation").val() == "Add") {
		operation = "AddAccount";
	} else {
		operation = "UpdateAccount";
		data["key"] = {
			kind : "BankAccount",
			id : $("#hdnKey").val()
		};
	}

	var myJSONText = JSON.stringify(data);

	$.ajax({
		url : "Account?doWork=" + operation,
		type : "POST",
		data : myJSONText,
		processData : false,
		contentType : "application/json; charset=utf-8"
	})
	.done(function (data) {
		if (operation == "AddAccount") {
			var jsonData = eval('(' + data + ')');
			jsonData["sno"] = gridList.totalRows = gridList.totalRows + 1;
			jsonData["key"] = jsonData["key"].id;

			var su = jQuery("#gridAmount").addRowData(gridList.totalRows, jsonData, "before", gridList.totalRow);

			gridList.totalAmount = parseFloat(gridList.totalAmount) + parseFloat(jsonData.Amount);
			if (!su) {
				alert("Can not update");
				return
			};

			jQuery("#gridAmount").setCell(gridList.totalRow, 'Amount', gridList.totalAmount);
		} else {
			jQuery("#gridAmount").trigger("reloadGrid");
		}
	})
	.fail(function () {});
}
