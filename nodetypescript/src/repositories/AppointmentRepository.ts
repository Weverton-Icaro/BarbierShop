//Responsável por Criar, Ler, Deletar, Alterar, Atualizar os dados
import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  allAppointments() {
    throw new Error('Method not implemented.');
  }

  //Encontrando agendamentos na mesma data
  // async retorna uma Promise,  appointments | null = response do Date.
  public async findDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
