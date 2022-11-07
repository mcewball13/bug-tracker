import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Bug, Project, Tag, Ticket } from '../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from '../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const { id } = req.query;
    console.log(id);
    const { method } = req
    switch (method) {
      case Methods.Get:
        const tags = await Tag.findAll({
          attributes: {
            exclude: ["id"],
          },
          include: [ Ticket, Bug, Project]
        });
        res.status(200).json({ success: true, data: tags });
        break;

      // =================================================================================================

      case Methods.Post:
        const newTag = await Tag.create({
            name: req.body.name,
        })

        res.status(200).json({ newTag });
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