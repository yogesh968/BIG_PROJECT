import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        reviews: true,
      },
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: String(id) },
      include: {
        tables: true,
        menuItems: true,
        reviews: {
          include: {
            customer: {
              select: { name: true }
            }
          }
        },
      },
    });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant details' });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, description, address, cuisine, ownerId } = req.body;
    const restaurant = await prisma.restaurant.create({
      data: { name, description, address, cuisine, ownerId },
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant' });
  }
};
