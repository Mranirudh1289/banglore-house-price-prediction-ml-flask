function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "https://banglore-house-price-prediction-ml-flask-qvsy.onrender.com/api/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function (data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        estPrice.style.display = "block";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "https://banglore-house-price-prediction-ml-flask-qvsy.onrender.com/api/get_location_names";

    $.get(url, function (data, status) {
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            $('#uiLocations').append(new Option("Choose a Location", ""));
            for (var i in locations) {
                $('#uiLocations').append(new Option(locations[i]));
            }
        }
    });
}

window.onload = onPageLoad;
