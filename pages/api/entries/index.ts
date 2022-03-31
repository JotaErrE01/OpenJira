/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
  { message: string } |
  IEntry[]

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    case 'POST':
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  // conectarse a la base de datos
  await db.connect();

  const entries = await Entry.find().sort({ createAt: 'ascending' });

  // desconectarse a la base de datos
  await db.disconnect();

  res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // conectarse a la base de datos
  await db.connect();

  const { description = '' } = req.body;

  // const entry = new Entry({ title, content });

  // await entry.save();

  // desconectarse a la base de datos
  await db.disconnect();

  res.status(201).json({ message: description });
};
