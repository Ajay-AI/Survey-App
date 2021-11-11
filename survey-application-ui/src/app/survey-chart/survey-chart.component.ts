import { Input, OnInit } from '@angular/core';
import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'sa-survey-chart',
  templateUrl: './survey-chart.component.html',
  styleUrls: ['./survey-chart.component.css']
})
export class SurveyChartComponent implements OnInit {
  @Input() chartData : {[k: string]: number} ={};
  public chartOptions: Partial<ChartOptions> | any;
  public chart2Options: Partial<ChartOptions> | any;
  constructor() { 
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chart2Options = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: Object.values(this.chartData),
      chart: {
        width: 380,
        type: "pie"
      },
      labels: Object.keys(this.chartData),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chart2Options = {
      series:[{
        data: Object.values(this.chartData)
      }] ,
      chart: {
        width: 380,
        type: "bar"
      },
      labels: Object.keys(this.chartData),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
