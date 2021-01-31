// Locate the device twin via the Registry, then update some tags and properties.
const registry = Registry.fromConnectionString(connectionString);

registry.getTwin(deviceId, function (err, twin) {
    if (err) {
        redMessage(err.constructor.name + ': ' + err.message);
    } else {
        const desiredTemp = 50;
        const desiredHumidity = 85;
        const setDesiredValues = {

            // Tags aren't shared with the device, they are known only to IoT Hub.
            tags: {
                customerID: 'Customer1',
                cellar: 'Cellar1'
            },

            // Properties are shared with the device.
            properties: {
                desired: {
                    patchId: "Set values",
                    temperature: desiredTemp.toString(),
                    humidity: desiredHumidity.toString()
                }
            }
        };

        // Update the device twin.
        twin.update(setDesiredValues, function (err) {
            if (err) {
                redMessage('Could not update twin: ' + err.constructor.name + ': ' + err.message);
            } else {
                greenMessage(twin.deviceId + ' twin updated successfully');

                // Show how a query to the device twins is handled.
                queryTwins();
            }
        });
    }
});

function queryTwins() {

    // Send a SQL query, to determine all the devices in "Cellar1".
    const query = registry.createQuery("SELECT * FROM devices WHERE tags.cellar = 'Cellar1'", 100);
    query.nextAsTwin(function (err, results) {
        if (err) {
            redMessage('Failed to fetch the results: ' + err.message);
        } else {
            greenMessage("Devices in Cellar1: " + results.map(function (twin) { return twin.deviceId }).join(','));
        }
    });
};
