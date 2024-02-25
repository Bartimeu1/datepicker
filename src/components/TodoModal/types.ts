import { IDateItem } from '@root/types/calendar';

export interface ITodoModalProps {
  dateItem: IDateItem | null;
  closeModal: () => void;
}

export interface ITodoItem {
  id: string;
  value: string;
}
