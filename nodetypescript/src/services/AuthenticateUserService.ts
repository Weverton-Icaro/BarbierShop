import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //user.password - senha criptografada
    //password - senha não criptografada

    const passwordmatched = await compare(password, user.password);

    if (!passwordmatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    //1 parametro - payload - fica no token mas de forma não segura(não colocar dados sensiveis do usuário)
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    //Usuário autenticado
    return { user, token };
  }
}

export default AuthenticateUserService;
