import mongoose, { Model, Schema, model } from 'mongoose';
import { Entry } from '../interfaces';

export type IEntry = Entry;

const EntrySchema = new Schema<IEntry>({
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} no es un estado valido'
    },
    default: 'pending',
    required: false
  }
});

// El Modelo sera igual al que ya esta creado, si no existe lo crea
const EntryModel: Model<IEntry> = mongoose.models.Entry || model('Entry', EntrySchema);

export default EntryModel;
