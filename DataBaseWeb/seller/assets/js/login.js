function LoginCookie() {
    var exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24); //这里表示保存24小时
    console.log("LoginCookie_ ", $("#signin-Account").val(),$("#signin-password").val());
    document.cookie = "LA=" + $("#signin-Account").val() + ";expires=" + exp.toGMTString();
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

$("#loginBtn").click(function (e) {
    e.preventDefault();
    LoginCookie()
});

$("#getBtn").click(function (e) {
    e.preventDefault();
    $("#testText").text("LA = " + getCookie("LA") + "LP = " +getCookie("LP"));
});