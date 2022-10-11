import { Employee } from '../../../../server/models/index.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case 'POST':
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
