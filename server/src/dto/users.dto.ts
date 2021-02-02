import { type } from "os"

export type UsersDto = {
    id: number,
    name: string
};

export type createUserDto = {
    name: string,
    password: string
};