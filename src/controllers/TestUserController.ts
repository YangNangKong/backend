import { Request, Response } from 'express';
import TestUser from '../models/TestUser'; // User 모델 가져오기

// Create (POST) a new user
export const createTestUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    const user = await TestUser.create({
      username,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Read (GET) all users
export const getTestUsers = async (req: Request, res: Response) => {
  try {
    const users = await TestUser.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// // Read (GET) a user by ID
// export const getUserById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// };

// // Update (PUT) a user by ID
// export const updateUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       await user.update(req.body);
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// };

// // Delete (DELETE) a user by ID
// export const deleteUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.status(204).send();
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// };