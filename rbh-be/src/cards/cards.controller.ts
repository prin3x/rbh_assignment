import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card, Comment } from './schema/cards.schema';
import { CreateCardDTO } from './dto/cards.dto';
import { UpdateWriteOpResult } from 'mongoose';

@Controller('cards')
export class CardsController {
    constructor(private readonly cardService: CardsService) {}

    @Get('/')
    getCards(@Query('page') page: number) {
        return this.cardService.getCards(page);
    }

    @Get('/:id')
    getOneCard(@Param('id') id: string) {
        return this.cardService.getOneCard(id);
    }

    @Post('/')
    createCard(@Body() createCardDTO: CreateCardDTO) {
        return this.cardService.createCard(createCardDTO);
    }

    @Post('/generate')
    generateCards() {
        return this.cardService.generateCards();
    }

    @Patch('/:id/status')
    updateCard(@Param('id') id: string, @Body('status') status: string): Promise<UpdateWriteOpResult>{
        return this.cardService.updateCardStatus(id, status);
    }

    @Post('/:id/comment')
    addComment(@Param('id') id: string, @Body('comment') comment: Comment){
        return this.cardService.addComment(id, comment);
    }

    @Delete('/:id')
    deleteCard(@Param('id') id: string){
        return this.cardService.deleteCard(id);
    }
}
