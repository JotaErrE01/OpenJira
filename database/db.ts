import mongoose, { ConnectionStates } from 'mongoose';

const mongoConnection = {
  isConected: ConnectionStates.disconnected
};

export const connect = async () => {
  if (mongoConnection.isConected === ConnectionStates.connected) {
    console.log('Data base conectada');
    return;
  }

  // para usar la coneccion anterior y no crear una nueva
  if (mongoose.connections.length > 0) {
    mongoConnection.isConected = mongoose.connections[0].readyState;

    if (mongoConnection.isConected === 1) {
      console.log('usando coneccion anterior');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConected = ConnectionStates.connected;
  console.log('conectado a mongo db');
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConected === ConnectionStates.disconnected) return;

  mongoConnection.isConected = 0;

  await mongoose.disconnect();
  console.log('desconectado de mongo db');
};
