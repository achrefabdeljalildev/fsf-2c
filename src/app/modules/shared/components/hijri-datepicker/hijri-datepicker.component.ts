import {Component, EventEmitter, Output} from '@angular/core';
import moment from 'moment-hijri';

// @ts-ignore

@Component({
  selector: 'app-hijri-datepicker',
  templateUrl: './hijri-datepicker.component.html',
  styleUrls: ['./hijri-datepicker.component.css']
})
export class HijriDatepickerComponent {
  selectedDate: string = moment().format('iYYYY/iMM/iDD');
  calendarVisible: boolean = false;
  @Output() dateChange: EventEmitter<string> = new EventEmitter();

  days: number[] = [];
  currentMonth: string = moment().format('iYYYY/iMM');
  currentMonthName: string = moment().format('iMMMM');
  currentYear: number = parseInt(moment().format('iYYYY'), 10);
  constructor() {
    this.generateCalendar()
  }

  ngOnInit() {
    this.generateCalendar();
  }

  toggleCalendar() {
    this.calendarVisible = !this.calendarVisible;
  }

  generateCalendar() {
    const daysInMonth = moment(this.currentMonth, 'iYYYY/iMM').iDaysInMonth();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  selectDate(day: number) {
    this.selectedDate = `${this.currentMonth}/${day}`;
    this.dateChange.emit(this.selectedDate);
    this.toggleCalendar();
  }

  changeMonth(step: number) {
    this.currentMonth = moment(this.currentMonth, 'iYYYY/iMM')
      .add(step, 'iMonth')
      .format('iYYYY/iMM');
    this.currentMonthName = moment(this.currentMonth, 'iYYYY/iMM').format('iMMMM');
    this.generateCalendar();
  }
}
