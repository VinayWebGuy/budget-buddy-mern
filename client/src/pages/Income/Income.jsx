import React, { useState } from "react";
import "./Income.scss";
import Modal from "../../components/Modal/Modal";
import { categories, paymentMethods } from "../../data";

const Income = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="box income">
      <div className="table-header">
        <h2 className="pageHeading">Income</h2>
        <button className="btn" onClick={() => setOpenModal(true)}>
          Add
        </button>
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

export default Income;
