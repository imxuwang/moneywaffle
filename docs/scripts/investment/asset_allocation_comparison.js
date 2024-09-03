import { sp500_bond_historical_return } from '/charts/sp500_bond_historical_return.js';

$.getJSON('/data/sp500_bond_historical_return.json', function (data) {
    const sp500 = data.sp500.map((value) => value * 100);
    const tbond_10_year = data.tbond_10_year.map((value) => value * 100);
    sp500_bond_historical_return('sp500-bond-historical-return-container', data.year, sp500, tbond_10_year);
});
