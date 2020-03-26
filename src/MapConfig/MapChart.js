import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export class MapChart {
  constructor(ele) {
    this.ele = ele;
  }

  static get chart() {
    return this.chart;
  }

  createMap() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    // Create map instance
    let chart = am4core.create(this.ele, am4maps.MapChart);

    try {
      chart.geodata = am4geodata_worldLow;
    } catch (e) {
      chart.raiseCriticalError(
        new Error(
          'Map geodata could not be loaded. Please download the latest <a href="https://www.amcharts.com/download/download-v4/">amcharts geodata</a> and extract its contents into the same directory as your amCharts files.'
        )
      );
    }
    this.chart = chart;
    return chart;
  }

  mapProjection(panBehavior, ...paddingValue) {
    // Set projection
    this.chart.projection = new am4maps.projections.Orthographic();
    this.chart.panBehavior = panBehavior;
    this.chart.padding(...paddingValue);
  }

  chartConfig(seaColorHex, delLng, delLat) {
    // Add zoom control

    this.chart.zoomControl = new am4maps.ZoomControl();

    this.chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      seaColorHex
    );
    this.chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    this.chart.deltaLongitude = delLng;
    this.chart.deltaLatitude = delLat;

    // limits vertical rotation
    this.chart.adapter.add('deltaLatitude', function(delatLatitude) {
      return am4core.math.fitToRange(delatLatitude, -90, 90);
    });
  }

  mapLines(linesColor) {
    let graticuleSeries = this.chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.stroke = am4core.color(linesColor);
    graticuleSeries.fitExtent = false;
    graticuleSeries.mapLines.template.strokeOpacity = 0.2;
  }
}
