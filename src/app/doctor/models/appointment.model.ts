import { Time } from "@angular/common";

export class Appointment{
    id : number;
    doctorId : number;
    patientId : number;
    date : Date;
    time : Time;
}