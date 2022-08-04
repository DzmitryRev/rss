export type ButtonPropsType = {
  title: string;
  color: 'blue' | 'green';
  disabled?: boolean;
  event(): void;
};
