import { ApexOptions } from "apexcharts";

// Get CSS variables from the document
const getCssVar = (name: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  // Fallback colors for SSR
  const fallbacks: Record<string, string> = {
    '--neutral-100': '#f3f4f6',
    '--neutral-200': '#e5e7eb',
    '--neutral-300': '#d1d5db',
    '--neutral-400': '#9ca3af',
    '--neutral-500': '#6b7280',
    '--neutral-600': '#4b5563',
    '--neutral-700': '#374151',
    '--neutral-800': '#1f2937',
    '--neutral-900': '#111827',
    '--foreground': '#171717',
    '--background': '#ffffff',
  };
  return fallbacks[name] || '#000000';
};

// Create a function to get chart theme based on current theme (light/dark)
export const getChartTheme = (isDark = false): ApexOptions => {
  return {
    chart: {
      foreColor: isDark ? '#e5e7eb' : '#4b5563', // neutral-200 : neutral-600
      background: isDark ? '#1f2937' : '#ffffff', // neutral-800 : white
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    // Default color palette (can be overridden in component usage)
    colors: [
      '#14b8a6', // primary-500 (teal)
      '#8b5cf6', // secondary-500 (violet)
      '#f59e0b', // warning-500 (amber)
      '#10b981', // success-500 (emerald)
      '#3b82f6', // info-500 (blue)
      '#ef4444', // error-500 (red)
    ],
    grid: {
      borderColor: isDark ? '#374151' : '#e5e7eb', // neutral-700 : neutral-200
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      },
    },
    tooltip: {
      enabled: true,
      theme: isDark ? 'dark' : 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'var(--font-geist-sans)',
      },
      x: {
        show: true,
        format: 'dd MMM yyyy',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      labels: {
        style: {
          colors: isDark ? '#9ca3af' : '#6b7280', // neutral-400 : neutral-500
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: true,
        color: isDark ? '#374151' : '#e5e7eb', // neutral-700 : neutral-200
      },
      axisTicks: {
        show: true,
        color: isDark ? '#374151' : '#e5e7eb', // neutral-700 : neutral-200
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#9ca3af' : '#6b7280', // neutral-400 : neutral-500
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: 'var(--font-geist-sans)',
      fontSize: '14px',
      markers: {
        size: 12,
        strokeWidth: 0,
        offsetX: 0,
        offsetY: 0,
        shape: 'circle'
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      labels: {
        colors: isDark ? '#e5e7eb' : '#4b5563', // neutral-200 : neutral-600
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
            offsetY: 5
          }
        }
      }
    ]
  };
};

// Specific chart type themes
export const getBarChartTheme = (isDark = false): ApexOptions => {
  return {
    ...getChartTheme(isDark),
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
  };
};

export const getPieChartTheme = (isDark = false): ApexOptions => {
  return {
    ...getChartTheme(isDark),
    stroke: {
      width: 2,
      colors: [isDark ? '#1f2937' : '#ffffff'], // neutral-800 : white
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'var(--font-geist-sans)',
              offsetY: 0,
            },
            total: {
              show: true,
              showAlways: false,
              label: 'Total',
              fontSize: '14px',
              fontFamily: 'var(--font-geist-sans)',
            }
          }
        }
      }
    },
  };
};

export const getHeatmapChartTheme = (isDark = false): ApexOptions => {
  return {
    ...getChartTheme(isDark),
    plotOptions: {
      heatmap: {
        radius: 2,
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 25,
              color: '#10b981', // success-500
              name: 'low',
            },
            {
              from: 26,
              to: 50,
              color: '#14b8a6', // primary-500
              name: 'medium',
            },
            {
              from: 51,
              to: 75,
              color: '#f59e0b', // warning-500
              name: 'high',
            },
            {
              from: 76,
              to: 100,
              color: '#ef4444', // error-500
              name: 'extreme',
            },
          ],
        },
      },
    },
  };
};

export const getTreemapChartTheme = (isDark = false): ApexOptions => {
  return {
    ...getChartTheme(isDark),
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };
}; 