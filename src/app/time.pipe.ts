import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {

  transform(secondsPassed: number): string {
    let hour = Math.floor(secondsPassed / (60 * 60))
    let minutes = Math.floor(secondsPassed / 60) - hour * 60
    let seconds = secondsPassed - minutes * 60

    return `${this.leadingZero(hour)}:${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`
  }
  leadingZero(value: number): string {
    if (value < 10) {
      return `0${value}`
    }
    else return value.toString()
  }
}

