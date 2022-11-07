import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';

//models
import { Employee, Bug, Ticket, Tag } from '../../../../../server/models/index';

//types

import { RequestMethods as Methods } from '../../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const {
            id,
            email,
            password,
            firstName,
            lastName,
            displayName
        } = req.query;
        const { method } = req

        switch (method) {
            case Methods.Get:
                const employee = await Employee.findOne({
                    where: { id: id },
                    include: [Bug, Tag],
                });
                res.status(200).json({ success: true, data: employee });
                break;

            //================================================================

            case Methods.Put:
                const updateEmployee = await Employee.update({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    displayName: displayName,
                },
                { where: { id: id}},
                );
                res.status(200).json({ employee: updateEmployee});
                break;

                //===================================================

            case Methods.Delete:
                const deleteEmployee = await Employee.destroy({
                    where: { id: id }
                });
            //=========do we want cascading delete for bugs and tickets assoc with employee?

                res.status(200).json({ success: true, data: deleteEmployee});
                break;

            //================================================
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(500).json(`Method ${method} Not Allowed`);
        }
    } catch (error){
        res.status(500).json({
            message: error.errors,
            type: error.errors,
        });

        console.log(error);
    }
};

