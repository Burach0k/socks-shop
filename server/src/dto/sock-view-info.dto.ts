export type SockInfo = {
  id: number;
  daefile: { data: ArrayBufferLike };
  name: string;
  userid: number;
  username: string;
  likes: number[];
  subscribes: number[];
};

export type SockViewInfo = {
  id: number;
  daefile: { data: ArrayBufferLike };
  name: string;
  username: string;
  userid: number;
  likes: number;
  isUserLike: boolean;
  isUserSubscribe: boolean;
};
