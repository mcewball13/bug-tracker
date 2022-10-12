import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Employee } from '../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from 'src/@types/api.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case Methods.Post:
        const userData = await Employee.create(req.body);

        const user = userData.get({ plain: true });

        // * delete user.password from user returned to client
        delete user.password;

        const accessToken = userData.generateToken();

        res.status(200).json({ user, accessToken });
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error.errors[0].message,
      type: error.errors[0].type,
    });
  }
  //   TODO add PUT and DELETE methods
}
