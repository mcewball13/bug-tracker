import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next";
//models
import { Bug, Employee, Ticket } from "../../../../../server/models";
//Types
import { RequestMethods as Methods } from '../../../../@types/api';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, status, priority } = req.query;
        const { method } = req;

        switch (method) {
            case Methods.Get:
                const ticket = await Ticket.findOne({
                    where: { id: id },
                    include: [Bug, Employee]
                });
                res.status(200).json({ success: true, data: ticket })
                break;

            //===============================================================

            case Methods.Put:
                const updatedTicket = await Ticket.update(
                    { status: status, priority: priority },
                    { where: { id: id } },
                );
                res.status(200).json({ ticket: updatedTicket })
                break;

            //=================================================================


            case Methods.Delete:
                const deletedTicket = await Ticket.destroy({
                    where: {id: id}
                });
                res.status(200).json({ success: true, data: deletedTicket });
                break;

            //==================================================================

            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch(error){
        res.status(500).json({
            message: error.errors,
            type: error.errors,
        });
        console.log(error);
    }



}


