import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnChanges {
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

  ngOnInit(): void {}
  ngAfterViewInit(): void {
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
      }, 3000);
    }
  }

  rotateZeros(arr) {
    let nonZeros = arr.filter((num) => num !== 0); // Extract non-zero elements
    let zerosCount = arr.length - nonZeros.length; // Count number of zeros
    return new Array(zerosCount).fill(0).concat(nonZeros); // Reconstruct array
  }

  updateChart(): void {
    if (!this.graphData || this.graphData.length === 0) {
      return;
    }

    // console.log(this.graphData);

    this.graphData[0]['data'] = this.rotateZeros(this.graphData[0]['data']);
    this.graphData[1]['data'] = this.rotateZeros(this.graphData[1]['data']);
    this.graphData[2]['data'] = this.rotateZeros(this.graphData[2]['data']);
    this.graphData[3]['data'] = this.rotateZeros(this.graphData[3]['data']);

    // // Check if any data array has non-zero values
    // this.isUpdated = this.graphData.some((item) =>
    //   item.data.some((value) => value !== 0)
    // );

    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    });
    let datasets = [];

    const createGradient = (color: string) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color); // Start with full color
      gradient.addColorStop(1, color.replace(/[\d.]+\)$/g, '0.1)')); // End with 0 opacity

      return gradient;
    };

    if (this.activeIndex === 0) {
      datasets = [
        {
          label: 'Total Sent',
          data: this.graphData[3]?.data || [],
          borderColor: '#EAB054',
          pointBackgroundColor: '#EAB054',
          backgroundColor: createGradient('rgba(234, 177, 84, 0.5)'),
          fill: true,
          tension: 0.3, // Straight line
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'WhatsApp',
          data: this.graphData[1]?.data || [],
          borderColor: '#2EBC96',
          pointBackgroundColor: '#2EBC96',
          backgroundColor: createGradient('rgba(46, 188, 150, 0.5)'),
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'SMS',
          data: this.graphData[0]?.data || [],
          borderColor: '#3981F7',
          pointBackgroundColor: '#3981F7',
          backgroundColor: createGradient('rgba(57, 130, 247, 0.5)'),
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Not Sent',
          data: this.graphData[2]?.data || [],
          borderColor: '#FF0606',
          pointBackgroundColor: '#FF0606',
          backgroundColor: createGradient('rgba(255, 6, 6, 0.5)'),
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ];
    } else {
      const selectedData =
        this.activeIndex === 3
          ? this.graphData[2]
          : this.activeIndex === 2
          ? this.graphData[0]
          : this.activeIndex === 1
          ? this.graphData[1]
          : this.graphData[3];

      let selectedColor =
        this.activeIndex === 3
          ? '#FF0606' // Color fix for "Not Send"
          : this.activeIndex === 1
          ? '#2EBC96'
          : this.activeIndex === 2
          ? '#3981F7'
          : '#EAB054';

      let selectedBackgroundColor =
        this.activeIndex === 3
          ? createGradient('rgba(255, 6, 6, 0.5)')
          : this.activeIndex === 1
          ? createGradient('rgba(46, 188, 150, 0.5)')
          : this.activeIndex === 2
          ? createGradient('rgba(57, 130, 247, 0.5)')
          : createGradient('rgba(234, 177, 84, 0.5)');
      // : 'rgba(57, 130, 247, 0.3)';

      datasets = [
        {
          label: selectedData.label,
          data: selectedData.data || [],
          borderColor: selectedColor,
          pointBackgroundColor: selectedColor,
          backgroundColor: selectedBackgroundColor,
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ];
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: last7Days,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { display: true, grid: { display: false } },
          y: {
            display: false,
            grid: { display: false },
            beginAtZero: true,
            min: 0,
          },
        },

        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#ffffff',
            titleColor: '#333',
            bodyColor: '#333',
            borderColor: '#ddd',
            borderWidth: 1,
            displayColors: false,
            padding: 10,
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 },
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        elements: {
          line: {
            tension: 0,
          },
          point: {
            radius: 0,
            hoverRadius: 10,
          },
        },
      },
    });
  }

  setActive(index: number): void {
    this.activeIndex = index;
    this.cdr.detectChanges();
    setTimeout(() => this.updateChart(), 0);
  }
}
