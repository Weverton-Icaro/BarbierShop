import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    //verificando se está recebendo variáveis validas
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change avatar. Please login to change your avatar ',
        401,
      );
    }

    if (user.avatar) {
      //Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      //verificando se o arquivo existe
      const userAvatarFileExits = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExits) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    //atualizando o avatar
    user.avatar = avatarFilename;

    //Se não tiver um avatar ele irá criar, se tiver ele atualiza
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
