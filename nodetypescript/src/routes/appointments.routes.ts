//Rota: RECEBER UMA REQUISIÇÃO, CHAMAR OUTRO ARQUIVO, DEVOLVER UMA RESPOSTA

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const dateTypeChange = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.run({
      date: dateTypeChange,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.messege });
  }
});

export default appointmentsRouter;
