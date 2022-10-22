import sequelize from "../../../../server/config/connection";
import { Ticket } from "../../../../server/models";

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getTickets();
        case 'POST':
            return createTicket(req.body);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    };

    function getTickets() {
        try {
            const tickets = Ticket.getAll();
            return res.status(200).json(tickets);
        }
        catch (error) {
            return res.status(400).json({ message: error })
        };
    };


    function createTicket(req) {
        try {
            const newTicket = Ticket.create({
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority,
                status: req.body.status,
                dateCreated: new Date().toISOString,

            })
            return res.status(200).json({ newTicket });
        }
        catch (error) {
            return res.status(400).json({ message: error })
        }
    }
}