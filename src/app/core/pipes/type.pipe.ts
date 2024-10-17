import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'typeOf'})
export class typeOfPipe implements PipeTransform {

  transform(value: any): any {
    return typeof value;
  }

}