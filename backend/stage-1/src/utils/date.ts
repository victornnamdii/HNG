class DateFormat {
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  getDayOfTheWeek() {
    const days = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    return days[this.date.getDay() as keyof typeof days];
  }

  getUTCString() {
    return `${new Date(this.date.toUTCString()).toISOString().slice(0, 19)}Z`;
  }
}

export default DateFormat;