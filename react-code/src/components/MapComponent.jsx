import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXl1c2hkb3RkZXYiLCJhIjoiY2wxMGd5NHZrMDFjbDNrbzhlcGg5OWE0dCJ9.BKQbUCEfNpBx46U2_I90LA';

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.640625, 15.453680], // Longitude, latitude of Karnataka
      zoom: 7
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      map.addSource('intensity', {
        type: 'geojson',
        data: 'intensity_heatmap.geojson' // Path to your GeoJSON file
      });

      map.addLayer({
        id: 'intensity-heatmap',
        type: 'heatmap',
        source: 'intensity',
        maxzoom: 9,
        paint: {
          // Increase the heatmap weight based on feature property 'Intensity'
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'Intensity'], // Use the 'Intensity' property from your GeoJSON data
            0, 0,
            6, 1
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'blue',
            0.4, 'cyan',
            0.6, 'lime',
            0.8, 'yellow',
            1, 'red'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            9, 20
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,
            9, 0
          ],
        }
      });
    })// Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} style={{ height: '500px' }} />;
};

export default MapComponent;