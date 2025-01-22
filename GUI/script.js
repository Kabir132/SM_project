let port;

let globalTemperature = 0;

async function connectToSerialPort() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600, dataBits: 8, parity: "none" });

    console.log("Successfully connected to the serial port");

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable
      .pipeTo(textDecoder.writable)
      .catch(() => {
        /* Ignore the error */
      });
    const reader = textDecoder.readable.getReader();

    let message = "";
    const portValueElement = document.getElementById("portValue");
    const pwmDutyElement = document.getElementById("PWMvalue");
    const setpointElement = document.getElementById("setpointValue");

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      message += value;
      if (value.includes("\n")) {
        const jsonMessage = JSON.parse(message.trim());
        console.log("Received JSON message:", jsonMessage);

        globalTemperature = jsonMessage["temperature"];

        portValueElement.textContent = jsonMessage["temperature"];
        pwmDutyElement.textContent = jsonMessage["PID"];
        setpointElement.textContent = jsonMessage["Setpoint"];

        message = "";
      }
    }

    reader.releaseLock();
    await readableStreamClosed.catch(() => {
      /* Ignore the error */
    });
    await port.close();
  } catch (error) {
    console.error("There was an error opening the serial port:", error);
  }
}

async function sendDataToSerialPort(data) {
  if (port && port.writable) {
    const writer = port.writable.getWriter();
    const encodedData = new TextEncoder().encode(data);
    await writer.write(encodedData);
    writer.releaseLock();
  } else {
    console.error("Serial port is not open");
  }
}

var dataPoints = [];

document.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.getElementById("connectButton");
  connectButton.addEventListener("click", connectToSerialPort);

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const temperaturaInput = document.getElementById("temperaturaInput");
    const data = temperaturaInput.value;
    sendDataToSerialPort(data);
  });

  var chartTemperature = new CanvasJS.Chart("chartTemperatureContainer", {
    title: {
      text: "Temperature Graph",
    },
    data: [
      {
        type: "line",
        dataPoints: dataPoints,
      },
    ],
  });

  var dataPointsPWM = [];
  var chartPWM = new CanvasJS.Chart("chartPWMContainer", {
    title: {
      text: "PWM Duty Cycle Graph",
    },
    data: [
      {
        type: "line",
        dataPoints: dataPointsPWM,
      },
    ],
  });

  function addData(chart, dataPoints, data) {
    dataPoints.push({ y: data });
    chart.render();
  }

  setInterval(function () {
    if (globalTemperature !== 0) {
      var yValueTemperature = globalTemperature;
      addData(chartTemperature, dataPoints, yValueTemperature);
    }
  }, 1000);

  setInterval(function () {
    const pwmDutyElement = document.getElementById("PWMvalue").textContent;
    if (pwmDutyElement !== "No value read yet.") {
      var yValuePWM = parseFloat(pwmDutyElement);
      addData(chartPWM, dataPointsPWM, yValuePWM);
    }
  }, 1000);
});
