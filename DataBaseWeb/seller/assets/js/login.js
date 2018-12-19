var database = firebase.database();

function LoginWithDatabase(local) {
    identity = getQueryVariable("L", "Unknow");
    account = getCookie(LoginAccountCookieName);
    password = getCookie(LoginPasswordCookieName);
    var dataNode = database.ref(identity);
    dataNode.once('value').then(function (snapshot) {
        var temp = snapshot.val();
        for (id in temp) {
            if (temp[id]['Account'] == account && temp[id]['Password'] == password)
            if (local == "login") window.location="Home.html?L="+getQueryVariable("L","Unknow");
        }
        if (local != "login") window.location="Login.html?L="+getQueryVariable("L","Unknow");
    });
}

function CheckLogin(local) {
    if (getQueryVariable("L","Unknow") == "Test") {
        console.log("IsLogin");
        if (local == "login") window.location = "Home.html?L=Test";
    }
    else {
        LoginWithDatabase(local)
    }
}

//const 保存1天
const Timeliness = 1;
const TestAccount = "Test";
const TestPassword = "0000";
const LoginAccountCookieName = "LA";
const LoginPasswordCookieName = "LP";

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
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * Timeliness);
    $.cookie(LoginAccountCookieName, $("#signin-Account").val(), { expires: Timeliness });
    $.cookie(LoginPasswordCookieName, $("#signin-Password").val(), { expires: Timeliness });
}

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}

if ($.find(".Login_Page").length > 0) {
    CheckLogin("login");
    $(document).on("ready", function () {
        $("#signin-Account").val(getCookie(LoginAccountCookieName));
        $("#signin-Password").val(getCookie(LoginPasswordCookieName));

        $("#logout").click(function (e) {
            e.preventDefault();
        });

        $("#logo").click(function (e) {
            e.preventDefault();
            window.location.assign("../index.html");
        });

        $("#loginBtn").click(function (e) {
            e.preventDefault();
            LoginCookie()
            CheckLogin("login");
        });

        $(".lead").text(getQueryVariable("L", "Unknow") + " Login");
    });
}
else {
    CheckLogin("");

    $(document).ready(function () {
        $("#logout").click(function (e) {
            e.preventDefault();
            $.removeCookie(LoginAccountCookieName);
            $.removeCookie(LoginPasswordCookieName);
            window.location.assign("../index.html");
        });
    });
}
