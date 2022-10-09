import Bug from '../../'

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getBugById(req.params.id);
            ;
        case 'PUT':
            return updateBug();
            ;
        case 'DELETE':
            return deleteBug();
            ;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    };

    function getBugById(id) {
        const bugData= Bug.findByPk(id)
        
        return res.status(200).json(bug);
    };

    function updateBug() {
        try {
            bugsRepo.update(req.query.id, req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    function deleteBug() {
        try {
            bugsRepo.delete(req.query.id);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

}