import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Bug, Ticket, Project, Employee } from '../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from '../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const { id } = req.query;
    console.log(id);
    const { method } = req
    switch (method) {
      case Methods.Get:
        const projects = await Project.findAll({
          attributes: {
            exclude: ["id"],
          },
          include: [ Ticket, Bug, Employee ],
        });
        res.status(200).json({ success: true, data: projects });
        break;

      // =================================================================================================

      case Methods.Post:
        const newProject = await Project.create({
            name: req.body.name,
            description: req.body.description,
            github_url: req.body.github_url,
        })

        res.status(200).json({ newProject });
        break;

    //=============================================
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