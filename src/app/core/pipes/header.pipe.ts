import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'header' })
export class headerPipe implements PipeTransform {
  transform(value: any): string {
    return value.trim().replaceAll('_', ' ');
  }
}
