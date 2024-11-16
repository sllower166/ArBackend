const router = require("express").Router();
const { check } = require("express-validator");
const { checkFields } = require("../middleware/check_fields");
const { getSensorById } = require("../controllers/sensors"); // Import the sensor controller

/**
 * @swagger
 * tags:
 *   name: Sensors
 *   description: Sensor management endpoints.
 */

// Route to get a specific sensor by ID
/**
 * @swagger
 * /api/sensors/{id}:
 *   get:
 *     summary: Retrieve the most recent record of a specific sensor by its ID.
 *     tags:
 *       - Sensors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the sensor to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the most recent sensor data.
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               message: "Sensor data retrieved successfully."
 *               sensorData: "Temperature: 32.17, Humidity: 59.38, Pressure: 1012.39, Last Reading: 2024-10-15 01:02:06"
 *               distances:
 *                 distancia_R: 21.47
 *                 distancia_S: 28.02
 *                 distancia_T: 29.65
 *       400:
 *         description: Validation error (e.g., missing or invalid ID).
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: "The sensor ID is required and must be a valid MongoDB ObjectID."
 *       404:
 *         description: Sensor not found.
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: "Sensor not found."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: "Server error while retrieving the sensor."
 */
router.get(
  "/:id",
  [
    check("id", "The sensor ID is required and must be a valid ID").notEmpty().isMongoId(), // Validate ID is not empty and is a valid MongoDB ObjectID
    checkFields, // Handle validation errors
  ],
  getSensorById
);

module.exports = router;
