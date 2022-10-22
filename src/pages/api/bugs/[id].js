import sequelize from '../../../../server/config/connection.js';
import { Bug } from '../../../../server/models';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getBugById(req.params.id);
            ;
        case 'PUT':
            return updateBug(req.params.id, req.body.status, req.body.priority);
            ;
        case 'DELETE':
            return deleteBug(req.params.id);
            ;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    };

    async function getBugById(id) {
        try {
            const bug = await Bug.findByPk(id)
            res.status(200).json({ dbBugs });

        } catch (error) {
            return res.status(400).json({ 'message': 'Could not connect to database' });
        }

    };

    async function updateBug() {


        //if the params title already exists for another bug will throw an error
        if (req.params.title !== Bug.title && bugs.findByPk(req.body.title))
            {throw `Bug report with the title ${req.params.title} already exists`;}

        // if the params priority is the same as bug's current priority will not update
        if (req.params.priority === Bug.priority)
           { throw `This is already the current status of the bug report, try again`}
           

        Bug.dateUpdated = new Date().toISOString();

        if (priority === 'closed') {
            Bug.dateClosed = new Date().toISOString();
        };
        try {
            const updatedBug = await Bug.update(
                { status: req.body.status },
                {
                    where: { _id: req.param.id }
                });

            res.status(200).json({ updatedBug });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    async function deleteBug() {
        try {
            const deletedBug = await Bug.destroy({
                where: {
                    _id: req.param.id
                }
            })
            res.status(200).json({ message: "Bug deleted successfully!" })
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

}