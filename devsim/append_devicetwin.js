let deviceTwin;                                         // Global reference to device twin.

// Create a patch to send to the hub.
const reportedPropertiesPatch = {
    firmwareVersion: '1.2.3',
    lastPatchReceivedId: '',
    fanState: '',
    currentTemperature: '',
    currentHumidity: ''
};

// Send the reported properties patch to the hub.
function sendReportedProperties() {

    // Prepare the patch.
    reportedPropertiesPatch.fanState = fanState;
    reportedPropertiesPatch.currentTemperature = currentTemperature.toFixed(2);
    reportedPropertiesPatch.currentHumidity = currentHumidity.toFixed(2);

    deviceTwin.properties.reported.update(reportedPropertiesPatch, function (err) {
        if (err) {
            redMessage(err.message);
        } else {
            greenMessage('\nTwin state reported');
            greenMessage(JSON.stringify(reportedPropertiesPatch, null, 2));
        }
    });
}

// Handle changes to the device twin properties.
client.getTwin(function (err, twin) {
    if (err) {
        redMessage('could not get twin');
    } else {
        deviceTwin = twin;
        deviceTwin.on('properties.desired', function (v) {
            desiredTemperature = parseFloat(v.temperature);
            desiredHumidity = parseFloat(v.humidity);
            greenMessage('Setting desired temperature to ' + v.temperature);
            greenMessage('Setting desired humidity to ' + v.humidity);

            // Update the reported properties, after processing the desired properties.
            sendReportedProperties();
        });
    };
});
