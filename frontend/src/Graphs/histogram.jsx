import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Function to create histogram bins
 * @param {number[]} prices - List of house prices
 * @param {number} binSize - Size of each price range bin
 * @returns {Object[]} - Array of bins with range labels and counts
 */
const createHistogramBins = (prices, binSize) => {
  if (!prices || prices.length === 0) return [];

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const bins = [];

  for (let i = min; i <= max; i += binSize) {
    bins.push({ range: `$${i}-${i + binSize}`, count: 0 });
  }

  prices.forEach((price) => {
    const binIndex = Math.floor((price - min) / binSize);
    bins[binIndex].count += 1;
  });

  return bins;
};

/**
 * HousePriceHistogram Component
 * @param {Object} props
 * @param {number[]} props.prices - Array of house prices
 * @param {number} [props.binSize=100000] - Optional bin size, defaults to 100,000
 */
function HousePriceHistogram({ prices, binSize = 10000 }) {
  console.log(prices);
  if (!prices || prices.length === 0) {
    return <p>No price data available</p>;
  }

  const bins = createHistogramBins(prices, binSize);

  const data = {
    labels: bins.map((bin) => bin.range),
    datasets: [
      {
        label: "Number of Houses",
        data: bins.map((bin) => bin.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
}

export default HousePriceHistogram;
