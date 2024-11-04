import { Component, OnInit, ViewChild } from '@angular/core';
// import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../models/dashboard.model';
import { 
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexResponsive
} from "ng-apexcharts";
import { AppService } from '../../../../../services/app.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

export type PieChartOptions = {
  series: number[];
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  currentUser = {
    name: 'Admin'
  };

  selectedDateRange = 'week';
  stats?: DashboardStats;
  displayedColumns = ['orderNumber', 'customer', 'amount', 'status', 'actions'];

  public chartOptions: Partial<ChartOptions> = {
    series: [{
      name: "Revenue",
      data: []
    }],
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      categories: []
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      title: {
        text: 'Revenue (₵)'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    title: {
      text: 'Revenue Over Time',
      align: 'left'
    },
    legend: {
      position: 'top'
    }
  };

  public pieChartOptions: Partial<PieChartOptions> = {
    series: [],
    chart: {
      type: 'donut',
      height: 350
    },
    labels: ['Completed', 'Pending', 'Processing'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.appService.getDashboardStats(this.selectedDateRange).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.updateCharts();
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });
  }

  updateCharts(): void {
    if (this.stats) {
      // Update line chart
      this.chartOptions.series = [{
        name: "Revenue",
        data: this.stats.revenueChart.map(item => item.value)
      }];
      
      this.chartOptions.xaxis = {
        ...this.chartOptions.xaxis,
        categories: this.stats.revenueChart.map(item => 
          new Date(item.date).toLocaleDateString()
        )
      };

      // Update pie chart
      this.pieChartOptions.series = [
        this.stats.orderStats.completed,
        this.stats.orderStats.pending,
        this.stats.orderStats.processing
      ];
    }
  }

  onDateRangeChange(): void {
    this.loadDashboardStats();
  }

  isHighlight(type: string): boolean {
    if (!this.stats) return false;

    switch(type) {
      case 'orders':
        return this.stats.totalOrders > 100;
      case 'revenue':
        return this.stats.totalRevenue > 10000;
      case 'customers':
        return this.stats.totalCustomers > 50;
      case 'pending':
        return this.stats.pendingOrders > 10;
      default:
        return false;
    }
  }
}
