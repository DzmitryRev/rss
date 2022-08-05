export type ButtonPropsType = {
  title: string;
  color: 'blue' | 'green' | 'red';
  disabled?: boolean;
  event(): void;
};
