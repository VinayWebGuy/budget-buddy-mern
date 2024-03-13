import React, { useState, useEffect } from "react";
import "./Budget.scss";
import Modal from "../../components/Modal/Modal";

const Budget = () => {
  const [openModal, setOpenModal] = useState(false);
  const [consumedWidth, setConsumedWidth] = useState(0);

  const closeModal = () => {
    setOpenModal(false);
  };

  const totalBudget = 31000;
  const consumedBudget = 21000;

  useEffect(() => {
    // Calculate the consumed budget percentage
    const consumedPercentage = (consumedBudget / totalBudget) * 100;
    setConsumedWidth(consumedPercentage);
  }, [totalBudget, consumedBudget]);

  return (
    <div className="budget box">
      <div className="table-header">
        <h2 className="pageHeading">Budget</h2>
        <button className="btn" onClick={() => setOpenModal(true)}>
          Manage Budget
        </button>
      </div>
      <div className="budget-bar">
        <div className="overall-budget">
          <div
            className="consumed-budget"
            style={{ width: `${consumedWidth}%` }}
          ></div>
        </div>
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
