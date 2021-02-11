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

export enum ConversationOption {
  chat,
  videoCall,
  email
}