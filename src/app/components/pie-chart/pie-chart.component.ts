import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  Chart,
  ChartOptions,
  ChartData,
  ChartType,
  registerables,
} from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() colors: string[] = [];
  @Input() data: number[] = [];

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const data = dataset.data as number[];
            const total = data.reduce((sum, value) => sum + value, 0);
            const value = data[tooltipItem.dataIndex];
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            const label = tooltipItem.label || '';
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
    cutout: '60%', // Defines the thickness of the doughnut
    rotation: -90, // Starts from the top
    circumference: 180, // Displays only half of the doughnut
  };

  public pieChartLabels: string[] = ['Whatsapp', 'SMS'];

  public pieChartData: ChartData<'doughnut'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [0, 0], // ✅ Fix: Only two values needed, not [0,0,0]
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderWidth: 0,
      },
    ],
  };
  A;

  public pieChartType: ChartType = 'doughnut';

  constructor() {
    Chart.register(...registerables); // ✅ Ensure Chart.js is registered
  }

  isUpdated = false;

  ngOnInit(): void {
    this.updateChartData();
    setTimeout(() => {
      this.isUpdated = true;
    }, 5000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['colors']) {
      this.updateChartData();
    }
    // console.log('Updated Data:', this.data);
  }

  private updateChartData(): void {
    if (!this.data || this.data.length === 0) return; // ✅ Fix: Ensure data is not empty

    this.pieChartData = {
      // ✅ Fix: Reassign the entire object for Angular change detection
      labels: this.pieChartLabels,
      datasets: [
        {
          data: [...this.data], // ✅ Fix: Spread operator to ensure reference change
          backgroundColor: [...(this.colors || [])],
          hoverBackgroundColor: (this.colors || []).map(
            (color) => `${color}7e`
          ),
          borderWidth: 0,
        },
      ],
    };
  }
}
