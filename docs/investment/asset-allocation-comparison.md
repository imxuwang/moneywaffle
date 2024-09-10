# Asset Allocation Comparison

**Last updated: 2024-09-03**

## Goal

The primary objective is to backtest various asset allocations between stocks and bonds to identify optimized allocations across different periods, with a specific focus on how expenses impact investment returns.

## Test Setup

### Data

The historical return of stocks, bonds and bills are taken from [NYU](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html).
It covers the period from 1928 until 2023.
I use `S&P500` and `T.Bond` to refer to the columns `S&P 500 (includes dividends)` and `US T. Bond (10-year)`.

<div id="sp500-bond-historical-return-container"></div>

### Configuration

The test configurations are:

- Assets are rebalanced at the start of each year.
- The risk factor is determined based on standard deviation.
- Initial expenses, when considered, are composed as follows:
    - Rental: $2,000 per month (~£1,525 per month, ~€1,811 per month)
    - Other expenses: $2,000 per month
        - Includes recurring expenses, e.g., grocery, utilities, transportation.
        - Also includes one-off expenses, e.g., vacation.
    - Total: $4,000 per month or $48,000 annually
- The minimal expense ratio is set at 75%.
- Inflation, though complex and varying across countries and time periods, is fixed at 2% to focus on allocation comparisons.
    - Beware that it is a **strong** assumption.
- Expenses are deducted at the beginning of each year.
- Risk free rate is not considered.

The initial expense and any expense calcualted in the succeeding years based on the inflation are called the _full expense_.
The stated expenses are sufficient to support a comfortable lifestyle for a couple in low-cost countries such as Thailand or Spain.
In the event of a market downturn, reducing expenses becomes one of the most effective strategies for financial survival.
Theoretically, having no expenses allows for a quicker portfolio recovery than any positive expense level, as negative expenses would imply cash inflows into the investment.
However, to maintain a reasonable quality of life, there must be a minimum level of expenditure at all times.

This is where the minimal expense ratio comes into play, ensuring that expenses do not drop below a certain threshold.
The actual expenses incurred will fall somewhere between this minimal level and the full, pre-determined expense amount.
To determine the actual expense, the 4% rule is applied.

Let

- \(\pi\) represent the inflation,
- \(E_{f}^i\) represent the full expense of the \(i\)-th year,
    - \(E_{f}^1 = $48,000\)
    - \(E_{f}^i = E_{f}^0 \times (1 + \pi)^{i - 1}\), \(\forall i \in \{1, 2, \dots, n\}\)
- \(\theta\) represent the minimal expense ratio,
- \(V^i_s\) represent the total value of asset at the beginning of the \(i\)-th year,
    - \(V^1_s\), the initial value, is a test variable and is discussed later in tests with expense,
- \(E_{a}^i\) represent the actual expense of the \(i\)-th year.

The actual expense is calculated as:

 \[E_{a}^i = \min\left\{E_{f}^i, \max\left\{E_{f}^i \times \theta, V^i_s \times 4\%\right\}\right\}\]

This formula ensures that expenses remain within a sustainable range, balancing between maintaining quality of life and preserving assets during market fluctuations.

### Periods

Two types of periods are selected for analysis: sequential and random.
Sequential periods consist of continuous historical time frames, allowing for an assessment of performance over actual historical trends.
Random periods, on the other hand, are constructed by selecting and reordering historical returns randomly, without replacement, to simulate a variety of possible scenarios.

#### Sequential Periods

Three periods are tested:

- 1935 to 2023
    - This period represents the longest span following the 1929 Depression.
    - Key reasons for selecting this timeframe include the establishment of the [SEC](https://www.britannica.com/money/Securities-and-Exchange-Commission) in 1934 to regulate financial markets and the transformation of the [Federal Reserve](https://www.britannica.com/money/Federal-Reserve-System) into a modern central bank.
- 2000 to 2015
    - This period marks the longest economic downturn in recent history.
    - The market began its decline in 2000 and took until 2015 to fully recover, as measured by the [S&P 500 index](https://www.macrotrends.net/2324/sp-500-historical-chart-data) (excluding dividend reinvestment).
- 2000 to 2023
    - This timeframe encompasses a significant depression followed by the longest bull market in history.
    - It serves as a test of the balance between risk and growth.

#### Random Periods

Three different period lengths—10, 15, and 20 years—are tested, with 100 random samples taken for each.
The samples are drawn from historical returns spanning from 1935 to 2023, inclusive.

### Metrics

The following metrics are used:

- Annualized return
- Standard deviation of yearly return (risk)
- Annualized return per unit of risk
- Maximum drawdown
- Maximum drawdown duration
- Minimum asset value

In tests involving expenses, the total actual expense is used as an indicator of living conditions.

## Performance Without Expense

### Sequential Periods

#### 1935 to 2023

|Ratio|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|
|---|---|---|---|---|---|---|
|0%|4.65%|8.23%|0.57|21.46%|3|1000000|
|20%|6.18%|7.57%|0.82|17.87%|1|1000000|
|40%|7.56%|8.81%|0.86|17.91%|2|1000000|
|60%|8.79%|11.35%|0.77|20.82%|6|1000000|
|80%|9.87%|14.52%|0.68|28.86%|6|1000000|
|100%|10.80%|17.99%|0.60|37.43%|7|1000000|

<div id="asset-allocation-net-asset-growth-1935-2023-container"></div>

<div id="asset-allocation-risk-return-frontier-1935-2023-container"></div>

#### 2000 to 2015

|Ratio|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|
|---|---|---|---|---|---|---|
|0%|5.99%|8.99%|0.67|11.12%|2|1000000|
|20%|6.19%|4.71%|1.31|3.71%|1|1000000|
|40%|6.12%|4.60%|1.33|2.56%|2|1000000|
|60%|5.78%|8.81%|0.66|13.89%|2|894329|
|80%|5.15%|13.84%|0.37|25.22%|4|752520|
|100%|4.19%|19.05%|0.22|37.43%|6|625723|

<div id="asset-allocation-net-asset-growth-2000-2015-container"></div>

<div id="asset-allocation-risk-return-frontier-2000-2015-container"></div>

#### 2000 to 2023

|Ratio|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|
|---|---|---|---|---|---|---|
|0%|3.89%|9.25%|0.42|21.46%|2|1000000|
|20%|4.77%|6.94%|0.69|17.87%|1|1000000|
|40%|5.45%|7.35%|0.74|17.91%|2|1000000|
|60%|5.93%|10.15%|0.58|17.96%|2|894329|
|80%|6.18%|13.97%|0.44|25.22%|4|752520|
|100%|6.20%|18.18%|0.34|37.43%|6|625723|

<div id="asset-allocation-net-asset-growth-2000-2023-container"></div>

<div id="asset-allocation-risk-return-frontier-2000-2023-container"></div>

## Performance With Expense

Also consider different initial assets.