var config = {
    apiKey: "AIzaSyAbsT5aN5vr0EDTdggZXtQW2sql8F8ziJw",
    authDomain: "databaseweb-8414f.firebaseapp.com",
    databaseURL: "https://databaseweb-8414f.firebaseio.com",
    projectId: "databaseweb-8414f",
    storageBucket: "databaseweb-8414f.appspot.com",
    messagingSenderId: "90191710671"
};
firebase.initializeApp(config);

///////////////////////////////
///                         ///
///     Database Person     ///
///                         ///
///////////////////////////////

function Database_Person() {
    const ManagerTableDataOrder = [
        "Id", "Name", "Account", "Password", "Sex", "Phone", "Email", "Birthday", "Class"
    ];
    var ManagerShowData = new Array();
    const MemberTableDataOrder = [
        "Id", "Name", "Account", "Password", "Sex", "Phone", "Email", "Birthday"
    ];
    var MemberShowData = new Array();
    const OrderTableDataOrder = [
        "Id", "Time", "MemberId", "ManagerId", "CarId", "Price", "DeliveryTime", "State"
    ];
    var OrderShowData = new Array();
    const ManufacturerTableDataOrder = [
        "Id", "Brand", "Phone", "Email"
    ];
    var ManufacturerShowData = new Array();

    const database = firebase.database();

    function getGenderIcon(i) {
        if (i == "men") return "<i class=\"fas fa-mars\"></i>";
        else if (i == "women") return "<i class=\"fas fa-venus\"></i>";
        else return "";
    }

    function getShowData(tableName) {
        switch (tableName) {
            case "Manager":
                return ManagerShowData;
            case "Member":
                return MemberShowData;
            case "Order":
                return OrderShowData;
            case "Manufacturer":
                return ManufacturerShowData;
        }
    }

    function getTableDataOrder(tableName) {
        switch (tableName) {
            case "Manager":
                return ManagerTableDataOrder;
            case "Member":
                return MemberTableDataOrder;
            case "Order":
                return OrderTableDataOrder;
            case "Manufacturer":
                return ManufacturerTableDataOrder;
        }
    }
    //////////////////////////////////////////////////////////////////////////////
    ////process control
    var selectItem;
    var selectId;
    var deleteConfirm = false;
    //////////////////////////////////////////////////////////////////////////////

    //根據TableDataOrder排序每一行的資料並
    function DataSort(sortRef, dataSource, showData) {
        //id為index:0 在取得資料時指定 => i從1開始
        for (i = 1; i < sortRef.length; i++) {
            showData[sortRef[i]] = dataSource[sortRef[i]];
        }
    }

    ////firebase///////////////////////////////////////
    function databaseLoding(tableName, sortRef, ShowData) {
        var dataNode = database.ref(tableName);
        dataNode.on('value',
            function (snapshot) {
                var temp = snapshot.val();
                ShowData.length = 0;
                for (id in temp) {
                    ShowData.push({ 'Id': id });
                    DataSort(sortRef, temp[id], ShowData[ShowData.length - 1]);
                }
                TableChange(tableName);
            }
        );
    }
    databaseLoding('Manager', ManagerTableDataOrder, ManagerShowData);
    databaseLoding('Member', MemberTableDataOrder, MemberShowData);
    databaseLoding('Order', OrderTableDataOrder, OrderShowData);
    databaseLoding('Manufacturer', ManufacturerTableDataOrder, ManufacturerShowData);

    function databaseDelete(tableName, id) {
        const dataNode = database.ref(tableName + '/' + id);
        dataNode.remove().then(
            function () {
                console.log(tableName + " " + id + " Delete Success");
            });
    }

    function databaseAdd(tableName, data) {
        databaseDelete(tableName, selectId);
        var dataNode = database.ref(tableName + '/' + data['Id']);
        delete data['Id'];
        dataNode.set(data);
    }
    ////////////web element///////////////////////////////////////

    //////Table
    function SetTableData(tableName, dataSource, condition) {
        var table = $("#" + tableName + "_Table_Data");
        table.empty();
        var compare = false;
        for (i = 0; i < dataSource.length; i++) {
            var newTr = $("<tr></tr>").addClass(tableName + " tableRow");
            newTr[0].id = dataSource[i]['Id'];
            for (var data in dataSource[i]) {
                var dataContent = dataSource[i][data];
                //將性別轉為icon
                if (data == "Sex") dataContent = getGenderIcon(dataContent);
                var newTd = $("<td></td>").append(dataContent);
                newTr.append(newTd);
                if (dataSource[i][data].toString().search(condition) > -1) compare = true;
            }
            if (compare) table.append(newTr);
            compare = false;
        }
    }

    function CreatRowModifyAndDeleteBtn(tableName) {
        var tableData = $("#" + tableName + "_Table_Data");

        var newTd = $("<td></td>");
        //Modify Button
        var modifyBtn = $("<button></button>").attr({
            'type': "button",
            'class': "btn btn-success btn-modify",
            'data-toggle': "modal",
            'data-target': "#modify" + tableName + "Modal"
        });
        var modifyIcon = $("<i></i>").attr("class", "fa fa-pen");
        modifyBtn.append(modifyIcon);
        modifyBtn.append("Modify");
        newTd.append(modifyBtn);

        //Delete Button
        var deleteBtn = $("<button></button>").attr({
            'type': "button",
            'class': "btn btn-danger btn-delete",
            'data-toggle': "modal",
            'data-target': "#deleteModal"
        });
        var modifyIcon = $("<i></i>").attr("class", "fa fa-trash");
        deleteBtn.append(modifyIcon);
        deleteBtn.append("Delete");

        //Add Button To Row
        newTd.append(deleteBtn);
        tableData.children().append(newTd);

        //Modify Btn Click Function
        $('.btn-modify').click(function (e) {
            e.preventDefault();
            selectItem = this;
            CopyTableDataToModifyModal(tableName, getTableDataOrder("Manager"), getShowData(tableName));
        });

        //Delete Btn Click Function
        $('.btn-delete').click(function (e) {
            e.preventDefault();
            selectItem = this;
            ItemRowElement = $(selectItem).parents('.tableRow')[0]
            console.log(ItemRowElement);
            $('#deleteMessage').html("Are you sure you want to delete the item with <span>" + ItemRowElement.classList[0] + "ID = " + ItemRowElement.id + "</span>");
        });
    }

    function CopyTableDataToModifyModal(tableName, OrderRef, showData) {
        var tableData;
        selectId = $(selectItem).parents('.tableRow').find('td')[0].textContent;
        for (i = 0; i < showData.length; i++) {
            if (selectId == showData[i]['Id']) {
                tableData = showData[i];
            }
        }
        for (i = 0; i < OrderRef.length; i++) {
            var formFieid = $("#modify" + tableName + "Modal").find(".modify" + OrderRef[i])
            if (formFieid[0].type == "radio") {
                $("input[id*='modify" + tableName + tableData[OrderRef[i]] + "']").prop("checked", "true");
            }
            else formFieid.val(tableData[OrderRef[i]]);
        }
    }

    $("#deleteYes").click(function (e) {
        e.preventDefault();
        $(selectItem).parents('.tableRow').fadeOut(300, function () {
            databaseDelete(this.classList[0], this.id);
            $(this).remove();
        });
        $("#deleteModal").modal("hide");
    })

    function TableChange(table) {
        switch (table) {
            case "Manager":
                SetTableData("Manager", getShowData("Manager"), $("#ManagerSearch")[0].value);
                CreatRowModifyAndDeleteBtn("Manager");
                break;
            case "Member":
                SetTableData("Member", getShowData("Member"), $("#MemberSearch")[0].value);
                CreatRowModifyAndDeleteBtn("Member");
                break;
            case "Order":
                SetTableData("Order", OrderShowData, $("#OrderSearch")[0].value);
                break;
            case "Manufacturer":
                SetTableData("Manufacturer", ManufacturerShowData, $("#ManufacturerSearch")[0].value);
                break;
            case "All":
                SetTableData("Manager", getShowData("Manager"), "");
                CreatRowModifyAndDeleteBtn("Manager");
                SetTableData("Member", getShowData("Member"), "");
                CreatRowModifyAndDeleteBtn("Member");
                SetTableData("Order", OrderShowData, "");
                SetTableData("Manufacturer", ManufacturerShowData, "");
                break;
        }
    }

    //////Modal
    $("#addManagerBtn").click(function () {
        $("#addManagerModal").find("input").removeAttr("style").val("");
        $("#addmen").val("men").attr("checked", "true");
        $("#addwomen").val("women");
    });

    function NewPeopleIfoRules(tableName, operation) {
        var pass = true;
        var notNull = [
            $("#" + operation + "Id"),
            $("#" + operation + "Name"),
            $("#" + operation + "Account"),
            $("#" + operation + "Password"),
            $("#" + operation + "Phone"),
            $("#" + operation + "Email")
        ];
        for (i = 0; i < notNull.length; i++) {
            if (notNull[i].val() == "") {
                pass = false;
                notNull[i].attr("style", "border-color: red");
            }
            else
                notNull[i].removeAttr("style");
        }
        newId = $("#" + operation + "Id").val();
        if (newId != selectId) {
            for (i = 0; i < getShowData(tableName).length; i++) {
                if (getShowData(tableName)[i]['Id'] == newId) {
                    pass = false;
                    $("#" + operation + "Id").attr("style", "border-color: red");
                }
            }
        }
        return pass;
    }

    $("#AddManager").click(function () {
        if (NewPeopleIfoRules("Manager", "add")) {
            var newData = {
                'Id': $("#addId").val(),
                'Name': $("#addName").val(),
                'Account': $("#addAccount").val(),
                'Password': $("#addPassword").val(),
                'Sex': $("input[name=addGender]:checked")[0].value,
                'Phone': $("#addPhone").val(),
                'Email': $("#addEmail").val(),
                'Birthday': $("#addBirthday").val(),
                'Class': $("#addClass option:selected").val(),
            }
            getShowData("Manager").push(newData);
            databaseAdd("Manager", newData);
            $("#addManagerModal").modal('hide');
            TableChange("Manager");
        }
    });

    $("#ModifyManager").click(function () {
        if (NewPeopleIfoRules("Manager", "modify")) {
            var newData = {
                'Id': $("#modifyManagerId").val(),
                'Name': $("#modifyManagerName").val(),
                'Account': $("#modifyManagerAccount").val(),
                'Password': $("#modifyManagerPassword").val(),
                'Sex': $("input[name=modifyGender]:checked")[0].value,
                'Phone': $("#modifyManagerPhone").val(),
                'Email': $("#modifyManagerEmail").val(),
                'Birthday': $("#modifyManagerBirthday").val(),
                'Class': $("#modifyManagerClass option:selected").val(),
            }
            getShowData("Manager").push(newData);
            databaseAdd("Manager", newData);
            $("#modifyManagerModal").modal('hide');
            TableChange("Manager");
        }
    });
}

///////////////////////////////
///                         ///
///     Database Person     ///
///                         ///
///////////////////////////////


document
////////////////////////////////////////////////////
$(document).on("ready", function () {
    if ($.find("#Database_Person").length > 0)
        Database_Person();
});