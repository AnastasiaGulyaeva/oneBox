import { Session } from './event.interface';

export interface Cart {
    id:        string;
    title:     string;
    sessions:  SessionCart[];
}

export interface SessionCart {
    date:         string;
    availability: string;
    quantity:    number;
}

