import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  data: any;
  options: any;

  constructor(
    private chartDataService: ChartDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadChartData();
    if (isPlatformBrowser(this.platformId)) {
      this.setupChartOptions();
    }
  }

  loadChartData() {
    this.chartDataService.getChartData().subscribe((chartData) => {
      this.data = {
        labels: chartData.labels,
        datasets: chartData.datasets.map((dataset: any, index: number) => ({
          ...dataset,
          backgroundColor: this.getGradient.bind(this, index),
        })),
      };
    });
  }

  setupChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.8,
      layout: {
        padding: {
          right: 15,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#000',
          bodyColor: '#000',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 14,
          bodySpacing: 6,
          titleFont: {
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            size: 14,
          },
          callbacks: {
            title: (tooltipItems: any) => {
              return tooltipItems[0].label;
            },
            label: (context: any) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getGradient(index: number, context: any) {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) {
      return null;
    }
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

    switch (index) {
      case 0: // Privacy
        gradient.addColorStop(0, 'rgba(162, 122, 215, 1)');
        gradient.addColorStop(1, 'rgba(85, 64, 113, 1)');
        break;
      case 1: // Security
        gradient.addColorStop(0, 'rgba(47, 79, 140, 1)');
        gradient.addColorStop(1, 'rgba(22, 38, 68, 1)');
        break;
      case 2: // Quality
        gradient.addColorStop(0, 'rgba(101, 163, 246, 1)');
        gradient.addColorStop(1, 'rgba(16, 107, 230, 1)');
        break;
    }

    return gradient;
  }
}
