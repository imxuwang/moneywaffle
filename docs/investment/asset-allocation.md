---
title: "Asset allocation analysis for two asset classes: equity and bond"
---

# Asset allocation analysis for two asset classes: equity and bond

**Last updated: 2024-09-16**

## Goal

The primary objective is to backtest various asset allocations between stocks and bonds to identify optimized allocations across different periods, with a specific focus on how expenses impact investment returns.

### No-Goal

This article does not offer any investment advice.
The test configuration is only one possible scenario and may not reflect actual investment or living conditions.

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

Three different period lengths—10, 15, and 20 years—are tested, with 1,000 random samples taken for each.
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

The longest analyzed period spans from 1935 to 2023, encompassing 90 years.
Over this extended timeframe, a high equity allocation consistently delivers better returns compared to portfolios with lower equity exposure.
However, during shorter periods, the performance of a 100% equity allocation is not significantly superior to more diversified approaches, particularly in times of heightened volatility.

The years from 2000 to 2015 represent the most volatile period among the three tested intervals.
In this timeframe, a pure equity allocation not only produced the lowest returns but also carried the highest risk.
Interestingly, an all-bond allocation during this period did not result in the highest return or the lowest risk, indicating that both extreme allocations—whether fully in equities or entirely in bonds—fail to offer adequate diversification benefits.

Across all periods, portfolios with diversified allocations, combining both equities and bonds, exhibited the lowest risk, particularly when analyzed using return-per-risk metrics.
The 100% equity allocation consistently produced the worst return-per-risk ratio, while the 40% equity allocation performed the best, followed closely by portfolios with 20% and 60% equity allocations.

This supports the popularity of the 60/40 portfolio—often advocated by books, financial articles, and advisors.
The 60/40 allocation strikes a balance between different asset classes, offering a reasonable trade-off between return and risk.
Its widespread endorsement is rooted in its ability to deliver stable and predictable results over various market conditions, making it a favored choice for long-term investors seeking both growth and protection.

#### 1935 to 2023

|Equity|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|
|---:|---:|---:|---:|---:|---:|---:|
|0%|4.65%|8.23%|0.57|21.46%|3|1000000|
|20%|6.18%|7.57%|0.82|17.87%|1|1000000|
|40%|7.56%|8.81%|0.86|17.91%|2|1000000|
|60%|8.79%|11.35%|0.77|20.82%|6|1000000|
|80%|9.87%|14.52%|0.68|28.86%|6|1000000|
|100%|10.80%|17.99%|0.60|37.43%|7|1000000|

<div id="asset-allocation-net-asset-growth-1935-2023-no-expense-container"></div>

<div id="asset-allocation-risk-return-frontier-1935-2023-no-expense-container"></div>

#### 2000 to 2015

|Equity|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|
|---:|---:|---:|---:|---:|---:|---:|
|0%|5.99%|8.99%|0.67|11.12%|2|1000000|
|20%|6.19%|4.71%|1.31|3.71%|1|1000000|
|40%|6.12%|4.60%|1.33|2.56%|2|1000000|
|60%|5.78%|8.81%|0.66|13.89%|2|894329|
|80%|5.15%|13.84%|0.37|25.22%|4|752520|
|100%|4.19%|19.05%|0.22|37.43%|6|625723|

<div id="asset-allocation-net-asset-growth-2000-2015-no-expense-container"></div>

<div id="asset-allocation-risk-return-frontier-2000-2015-no-expense-container"></div>

#### 2000 to 2023

|Equity|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|
|---:|---:|---:|---:|---:|---:|---:|
|0%|3.89%|9.25%|0.42|21.46%|2|1000000|
|20%|4.77%|6.94%|0.69|17.87%|1|1000000|
|40%|5.45%|7.35%|0.74|17.91%|2|1000000|
|60%|5.93%|10.15%|0.58|17.96%|2|894329|
|80%|6.18%|13.97%|0.44|25.22%|4|752520|
|100%|6.20%|18.18%|0.34|37.43%|6|625723|

<div id="asset-allocation-net-asset-growth-2000-2023-no-expense-container"></div>

<div id="asset-allocation-risk-return-frontier-2000-2023-no-expense-container"></div>

### Random Periods

Randomized tests reveal distinct patterns in investment metrics.
First and foremost, annualized returns tend to benefit more from equity exposure as the investment time horizon lengthens.
However, when investing for periods of 10, 20, or even 30 years, the return from a 100% equity portfolio is not significantly better than that of an 80/20 equity-to-bond allocation.
This suggests that while equities generally drive long-term growth, a small portion of bonds can provide a more stable return without sacrificing much performance.

A key observation, which holds across other metrics as well, is the instability of results over shorter timeframes.
This is evident in the variability of returns, as demonstrated by the width of the bell curves for each time period.
For instance, in a 10-year investment horizon, the return of a pure equity portfolio can range dramatically, from -10% to 30%.
However, as the investment period extends to 40 years, the range narrows significantly, with returns typically falling between 2.5% and 17.5%.
This highlights that, over longer durations, equity returns tend to become more predictable.
Additionally, introducing bonds into the portfolio can further stabilize returns, mitigating the volatility seen with an all-equity approach.

