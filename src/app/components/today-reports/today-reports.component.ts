import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-today-reports',
  templateUrl: './today-reports.component.html',
  styleUrls: ['./today-reports.component.css'],
})
export class TodayReportsComponent implements OnInit, OnChanges {
  @Input() graphData: any;
  @Input() totalMsg: any;
  @Input() totalSms: any;
  @Input() percentChange: any;
  @Input() totalWhatsapp: any;
  @Input() notSent: any;

  activeIndex: number = 0; // Default to "Total"
  buttons = ['Total', 'WhatsApp', 'SMS', 'Not Sent'];
  chart: any; // Store chart instance

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables); // Ensure Chart.js is registered
  }

  ngOnInit(): void {
    if (this.graphData && this.graphData.length > 0) {
      setTimeout(() => this.updateChart(), 200);
    }
  }
  isUpdated = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] && changes['graphData'].currentValue) {
      // console.log(this.notSent);
      this.activeIndex = 0;
      this.updateChart();
      setTimeout(() => {
        this.activeIndex = 0;
        this.isUpdated = true;
        this.updateChart();
      }, 5000);
    }
  }

  rotateZeros(arr) {
    let nonZeros = arr.filter((num) => num !== 0); // Extract non-zero elements
    let zerosCount = arr.length - nonZeros.length; // Count number of zeros
    return new Array(zerosCount).fill(0).concat(nonZeros); // Reconstruct array
  }

  updateChart(): void {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    // this.graphData[0]['data'] = this.rotateZeros(this.graphData[0]['data']);
    // this.graphData[1]['data'] = this.rotateZeros(this.graphData[1]['data']);
    // this.graphData[2]['data'] = this.rotateZeros(this.graphData[2]['data']);
    // this.graphData[3]['data'] = this.rotateZeros(this.graphData[3]['data']);

    // console.log('check', this.graphData);

    this.totalMsg = this.graphData[3]['data'][6];
    this.totalWhatsapp = this.graphData[1]['data'][6];
    this.totalSms = this.graphData[0]['data'][6];
    this.notSent = this.graphData[2]['data'][6];

    const dataValues = [
      this.totalMsg,
      this.totalWhatsapp,
      this.totalSms,
      this.notSent,
    ];
    const labels = ['Total Sent', 'WhatsApp', 'SMS', 'Not Sent'];
    const backgroundColors = ['#FBA231', '#2EBC96', '#3981F7', '#FF0606'];

    this.chart = new Chart(ctx, {
      type: 'bar', // or 'doughnut' / 'pie'

      data: {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            borderWidth: 0,
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        interaction: {
          mode: 'point', // Ensures tooltip only shows for the exact bar
          intersect: true,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#fff',
            titleColor: '#000',
            bodyColor: '#000',
            borderColor: '#ccc',
            borderWidth: 1,
            displayColors: false,
            mode: 'nearest',
            // intersect: true,
          },
          title: {
            // align: ""
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: true, // Show vertical grid lines
              // drawBorder: false,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              align: 'end',
              padding: 10,
            },
          },
          y: {
            ticks: {
              // padding: -5, // Adjust this to shift text left
            },
            grid: {
              display: false, // Hide horizontal grid lines
              // drawBorder: false,
              drawTicks: false,
            },
          },
        },
      },
    });
  }

  setActive(index: number): void {
    this.activeIndex = index;
    this.cdr.detectChanges();
    this.updateChart();
  }
}
