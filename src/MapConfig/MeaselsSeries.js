import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';

export class MeaselsSeries {
  constructor(chart) {
    this.chart = chart;
  }

  createMeaselsSeries(textColor, pointColor, hoverPointColor) {
    let measelsSeries = this.chart.series.push(new am4maps.MapPolygonSeries());

    measelsSeries.tooltip.background.fillOpacity = 1;
    measelsSeries.tooltip.background.cornerRadius = 10;
    measelsSeries.tooltip.autoTextColor = false;
    measelsSeries.tooltip.label.fill = am4core.color(textColor); //'#000'
    measelsSeries.tooltip.dy = -5;

    let measelTemplate = measelsSeries.mapPolygons.template;
    measelTemplate.fill = am4core.color(pointColor); //'#bf7569'
    measelTemplate.strokeOpacity = 0;
    measelTemplate.fillOpacity = 0.75;
    measelTemplate.tooltipPosition = 'fixed';

    let hs2 = measelsSeries.mapPolygons.template.states.create('hover');
    hs2.properties.fillOpacity = 1;
    hs2.properties.fill = am4core.color(hoverPointColor); //'#86240c'
    return measelsSeries;
  }
}
