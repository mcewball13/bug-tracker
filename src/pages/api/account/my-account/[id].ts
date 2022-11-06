import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Employee } from '../../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from '../../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const { id } = req.query;
    console.log(id);
    const { method } = req
    switch (method) {
      case Methods.Get:
        const employee = await Employee.findOne({
          where: { id: id },
        });
        res.status(200).json({ success: true, data: employee });
        break;

      // =================================================================================================

      case Methods.Post:
        const userData = await Employee.findOne({
          where: { id: id },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        });

        res.status(200).json({ user: userData });
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
  }
  //   TODO add PUT and DELETE methods
}
