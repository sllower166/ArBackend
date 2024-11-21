const Sensor = require("../models/Sensors.js");
const { format } = require("date-fns");

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

    // Format the date and time using date-fns
    const formattedDate = format(new Date(`${sensor.fecha}T${sensor.hora}`), "dd/MM/yy HH:mm");

    // Build the response with units of measure
    const responseMessage = `Temperatura: ${sensor.temperatura} °C\n\n` +
      `Humedad: ${sensor.humedad} %\n\n` +
      `Presión: ${sensor.presion} hPa\n\n` +
      `Última lectura: ${formattedDate}`;
    
    const distances = {
      distancia_R: `${sensor.distancia_R} cm`,
      distancia_S: `${sensor.distancia_S} cm`,
      distancia_T: `${sensor.distancia_T} cm`,
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
