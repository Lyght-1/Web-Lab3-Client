/*
    Méthodes d'accès aux services Web API_Server/bookmarks
 */

function getBearerAuthorizationToken(){
    return {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
}


const apiBaseURL= "https://scarce-thoughtful-opal.glitch.me";



function webAPI_GET_ALL(queryString, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/bookmarks" + queryString,
        type: 'GET',
        contentType:'text/plain',
        data:{},
        success: data => { successCallBack(data); console.log("webAPI_GET_ALL - success", data); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_GET_ALL - error");
        }
    });
}

function webAPI_GET( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/bookmarks" + "/" + id,
        type: 'GET',
        contentType:'text/plain',
        success: data  => { successCallBack(data); console.log("webAPI_GET - success", data);},
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_GET - error");
        }
    });
}

function webAPI_POST( data , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/bookmarks",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        headers: getBearerAuthorizationToken(),
        success: (data) => {successCallBack();  console.log("webAPI_POST - success", data); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_POST - error");
        }
    });
}

function webAPI_PUT(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/bookmarks" +  "/" + data.Id,
        type: 'PUT',
        contentType:'application/json',
        data: JSON.stringify(data),
        headers: getBearerAuthorizationToken(),
        success:(s) => {successCallBack();  console.log("webAPI_PUT - success", s); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_PUT - error");
        }
    });
}

function webAPI_DELETE( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/api/bookmarks" +"/" + id,
        contentType:'text/plain',
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
        success:() => {successCallBack();  console.log("webAPI_DELETE - success"); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_DELETE - error");
        }
    });
}

function webAPI_login( email, password, successCallBack, errorCallBack) {
    let data = {Email : email, Password: password, "grant-type": "password"};
    $.ajax({
        url: apiBaseURL + "/token",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        success: (data) => {
            localStorage.setItem('access_token', data.Access_token);
            localStorage.setItem('username', data.Username);
            localStorage.setItem('Email',email);
            localStorage.setItem('userId', data.UserId);
            successCallBack();  
            console.log("webAPI_POST - success", data);
         },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_POST - error");
        }
    });
}

function webAPI_register( data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/accounts/register",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        success: (data) => {successCallBack();  console.log("webAPI_POST - success", data); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_POST - error");
        }
    });
}

function webAPI_changeProfil( data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/accounts/change",
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType:'application/json',
        data: JSON.stringify(data),
        success: (data) => {
            localStorage.setItem('username', data.Name);
            localStorage.setItem('Email',data.Email);
            localStorage.setItem('loginemail',data.Email);
            localStorage.setItem('loginpassword',data.Password);
            successCallBack(); 
            console.log("webAPI_POST - success", data); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_POST - error");
        }
    });
}

function webAPI_removeProfil( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/accounts/remove/" + id,
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
        contentType:'text/plain',
        success: () => {
            successCallBack(); 
            console.log("webAPI_DELETE - success"); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_DELETE - error");
        }
    });
}
