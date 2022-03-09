import { v4 as uuid } from "uuid";

export const reports = [
  {
    id: 1,
    name: "Laudo 1",
    createdAt: 1555016400000,
    criminalists: [
      {
        id: uuid(),
        name: "Adam",
      },
      {
        id: uuid(),
        name: "Bob",
      },
    ],
  },
  {
    id: 2,
    name: "Laudo 2",
    createdAt: 1556016400000,
    criminalists: [
      {
        id: uuid(),
        name: "Carla",
      },
      {
        id: uuid(),
        name: "Dave",
      },
    ],
  },
  {
    id: 3,
    name: "Laudo 3",
    createdAt: 1553016400000,
    criminalists: [
      {
        id: uuid(),
        name: "Erin",
      },
      {
        id: uuid(),
        name: "Fausto",
      },
      {
        id: uuid(),
        name: "Steve",
      },
    ],
  },
];
