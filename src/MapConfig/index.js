import { MapChart } from './MapChart';
import { PolygonSeries } from './PolygonSeries';
import { MeaselsSeries } from './MeaselsSeries';
import { MapData } from './MapData';

const chartReg = {};
export function buildMap(element, data) {
  if (!element) {
    return;
  }

  //init a and create map
  const initMap = new MapChart(element);
  //dispose old chart before render a new one
  maybeDisposeChart(element);
  initMap.createMap();

  //refrence to old chart
  chartReg[element] = initMap.chart;
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

function maybeDisposeChart(chartdiv) {
  if (chartReg[chartdiv]) {
    chartReg[chartdiv].dispose();
    delete chartReg[chartdiv];
  }
}
