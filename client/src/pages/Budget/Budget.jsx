import React, { useState } from "react";
import "./Budget.scss";
import Modal from "../../components/Modal/Modal";

const Budget = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="budget box">
      <div className="table-header">
        <h2 className="pageHeading">Budget</h2>
        <button className="btn" onClick={() => setOpenModal(true)}>
          Manage Budget
        </button>
      </div>

      {openModal && (
        <Modal
          heading="Manage Budget"
          inputs={[
            {
              name: "amount",
              title: "Amount",
              id: "amount",
              type: "text",
            },
          ]}
          buttonText="Update"
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Budget;
