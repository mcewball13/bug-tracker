import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
//models
import { Company } from '../../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from '../../../../@types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const {
            id,
            companyName,
            addressStreet,
            addressCity,
            addressState,
            addressZip,
            addressPhone,
        } = req.query;

        const { method } = req

        switch (method) {
            case Methods.Get:
                const company = await Company.findOne({
                    where: { id: id },
                });
                res.status(200).json({ success: true, data: company });
                break;

            //==============================================================

            case Methods.Put:
                const updatedCompany = await Company.update({
                    companyName: companyName,
                    addressStreet: addressStreet,
                    addressCity: addressCity,
                    addressState: addressState,
                    addressZip: addressZip,
                    addressPhone: addressPhone,
                },
                {where: { id: id}}
                );
                res.status(200).json({ company: updatedCompany });
                break;

            //==================================================================


            case Methods.Delete:
                const deletedCompany = await Company.destroy({
                    where: { id: id }
                });
                res.status(200).json({ success: true, data: deletedCompany});
                break;

            //===============================================================

            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error ){
        res.status(500).json({
            message: error.errors,
            type: error.errors,
        });

        console.log(error);
    }
};