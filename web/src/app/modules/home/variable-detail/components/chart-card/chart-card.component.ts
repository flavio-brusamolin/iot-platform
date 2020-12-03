import { Component, Input, OnChanges, OnInit } from '@angular/core'

import { ChartDataSets, ChartOptions } from 'chart.js'
import { Color } from 'ng2-charts'

import { Data } from 'src/app/data/models'

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit, OnChanges {
  @Input() public data?: Data[]

  public chartData: ChartDataSets[] = [{
    data: []
  }]

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#b4b5bb'
        },
        type: 'time',
        distribution: 'series',
        time: {
          displayFormats: {
            millisecond: 'MMM DD, HH:mm',
            second: 'MMM DD, HH:mm',
            minute: 'MMM DD, HH:mm',
            hour: 'MMM DD, HH:mm',
            day: 'MMM DD, HH:mm',
            week: 'MMM DD, HH:mm',
            month: 'MMM DD, HH:mm',
            quarter: 'MMM DD, HH:mm',
            year: 'MMM DD, HH:mm'
          }
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#b4b5bb'
        }
      }]
    }
  };

  public chartColors: Color[] = [{
    backgroundColor: 'rgba(189, 147, 249, 0.7)',
    borderColor: '#bd93f9'
  }]

  public constructor () { }

  public ngOnInit (): void { }

  public ngOnChanges (): void {
    this.mapChartData()
  }

  private mapChartData (): void {
    const newData = this.data?.map(({ timestamp, value }) => ({
      x: new Date(timestamp),
      y: value
    }))

    if (JSON.stringify(this.chartData[0].data) !== JSON.stringify(newData)) {
      this.chartData[0].data = newData
    }
  }
}
