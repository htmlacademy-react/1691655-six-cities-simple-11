import { Offer } from '../types/offer-type';
import { name, address, lorem, random, image } from 'faker';

export const makeFakeOffer = (): Offer => ({
  bedrooms: Number(random.number(9)),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom:  Math.floor(Math.random() * 10 + 1),
    },
  },
  description: lorem.paragraph(3),
  goods: ['Washer', 'Laptop friendly workspace', 'Breakfast'],
  host: {
    id: random.number(2),
    name: name.firstName(25),
    isPro: Math.random() < 0.5,
    avatarUrl: image.imageUrl(),
  },
  id: random.number(2),
  images: Array<string>(random.number(2)).fill(image.imageUrl()),
  isPremium: false,
  location: {
    'latitude': 48.846610000000005,
    'longitude': 2.374499,
    'zoom': 16
  },
  maxAdults: 2,
  previewImage: 'https://11.react.pages.academy/static/hotel/18.jpg',
  price: 107,
  rating: 3.2,
  title: 'The Pondhouse - A Magical Place',
  type: 'room',
});
