import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient'; // Prisma Client

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Đăng ký người dùng
export const register = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { username, email, full_name, password } = req.body;

    // Kiểm tra username và email có tồn tại không
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        console.log('Email already exists'); // Debug log
        return res.status(409).json({ message: 'Email already exists' }); // Trả về `message` thay vì `error`
      }
      if (existingUser.username === username) {
        console.log('Username already exists'); // Debug log
        return res.status(409).json({ message: 'Username already exists' });
      }
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        full_name,
        passwordHash: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
};

// Đăng nhập người dùng
export const login = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
};

// Cập nhật mật khẩu
export const updatePassword = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, newPassword } = req.body;

  try {
    // Tìm người dùng theo email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword },
    });

    return res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error: any) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};