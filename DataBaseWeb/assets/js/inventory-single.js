
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

var id = getQueryVariable('watch', 'TEST');

var carData = new Array();
carData['Name'] = "ASTON MARTIN DB11%%%";
carData['Year'] = "2017%%%";
carData['Make'] = "Aston-Martin%%%";
carData['Model'] = "DB11%%%";
carData['Price'] = "211995%%%";
carData['Engine'] = "V12%%%";
carData['TransmissionLite'] = "Automatic%%%";
carData['TransmissionFull'] = "8 - Speed ZF Automatic%%%";
carData['Horsepower'] = "600%%%";
carData['Torque'] = "516%%%";
carData['Displacement'] = "5.2%%%";
carData['0-60Time'] = "3.9%%%";
carData['TopSpeed'] = "200%%%";
carData['HP'] = "680%%%";
carData['img1'] = "assets/img/inventory/" + id + "/carImg1.png"
carData['img2'] = "assets/img/inventory/" + id + "/carImg2.png"
carData['img3'] = "assets/img/inventory/" + id + "/carImg3.png"
carData['img4'] = "assets/img/inventory/" + id + "/carImg4.png"

//Add car img to imageGallery
for (i = 1; i < 5; i++) {
    var imageGallery = $("#imageGallery")[0];
    if(carData.hasOwnProperty('img'+i)) {
        //建立新的 <li> 元素
        var newList = document.createElement('li');
        //newList.id = "carImg"+i+"-data-thumb";
        newList.setAttribute("data-thumb", carData['img'+i]);
        var newImg = document.createElement('img');
        //newImg.id = "carImg"+i;
        newImg.setAttribute("src", carData['img'+i]);
        newImg.alt = "URL Error";
        newList.appendChild(newImg);
        imageGallery.appendChild(newList);
        //$("#carImg" + i )[0].setAttribute("src", carData['img'+i]);
        //$("#carImg"+i+"-data-thumb")[0].setAttribute("data-thumb", carData['img'+i]);
    }
}

$("#carName")[0].innerHTML = carData['Name'];
$("#carYear")[0].innerHTML = carData['Year'];
$("#carHP")[0].innerHTML = carData['HP'];
$("#carTransmissionLite")[0].innerHTML = carData['TransmissionLite'];
$("#carTopSpeed")[0].innerHTML = carData['TopSpeed'];
$("#carPrice")[0].innerHTML = "$" + carData['Price'];
$("#carSpecificationsYear")[0].innerHTML = "<span>Year:</span>" + carData['Year'];
$("#carSpecificationsMake")[0].innerHTML = "<span>Make:</span>" + carData['Make'];
$("#carSpecificationsModel")[0].innerHTML = "<span>Model:</span>" + carData['Model'];
$("#carSpecificationsPrice")[0].innerHTML = "<span>Price:</span>" + "$ "+ carData['Price'];
$("#carSpecificationsEngin")[0].innerHTML = "<span>Engine:</span>" + carData['Engine'];
$("#carSpecificationsTransmission")[0].innerHTML = "<span>Transmission:</span>" + carData['TransmissionFull'];
$("#carSpecificationsHorsepower")[0].innerHTML = "<span>Horsepower @ RPM:</span>" + carData['Horsepower'];
$("#carSpecificationsTorque")[0].innerHTML = "<span>Torque @ RPM:</span>" + carData['Torque'];
$("#carSpecificationsDisplacement")[0].innerHTML = "<span>Displacement:</span>" + carData['Displacement'] + " L";
$("#carSpecifications0-60Time")[0].innerHTML = "<span>0-60 time:</span>" + carData['0-60Time'] + " Sec.";
$("#carSpecificationsTopSpeed")[0].innerHTML = "<span>Top Speed:</span>" + carData['TopSpeed'] + " mph";
