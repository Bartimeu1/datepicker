import { DatePicker } from '@components/DatePicker';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Datepicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    viewType: 'month',
    startDay: 'monday',
    holidays: false,
    todos: false,
    range: false,
  },
};

export const WithHolidays: Story = {
  args: {
    viewType: 'month',
    startDay: 'monday',
    holidays: true,
    todos: false,
    range: false,
  },
};

export const WithRange: Story = {
  args: {
    viewType: 'month',
    startDay: 'monday',
    holidays: false,
    range: true,
    todos: false,
  },
};

export const WithTodos: Story = {
  args: {
    viewType: 'month',
    startDay: 'monday',
    holidays: false,
    range: false,
    todos: true,
  },
};
