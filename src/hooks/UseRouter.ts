// import { useState, useCallback } from 'react';

// export type RouteType = 'home' | 'login' | 'daily-challenge' | 'leaderboard' | 'learning-mode';

// interface RouterState {
//   currentRoute: RouteType;
//   previousRoute: RouteType | null;
// }

// export function useRouter() {
//   const [routerState, setRouterState] = useState<RouterState>({
//     currentRoute: 'home',
//     previousRoute: null
//   });

//   const navigateTo = useCallback((route: RouteType) => {
//     setRouterState(prev => ({
//       currentRoute: route,
//       previousRoute: prev.currentRoute
//     }));
//   }, []);

//   const goBack = useCallback(() => {
//     if (routerState.previousRoute) {
//       setRouterState(prev => ({
//         currentRoute: prev.previousRoute || 'home',
//         previousRoute: 'home'
//       }));
//     } else {
//       navigateTo('home');
//     }
//   }, [routerState.previousRoute, navigateTo]);

//   const isCurrentRoute = useCallback((route: RouteType) => {
//     return routerState.currentRoute === route;
//   }, [routerState.currentRoute]);

//   return {
//     currentRoute: routerState.currentRoute,
//     previousRoute: routerState.previousRoute,
//     navigateTo,
//     goBack,
//     isCurrentRoute
//   };
// }
// hooks/UseRouter.ts - Atualizado
import { useState, useCallback } from 'react';

export type Route = 
  | 'landing' 
  | 'home' 
  | 'demo'
  | 'login' 
  | 'daily-challenge' 
  | 'leaderboard' 
  | 'learning-mode';

export const useRouter = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('landing');
  const [routeHistory, setRouteHistory] = useState<Route[]>(['landing']);

  const navigateTo = useCallback((route: Route) => {
    setCurrentRoute(route);
    setRouteHistory(prev => [...prev, route]);
  }, []);

  const goBack = useCallback(() => {
    if (routeHistory.length > 1) {
      const newHistory = routeHistory.slice(0, -1);
      const previousRoute = newHistory[newHistory.length - 1];
      setRouteHistory(newHistory);
      setCurrentRoute(previousRoute);
    } else {
      // Se não há histórico, volta para landing
      setCurrentRoute('landing');
      setRouteHistory(['landing']);
    }
  }, [routeHistory]);

  const resetToLanding = useCallback(() => {
    setCurrentRoute('landing');
    setRouteHistory(['landing']);
  }, []);

  return {
    currentRoute,
    navigateTo,
    goBack,
    resetToLanding,
    canGoBack: routeHistory.length > 1
  };
};


