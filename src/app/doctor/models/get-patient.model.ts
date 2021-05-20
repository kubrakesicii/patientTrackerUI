export class GetPatient {
    id : number;
    identityNumber : string;
    firstName : string;
    lastName : string;
    gsm : string;
    email : string;
    age : number;
    weight : number;
    height : number;
    healthScore : number;
    diseases : Array<string>;
    danger : number;
    departmentId : number;
    hospitalId : number;
}
