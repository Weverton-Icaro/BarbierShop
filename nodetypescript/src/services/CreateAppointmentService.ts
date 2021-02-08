import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';



interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public run({ date, provider}: RequestDTO): Appointment {
    const timeScheduling = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findDate(
      timeScheduling,
    );

    if (findAppointmentInSameDate) {
      throw Error('The selected date is not available!')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: timeScheduling,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
