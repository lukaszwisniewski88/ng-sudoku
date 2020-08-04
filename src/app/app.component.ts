import { Component } from '@angular/core';
import { interval } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-sudoku';
  difficulty = "Hard";
  boardSize = 9;
  timer = interval(1000)
  secondsPassed = 0
  ngOnInit() {
    this.timer.subscribe(seconds => this.secondsPassed = seconds)
  }
  ngOnDestroy() {
    console.log('DESTROY!')
  }
}
