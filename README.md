# iotsdk_nodejs_hol
Sample NodeJS file of Device Sim to send Telemetry to IoT Hub  and Receiver to get message from IoT Hub

--How to Guide--

[[Device Simulator]]

1. Create a new folder
2. Import Node Package of IoT Device SDK 

    npm install azure-iot-device@1.15.0
    npm install azure-iot-device-mqtt@1.15.0
    npm install chalk@2.4.2

3.  Change app.js of ConnectionString  and Device ID

4.  run   node app.js

[[Reciver]]

1.  Create a new folder
2.  Import Node Package of IoT service SDK

 npm install azure-iothub@1.12.2  
 npm install @azure/event-hubs@2.1.4
 npm install chalk@2.4.2

3.  Change app.s of IoTHubOwner(connstring) and Device ID

4.  run node app.js
