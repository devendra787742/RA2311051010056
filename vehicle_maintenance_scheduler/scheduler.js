function knapsack(capacity, vehicles) {
  const n = vehicles.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  // Build DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (vehicles[i - 1].Duration <= w) {
        dp[i][w] = Math.max(
          vehicles[i - 1].Impact +
            dp[i - 1][w - vehicles[i - 1].Duration],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  //  Backtrack to find selected vehicles
  let w = capacity;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(vehicles[i - 1]);
      w -= vehicles[i - 1].Duration;
    }
  }

  return {
    maxImpact: dp[n][capacity],
    selectedVehicles: selected
  };
}

module.exports = knapsack;