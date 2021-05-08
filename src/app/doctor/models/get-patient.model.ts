export class GetPatient {
    id : number;
    identityNumber : string;
    firstName : string;
    lastName : string;
    gsm : string;
    email : string;
    healthScore : number;
    diseases : Array<string>;
    danger : number;
}
