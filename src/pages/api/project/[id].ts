import { useRouter } from 'next/router.js';
import { NextApiRequest, NextApiResponse } from 'next';
//models
import { Bug, Project, Tag, Ticket } from '../../../../server/models/index.js'

//Types
import { RequestMethods as Methods } from '../../../@types/api';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id } = req.query
        const { method } = req;
        switch (method) {
            case Methods.Get:
                const project = await Project.findOne({
                    where: { id: id },
                    include: [Ticket, Tag, Bug]
                });
                res.status(200).json({ success: true, data: project });
                break;


            //==============================================================


            case Methods.Put:
                    const updatedProject = await Project.update(
                        {  name: req.body.name,
                            description: req.body.description,
                            github_url: req.body.github_url, },
                        {
                            where: { id: id },
                        }
                    );
                    res.status(200).json({ data: updatedProject });
                    break;
            //==============================================================

            case Methods.Delete:
                const deleteBug = await Bug.destroy({
                    where: { id: id }
                });
                res.status(200).json({ success: true, data: deleteBug})
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error){
        res.status(500).json({
            message: error.errors,
            type: error.errors,
        });

        console.log(error);
    }
} 