# Async race by Revchenko

App stack: 
* HTML
* CSS
* Typesript
* Webpack
* Eslint

This app introduce the Flux architecture.

## Documentation

### Routing

This app does not use location routing!

1. Firstly you need to define state in component: 

« this.state = {
      availableRoutes: ['garage', 'winners'],
      activeRoute: 'garage',
    }; »

2. You can also define types: 

« export type RouteType = 'garage' | 'winners';

export type AvailableRoutesType = RouteType[];

export interface IAppState {
  availableRoutes: AvailableRoutesType;
  activeRoute: RouteType;
} »

3. Define method to change route:

« changeRoute(route: RouteType) {
    if (route === this.state.activeRoute) return;
    this.setState({ ...this.state, activeRoute: route });
  } »

4. Add to children in VirtualNode: 

« switch (this.state.activeRoute) {
      case 'garage': {
        return new Garage().render();
      }
      case 'winners': {
        return new Winners().render();
      }
      default: {
        return new Garage().render();
      }
    } »

Application will automatically render if activeRoute changes.