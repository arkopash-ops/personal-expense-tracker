import { useEffect, useState } from "react";
import type { Category } from "./Dashboard";

export interface Expense {
  _id: string;
  userId: string;
  amount: number;
  category: Category;
  note?: string;
  date: string;
}

const Expense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [filterMonth, setFilterMonth] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const defaultExpenseForm = {
    amount: 0,
    category: "food" as Category,
    note: "",
    date: "",
  };

  const [expenseForm, setExpenseForm] = useState(defaultExpenseForm);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/expense", {
      credentials: "include",
    });

    const data = await res.json();
    setExpenses(data.data || []);
  };

  useEffect(() => {
    (async () => fetchData())();
  }, []);

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

  const getMonth = (monthStr: string) => {
    if (!monthStr) return "";
    return monthStr.slice(0, 7);
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchMonth = filterMonth ? getMonth(e.date) === filterMonth : true;
    const matchCategory = filterCategory ? e.category === filterCategory : true;

    return matchMonth && matchCategory;
  });

  // unique months for dropdown
  const months = [...new Set(expenses.map((e) => getMonth(e.date)))];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Expenses</h2>

      {/* expense form */}
      <div className="card p-3 mb-4">
        <h5>{editingExpense ? "Edit Expense" : "Add Expense"}</h5>

        <form onSubmit={handleExpenseSubmit} className="row g-2">
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

        {/* filter by category and mont */}
        <div className="row mb-3">
          <div className="col-md-3">
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

          <div className="col-md-3">
            <select
              className="form-control"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="food">food</option>
              <option value="transport">transport</option>
              <option value="bills">bills</option>
              <option value="shopping">shopping</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Note</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e._id}>
                <td>{e.date}</td>
                <td>{e.amount}</td>
                <td>{e.category}</td>
                <td>{e.note}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editExpense(e)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteExpense(e._id)}
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

export default Expense;
