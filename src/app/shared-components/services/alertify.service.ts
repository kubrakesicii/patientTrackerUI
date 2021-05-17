import { Injectable } from '@angular/core';

declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  info(message: string) {
    alertify.info(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e: any) {
        if (e) {
            okCallback();
        } else {

        }
    }).setHeader("").set('closable', false);
  }

  
}
