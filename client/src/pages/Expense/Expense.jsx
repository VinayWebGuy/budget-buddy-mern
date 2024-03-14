import React, { useEffect, useState } from "react";
import "./Expense.scss";
import Modal from "../../components/Modal/Modal";
import { BASE_URL, categories, paymentMethods } from "../../data";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading/Loading";

const Expense = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState([]);
  // Input change
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("");
  const [category, setCategory] = useState("");
  const [remarks, setRemarks] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "payment_method":
        setMethod(value);
        break;
      case "date":
        setDate(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "remarks":
        setRemarks(value);
        break;
      default:
        break;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const income = {
      amount,
      date,
      payment_method: method,
      category,
      remarks,
    };

    try {
      const response = await fetch(`${BASE_URL}/add-expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
      });

      if (!response.ok) {
        throw new Error("Failed to save income");
      }

      const data = await response.json();
      console.log("Expense saved successfully:", data);
      setLoading(false);
      setOpenModal(false);
      setAmount("");
      setDate("");
      setCategory("");
      setRemarks("");
    } catch (error) {
      console.error("Error saving expense:", error.message);
    }
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all-expense`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch expense: ${response.status}`);
        }

        const data = await response.json();
        setExpense(data.expense);
      } catch (error) {
        console.error("Error fetching expese:", error.message);
      }
    };

    fetchExpense();
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };
  const filteredExpense = expense.filter((exp) =>
    Object.values(exp).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExpense.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="box expense">
      {loading && <Loading />}
      <div className="table-header">
        <h2 className="pageHeading">Expense</h2>
        <div className="buttons">
          <CSVLink data={currentItems} className="btn outline">
            Download
          </CSVLink>
          <button className="btn" onClick={() => setOpenModal(true)}>
            Add
          </button>
        </div>
      </div>
      <div className="search-table">
        <select
          name="no_of_items"
          id="no_of_items"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value="3">3 item/page</option>
          <option value="5">5 item/page</option>
          <option value="10">10 item/page</option>
          <option value="15">15 item/page</option>
          <option value="20">20 item/page</option>
          <option value="25">25 item/page</option>
          <option value="40">40 item/page</option>
          <option value="50">50 item/page</option>
          <option value={expense.length}>All</option>
        </select>
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp._id}</td>
                  <td>{new Date(exp.date).toISOString().split("T")[0]}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>{exp.payment_method}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" align="center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredExpense.length / itemsPerPage) },
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      {openModal && (
        <Modal
          heading="Add Expense"
          onSubmit={submitForm}
          selectOptions={[
            {
              title: "Category",
              name: "category",
              id: "category",
              initialOption: "Choose a category",
              options: categories,
              onChange: handleInputChange,
              value: category,
            },
            {
              title: "Payment Method",
              name: "payment_method",
              id: "payment_method",
              initialOption: "Choose a payment method",
              options: paymentMethods,
              onChange: handleInputChange,
              value: method,
            },
          ]}
          inputs={[
            {
              name: "date",
              title: "Date",
              id: "date",
              type: "date",
              value: date,
              onChange: handleInputChange,
            },
            {
              name: "amount",
              title: "Amount",
              id: "amount",
              type: "text",
              value: amount,
              onChange: handleInputChange,
            },
            {
              name: "remarks",
              title: "Remarks",
              id: "remarks",
              type: "text",
              value: remarks,
              onChange: handleInputChange,
            },
          ]}
          buttonText="Add"
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
export default Expense;
