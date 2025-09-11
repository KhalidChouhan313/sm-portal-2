import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-total-ttv',
  templateUrl: './total-ttv.component.html',
  styleUrls: ['./total-ttv.component.css'],
})
export class TotalTtvComponent implements OnInit {
  @Input() priceBaseStats: any;
  @Input() bookingData: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.priceBaseStats.sort((a, b) => a.status - b.status);
    console.log(this.bookingData);
    this.renderChart();
  }

  formatCurrency(value) {
    // Convert to string and remove pound sign if present
    let str = value.toString().replace(/£/g, '').trim();

    // Parse to float
    let num = parseFloat(str);
    if (isNaN(num)) return 'Invalid input';

    // Check if original had pound sign
    const hasPound = typeof value === 'string' && value.includes('£');

    // Format with commas and 2 decimal places
    const formatted = num.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return hasPound ? '£' + formatted : formatted;
  }

  renderChart(): void {
    const canvas = document.getElementById('ttvChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    // const ctx = document.getElementById('ttvChart') as HTMLCanvasElement;

    const gradient = ctx?.createLinearGradient(0, 0, 0, 150);
    gradient?.addColorStop(0, 'rgba(108, 99, 255, 0.4)'); // Light purple
    gradient?.addColorStop(1, 'rgba(192, 189, 248, 0)'); // Light purple
    // gradient?.addColorStop(1, 'rgb(255, 255, 255)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.priceBaseStats.map((p) => p.status),
        datasets: [
          {
            label: 'TTV Trend',
            data: this.priceBaseStats.map((p) => p.value),
            borderColor: '#6C63FF',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            backgroundColor: gradient,
          },
          // {
          //   label: 'Projected Trend',
          //   data: [13000, 14000, 13500, 15500, 14500, 16000, 15500],
          //   borderColor: '#6C63FF',
          //   borderDash: [4, 2],
          //   borderWidth: 1,
          //   tension: .4,
          //   fill: false,
          //   pointStyle: false,
          // },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          x: {
            display: true,
            border: {
              display: false,
            },
            grid: {
              display: false, // Remove grid lines for the x-axis
              lineWidth: 0,
            },
          },
          y: {
            display: true,
            grid: {
              display: false, // Remove grid lines for the x-axis
            },
          },
        },
      },
    });
  }
}
