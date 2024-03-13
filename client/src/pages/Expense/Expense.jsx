import React, { useState } from "react";
import "./Expense.scss";
import Modal from "../../components/Modal/Modal";
import { categories, paymentMethods } from "../../data";
import { expense } from "../../expense";
import { CSVLink } from "react-csv";

const Expense = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const closeModal = () => {
    setOpenModal(false);
  };

  const filteredExpense = expense.filter((inc) =>
    Object.values(inc).some(
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
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((inc) => (
              <tr key={inc.id}>
                <td>{inc.id}</td>
                <td>{inc.date}</td>
                <td>{inc.amount}</td>
                <td>{inc.category}</td>
                <td>{inc.remarks}</td>
              </tr>
            ))}
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
          selectOptions={[
            {
              title: "Category",
              name: "category",
              id: "category",
              initialOption: "Choose a category",
              options: categories,
            },
            {
              title: "Payment Method",
              name: "payment_method",
              id: "payment_method",
              initialOption: "Choose a payment method",
              options: paymentMethods,
            },
          ]}
          inputs={[
            {
              name: "date",
              title: "Date",
              id: "date",
              type: "date",
            },
            {
              name: "amount",
              title: "Amount",
              id: "amount",
              type: "text",
            },
            {
              name: "remarks",
              title: "Remarks",
              id: "remarks",
              type: "text",
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
