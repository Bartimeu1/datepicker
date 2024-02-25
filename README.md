# react-datepicker-light

## About the Project: 📚

This library provides components and functionality for creating beautiful, light and easy-to-use calendars in your web applications.

## Setup / Installation: 💻

- npm install react-datepicker-light # with npm
- pnpm install react-datepicker-light # with pnpm
- yarn add react-datepicker-light # with yarn

```
import { DatePicker } from 'datepicker';

const Component = () => {
  return <DatePicker />;
};
```

## Props: 📑

You can add specific functionality using these props:

- range? - Enables selecting date range
- todos?: - Enables displaying todos on the calendar (day double-click)
- holidays?: Enables display of base holidays
- viewType?: - Type of calendar view ('month', 'year', 'week') (def: 'month')
- startDay?: - Specifies the starting day of the week ('monday', 'sunday') (def: 'monday')
- minValue?: - Specifies the minimum date that can be selected in the datepicker. Provide the minimum date in the format { year: number, month: number, day: number}.
- minValue?: - Specifies the maximum date that can be selected in the datepicker. Provide the minimum date in the format { year: number, month: number, day: number}.
