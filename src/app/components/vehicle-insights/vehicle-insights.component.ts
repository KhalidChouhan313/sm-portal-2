import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-vehicle-insights',
  templateUrl: './vehicle-insights.component.html',
  styleUrls: ['./vehicle-insights.component.css']
})
export class VehicleInsightsComponent implements AfterViewInit {
  @Input() data: any;
  // months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  ngAfterViewInit() {
    // let viData: any = this.mapData(this.data)
    // console.log(this.data);
    // data: {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     datasets: [
    //       { label: 'Sedan', data: [500, 400, 600, 700, 800, 500, 400, 600, 700, 800, 900, 1000], backgroundColor: '#ffcf00', borderRadius: 5 },
    //       { label: 'SUV', data: [300, 200, 400, 500, 600, 300, 200, 400, 500, 600, 700, 800], backgroundColor: '#2ebc96', borderRadius: 5 },
    //       { label: 'SUV', data: [300, 200, 400, 500, 600, 300, 200, 400, 500, 600, 700, 800], backgroundColor: '#2ebc96', borderRadius: 5 },
    //       { label: 'SUV', data: [300, 200, 400, 500, 600, 300, 200, 400, 500, 600, 700, 800], backgroundColor: '#2ebc96', borderRadius: 5 },
    //       { label: 'SUV', data: [300, 200, 400, 500, 600, 300, 200, 400, 500, 600, 700, 800], backgroundColor: '#2ebc96', borderRadius: 5 },
    //       { label: 'Van', data: [300, 220, 400, 510, 600, 300, 220, 400, 510, 600, 700, 800], backgroundColor: '#2ebcf6', borderRadius: 5 }
    //     ]
    // },
    new Chart('vehicleChart', {
      type: 'bar',
      data: {
        labels: this.data.map(item => item.name),
        datasets: [{
          label: 'bookings',
          data: this.data.map(item => item.value),
          backgroundColor: '#7a9fd3',
          borderColor: '#074cae',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,  // Remove grid lines for the x-axis
              lineWidth: 0
            }
          },
          y: {
            display: false,
            grid: {
              display: false,  // Remove grid lines for the x-axis
            }
          },
        },
      },
    });
  }

  public mapData = (data) => {
    const labels = data.map(d => d.name)

    // Initialize datasets for each vehicle type
    const vehicleTypes = [...new Set(data.map(item => item._id.name))];
    let datasets = vehicleTypes.map((type, i) => ({
      label: type,
      data: Array(data.length).fill(0), // Start with all zeros for each month
      backgroundColor: '#ffcf00',
      borderRadius: 5
    }));

    // console.log(datasets);
    // Populate counts for each vehicle type and month
    data.forEach(item => {
      const monthIndex = labels.indexOf(item._id.month); // Find the index of the month
      const dataset = datasets.find(d => d.label === item._id.vehicle_type); // Find the corresponding dataset
      if (dataset && monthIndex !== -1) {
        dataset.data[monthIndex] = item.count; // Set the count in the correct month position
      }
    });
    datasets = datasets.filter(dsl => dsl.label);
    return { labels, datasets };
  };
}
