import sequelize from "../../../../../server/config/connection";
import { Employee } from "../../../../../server/models";
import handler from "../../hello";

export default handler;

function handler(req, res) {
    switch (req.method){
        case 'GET':
            return getEmployees();
        case 'POST':
            return createEmployee(req.body);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    };

    function getEmployees(){
        try {
            const employees = Employee.findAll();
            return res.status(200).json(employees);
        }
        catch (error){
            return res.status(400).json({message: error});
        }
    };

    function createEmployee(params) {
        try {
            const newEmployee = Employee.create({
                firstName: params.firstName,
                lastName: params.lastName,
                displayName: params.displayName,
                email: params.email,
                password: params.password
            })

        return res.status(200).json({newEmployee})
        }
        catch (error){
            return res.status(400).json({message:error})
        }
    };
}