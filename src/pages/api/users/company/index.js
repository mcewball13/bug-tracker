import sequelize from "../../../../../server/config/connection";
import { Company } from "../../../../../server/models";

export default handler;

function handler(req, res){
    switch(req.method){
        case "GET":
            return getAllCompanies();
        case "POST":
            return createCompany(req.body);
        default:
             res.status(405).end(`Method ${req.method} not allowed`)
    };

    function getAllCompanies(){
        try {
            const companies = Company.findAll();
            return res.status(200).json(companies);
        }
        catch (error){
            return res.status(400).json({message:error})
        }
    };

    function createCompany(params){
        try {
            const newCompany = Company.create({
                companyName: params.companyName,
                addressStreet: params.addressStreet,
                addressCity: params.addressCity,
                addressState: params.addressState,
                addressZip: params.addressZip,
                addressPhone: params.addressPhone,
            })
            return res.status(200).json(newCompany);
        }
        catch (error){
            return res.status(400).json({message:error});
        }
    }
}



