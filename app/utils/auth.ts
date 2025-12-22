
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type User = z.infer<typeof userSchema>;

// In-memory user store
const users: User[] = [];

export const signUp = (data: Omit<User, 'id'>) => {
  const existingUser = users.find((user) => user.email === data.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const newUser = { ...data };
  users.push(newUser);
  console.log('Users:', users);
  return newUser;
};

export const logIn = (data: User) => {
  const user = users.find((user) => user.email === data.email);
  if (!user || user.password !== data.password) {
    throw new Error('Invalid email or password');
  }
  return user;
};