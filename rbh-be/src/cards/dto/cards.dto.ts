import { Comment } from '../schema/cards.schema';

export interface CreateCardDTO {
  title: string;
  description: string;
  avatar: string;
  status: string;
  createdBy: string;
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export const CreateCardDTOStub = (): CreateCardDTO => ({
  title: 'New Card',
  description: 'New Card',
  avatar: 'https://i.imgur.com/3g7nmJC.png',
  status: 'todo',
  createdBy: '5f9d7b7b9d3b1c2d1c3b1d9f',
  createdAt: new Date(),
  updatedAt: new Date(),
});
