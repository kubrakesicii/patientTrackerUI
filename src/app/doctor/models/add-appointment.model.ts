import { Time } from "@angular/common";

export class AddAppointment{
    id : number;
    doctorId : number;
    patientId : number;
    date : Date;
    time : Time;
}