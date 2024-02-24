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
  render: () => <DatePicker holidays={true} />,
};

export const WithRange: Story = {
  render: () => <DatePicker range={true} />,
};

export const WithTodos: Story = {
  render: () => <DatePicker todos={true} />,
};
