function MenuChoice() 
{
    if (document.getElementById("menu").value == "Add a customer") 
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change ship to address") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete a custmoer") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else if (document.getElementById("menu").value == "Please select an option") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
}

// adding new customer
function CreateCustomer() 
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

    //Collect Customer data from web page
    var customerid = document.getElementById("customerId").value;
    var customername = document.getElementById("customerName").value;
    var customercity = document.getElementById("customerCity").value;

    //Create the parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';

    //Checking for AJAx operation return
    objRequest.onreadystatechange = function() 
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
         {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);

}
function OperationResult(output)
 {
     if (output.WasSuccessful == 1) 
    {
        alert("The operation was successful!");
    }
    else 
    {
        alert("The operation was Not successful!" + output.Exception);
    }
}


//Updating Orders

function UpdateOrder() 
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

    //Collect Customer data from web page
    var ordernumber = document.getElementById("orderNumber").value; //OrderID
    var shiptoname = document.getElementById("shipToName").value; //ShipName
    var shiptostreetaddress = document.getElementById("shipTostreetAddress").value; //ShipAddress
    var shiptocity = document.getElementById("shipToCity").value; //ShipCity
    var shiptopostalcode = document.getElementById("shipToPostalCode").value; //ShipPostcode
    //Create the parameter string
    var order = '{"OrderID":"' + ordernumber + '","ShipName":"' + shiptoname + '","ShipAddress":"' + shiptostreetaddress + '","ShipCity":"' + shiptocity + '","ShipPostcode":"' + shiptopostalcode + '"}';

    //Checking for AJAx operation return
    objRequest.onreadystatechange = function() 
    {
        if (objRequest.readyState == 4 && objRequest.status == 200) 
        {
            var result = JSON.parse(objRequest.responseText);
            OrderUpdateResult(result);
        }
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(order);

}
function OrderUpdateResult(output)
{
    if (output ==1 ) {
        alert("The operation was successful!");
    }
    else {
        alert("The operation was Not successful!" + output.Exception);
    }
}


// Delete customer

function DeleteCustomer() 
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";

    //Collect Customer data from web page
    var cusID = document.getElementById("cusID").value; //OrderID

    var confirmDelete = confirm("Do you want to Delete the Cutmer ID : " + cusID + "?");
    if (confirmDelete == true) 
    {
        url+=cusID;
        //Checking for AJAx operation return
        objRequest.onreadystatechange = function() 
        {
            if (objRequest.readyState == 4 && objRequest.status == 200) 
            {
                var result = JSON.parse(objRequest.responseText);
                DeleteCustomerResult(result);
            }
        }

        //Start AJAX request
        objRequest.open("GET", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send();

    }
    else 
    {
        alert("The operation was Cancelled!");
    }
     
    
}
function DeleteCustomerResult(output)
 {
    if (output.DeleteCustomerResult.WasSuccessful == 1)
    {
        alert("The operation was successful!");
    }
    else {
        alert("The operation was Not successful!" + output.Exception);
    }
}