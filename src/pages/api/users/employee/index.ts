import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Employee, Bug, Ticket } from '../../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from '../../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const { email, password, firstName, lastName, displayName } = req.query;
    const { method } = req
    switch (method) {
      case Methods.Get:
        const employee = await Employee.findAll({
          include: [Bug, Ticket]
        });
        res.status(200).json({ success: true, data: employee });
        break;

      // =================================================================================================

      case Methods.Post:
        const userData = await Employee.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            displayName: displayName,
        });

        res.status(200).json({ employee: userData });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error.errors,
      type: error.errors,
    });
    console.log(error);
  }};