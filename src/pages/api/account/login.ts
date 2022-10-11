import { NextApiRequest, NextApiResponse } from 'next';
// models
import { Employee } from '../../../../server/models/index.js';
// Types
import { RequestMethods as Methods } from 'src/@types/api.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case Methods.Get:
        const employees = await Employee.findAll({});
        res.status(200).json({ success: true, data: employees });
        break;
      case Methods.Post:
        const { email, password } = req.body;

        const userData = await Employee.findOne({
          where: { email: email },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        });
        console.log(userData);

        if (!userData) {
          res.status(400).json({ message: 'Incorrect email or password, please try again' });
          return;
        }

        const validPassword = await userData.checkPassword(password);

        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect email or password, please try again' });
          return;
        }

        const user = userData.get({ plain: true });

        // * delete user.password from user returned to client
        delete user.password;

        const accessToken = userData.generateToken();

        res.status(200).json({ user, accessToken });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
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
