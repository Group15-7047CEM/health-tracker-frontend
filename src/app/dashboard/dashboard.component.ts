import { Component, OnInit } from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as allHealthTips from './health-tips.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  dashboardData: any;
  healthTips: string[];

  myCaloriesChart = {};
  caloriesBurntChart = {};
  caloriesConsumedChart = {};

  constructor() { }

  ngOnInit() {
    this.dashboardData = {
      myCalories: [
        {
          trackedDate: '2022-02-13',
          foodCalories: 2000,
          stepsCalories: 3000
        },
        {
          trackedDate: '2022-02-14',
          foodCalories: 1000,
          stepsCalories: 4000
        },
        {
          trackedDate: '2022-02-15',
          foodCalories: 1500,
          stepsCalories: 2500
        }
      ],
      caloriesBurntToday: 2000,
      caloriesConsumedToday: 1500,
      targetCalToBurn: 2555,
      targetCalToConsume: 2400
    };
    this.getDashboardData() // call api and subscribe, assign to dashboardData variable
    this.getMyCaloriesOptions();
    this.getCaloriesBurntOptions();
    this.getCaloriesConsumedOptions();
    this.showHealthTips();
  }

  getDashboardData() {
    // call api here
  }

  showHealthTips() {
    console.log({aHt: allHealthTips})
    // Shuffle array
    const shuffled = allHealthTips.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 6);
    this.healthTips = selected;
    console.log({ht: this.healthTips})
  }

  getMyCaloriesOptions() {
    const chartOptions = {
      color: ['#FFDC61',
      '#3398DB'
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        show: true,
        top: 'top',
        data: ['Food (cal intake)', 'Steps (cal burned)']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // updated by api
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Calories'
        },
      ],
      series: [
        {
          name: 'Food (cal intake)',
          type: 'bar',
          data: [10, 52, 200, 334, 390, 330, 220], // updated by api
        },
        {
          name: 'Steps (cal burned)',
          type: 'bar',
          data: [52, 200, 334, 390, 330, 220, 10], // updated by api
        },
      ],
    };
    chartOptions['xAxis'][0].data = this.dashboardData.myCalories.map(c => c.trackedDate);
    chartOptions['series'][0].data = this.dashboardData.myCalories.map(c => c.foodCalories);
    chartOptions['series'][1].data = this.dashboardData.myCalories.map(c => c.stepsCalories);
    this.myCaloriesChart = chartOptions;
  }

  getCaloriesBurntOptions() {
    const chartOptions = {
      color: ['#DF8879', '#C7C7C7'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    chartOptions['series'][0].data = [ 
      {
        value: this.dashboardData.caloriesBurntToday,
        name: 'Calories burnt'
      },
      {
        value: this.dashboardData.targetCalToBurn - this.dashboardData.caloriesBurntToday,
        name: 'To burn'
      }
    ];
    this.caloriesBurntChart = chartOptions;
  }

  getCaloriesConsumedOptions() {
    const chartOptions = {
      color: ['#8BB447', '#C7C7C7'],

      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    chartOptions['series'][0].data = [ 
      {
        value: this.dashboardData.caloriesConsumedToday,
        name: 'Calories consumed'
      },
      {
        value: this.dashboardData.targetCalToConsume - this.dashboardData.caloriesConsumedToday,
        name: 'To consume'
      }
    ];
    this.caloriesConsumedChart = chartOptions;
  }

}
