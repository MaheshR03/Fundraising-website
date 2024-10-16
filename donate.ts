// pages/api/donate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, amount, referralCode } = req.body;

      // Create donation record
      const donation = await prisma.donation.create({
        data: {
          name,
          email,
          phone,
          amount,
          referralCode,
        },
      });

      // Update user's goal achieved if referral code is provided
      if (referralCode) {
        await prisma.user.update({
          where: { referralCode },
          data: {
            goalAchieved: {
              increment: amount,
            },
          },
        });
      }

      res.status(200).json({ message: 'Donation successful', donation });
    } catch (error) {
      console.error('Error processing donation:', error);
      res.status(500).json({ message: 'Error processing donation' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}