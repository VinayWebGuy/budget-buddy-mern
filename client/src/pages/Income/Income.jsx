import React, { useEffect, useState } from "react";
import "./Income.scss";
import Modal from "../../components/Modal/Modal";
import { BASE_URL, paymentMethods } from "../../data";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading/Loading";
import { MdDeleteOutline } from "react-icons/md";

const Income = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
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
      const response = await fetch(`${BASE_URL}/add-income`, {
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

      console.log("Income saved successfully:", data);
      setIncome(data.income);
      setLoading(false);
      setOpenModal(false);
      setAmount("");
      setDate("");
      setCategory("");
      setRemarks("");
    } catch (error) {
      console.error("Error saving income:", error.message);
    }
  };

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all-income`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch income: ${response.status}`);
        }

        const data = await response.json();
        setIncome(data.income);
      } catch (error) {
        console.error("Error fetching income:", error.message);
      }
    };

    fetchIncome();
  }, []);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all-category`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch category: ${response.status}`);
        }

        const data = await response.json();
        setAllCategory(data.category);
      } catch (error) {
        console.error("Error fetching category:", error.message);
      }
    };

    fetchCategory();
  }, []);

  const deleteIncome = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/delete-income/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete income: ${response.status}`);
      }
      setIncome((prevIncome) =>
        prevIncome.filter((income) => income._id !== id)
      );
      setLoading(false);
    } catch (error) {
      console.log("Error" + error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const filteredIncome = income.filter((inc) =>
    Object.values(inc).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIncome.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="box income">
      {loading && <Loading />}
      <div className="table-header">
        <h2 className="pageHeading">Income</h2>
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
          <option value={income.length}>All</option>
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
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((inc) => (
                <tr key={inc._id}>
                  <td>{inc._id}</td>
                  <td>{new Date(inc.date).toISOString().split("T")[0]}</td>
                  <td>{inc.amount}</td>
                  <td>{inc.category}</td>
                  <td>{inc.payment_method}</td>
                  <td>
                    <MdDeleteOutline
                      className="delete-icon"
                      onClick={() => deleteIncome(inc._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align="center">
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
            { length: Math.ceil(filteredIncome.length / itemsPerPage) },
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
          heading="Add Income"
          selectOptions={[
            {
              title: "Category",
              name: "category",
              id: "category",
              initialOption: "Choose a category",
              options: allCategory,
              onChange: handleInputChange,
              value: category,
              required: true,
            },
            {
              title: "Payment Method",
              name: "payment_method",
              id: "payment_method",
              initialOption: "Choose a payment method",
              options: paymentMethods,
              onChange: handleInputChange,
              value: method,
              required: true,
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
              required: true,
            },
            {
              name: "amount",
              title: "Amount",
              id: "amount",
              type: "text",
              value: amount,
              onChange: handleInputChange,
              required: true,
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
          onSubmit={submitForm}
        />
      )}
    </div>
  );
};
export default Income;
