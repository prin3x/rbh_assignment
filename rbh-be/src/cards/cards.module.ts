import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './schema/cards.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cards', schema: CardSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
