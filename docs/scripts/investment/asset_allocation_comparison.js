import { sp500BondHistoricalReturn } from "./sp500_bond_historical_return_chart.js";
import {
  assetGrowthChart,
  distributionChart,
  riskReturnFrontierChart,
} from "./asset_allocation_chart.js";

const SP500_BOND_HISTORICAL_RETURN_CONTAINER =
  "sp500-bond-historical-return-container";
const ASSET_ALLOCATION_SEQUENTIAL_PERIODS = [
  [1935, 2023],
  [2000, 2015],
  [2000, 2023],
];
const ASSET_ALLOCATION_RANDOM_PERIODS = [10, 20, 30, 40];
const DISPLAY_EQUITY_ALLOCATIONS = [0, 20, 40, 60, 80, 100];

$.getJSON("/data/sp500_bond_historical_return.json", function (data) {
  const sp500 = data.sp500.map((value) => value * 100);
  const tbond_10_year = data.tbond_10_year.map((value) => value * 100);
  sp500BondHistoricalReturn(
    SP500_BOND_HISTORICAL_RETURN_CONTAINER,
    data.year,
    sp500,
    tbond_10_year
  );
});

$.getJSON(
  "/data/asset_allocation_comparison_sequential_no_expense.json",
  function (data) {
    ASSET_ALLOCATION_SEQUENTIAL_PERIODS.forEach((period) => {
      const periodData = data[`${period[0]} - ${period[1]}`];
      assetGrowthChart(
        `asset-allocation-net-asset-growth-${period[0]}-${period[1]}-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              asset: item.asset.map((value) => value / 1000),
            };
          })
      );

      riskReturnFrontierChart(
        `asset-allocation-risk-return-frontier-${period[0]}-${period[1]}-no-expense-container`,
        periodData.map((item) => {
          return {
            risk: item.metrics.risk,
            return: item.metrics.return,
            return_per_risk: item.metrics.return_per_risk,
            equity: `${item.ratio}%`,
          };
        })
      );
    });
  }
);

$.getJSON(
  "/data/asset_allocation_comparison_sequential_with_expense.json",
  function (data) {
    ASSET_ALLOCATION_SEQUENTIAL_PERIODS.forEach((period) => {
      const periodData = data[`${period[0]} - ${period[1]}`];
      assetGrowthChart(
        `asset-allocation-net-asset-growth-${period[0]}-${period[1]}-with-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              asset: item.asset.map((value) => value / 1000),
            };
          })
      );

      riskReturnFrontierChart(
        `asset-allocation-risk-return-frontier-${period[0]}-${period[1]}-with-expense-container`,
        periodData.map((item) => {
          return {
            risk: item.metrics.risk,
            return: item.metrics.return,
            return_per_risk: item.metrics.return_per_risk,
            equity: `${item.ratio}%`,
          };
        })
      );
    });
  }
);

$.getJSON(
  "/data/asset_allocation_comparison_random_no_expense.json",
  function (data) {
    ASSET_ALLOCATION_RANDOM_PERIODS.forEach((period) => {
      const periodData = data[period];
      distributionChart(
        `asset-allocation-return-random-${period}-years-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.returns,
            };
          }),
        `Annualized return of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-risk-random-${period}-years-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.risks,
            };
          }),
        `Risk of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-return-per-risk-random-${period}-years-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.return_per_risks,
            };
          }),
        `Return per risk of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-max-drawdown-random-${period}-years-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.max_drawdowns,
            };
          }),
        `Max drawdown of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-max-drawdown-duration-random-${period}-years-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.max_drawdown_durations,
            };
          }),
        `Max drawdown duration of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-minimal-net-asset-random-${period}-years-no-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.min_net_assets,
            };
          }),
        `Minimal net asset of random ${period} Years`
      );
    });
  }
);

$.getJSON(
  "/data/asset_allocation_comparison_random_expense.json",
  function (data) {
    ASSET_ALLOCATION_RANDOM_PERIODS.forEach((period) => {
      const periodData = data[period];
      distributionChart(
        `asset-allocation-return-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.returns,
            };
          }),
        `Annualized return of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-risk-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.risks,
            };
          }),
        `Risk of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-return-per-risk-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.return_per_risks,
            };
          }),
        `Return per risk of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-max-drawdown-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.max_drawdowns,
            };
          }),
        `Max drawdown of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-max-drawdown-duration-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.max_drawdown_durations,
            };
          }),
        `Max drawdown duration of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-minimal-net-asset-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.min_net_assets,
            };
          }),
        `Minimal net asset of random ${period} Years`
      );
      distributionChart(
        `asset-allocation-expense-random-${period}-years-expense-container`,
        periodData
          .filter((item) => {
            return DISPLAY_EQUITY_ALLOCATIONS.includes(item.ratio);
          })
          .map((item) => {
            return {
              equity: `${item.ratio}%`,
              value: item.expenses,
            };
          }),
        `Total expense of random ${period} Years`
      );
    });
  }
);
