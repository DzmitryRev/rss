import { IAppState, RouteType } from '../../App.types';

export type IHeaderProps = IAppState & {
  changeRoute(newRoute: RouteType): void;
};
