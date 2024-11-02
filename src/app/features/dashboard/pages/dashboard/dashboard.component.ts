import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
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
    name: 'John Doe'
  };

  selectedDateRange = 'week';
  stats?: DashboardStats;
  displayedColumns = ['orderNumber', 'customer', 'amount', 'status', 'actions'];

  recentOrders = [
    {
      number: '1234',
      customerName: 'Alice Johnson',
      customerAvatar: 'assets/avatars/user-1.jpg',
      amount: 125.00,
      status: 'Completed'
    },
    {
      number: '1235',
      customerName: 'Bob Smith',
      customerAvatar: 'assets/avatars/user-2.jpg',
      amount: 89.50,
      status: 'Pending'
    },
    {
      number: '1236',
      customerName: 'Carol Williams',
      customerAvatar: 'assets/avatars/user-3.jpg',
      amount: 245.00,
      status: 'Completed'
    },
    {
      number: '1237',
      customerName: 'David Brown',
      customerAvatar: 'assets/avatars/user-4.jpg',
      amount: 178.25,
      status: 'Cancelled'
    }
  ];

  recentActivity = [
    {
      type: 'order',
      icon: 'ri-shopping-bag-line',
      message: 'New order #1234 from Alice Johnson',
      time: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      type: 'payment',
      icon: 'ri-money-dollar-circle-line',
      message: 'Payment received for order #1232',
      time: new Date(Date.now() - 1000 * 60 * 45)
    },
    {
      type: 'user',
      icon: 'ri-user-add-line',
      message: 'New customer registration: Bob Smith',
      time: new Date(Date.now() - 1000 * 60 * 120)
    },
    {
      type: 'alert',
      icon: 'ri-alert-line',
      message: 'Low inventory alert for Item #A123',
      time: new Date(Date.now() - 1000 * 60 * 180)
    }
  ];

  public chartOptions: Partial<ChartOptions> = {
    series: [{
      name: "Revenue",
      data: [30, 40, 35, 50, 49, 60, 70]
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
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      title: {
        text: 'Revenue ($)'
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
      text: 'Weekly Revenue',
      align: 'left'
    },
    legend: {
      position: 'top'
    }
  };

  public pieChartOptions: Partial<PieChartOptions> = {
    series: [44, 55, 13],
    chart: {
      type: 'donut',
      height: 350
    },
    labels: ['Completed', 'Pending', 'Cancelled'],
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




  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
    this.initializeCharts();
  }

  loadDashboardStats() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.updateCharts();
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        // You might want to show a snackbar or error message here
      }
    });
  }

  initializeCharts(): void {
    // Initialize any additional chart configurations if needed
  }

  updateCharts(): void {
    if (this.stats) {
      // Update chart data based on stats
      this.chartOptions.series = [{
        name: "Revenue",
        data: this.stats.revenueChart.map(item => item.value)
      }];
      
      this.chartOptions.xaxis = {
        ...this.chartOptions.xaxis,
        categories: this.stats.revenueChart.map(item => item.date)
      };

      // Update pie chart data
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

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
  }

  refreshData(): void {
    this.loadDashboardStats();
  }

  viewAllOrders(): void {
    // Implement navigation to orders page
    console.log('Navigating to orders page...');
  }

  viewAllActivity(): void {
    // Implement navigation to activity page
    console.log('Navigating to activity page...');
  }
}