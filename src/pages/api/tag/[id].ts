import { useRouter } from 'next/router.js';
import { NextApiRequest, NextApiResponse } from 'next';
//models
import { Bug, Project, Ticket, Tag } from '../../../../server/models/index.js'

//Types
import { RequestMethods as Methods } from 'src/@types/api.js';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id, name } = req.query
        const { method } = req;
        switch (method) {
            case Methods.Get:
                const tag = await Tag.findOne({
                    where: { id: id },
                    include: [Ticket, Project, Bug]
                });
                res.status(200).json({ success: true, data: tag });
                break;


            //==============================================================


            case Methods.Put:
                    const updatedTag = await Bug.update(
                        { name: name },
                        {
                            where: { id: id },
                        }
                    );
                    res.status(200).json({ data: updatedTag});
                    break;
            //==============================================================

            case Methods.Delete:
                const deleteTag = await Tag.destroy({
                    where: { id: id }
                });
                res.status(200).json({ success: true, data: deleteTag})
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
