import { BehaviorSubject } from 'rxjs';

export type Connection = {
  id: string;
  reqMessage: BehaviorSubject<string>;
  isStart: boolean;
};

export type SendEmail = {
  /**
   * email
   */
  to: string;

  /**
   * email subject (title)
   */
  subject?: string;

  text?: string;

  html?: string;
};

export type TGSendMessage = {
  update_id: number;
  message: TGMessage;
};

type TGMessage = {
  message_id: number;
  from: TGMessageFrom;
  chat: TGMessageChat;
  date: number;
  text?: string;
  photo?: any;
  reply_to_message?: TGReplyMessage;
};

type TGMessageFrom = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
};

type TGMessageChat = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  type: string;
};

type TGReplyMessage = {
  message_id: number;
  from: TGMessageFrom;
  chat: TGMessageChat;
  date: number;
  text: string;
};
