import { TokenInfo } from "./tokenInfo.model";

export class User {
    id : number;
    fullName : string;
    personType : number;
    personId : number;
    tokenInfo : TokenInfo;
}