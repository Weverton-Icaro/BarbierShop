//Rota: RECEBER UMA REQUISIÇÃO, CHAMAR OUTRO ARQUIVO, DEVOLVER UMA RESPOSTA

import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.allAppointments();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const dateTypeChange = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.run({ date: dateTypeChange, provider });

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.messege });
  }
});

export default appointmentsRouter;
