import sequelize from "../../../../server/config/connection";
import { Ticket } from "../../../../server/models";

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getTicketById(req.params.id);
            ;
        case 'PUT':
            return updateTicket(req.params.id, req.body.status, req.body.priority);
            ;
        case 'DELETE':
            return deleteTicket(req.params.id);
            ;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getTicketById(req) {
        try {
            const ticket = await Ticket.findByPk(req.body.id)
            res.status(200).json({ ticket })
        }
        catch (error) {
            return res.status(400).json({ 'message': 'Could not connect to the database' })
        }
    }


    async function updateTicket(req) {

        if (req.body.title !== Ticket.title || Ticket.findByPk(req.body.title)) {
            throw `Ticket title already exists`
        }

        try {
            const updatedTicket = await Ticket.update(
                {
                    status: req.body.status,
                    priority: req.body.priority
                },
                {
                    where: { _id: req.body.id }
                }
            );

            if (priority === 'closed') {
                Ticket.dateClosed = new Date().toISOString();
            };

            res.status(200).json({ updatedTicket });
        }

        catch (error) {
            return res.status(400).json({ message: error })
        }
    }

    async function deleteTicket(req) {
        try {
            const deletedTicket = await Ticket.destpry({
                where: {
                    _id: req.body.id
                }
            })
            res.status(200).json({ deletedTicket })
        }

        catch (error) {
            return res.status(400).json({ message: error })
        }
    }
};

