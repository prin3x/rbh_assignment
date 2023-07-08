import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from '../cards.service';
import { CardsController } from '../cards.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Card, CardSchema } from '../schema/cards.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCardDTOStub } from '../dto/cards.dto';

describe('Cards', () => {
  let cardsController: CardsController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let cardModel: Model<Card>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    cardModel = mongoConnection.model('cards', CardSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        { provide: getModelToken('cards'), useValue: cardModel },
      ],
    }).compile();
    cardsController = app.get<CardsController>(CardsController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('createCard', () => {
    it('should return the saved object', async () => {
      const createdCard = await cardsController.createCard(CreateCardDTOStub());
      expect(createdCard.title).toBe(CreateCardDTOStub().title);
    });
  });

  describe('getCards', () => {
    it('should return an array of cards', async () => {
      await cardsController.createCard(CreateCardDTOStub());
      const cards = await cardsController.getCards(1);
      expect(cards.length).toBe(1);
    });
  });

  describe('generateCards', () => {
    it('should return an array of cards', async () => {
      const cards = await cardsController.generateCards();
      expect(cards.length).toBe(10);
    });
  });

  describe('updateCardStatus', () => {
    it('should return the updated card', async () => {
      const createdCard = await cardsController.createCard(CreateCardDTOStub());
      const updatedCard = await cardsController.updateCard(
        createdCard._id as unknown as string,
        'In Progress',
      );
      expect(updatedCard.modifiedCount).toBe(1);
    });
  });

  describe('addComment', () => {
    it('should return the updated card', async () => {
      const createdCard = await cardsController.createCard(CreateCardDTOStub());
      const updatedCard = await cardsController.addComment(
        createdCard._id as unknown as string,
        {
          comment: 'test',
          avatar: 'https://i.imgur.com/3g7nmJC.png',
          createdBy: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
      );
      expect(updatedCard.modifiedCount).toBe(1);
    });
  });

  describe('deleteCard', () => {
    it('should return the deleted card', async () => {
      const createdCard = await cardsController.createCard(CreateCardDTOStub());
      const deletedCard = await cardsController.deleteCard(
        createdCard._id as unknown as string,
      );
      expect(deletedCard.deletedCount).toBe(1);
    });
  });

  describe('getOneCard', () => {
    it('should return the card', async () => {
      const createdCard = await cardsController.createCard(CreateCardDTOStub());
      const card = await cardsController.getOneCard(
        createdCard._id as unknown as string,
      );
      expect(card.title).toBe(CreateCardDTOStub().title);
    });
  });
});
