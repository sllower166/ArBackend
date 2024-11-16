const { Schema, model } = require("mongoose");

const SensorSchema = Schema({
  temperatura: {
    type: Number,
    required: true,
  },
  humedad: {
    type: Number,
    required: true,
  },
  presion: {
    type: Number,
    required: true,
  },
  distancia_R: {
    type: Number,
    required: true,
  },
  distancia_S: {
    type: Number,
    required: true,
  },
  distancia_T: {
    type: Number,
    required: true,
  },
  ubicacion: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  fecha: {
    type: String, // Alternativamente, puedes usar Date si planeas trabajar con fechas
    required: true,
  },
  hora: {
    type: String, // Alternativamente, puedes combinar fecha y hora en un campo Date
    required: true,
  },
}, { versionKey: false }); // versionKey: false elimina el campo __v

module.exports = model("Sensors", SensorSchema,"generals");