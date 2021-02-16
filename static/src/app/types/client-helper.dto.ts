export type ChatMessage = {
  name: 'you' | 'socks-assistant';
  message: string;
  time: number;
};

export type ChatStepParams = {
  class: string;
  text: string;
};

export type ChatStepsParamsList = {
  [key: string]: ChatStepParams;
};

export type SendMail = {
  to: string;
  text: string;
}

export enum ConversationOption {
  chat,
  videoCall,
  email
}