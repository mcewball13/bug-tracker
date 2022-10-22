import sequelize from "../../../../../server/config/connection";
import { Bug, Employee } from "../../../../../server/models";
import handler from "../../hello";

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getEmployeeById(req.body.id);
        case 'PUT':
            return updateEmployee(req.body);
        case 'DELETE':
            return deleteEmployee(req.body);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getEmployeeById(id) {
        try {
            const employee = await Employee.findByPk(req.body.id)
            res.status(200).json({ employee });

        }
        catch (error) {
            return res.status(400).json({ message: error })
        }
    };

    async function updateEmployee(params) {
        try {
            const updatedBug = await Bug.update(
                {
                    email: params.email,
                    password: params.password,
                    firstName: params.firstName,
                    lastName: params.lastName,
                    displayName: params.displayName,
                },
                {
                    where: { _id: params.id }
                }
            )
            return res.status(200).json({updatedBug})
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    async function deleteEmployee(params) {
        try {
            const deletedEmployee = await Employee.destroy({
                where: {
                    _id: params.id
                }
            })
            res.status(200).json({deletedEmployee})

        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    };
}