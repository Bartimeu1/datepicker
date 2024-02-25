import { CalendarDay } from '@components/CalendarDay';
import { Meta, StoryFn,StoryObj } from '@storybook/react';

const meta = {
  title: 'CalendarDay',
  component: CalendarDay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarDay>;

export default meta;

type Story = StoryObj<typeof meta>;

import { StylingWrapper } from '@components/StylingWrapper';

const mockedProps = {
  date: { year: 2024, month: 1, day: 1 },
  isDisabled: false,
  isTarget: false,
  isTargetEnd: false,
  isHoliday: false,
  isInRange: false,
  range: false,
  toggleTodoModal: () => () => {},
  onCalendarDayClick: () => () => {},
};

const decorators = (Story: StoryFn) => (
  <StylingWrapper>
    <Story />
  </StylingWrapper>
);

export const Default: Story = {
  args: mockedProps,
  decorators: [decorators],
};

export const IsTarget: Story = {
  args: mockedProps,
  render: () => <CalendarDay {...mockedProps} isTarget={true} />,
  decorators: [decorators],
};

export const IsHoliday: Story = {
  args: mockedProps,
  render: () => <CalendarDay {...mockedProps} isHoliday={true} />,
  decorators: [decorators],
};

export const IsDisabled: Story = {
  args: mockedProps,
  render: () => <CalendarDay {...mockedProps} isDisabled={true} />,
  decorators: [decorators],
};

export const IsInRange: Story = {
  args: mockedProps,
  render: () => <CalendarDay {...mockedProps} isInRange={true} />,
  decorators: [decorators],
};

export const IsRangeStart: Story = {
  args: mockedProps,
  render: () => <CalendarDay {...mockedProps} isTarget={true} range={true} />,
  decorators: [decorators],
};

export const IsRangeEnd: Story = {
  args: mockedProps,
  render: () => (
    <CalendarDay {...mockedProps} isTargetEnd={true} range={true} />
  ),
  decorators: [decorators],
};
