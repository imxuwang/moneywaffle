export function sp500_bond_historical_return(container) {
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'S&P 500 and bond annual return'
        },
        xAxis: {
            categories: ['2015', '2016', '2017', '2018', '2019']
        },
        yAxis: {
            title: {
                text: 'Return (%)'
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                borderRadius: '25%'
            }
        },
        series: [{
            name: 'S&P 500',
            data: [1.38, 11.96, 21.83, -4.38, 31.49]
        }, {
            name: 'Bond',
            data: [0.55, 0.46, 0.71, 0.01, 0.09]
        }]
    });
}