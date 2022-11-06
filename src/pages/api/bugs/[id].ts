import { useRouter } from 'next/router.js';
import { NextApiRequest, NextApiResponse } from 'next';
//models
import { Bug } from '../../../../server/models/index.js'

//Types
import { RequestMethods as Methods } from 'src/@types/api.js';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id, priority, title, status } = req.query
        const { method } = req;
        switch (method) {
            case Methods.Get:
                const bug = await Bug.findOne({
                    where: { id: id },
                });
                res.status(200).json({ success: true, data: bug });
                break;


            //==============================================================


            case Methods.Put:
                    const updatedBug = await Bug.update(
                        { status: status, title: title, priority: priority },
                        {
                            where: { id: id },
                        }
                    );
                    res.status(200).json({ data: updatedBug });
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
