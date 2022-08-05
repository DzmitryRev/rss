export type ButtonPropsType = {
  title: string;
  color: 'blue' | 'green' | 'red';
  size: 'small' | 'big';
  disabled?: boolean;
  event(): void;
};
