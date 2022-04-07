/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
  | { message: string }
  | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  // const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: 'Invalid id' });
  // }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);

    case 'DELETE':
      return deleteEntry(req, res);

    case 'GET':
      return getEntry(req, res);

    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    return res.status(404).json({ message: 'Entry not found' });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({ message: 'Error al Actualizar' });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await Entry.findById<IEntry>(id);
    res.status(200).json(entry!);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'el id no es valido' });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
};
