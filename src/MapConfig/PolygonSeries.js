import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';

export class PolygonSeries {
  constructor(chart) {
    this.chart = chart;
  }
  createPolygonSeries() {
    // Create map polygon series
    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    polygonSeries.calculateVisualCenter = true;
    polygonSeries.tooltip.background.fillOpacity = 1;
    polygonSeries.tooltip.background.cornerRadius = 5;

    let template = polygonSeries.mapPolygons.template;
    template.nonScalingStroke = true;
    template.fill = am4core.color('#212121');
    template.stroke = am4core.color('#4e4e4e');

    polygonSeries.calculateVisualCenter = true;
    template.propertyFields.id = 'id';
    template.tooltipPosition = 'fixed';
    template.fillOpacity = 1;

    template.events.on('over', function(event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = true;
      }
    });
    template.events.on('out', function(event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = false;
      }
    });
    this.polygonSeries = polygonSeries;
    return polygonSeries;
  }

  hoverSeries(hoverColor) {
    let hs = this.polygonSeries.mapPolygons.template.states.create('hover');
    hs.properties.fillOpacity = 1;
    hs.properties.fill = am4core.color(hoverColor);
  }
}
