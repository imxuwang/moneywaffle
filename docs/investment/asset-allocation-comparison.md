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

 \[E_{a}^i = \max\left\{E_{f}^i \times \theta, \min\left\{E_{f}^i, V^i_s \times 4\%\right\}\right\}\]

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

##### Random Periods

Random periods 




## Performance Without Expense

Initial asset value does not matter.

Can draw a radar chart of each allocation.


## Performance With Expense

Also consider different initial assets.