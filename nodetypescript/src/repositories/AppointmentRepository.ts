//Responsável por Criar, Ler, Deletar, Alterar, Atualizar os dados
import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

//Date Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public allAppointments(): Appointment[] {
    return this.appointments;
  }

  //Encontrando agendamentos na mesma data
  public findDate(date: Date): Appointment | null {

    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  public create({provider, date}: CreateAppointmentDTO ): Appointment {
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
