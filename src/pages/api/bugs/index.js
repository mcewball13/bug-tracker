import { bugsRepo } from 'helpers';
import handler from '../hello';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getBugs();
        case 'POST':
            return createBug();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    };


    function getBugs() {
        try {
            const bugs = bugsRepo.getAll();
            return res.status(200).json(bugs);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    function createBug() {
        try {
            bugsRepo.create(req.body);
            return res.status(200).json({});
        } catch (error){
            return res.status(400).json({ message: error});
        }
    };
}