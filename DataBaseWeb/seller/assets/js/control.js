var config = {
    apiKey: "AIzaSyAbsT5aN5vr0EDTdggZXtQW2sql8F8ziJw",
    authDomain: "databaseweb-8414f.firebaseapp.com",
    databaseURL: "https://databaseweb-8414f.firebaseio.com",
    projectId: "databaseweb-8414f",
    storageBucket: "databaseweb-8414f.appspot.com",
    messagingSenderId: "90191710671"
};
firebase.initializeApp(config);

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

/// path setting

$("#control_home").click(function (e) { 
    e.preventDefault();
    window.location = "Home.html?L=" + getQueryVariable("L","");
});

$("#control_person").click(function (e) { 
    e.preventDefault();
    window.location = "Database-Person.html?L=" + getQueryVariable("L","");
});

$("#control_car").click(function (e) { 
    e.preventDefault();
    window.location = "Database-Car.html?L=" + getQueryVariable("L","");
});

$("#control_feedback").click(function (e) { 
    e.preventDefault();
    window.location = "Database-Feedback.html?L=" + getQueryVariable("L","");
});