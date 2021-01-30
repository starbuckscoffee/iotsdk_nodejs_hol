// Function to handle the SetFanState direct method call from IoT hub.
function onSetFanState(request, response) {

    // Function to send a direct method response to your IoT hub.
    function directMethodResponse(err) {
        if (err) {
            redMessage('An error ocurred when sending a method response:\n' + err.toString());
        } else {
            greenMessage('Response to method \'' + request.methodName + '\' sent successfully.');
        }
    }

    greenMessage('Direct method payload received:' + request.payload);

    // Check that a valid value was passed as a parameter.
    if (fanState == stateEnum.failed) {
        redMessage('Fan has failed and cannot have its state changed');

        // Report fan failure back to your hub.
        response.send(400, 'Fan has failed and cannot be set to: ' + request.payload, directMethodResponse);
    } else {
        if (request.payload != "on" && request.payload != "off") {
            redMessage('Invalid state response received in payload');

            // Report payload failure back to your hub.
            response.send(400, 'Invalid direct method parameter: ' + request.payload, directMethodResponse);

        } else {
            fanState = request.payload;

            // Report success back to your hub.
            response.send(200, 'Fan state set: ' + request.payload, directMethodResponse);
        }
    }
}

// Set up the handler for the SetFanState direct method call.
client.onDeviceMethod('SetFanState', onSetFanState);
