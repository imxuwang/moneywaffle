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
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
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
      type: "line",
    },
    title: {
      text: "Risk-Return",
    },
    xAxis: {
      title: {
        text: "Risk (%)",
      },
    },
    yAxis: {
      title: {
        text: "Return (%)",
      },
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
            marker: {radius: 5, fillcolor: "white"},
            equity: s["equity"],
            return_per_risk: s["return_per_risk"],
          };
        }),
        dataLabels: {
          enabled: true,
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