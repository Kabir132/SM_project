//Global variables
let port;

let globalTemperature = 0;
let setTemp = 0;

var dataPoints = [];
var setPointValues = [];

var dataToSave = [];

//Save data to file
document.getElementById("saveData").addEventListener("click", () => {
  const blob = new Blob([dataToSave.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

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
    const errorElement = document.getElementById("errorValue");

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      message += value;
      if (value.includes("\n")) {
        try {
          const jsonMessage = JSON.parse(message.trim());
          console.log("Received JSON message:", jsonMessage);

          globalTemperature = jsonMessage["temperature"];

          portValueElement.textContent = jsonMessage["temperature"];
          pwmDutyElement.textContent = jsonMessage["PID"];
          setpointElement.textContent = jsonMessage["Setpoint"];

          setTemp = jsonMessage["Setpoint"];

          errorElement.textContent = (
            jsonMessage["temperature"] - jsonMessage["Setpoint"]
          ).toFixed(3);

          message = "";
        } catch (error) {
          console.error("Error parsing JSON message:", error);
          message = "";
        }
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
    axisY: {
      title: "Temperature (°C)",
      maximum: 70,
      minimum: 20,
      includeZero: true,
      suffix: " °C",
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chartTemperature.render();
      },
    },
    data: [
      {
        type: "line",
        showInLegend: true,
        name: "Temperature",
        dataPoints: dataPoints,
        lineThickness: 6,
      },
      {
        type: "stepLine",
        showInLegend: true,
        name: "Set Point",
        dataPoints: setPointValues,
      },
    ],
  });

  var dataPointsPWM = [];
  var chartPWM = new CanvasJS.Chart("chartPWMContainer", {
    title: {
      text: "PWM Duty Cycle Graph",
    },
    axisY: {
      title: "Width (%)",
      maximum: 101,
      minimum: -1,
      includeZero: true,
      suffix: " %",
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
      dataToSave.push(yValueTemperature);
      addData(chartTemperature, dataPoints, yValueTemperature);
      addData(chartTemperature, setPointValues, parseFloat(setTemp));
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
