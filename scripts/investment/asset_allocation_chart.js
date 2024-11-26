import {
  calculateBoxplotData,
  calculateOutliers,
  generateColors,
} from "../utils.js";

// series is a list of dicts {'equity': 'X%', 'asset': []}
export function assetGrowthChart(container, series) {
  Highcharts.chart(container, {
    chart: {
      type: "line",
    },
    title: {
      text: "Net Asset",
    },
    yAxis: {
      title: {
        text: "Amount",
      },
      min: 0,
    },
    xAxis: {
      min: 0,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: "10%",
      },
    },
    series: series.map((s) => {
      return {
        name: s.equity,
        data: s.asset,
      };
    }),
    exporting: {
      enabled: false,
    },
  });
}

export function riskReturnFrontierChart(container, series) {
  Highcharts.chart(container, {
    chart: {
      type: "scatter",
    },
    title: {
      text: "Risk-Return",
    },
    xAxis: {
      title: {
        text: "Risk (%)",
      },
      min: 0,
    },
    yAxis: {
      title: {
        text: "Return (%)",
      },
      min: 0,
    },
    tooltip: {
      formatter: function () {
        return (
          "Equity: " +
          this.point.equity +
          "<br>Risk: " +
          `${Highcharts.numberFormat(this.point.x, 2)}%` +
          "<br>Return: " +
          `${Highcharts.numberFormat(this.point.y, 2)}%` +
          "<br>Return/Risk: " +
          Highcharts.numberFormat(this.point.return_per_risk, 2)
        );
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
      },
    },
    series: [
      {
        showInLegend: false,
        data: series.map((s) => {
          return {
            x: s["risk"] * 100,
            y: s["return"] * 100,
            marker: { radius: 5, fillcolor: "white" },
            equity: s["equity"],
            return_per_risk: s["return_per_risk"],
          };
        }),
        dataLabels: {
          enabled: false,
          formatter: function () {
            return (
              this.point.equity +
              ", R/R: " +
              Highcharts.numberFormat(this.point.return_per_risk, 2)
            );
          },
        },
      },
    ],
    exporting: {
      enabled: false,
    },
  });
}

// series is a list of dicts {'equity': 'X%', 'value': [y1, y2, ...]}
export function distributionChart(container, series, title) {
  const colours = generateColors(series.length, 0.5);
  Highcharts.chart(container, {
    chart: {
      type: "bellcurve",
    },
    title: {
      text: title,
    },
    xAxis: [
      {
        title: { text: "Value" },
      },
    ],
    yAxis: [
      {
        labels: {
          enabled: false,
        },
        // title: { text: "Frequency" },
        title: undefined,
      },
    ],
    series: series.map((s, i) => {
      return {
        name: s.equity,
        type: "bellcurve",
        baseSeries: s.equity,
        zIndex: -1,
        color: colours[i],
      }
    }).concat(series.map((s, i) => {
      return {
        name: s.equity,
        // type: "scatter",
        visible: false,
        data: s.value,
        id: s.equity,
        // marker: {
        //   radius: 1.5,
        // },
        showInLegend: false,
      };
    })),
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  });
}
