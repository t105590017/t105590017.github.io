var PAGE_SHOW_ITEM_QTY = 6;        //inventory頁面一次會顯示的數量
var ItemsData = new Array();
var ItemsData2 = new Array();

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

//修改目前URL回傳
function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}

/*
匯入查詢資料
*/
//for (i = 0; i < 5; i++) {
    //GetItemsData("0FX38tl7pGVfEJwsFZXE");
    //GetItemsData("7n3BotxFZxuDWmdhQQ0q");
    //GetItemsData("ebxhhun1TecfOWLjnr4f");
    //GetItemsData("F8OTKRBAIdewiJ0wlKlS");
    // GetItemsData("kQTLUhHIg7CFqnxsVObo");
    // GetItemsData("LvIAD5fkhEgX55HZmn1v");
    // GetItemsData("oI7wGvEq1RWgmef585AW");
    // GetItemsData("TM16KExvIFNTRkNMSwJG");
    // GetItemsData("vP1lX6scvJN1FzgGCJNU");
    GetItemsData("BMW4LuxuryLine");
    GetItemsData("BMW540iMSport");
    GetItemsData("BMW330iMSport");
    GetItemsData("BMW640i");
    GetItemsData("BMW740Li");
    GetItemsData("BMWM2Competition");
    GetItemsData("BMWM140i");
    GetItemsData("BMWM240i");
    GetItemsData("BMWX1sDrive20i");
//}
//將資料匯入ItemsData
function GetItemsData(i) {
    var Tag = "";
    if(i.length > 8)
        Tag = i.substring(0,5);
    ItemsData.push({
        'carTag': Tag,
        'carImg': "assets/img/inventory/" + i + "/" + "showImg.png",
        'carName': "car_Name" + i[4],
        'carYear': "9999" + i[4],
        'carHP': "100000000" + i[4],
        'carTransmission': "autoZZZZZ" + i[4],
        'carTopSpeed': "200" + i[4],
        'carPrice': "00,000" + i[4],
        'carLink': "inventory-single.html?watch=" + i
    });
}
//end

//分別根據ItemsData字典將資料放入html 車輛box中
function RefreshItemData() {
    var page = getQueryVariable('p', 1);
    for (i = 0; i < PAGE_SHOW_ITEM_QTY; i++) {
        var ItemDataIndex = i + (page - 1) * PAGE_SHOW_ITEM_QTY;
        if (ItemDataIndex < ItemsData.length) {
            $("#carItem" + i + "_Img")[0].src = ItemsData[ItemDataIndex]['carImg'];
            $("#carItem" + i + "_Name")[0].innerHTML = ItemsData[ItemDataIndex]['carName'];
            $("#carItem" + i + "_Year")[0].innerHTML = ItemsData[ItemDataIndex]['carYear'];
            $("#carItem" + i + "_HP")[0].innerHTML = ItemsData[ItemDataIndex]['carHP'] + "HP";
            $("#carItem" + i + "_TransmissionLite")[0].innerHTML = ItemsData[ItemDataIndex]['carTransmission'];
            $("#carItem" + i + "_TopSpeed")[0].innerHTML = ItemsData[ItemDataIndex]['carTopSpeed'] + " mph";
            $("#carItem" + i + "_Price")[0].innerHTML = "$" + ItemsData[ItemDataIndex]['carPrice'];
            $("#carItem" + i + "_Link")[0].href = ItemsData[ItemDataIndex]['carLink'];
            if(ItemsData[ItemDataIndex]['carTag'] == "")
                $("#carItem" + i + "_Tag")[0].style = "display:none";
            else
                $("#carItem" + i + "_Tag")[0].innerHTML = ItemsData[ItemDataIndex]['carTag'];
        }
        else {
            $("#carItem" + i + "_box")[0].style = "display:none";
        }
    }
}

function SetPagination() {
    var myList = $("#carItem-page")[0];
    for (i = 1; i <= (ItemsData.length - 1) / PAGE_SHOW_ITEM_QTY + 1; i++) {
        // 建立新的 <li> 元素
        var newList = document.createElement('li');
        var newA = document.createElement('a');
        var newText = document.createTextNode(i);
        newA.appendChild(newText);
        newA.id = "pagination" + i;
        newA.href = changeURLArg(location.href, 'p', i);
        newList.appendChild(newA);
        myList.appendChild(newList);
    }
    $("#pagination" + getQueryVariable('p', 1))[0].classList.add("active");
}

/* - Price Filter */
$("#slider-range").slider({
    range: true,
    min: 1,
    max: 130000,
    values: [200, 130000],
    slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0])
        $("#amount2").val("$" + ui.values[1]);
    }
});
$("#amount")[0].size = $("#amount")[0].value.length;
$("#amount2")[0].size = $("#amount2")[0].value.length;