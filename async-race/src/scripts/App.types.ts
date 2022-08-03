export type RouteType = 'garage' | 'winners';

export type AvailableRoutesType = RouteType[];

export interface IAppState {
  availableRoutes: AvailableRoutesType;
//   activeRoute: RouteType;
}
