import bcrypt from 'bcrypt';
import { config } from '../config'; // Corrected the import syntax
import UserDao, { IUserModel } from '../daos/UserDao'; // Corrected the import syntax and parentheses
import { IUser } from '../models/User'; // Corrected the import of TUser
import { UnableToSaveUserError, InvalidUsernameOrPasswordError, UserDoesNotExistError } from '../utils/LibraryErrors';

export async function register(user: IUser): Promise<IUserModel> {
  const ROUNDS = config.server.rounds;

  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
    const savedUser = await UserDao.create({ ...user, password: hashedPassword });
    return savedUser;
  } catch (error: any) {
    throw new UnableToSaveUserError(error.message);
  }
}

export async function login(credentials: { email: string, password: string }): Promise<IUserModel> {
  const { email, password } = credentials;

  try {
    const user = await UserDao.findOne({ email });
    if (!user) {
      throw new InvalidUsernameOrPasswordError("Invalid username or password");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      return user;
    } else {
      throw new InvalidUsernameOrPasswordError("Invalid username or password");
    }
  } catch (error: any) {
    throw error;
  }
}

export async function findAllUsers(): Promise<IUserModel[]> {
  try {
    const users = await UserDao.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Unable to retrieve users");
  }
}


export async function findUserById(userId: string): Promise<IUserModel> {
  try {
    const user = await UserDao.findById(userId);
    if (!user) {
      throw new UserDoesNotExistError("User does not exist with this ID");
    }
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function modifyUser(user: IUserModel): Promise<IUserModel> {
  try {
    const updatedUser = await UserDao.findByIdAndUpdate(user._id, user, { new: true });
    if (!updatedUser) {
      throw new UserDoesNotExistError("User does not exist with this ID");
    }
    return updatedUser;
  } catch (error: any) {
    throw error;
  }
}

export async function removeUser(userId: string): Promise<string> {
  try {
    let deleted = await UserDao.findByIdAndDelete(userId);
    if (!deleted) {
      throw new UserDoesNotExistError("User does not exist with this ID");
    }
    return "User deleted successfully";
  } catch (error) {
    throw error;
  }
}
