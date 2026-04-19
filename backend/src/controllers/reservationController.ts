import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { date, customerId, tableId } = req.body;
    
    // Check if table is available for that date/time
    const existing = await prisma.reservation.findFirst({
      where: {
        tableId,
        date: new Date(date),
        status: { not: 'CANCELLED' }
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Table is already reserved for this time' });
    }

    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        customerId,
        tableId,
        status: 'PENDING'
      }
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};

export const getMyReservations = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const reservations = await prisma.reservation.findMany({
      where: { customerId: String(customerId) },
      include: {
        table: {
          include: { restaurant: true }
        }
      },
      orderBy: { date: 'desc' }
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.reservation.update({
      where: { id: String(id) },
      data: { status }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation' });
  }
};
