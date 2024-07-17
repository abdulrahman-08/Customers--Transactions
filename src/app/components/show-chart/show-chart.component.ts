import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {Chart,registerables}from 'chart.js'
Chart.register(...registerables)
@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.css']
})
export class ShowChartComponent {
  
  constructor(private route: ActivatedRoute, private dataService: DataService) {}
  customerId:any;
  userData:any=[]
  transactions: any[] = [];
  chartBar:any
  chartLine:any
  customer: any;
  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.dataService.getUserData().subscribe(data => {
      this.userData=data
      this.transactions = this.userData.transactions.filter((transaction: { customer_id: any; }) => transaction.customer_id == this.customerId);
      this.createChart();
      console.log(this.transactions);
      
    });
    ;
  }
  getTransactions(customerId: number) {
    return this.transactions.filter((transaction: { customer_id: number; }) => transaction.customer_id === customerId);
  }
  createChart(): void {
    const labels = this.transactions.map(transaction => transaction.date);
    const data = this.transactions.map(transaction => transaction.amount);

    this.chartBar = new Chart('mychartBar', {
      type: 'bar',
      
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transaction Amount',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          }
        }
      }
    });
    this.chartLine = new Chart('mychartLine', {
      type: 'line',
      
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transaction Amount',
            data: data,
            backgroundColor: [
             
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
         
              'rgb(153, 102, 255)',
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          }
        }
      }
    });
  }
}
