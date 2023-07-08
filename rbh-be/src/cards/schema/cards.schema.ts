import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema({ collection: 'cards' })
export class Card {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  avatar: string;

  @Prop()
  status: CardStatus;

  @Prop()
  createdBy: string;

  @Prop()
  comments: Comment[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

@Schema()
export class Comment {
  @Prop()
  comment: string;

  @Prop()
  avatar: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  __v: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);

export enum CardStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  ARCHIVE = 'archive',
}