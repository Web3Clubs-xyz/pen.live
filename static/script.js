//Updating Frames in Image tag to Show Video Stream
window.addEventListener('load', function () {
    console.log("Window UP")
    // document.getElementById("videoElement").src = "/video_feed"
    // clearTerminal();
    // stopProcess("");
});


function startVideo() {
    var url = $('#url').val();
    $('#urlForm').attr('action', '/index'); // Set the form action to /index
    $('#urlForm').attr('method', 'POST'); // Set the form method to POST
    $('#urlForm').find('#url').val(url); // Set the URL value in the form
    $('#urlForm').submit(); // Submit the form
}

// function startVideo() {
//     var url = $('#url').val();
//
//     $.ajax({
//         url: "/index",
//         type: "POST",
//
//         data: {url: url},
//         success: function () {
//             console.log("Video stream started successfully!");
//
//             location.reload();
//         },
//         error: function () {
//             console.log("Error starting video stream!");
//         }
//     });
// }

function stopProcess(message) {
    console.log("Stop BUTTON");
    const terminalData = document.getElementById('terminal').innerHTML;
    document.getElementById('terminal').innerHTML = terminalData + "<br><br><center>" + message + "</center><br><br>";
    fetch('/stop_process')
        .then(response => response.text())
        .then(message => {
            console.log(message);
            // Redirect to homepage after stopping the process
            window.location.href = '/';
        })
        .catch(error => console.error(error));
}


// function clearTerminal() {
//     // Get a reference to the clear button
//     const clearButton = document.getElementById('clear-button');
//
//     // Add a click event listener to the clear button
//     clearButton.addEventListener('click', function () {
//         console.log("CLEAR BUTTON")
//         document.getElementById('terminal').innerHTML = "";
//     });
//
//     // Clear the terminal on page load
//     document.getElementById('terminal').innerHTML = "";
// }


//This Code is used to Communicate b/w Client & Server via SOCKETIO
var socket = io.connect('http://127.0.0.1:5000/');

function appendToTerminal(data) {
    var goatInfoDict = data.goat_info_dict;
    var maxAnimalsCount = data.max_animals_count;
    var terminal = document.getElementById("terminal");

    // Clear existing content
    terminal.innerHTML = '';

    var title = document.createElement("h2");
    title.innerHTML = "Tracking ID - Height - Color";
    terminal.appendChild(title);

    var p = document.createElement("p");
    var tableContent = '<table class="table table-striped text-center"><thead><tr><th>ID</th><th>Height (px)</th><th>Color</th></tr></thead><tbody>';

    for (var id in goatInfoDict) {
        tableContent += `<tr><td class="col-md-4 text-center">${id}</td><td class="col-md-4 text-center">${goatInfoDict[id].height}</td><td class="col-md-4 text-center">${goatInfoDict[id].color}</td></tr>`;
    }

    tableContent += '</tbody></table>';
    p.innerHTML = tableContent;
    terminal.appendChild(p);

    // Display total count of animals
    var totalAnimals = document.createElement("h3");
    totalAnimals.innerHTML = `Total Animals: ${maxAnimalsCount}`;
    terminal.appendChild(totalAnimals);

    terminal.scrollTop = terminal.scrollHeight;
}


//Updating Terminal with Detected Objects
socket.on("goat_info", (data) => {
    appendToTerminal(data);
});

//Code For All Switches
function toggleHSwitch() {
    var switchElement = $("#flip-horizontal");
    var switchIsOn = switchElement.is(":checked");

    if (switchIsOn) {
        console.log("SWITCH ON")
        $.getJSON("/request_flipH_switch", function (data) {
            console.log("Switch on request sent.");
        });
    } else {
        console.log("SWITCH OFF")
        $.getJSON("/request_flipH_switch", function (data) {
            console.log("Switch off request sent.");
        });
    }
}

function toggleDetSwitch() {

    var switchElement = $("#run_detection");
    var switchIsOn = switchElement.is(":checked");

    if (switchIsOn) {
        console.log("SWITCH ON")
        $.getJSON("/request_run_model_switch", function (data) {
            console.log("Switch on request sent.");
        });
    } else {
        console.log("SWITCH OFF")
        $.getJSON("/request_run_model_switch", function (data) {
            console.log("Switch off request sent.");
        });
    }
}

function toggleOffSwitch() {
    var switchElement = $("#turn_off");
    var switchIsOn = switchElement.is(":checked");

    if (switchIsOn) {
        console.log("Camera ON")
        $.getJSON("/request_preview_switch", function (data) {
            console.log("Switch on request sent.");
        });
    } else {
        console.log("Camera OFF")
        $.getJSON("/request_preview_switch", function (data) {
            console.log("Switch off request sent.");
        });
    }
}

$(document).ready(function () {
    // Get the slider element
    var slider = $('#slider');

    // Attach the event listener to the slider element
    slider.on('input', function () {
        // Get the value of the slider
        var sliderValue = slider.val();

        // Call the updateSliderValue() function and pass in the slider value
        updateSliderValue(sliderValue);
    });
});


function updateSliderValue(sliderValue) {
    console.log(sliderValue)
    $.ajax({
        type: 'POST',
        url: '/update_slider_value',
        data: {'sliderValue': sliderValue},
        success: function () {
            console.log('Slider value updated successfully!');
        },
        error: function () {
            console.log('Error updating slider value!');
        }
    });
    document.getElementById("conf_display").innerHTML = sliderValue
}
