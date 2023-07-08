import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Card, CardStatus } from './schema/cards.schema';
import { Comment } from './schema/cards.schema';
import { CreateCardDTO } from './dto/cards.dto';
import { faker } from '@faker-js/faker';
import { generateSeedData } from './seeds/cards.seed';

@Injectable()
export class CardsService implements OnModuleInit {
  constructor(@InjectModel('cards') private cardModel: Model<Card>) {}

  async onModuleInit() {
    const cards = await this.cardModel
      .find({
        status: { $ne: 'Archived' },
      })
      .exec();
    if (cards.length <= 10) {
      await this.cardModel.create(generateSeedData(10));
    }
  }

  getCards(page: number = 1) {
    const limit = 10;
    const skip = (page - 1) * limit;
    return this.cardModel
      .find({
        status: { $ne: 'Archived' },
      })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  generateCards() {
    return this.cardModel.create(generateSeedData(10));
  }

  createCard(createCardDTOStub: CreateCardDTO) {
    if (!createCardDTOStub.title) createCardDTOStub.title = faker.lorem.word();
    if (!createCardDTOStub.description)
      createCardDTOStub.description = faker.lorem.sentence();
    if (!createCardDTOStub.avatar)
      createCardDTOStub.avatar = 'https://i.imgur.com/3g7nmJC.png';
    if (!createCardDTOStub.status) createCardDTOStub.status = CardStatus.TODO;
    if (!createCardDTOStub.createdBy)
      createCardDTOStub.createdBy = faker.person.fullName();
    if (!createCardDTOStub.createdAt) createCardDTOStub.createdAt = new Date();
    if (!createCardDTOStub.updatedAt) createCardDTOStub.updatedAt = new Date();

    return this.cardModel.create(createCardDTOStub);
  }

  updateCardStatus(id: string, status: string): Promise<UpdateWriteOpResult> {
    return this.cardModel.updateOne({ _id: id }, { status: status }).exec();
  }

  addComment(id: string, comment: Comment) {
    return this.cardModel
      .updateOne({ _id: id }, { $push: { comments: comment } })
      .exec();
  }

  getOneCard(id: string) {
    return this.cardModel
      .findOne({ _id: id, status: { $ne: 'Archived' } })
      .exec();
  }

  deleteCard(id: string): Promise<any> {
    return this.cardModel.deleteOne({ _id: id }).exec();
  }
}
