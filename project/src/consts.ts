import { CityType } from './types/offer-type';

export const TIMEOUT_SHOW_ERROR = 3000;

export const SORT_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const CITIES: CityType[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85341,
      longitude: 2.3488,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.850346,
      longitude: 4.351721,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.551085,
      longitude: 9.993682,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.227741,
      longitude: 6.773456,
    },
  },
];

export enum AppRoute {
  Login = '/login',
  Offer = '/offer/:id',
  Root = '/',
}

export enum SortingType {
  Popular = 'Popular',
  LowToHighPrice= 'Price: low to high',
  HighToLowPrice = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum ApiRoutes {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
