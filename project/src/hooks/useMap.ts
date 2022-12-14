/* eslint-disable no-console */
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { Location } from '../types/offer-type';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: Location): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRefRendered = useRef<boolean>(false);

  useEffect(
    () => {
      if (isRefRendered.current && map)
      {
        map.setView([city.latitude, city.longitude], map.getZoom(), {
          'animate': true,
          'duration': 1,
        });
      }

      if (mapRef.current !== null && !isRefRendered.current)
      {
        const instance = new Map(mapRef.current, {
          center: {
            lat: city.latitude,
            lng: city.longitude,
          },
          zoom: city.zoom
        });

        const layer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          });
        instance.addLayer(layer);
        setMap(instance);

        isRefRendered.current = true;
      }
    }, [mapRef, city, map]);

  return map;
}

export default useMap;
