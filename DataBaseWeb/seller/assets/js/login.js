//const 保存24hr
const Timeliness = 24;
const TestAccount = "Test";
const TestPassword = "0000";

//使用JS函數獲取url參數:
function getQueryVariable(variable, notFindVal) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) return pair[1];
    }
    return notFindVal;
}

function LoginCookie() {
    var exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * Timeliness); //这里表示保存24小时
    console.log("LoginCookie_ ", $("#signin-Account").val(), $("#signin-password").val());
    document.cookie = "LA=" + $("#signin-Account").val() + ";expires=" + exp.toGMTString()+"path=/";
    document.cookie = "LP=" + $("#signin-password").val() + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var strCookie = document.cookie;
    console.log("getCookie = ", strCookie);
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}

function IsLogin() {
    if (getQueryVariable("Login","") == "Test" && getCookie("LA") == TestAccount && getCookie("LP") == TestPassword) {
        console.log("IsLogin");
        return true;
    }
    return false;
}

$(document).on("ready", function () {
    console.log($("#wrapper")[0].classList[0] + "read = > LA=", getCookie("LA"), " LP=", getCookie("LP"));
    $("#signin-Account").val("");
    $("#signin-password").val("");

    if(IsLogin() && $.find(".Login_Page").length > 0){
        window.location.assign("page-Home.html");
    }

    $("#logo").click(function (e) {
        e.preventDefault();
        console.log("click");
    });

    $("#loginBtn").click(function (e) {
        e.preventDefault();
        LoginCookie()
        console.log("LA=", getCookie("LA"), " LP=", getCookie("LP"));
    });

    $(".lead").text(getQueryVariable("Login", "Unknow") + " Login");
    $("#logout").click(function (e) { 
        e.preventDefault();
        
    });
});
