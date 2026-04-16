import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SummaryItem } from "../types/summary";

const SummaryChart = ({ data }: { data: SummaryItem[] }) => {
  return (
    <div className="card p-3 mt-4">
      <h5 className="mb-3">Category Analytics</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} responsive>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />

          <Bar dataKey="spend" stackId="a" fill="#35dc43" />
          <Bar dataKey="remaining" stackId="a" fill="#dc3545" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryChart;
