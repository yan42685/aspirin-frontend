/* tslint:disable */
/* eslint-disable */

export interface HallInputDTO extends Serializable {
    id: number;
    name: string;
    seats: string;
}

export interface Admin extends Serializable {
    id: number;
    username: string;
    password: string;
    telephone: string;
    status: number;
}

export interface Hall extends Serializable {
    id: number;
    name: string;
    seats: string;
    status: number;
}

export interface Movie extends Serializable {
    id: number;
    name: string;
    image: string;
    description: string;
    director: string;
    writer: string;
    actor: string;
    type: string;
    area: string;
    language: string;
    showtime: Date;
    duration: string;
    star: number;
    status: number;
    link: string;
}

export interface Order extends Serializable {
    id: number;
    number: string;
    status: number;
    price: number;
    userId: number;
    planId: number;
    seats: string;
}

export interface Plan extends Serializable {
    id: number;
    playtime: Date;
    price: number;
    seats: string;
    status: number;
    hallId: number;
    movieId: number;
}

export interface User extends Serializable {
    id: number;
    username: string;
    password: string;
    realname: string;
    sex: string;
    telephone: string;
    status: number;
}

export interface Serializable {
}

export type RestResponse<R> = Promise<R>;

export const enum HallStatusEnum {
    OPEN = "OPEN",
    CLOSE = "CLOSE",
}
