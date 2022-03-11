import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default function encrypt(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { text } = req.query;
    bcrypt.hash(text, 10, (err, hash) => {
      res.status(200).send(hash);
    });
  }
  res.status(500);
}
