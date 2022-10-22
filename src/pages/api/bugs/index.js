import sequelize from '../../../../server/config/connection';
import { Bug } from '../../../../server/models';
import handler from '../hello';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getBugs();
        case 'POST':
            return createBug(req.body);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    };


    function getBugs() {
        try {
            const bugs = Bug.findAll();
            return res.status(200).json(bugs);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    function createBug(req) {
        try {
            const newBug = Bug.create({
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority,
                status: req.body.status,
                dateCreated: new Date().toISOString(),
                employee: req.body.employee_id
            })
            return res.status(200).json({newBug});
        } catch (error){
            return res.status(400).json({ message: error});
        }
    };
}