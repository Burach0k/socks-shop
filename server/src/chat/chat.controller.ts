import { Controller, Post, UseGuards } from '@nestjs/common';

import { BodyWithUserId } from '../decorators/jwt.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {

  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-comment')
  public addComment(@BodyWithUserId() comment: { text: string, currentUserId: number, sockId: number, parentId: number | null }) {
    const badWordList = this.chatService.checkingTextForBadWords(comment.text);

    if (badWordList.length === 0 && comment.text) this.chatService.addComment(comment);

    return badWordList;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/load-comment')
  public loadComments(@BodyWithUserId() params: { offset: number, limit: number, sockId: number }) {
    return this.chatService
      .loadMainComments(params)
      .then((commnets) => this.chatService.findRequestForComment(commnets));
  }
}