Risk follows a similar pattern to these findings from sequential period tests.
As expected, the highest level of risk comes from an all-equity portfolio.
However, contrary to what one might assume, the portfolio with the lowest risk is not the 100% bond allocation.
Instead, diversified portfolios that combine equities and bonds effectively reduce risk.
This supports the concept that diversification, by spreading exposure across multiple asset classes, plays a crucial role in risk mitigation.

#### Annualized Return

<div id="asset-allocation-return-random-10-years-no-expense-container"></div>
<div id="asset-allocation-return-random-20-years-no-expense-container"></div>
<div id="asset-allocation-return-random-30-years-no-expense-container"></div>
<div id="asset-allocation-return-random-40-years-no-expense-container"></div>

#### Risk (Standard Deviation)

<div id="asset-allocation-risk-random-10-years-no-expense-container"></div>
<div id="asset-allocation-risk-random-20-years-no-expense-container"></div>
<div id="asset-allocation-risk-random-30-years-no-expense-container"></div>
<div id="asset-allocation-risk-random-40-years-no-expense-container"></div>

#### Return Per Risk

<div id="asset-allocation-return-per-risk-random-10-years-no-expense-container"></div>
<div id="asset-allocation-return-per-risk-random-20-years-no-expense-container"></div>
<div id="asset-allocation-return-per-risk-random-30-years-no-expense-container"></div>
<div id="asset-allocation-return-per-risk-random-40-years-no-expense-container"></div>

#### Max Drawdown

<div id="asset-allocation-max-drawdown-random-10-years-no-expense-container"></div>
<div id="asset-allocation-max-drawdown-random-20-years-no-expense-container"></div>
<div id="asset-allocation-max-drawdown-random-30-years-no-expense-container"></div>
<div id="asset-allocation-max-drawdown-random-40-years-no-expense-container"></div>

#### Max Drawdown Duration

<div id="asset-allocation-max-drawdown-duration-random-10-years-no-expense-container"></div>
<div id="asset-allocation-max-drawdown-duration-random-20-years-no-expense-container"></div>
<div id="asset-allocation-max-drawdown-duration-random-30-years-no-expense-container"></div>
<div id="asset-allocation-max-drawdown-duration-random-40-years-no-expense-container"></div>

#### Minimal Net Asset

<div id="asset-allocation-minimal-net-asset-random-10-years-no-expense-container"></div>
<div id="asset-allocation-minimal-net-asset-random-20-years-no-expense-container"></div>
<div id="asset-allocation-minimal-net-asset-random-30-years-no-expense-container"></div>
<div id="asset-allocation-minimal-net-asset-random-40-years-no-expense-container"></div>

## Performance With Expense

### Sequential Periods

Now, let's explore how these portfolio metrics affect real-life financial outcomes.
The new metric, "expense," represents how much money can be withdrawn from the portfolio over its lifetime.
Simply put, the higher the expense amount, the better, as it allows for more spending without depleting the portfolio.

Between 1935 and 2023, allocations ranging from 100% equity to 40% equity generated similar cash flows.
Notably, the 80/20 portfolio (80% equity, 20% bonds) delivered almost the same cash flow as the 100% equity allocation, with a difference of less than 0.03%.
This shows that reducing equity exposure slightly does not significantly impact the amount one can safely withdraw over time.

However, during more volatile periods, such as from 2000 to 2015, higher equity allocations resulted in lower cash flows.
The primary reason for this is that in a market downturn, expenses often need to be drastically reduced to preserve the portfolio's longevity.
These reduced withdrawals also limit the portfolio’s ability to recover when the market rebounds, as less money remains invested to benefit from the recovery.

The period from 2000 to 2023 presents a different picture, featuring strong growth following a major market crash.
While a 100% equity portfolio produced a similar annualized return to the 80/20 portfolio, the cash flow generated by the all-equity portfolio was nearly 10% lower than that of the 80/20.
This highlights that even when equities recover well, the ability to withdraw cash consistently may be hindered by the need to cut expenses during downturns.

In this period, the 60/40 portfolio (60% equity, 40% bonds) once again demonstrated its strength as a well-balanced allocation, performing favorably in terms of both cash flow and overall risk-return trade-offs.

#### 1935 to 2023

|Equity|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|Expense|
|---:|---:|---:|---:|---:|---:|---:|---:|
|0%|0.47%|7.90%|0.06|49.55%|49|489732|4177432|
|20%|2.06%|7.29%|0.28|22.31%|17|934501|9677595|
|40%|4.57%|8.76%|0.52|23.48%|8|952909|11484190|
|60%|7.07%|11.34%|0.62|31.63%|8|957867|11770148|
|80%|8.61%|14.44%|0.60|39.56%|8|947777|11803908|
|100%|9.76%|17.87%|0.55|47.30%|8|919102|11807333|

<div id="asset-allocation-net-asset-growth-1935-2023-with-expense-container"></div>

<div id="asset-allocation-risk-return-frontier-1935-2023-with-expense-container"></div>

#### 2000 to 2015

