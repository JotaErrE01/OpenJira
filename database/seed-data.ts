
interface ISeedData {
  entries: ISeedEntry[];
}

interface ISeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: ISeedData = {
  entries: [
    {
      description: 'Pendiente: Cupidatat ut esse tempor adipisicing proident nisi consectetur culpa nulla excepteur.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'Progreso: Cupidatat ut esse tempor adipisicing proident nisi consectetur culpa nulla excepteur.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Terminadas: Cupidatat ut esse tempor adipisicing proident nisi consectetur culpa nulla excepteur.',
      status: 'finished',
      createdAt: Date.now() - 100000
    }
  ]
};
