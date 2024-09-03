export function sp500_bond_historical_return(container, years, sp500, bond) {
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'S&P 500 and bond annual return'
        },
        xAxis: {
            categories: years
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
            data: sp500 
        }, {
            name: 'Bond',
            data: bond,
            color: 'red'
        }],
        exporting: {
            enabled: false
        }
    });
}