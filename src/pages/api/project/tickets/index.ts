import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// models

import { Ticket } from '../../../../../server/models/index.js';

//Types
import { RequestMethods as Methods } from '../../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { title, description, priority, status } = req.query;
        const { method } = req;

        switch (method) {
            case Methods.Get:
                const ticket = await Ticket.findAll({
                    attributes: {
                        exclude: ["id"]
                    }
                });
                res.status(200).json({ success: true, data: ticket });
                break;

            //================================================================

            case Methods.Post:
                const newTicket = await Ticket.create(
                    {
                        title: title,
                        description: description,
                        priority: priority,
                        status: status,
                        dateCreated: new Date().toISOString,

                    }
                )
                res.status(200).json({ ticket: newTicket });
                break;

            //===============================================================
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
    };
};

