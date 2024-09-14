// Function to calculate quartiles and boxplot statistics
export function calculateBoxplotData(values) {
  values.sort((a, b) => a - b); // Sort the list in ascending order

  const min = values[0];
  const max = values[values.length - 1];

  const q1 = values[Math.floor(values.length * 0.25)];
  const median = values[Math.floor(values.length * 0.5)];
  const q3 = values[Math.floor(values.length * 0.75)];

  return [min, q1, median, q3, max];
}

// Function to calculate outliers
export function calculateOutliers(values, q1, q3) {
  const iqr = q3 - q1; // Interquartile Range
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  // Outliers are values outside the lower and upper bounds
  const outliers = values.filter(
    (value) => value < lowerBound || value > upperBound
  );

  return outliers;
}

// Function generate N different colours with transparency
export function generateColors(N, alpha) {
  const colors = [];
  for (let i = 0; i < N; i++) {
    const hue = (i * 360) / N;
    colors.push(`hsla(${hue}, 100%, 50%, ${alpha})`);
  }
  return colors;
}
