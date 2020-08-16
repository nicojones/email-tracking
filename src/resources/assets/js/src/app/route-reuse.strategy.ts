import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

/*
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data.shouldReuse || false;
  }

  store(route: ActivatedRouteSnapshot, handle: {}): void {
    if (route.data.shouldReuse) {
      this.handlers[route.routeConfig.path] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): {} {
    if (!route.routeConfig) return null;
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data.shouldReuse || false;
  }

} */

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {}

    /** Determines if this route (and its subtree) should be detached to be reused later */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return (route.routeConfig.path === 'list' || route.routeConfig.path.includes('detail'))
    }

    /** Stores the detached route */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handlers[route.routeConfig.path] = handle
    }

    /** Determines if this route (and its subtree) should be reattached */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path]
    }

    /** Retrieves the previously stored route */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null
        }

        return this.handlers[route.routeConfig.path]
    }

    /** Determines if a route should be reused */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig
    }
}