|Equity|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|Expense|
|---:|---:|---:|---:|---:|---:|---:|---:|
|0%|1.75%|8.63%|0.20|14.68%|6|960000|842156|
|20%|1.94%|4.53%|0.43|7.56%|2|960000|794206|
|40%|1.88%|4.42%|0.42|8.87%|3|893467|736243|
|60%|1.55%|8.46%|0.18|20.88%|7|759595|669737|
|80%|0.95%|13.29%|0.07|34.28%|13|630935|596647|
|100%|0.03%|18.29%|0.00|50.04%|14|479636|519342|

<div id="asset-allocation-net-asset-growth-2000-2015-with-expense-container"></div>

<div id="asset-allocation-risk-return-frontier-2000-2015-with-expense-container"></div>

#### 2000 to 2023

|Equity|Return|Risk|Return/Risk|Max Drawdown|Max Drawdown Dration|Min Net Asset|Expense|
|---:|---:|---:|---:|---:|---:|---:|---:|
|0%|-0.27%|8.88%|-0.03|34.39%|14|903036|1208772|
|20%|0.58%|6.67%|0.09|22.68%|4|960000|1212533|
|40%|1.23%|7.06%|0.17|21.20%|3|893467|1195911|
|60%|1.69%|9.75%|0.17|21.24%|7|759595|1154907|
|80%|1.95%|13.43%|0.15|34.28%|13|630935|1083698|
|100%|1.96%|17.47%|0.11|50.04%|14|479636|988486|

<div id="asset-allocation-net-asset-growth-2000-2023-with-expense-container"></div>

<div id="asset-allocation-risk-return-frontier-2000-2023-with-expense-container"></div>

### Random Periods

The findings from random-period tests that include the "expense" metric reinforce the conclusions drawn from sequential-period analyses, as well as those from random periods without considering expenses.
These tests consistently demonstrate the resilience of certain portfolio allocations across varying market conditions.

When focusing on the expense metric, portfolios with equity allocations ranging from 40% to 100% provide similar cash flows across all investment time horizons.
This suggests that, in terms of spending potential, higher equity exposure does not dramatically improve outcomes compared to more balanced portfolios.
A diversified portfolio, such as the ones with 40% to 60% equity, not only delivers comparable cash flows but also offers another crucial advantage: a higher minimal net asset value.

This higher minimal net asset value means that the portfolio maintains a larger financial cushion, which in turn reduces the risk of fully depleting the investment over time.
By preserving more capital during downturns, these diversified portfolios are better positioned to sustain withdrawals without running the risk of draining assets entirely.
This reduced risk makes diversified allocations like 40/60 or 60/40 especially appealing for long-term investors who seek both reliable cash flow and financial security.

#### Annualized Return

<div id="asset-allocation-return-random-10-years-expense-container"></div>
<div id="asset-allocation-return-random-20-years-expense-container"></div>
<div id="asset-allocation-return-random-30-years-expense-container"></div>
<div id="asset-allocation-return-random-40-years-expense-container"></div>

#### Risk (Standard Deviation)

<div id="asset-allocation-risk-random-10-years-expense-container"></div>
<div id="asset-allocation-risk-random-20-years-expense-container"></div>
<div id="asset-allocation-risk-random-30-years-expense-container"></div>
<div id="asset-allocation-risk-random-40-years-expense-container"></div>

#### Return Per Risk

<div id="asset-allocation-return-per-risk-random-10-years-expense-container"></div>
<div id="asset-allocation-return-per-risk-random-20-years-expense-container"></div>
<div id="asset-allocation-return-per-risk-random-30-years-expense-container"></div>
<div id="asset-allocation-return-per-risk-random-40-years-expense-container"></div>

#### Max Drawdown

<div id="asset-allocation-max-drawdown-random-10-years-expense-container"></div>
<div id="asset-allocation-max-drawdown-random-20-years-expense-container"></div>
<div id="asset-allocation-max-drawdown-random-30-years-expense-container"></div>
<div id="asset-allocation-max-drawdown-random-40-years-expense-container"></div>

#### Max Drawdown Duration

<div id="asset-allocation-max-drawdown-duration-random-10-years-expense-container"></div>
<div id="asset-allocation-max-drawdown-duration-random-20-years-expense-container"></div>
<div id="asset-allocation-max-drawdown-duration-random-30-years-expense-container"></div>
<div id="asset-allocation-max-drawdown-duration-random-40-years-expense-container"></div>

#### Minimal Net Asset

<div id="asset-allocation-minimal-net-asset-random-10-years-expense-container"></div>
<div id="asset-allocation-minimal-net-asset-random-20-years-expense-container"></div>
<div id="asset-allocation-minimal-net-asset-random-30-years-expense-container"></div>
<div id="asset-allocation-minimal-net-asset-random-40-years-expense-container"></div>

#### Expense

<div id="asset-allocation-expense-random-10-years-expense-container"></div>
<div id="asset-allocation-expense-random-20-years-expense-container"></div>
<div id="asset-allocation-expense-random-30-years-expense-container"></div>
<div id="asset-allocation-expense-random-40-years-expense-container"></div>