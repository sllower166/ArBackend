const Sensor = require("../models/Sensors.js");

const getSensorById = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the sensor by ID and retrieve the most recent record based on date or time
    const sensor = await Sensor.findById(id)
      .sort({ fecha: -1, hora: -1 }) // Sort by date and time in descending order to get the most recent
      .limit(1); // Ensure only the most recent record is retrieved

    if (!sensor) {
      return res.status(404).json({
        ok: false,
        msg: "Sensor not found",
      });
    }

    // Build the response
    const responseMessage = `Temperatura: ${sensor.temperatura} °C\n\n` +
    `Humedad: ${sensor.humedad} %\n\n` +
    `Presión: ${sensor.presion} hPa\n\n` +
    `Última lectura: ${sensor.fecha} ${sensor.hora.substring(0, 5)}`;
    const distances = {
      distancia_R: sensor.distancia_R,
      distancia_S: sensor.distancia_S,
      distancia_T: sensor.distancia_T,
    };

    res.status(200).json({
      ok: true,
      message: responseMessage,
      distances,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Server error while retrieving the sensor",
    });
  }
};

module.exports = {
  getSensorById,
};
