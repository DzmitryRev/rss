import { IState } from '../core/component/types';

export type RouteType = 'garage' | 'winners';

export type AvailableRoutesType = RouteType[];

export interface IAppState extends IState {
  availableRoutes: AvailableRoutesType;
  activeRoute: RouteType;
}
