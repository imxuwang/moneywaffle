export function sp500BondHistoricalReturn(container, years, sp500, bond) {
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'S&P 500 and US T.Bond (10 years) annual return (dividend/interest reinvested)'
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
            name: 'S&P500',
            data: sp500 
        }, {
            name: 'T.Bond',
            data: bond,
            color: 'red'
        }],
        exporting: {
            enabled: false
        }
    });
}