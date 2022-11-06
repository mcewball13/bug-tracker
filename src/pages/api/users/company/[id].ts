import sequelize from "../../../../../server/config/connection";
import { Company } from "../../../../../server/models";


export default handler;

function handler(req, res){
    switch (req.method) {
        case 'GET':
            return getCompanyById(req.body.id);
        case 'PUT':
            return updateCompany(req.body);
        case 'DELETE':
            return deleteCompany(req.body);
        default:
            return res.status(405).end(`Method ${req.method} not allowed`);

    }


    async function getCompanyById(id){
        try {
            const company = await Company.findByPk(id)
            res.status(200).json({company});
        }
        catch (error){
            return res.status(400).json({message:error})
        }
    };

    async function updateCompany(params){
        if (params.companyName === Company.companyName){
            throw `Company name already exists in database `
        }

        try{
            const updatedCompany = await Company.update({
                companyName: params.companyName,
                addressStreet: params.addressStreet,
                addressCity: params.addressCity,
                addressState: params.addressState,
                addressZip: params.addressZip,
                addressPhone: params.addressPhone,
            },
            {
                where: {_id: params.id}
            });

            return res.status(200).json(updatedCompany)


        }
        catch (error){
            return res.status(400).json({message:error});
        }
    };

    async function deleteCompany(params) {
        try {
            const deletedCompany = await Company.destroy({
                where:{
                    _id: params.id
                }
            });
            res.status(200).json({deletedCompany})
        }
        catch (error){
            return res.status(400).json({message:error})
        }
    };
}