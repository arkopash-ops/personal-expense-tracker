import { useEffect, useState } from "react";

export type Category = "food" | "transport" | "bills" | "shopping" | "other";

export interface Budget {
  _id: string;
  userId: string;
  category: Category;
  month: string;
  limit: number;
}

export interface Expense {
  _id: string;
  userId: string;
  amount: number;
  category: Category;
  note?: string;
  date: string;
}

const Dashboard = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const defaultBudgetForm = {
    userId: "",
    category: "food" as Category,
    month: "",
    limit: 0,
  };

  const defaultExpenseForm = {
    userId: "",
    amount: 0,
    category: "food" as Category,
    note: "",
    date: "",
  };

  const [budgetForm, setBudgetForm] = useState(defaultBudgetForm);
  const [expenseForm, setExpenseForm] = useState(defaultExpenseForm);

  const fetchData = async () => {
    const [b, e] = await Promise.all([
      fetch("http://localhost:8080/api/budget", {
        credentials: "include",
      }).then((r) => r.json()),
      fetch("http://localhost:8080/api/expense", {
        credentials: "include",
      }).then((r) => r.json()),
    ]);

    setBudgets(b.data || []);
    setExpenses(e.data || []);
  };

  useEffect(() => {
    (async () => fetchData())();
  }, []);

  // budget
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
      userId: b.userId,
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

  // expense
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingExpense
      ? `http://localhost:8080/api/expense/${editingExpense._id}`
      : "http://localhost:8080/api/expense";

    const method = editingExpense ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenseForm),
      credentials: "include",
    });

    cancelExpenseEdit();
    fetchData();
  };

  const editExpense = (e: Expense) => {
    setEditingExpense(e);
    setExpenseForm({
      userId: e.userId,
      amount: e.amount,
      category: e.category,
      note: e.note || "",
      date: e.date,
    });
  };

  const deleteExpense = async (id: string) => {
    await fetch(`http://localhost:8080/api/expense/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchData();
  };

  const cancelExpenseEdit = () => {
    setEditingExpense(null);
    setExpenseForm(defaultExpenseForm);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* budget form */}
      <div className="card p-3 mb-4">
        <h5>{editingBudget ? "Edit Budget" : "Add Budget"}</h5>

        <form onSubmit={handleBudgetSubmit} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="UserId"
              value={budgetForm.userId}
              onChange={(e) =>
                setBudgetForm({ ...budgetForm, userId: e.target.value })
              }
            />
          </div>

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
              <option>food</option>
              <option>transport</option>
              <option>bills</option>
              <option>shopping</option>
              <option>other</option>
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

        {budgets.map((b) => (
          <div
            key={b._id}
            className="card p-2 mb-2 d-flex justify-content-between flex-row"
          >
            <div>
              {b.category} | {b.month} | ₹{b.limit}
            </div>

            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editBudget(b)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteBudget(b._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* expense form */}
      <div className="card p-3 mb-4">
        <h5>{editingExpense ? "Edit Expense" : "Add Expense"}</h5>

        <form onSubmit={handleExpenseSubmit} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="UserId"
              value={expenseForm.userId}
              onChange={(e) =>
                setExpenseForm({ ...expenseForm, userId: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={expenseForm.amount}
              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  amount: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              value={expenseForm.category}
              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  category: e.target.value as Category,
                })
              }
            >
              <option>food</option>
              <option>transport</option>
              <option>bills</option>
              <option>shopping</option>
              <option>other</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Note"
              value={expenseForm.note}
              onChange={(e) =>
                setExpenseForm({ ...expenseForm, note: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={expenseForm.date}
              onChange={(e) =>
                setExpenseForm({ ...expenseForm, date: e.target.value })
              }
            />
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-success w-100">
              {editingExpense ? "Update" : "Add"}
            </button>

            {editingExpense && (
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={cancelExpenseEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* expense list */}
      <div>
        <h5>Expenses</h5>

        {expenses.map((e) => (
          <div
            key={e._id}
            className="card p-2 mb-2 d-flex justify-content-between flex-row"
          >
            <div>
              {e.date} | ₹{e.amount} | {e.category} | {e.note}
            </div>

            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editExpense(e)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteExpense(e._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;