import { useEffect, useState } from "react";

type SummaryItem = {
  category: string;
  budget: number;
  spend: number;
  remaining: number;
};

const Summary = () => {
  const [data, setData] = useState<SummaryItem[]>([]);

  const month = "2026-04";

  const fetchSummary = async () => {
    const res = await fetch(
      `http://localhost:8080/api/summary?month=${month}`,
      { credentials: "include" },
    );

    const s = await res.json();
    setData(s.data || []);
  };

  useEffect(() => {
    (async () => fetchSummary())();
  }, []);

  const totalBudget = data.reduce((sum, i) => sum + i.budget, 0);
  const totalSpend = data.reduce((sum, i) => sum + i.spend, 0);
  const totalRemaining = totalBudget - totalSpend;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Summary Dashboard</h2>

      {/* cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h6>Total Budget</h6>
            <h4>₹{totalBudget}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h6>Total Spend</h6>
            <h4 className="text-danger">₹{totalSpend}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h6>Remaining</h6>
            <h4 className={totalRemaining < 0 ? "text-danger" : "text-success"}>
              ₹{totalRemaining}
            </h4>
          </div>
        </div>
      </div>

      <h5 className="mb-3">Summary</h5>

      <div>
        {data.map((item) => (
          <div
            key={item.category}
            className="card p-3 mb-2 d-flex flex-row justify-content-between align-items-center"
          >
            <div>
              <h6 className="mb-1 text-capitalize">{item.category}</h6>
              <small className="text-muted">Budget: ₹{item.budget}</small>
            </div>

            <div className="text-end">
              <div>Spend: ₹{item.spend}</div>
              <div
                className={item.remaining < 0 ? "text-danger" : "text-success"}
              >
                Remaining: ₹{item.remaining}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
