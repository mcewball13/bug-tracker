import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Bug, Ticket } from '../../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from '../../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const { id } = req.query;
    console.log(id);
    const { method } = req
    switch (method) {
      case Methods.Get:
        const bugs = await Bug.findAll({
          attributes: {
            exclude: ["id"],
          },
          include: [ Ticket ],
        });
        res.status(200).json({ success: true, data: bugs });
        break;

      // =================================================================================================

      case Methods.Post:
        const newBug = await Bug.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            dateCreated: new Date().toISOString(),
            employee: req.body.employee_id
        })

        res.status(200).json({ newBug });
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
};



