import { AvailableRoutesType } from '../../App.types';

export type IHeaderProps = {
  availableRoutes: AvailableRoutesType[];
  changeRoute(newRoute: AvailableRoutesType): void;
};
