import { useEffect, useState } from "react";

export type Category = "food" | "transport" | "bills" | "shopping" | "other";

export interface Budget {
  _id: string;
  userId: string;
  category: Category;
  month: string;
  limit: number;
}

const Dashboard = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [filterMonth, setFilterMonth] = useState("");

  const defaultBudgetForm = {
    category: "food" as Category,
    month: "",
    limit: 0,
  };

  const [budgetForm, setBudgetForm] = useState(defaultBudgetForm);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/budget", {
      credentials: "include",
    });

    const data = await res.json();
    setBudgets(data.data || []);
  };

  useEffect(() => {
    (async () => fetchData())();
  }, []);

  const months = [...new Set(budgets.map((b) => b.month))];

  const filteredBudgets = filterMonth
    ? budgets.filter((b) => b.month === filterMonth)
    : budgets;

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingBudget
      ? `http://localhost:8080/api/budget/${editingBudget._id}`
      : "http://localhost:8080/api/budget";

    const method = editingBudget ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetForm),
      credentials: "include",
    });

    cancelBudgetEdit();
    fetchData();
  };

  const editBudget = (b: Budget) => {
    setEditingBudget(b);
    setBudgetForm({
      category: b.category,
      month: b.month,
      limit: b.limit,
    });
  };

  const deleteBudget = async (id: string) => {
    await fetch(`http://localhost:8080/api/budget/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchData();
  };

  const cancelBudgetEdit = () => {
    setEditingBudget(null);
    setBudgetForm(defaultBudgetForm);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* budget form */}
      <div className="card p-3 mb-4">
        <h5>{editingBudget ? "Edit Budget" : "Add Budget"}</h5>

        <form onSubmit={handleBudgetSubmit} className="row g-2">
          <div className="col-md-3">
            <select
              className="form-control"
              value={budgetForm.category}
              onChange={(e) =>
                setBudgetForm({
                  ...budgetForm,
                  category: e.target.value as Category,
                })
              }
            >
              <option value="food">food</option>
              <option value="transport">transport</option>
              <option value="bills">bills</option>
              <option value="shopping">shopping</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Month (2026-04)"
              value={budgetForm.month}
              onChange={(e) =>
                setBudgetForm({ ...budgetForm, month: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Limit"
              value={budgetForm.limit}
              onChange={(e) =>
                setBudgetForm({
                  ...budgetForm,
                  limit: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-primary w-100">
              {editingBudget ? "Update" : "Add"}
            </button>

            {editingBudget && (
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={cancelBudgetEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* budget list */}
      <div className="mb-5">
        <h5>Budgets</h5>

        {/* Month Filter */}
        <div className="mb-3">
          <select
            className="form-control"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Month</th>
              <th scope="col">Budget</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBudgets.map((b) => (
              <tr key={b._id}>
                <td>{b.category}</td>
                <td>{b.month}</td>
                <td>{b.limit}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editBudget(b)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteBudget(b._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
