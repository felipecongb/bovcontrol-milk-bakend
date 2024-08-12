/**
 * @swagger
 * /extract:
 *   get:
 *     summary: Get extract data
 *     description: Retrieve the extract data
 *     parameters:
 *       - in: query
 *         name: farmerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the farmer
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The start date of the extract
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The end date of the extract
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     month:
 *                       type: string
 *                     liters:
 *                       type: number
 *       500:
 *         description: Internal server error
 */
