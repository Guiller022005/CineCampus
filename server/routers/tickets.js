const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketsController');

// Obtener todas las boletas
router.get('/', ticketController.getAllTickets);
// Crear una nueva boleta
router.post('/', ticketController.createTicket);
// Obtener una boleta por ID
router.get('/:id', ticketController.getTicketById);
// Actualizar una boleta por ID
router.put('/:id', ticketController.updateTicketById);

module.exports = router;