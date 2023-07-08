import { faker } from '@faker-js/faker';
import { Card, CardStatus } from '../schema/cards.schema';

export const generateSeedData = (count: number): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < count; i++) {
    cards.push({
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      avatar: 'https://i.imgur.com/3g7nmJC.png',
      status: CardStatus.TODO,
      createdBy: faker.person.fullName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    });
  }
  return cards;
};
