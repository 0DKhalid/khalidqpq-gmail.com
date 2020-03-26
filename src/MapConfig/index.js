import { MapChart } from './MapChart';
import { PolygonSeries } from './PolygonSeries';
import { MeaselsSeries } from './MeaselsSeries';
import { MapData } from './MapData';

export function buildMap(element, data) {
  //init a and create map
  const initMap = new MapChart(element);
  initMap.createMap();

  //define map porjection
  initMap.mapProjection('rotateLongLat', 20, 20, 20, 20);

  // lng and lat to center map in first loading
  const mapCenter = {
    delLng: -30,
    delLat: -30
  };

  const { delLng, delLat } = mapCenter;
  // center map in first loading
  initMap.chartConfig('#000000', delLng, delLat);

  //create shadow when you move map
  // drow map lines and set lines color
  initMap.mapLines('#ff0000');

  //define polygon series and set color when hover
  const createPolygonSeries = new PolygonSeries(initMap.chart);
  const polygonSeries = createPolygonSeries.createPolygonSeries();
  createPolygonSeries.hoverSeries('#767E91');

  // create point that represent data on map
  const initMeaselsSeries = new MeaselsSeries(initMap.chart);

  const measelsSeries = initMeaselsSeries.createMeaselsSeries(
    '#eee',
    '#B30000',
    '#993400'
  );

  // '#B30000',
  const mapData = new MapData(polygonSeries, measelsSeries);
  mapData.mapDataToMap(data);
}
