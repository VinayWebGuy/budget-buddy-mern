import React, { useEffect, useState } from "react";
import "./Category.scss";
import Modal from "../../components/Modal/Modal";
import { BASE_URL } from "../../data";
import { CSVLink } from "react-csv";
import Loading from "../../components/Loading/Loading";
import { MdDeleteOutline } from "react-icons/md";

const Category = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  // Input change
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const category = {
      name,
      status,
    };

    try {
      const response = await fetch(`${BASE_URL}/add-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error("Failed to save category");
      }

      const data = await response.json();

      console.log("Category saved successfully:", data);
      setCategory(data.category);
      setLoading(false);
      setOpenModal(false);
      setName("");
      setStatus("");
    } catch (error) {
      console.error("Error saving category:", error.message);
    }
  };

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
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching category:", error.message);
      }
    };

    fetchCategory();
  }, []);

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/delete-category/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.status}`);
      }
      setCategory((prevCategory) =>
        prevCategory.filter((category) => category._id !== id)
      );
      setLoading(false);
    } catch (error) {
      console.log("Error" + error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const filteredCategory = category.filter((cat) =>
    Object.values(cat).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="box category">
      {loading && <Loading />}
      <div className="table-header">
        <h2 className="pageHeading">Category</h2>
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
          <option value={category.length}>All</option>
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
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.status}</td>
                  <td>
                    <MdDeleteOutline
                      className="delete-icon"
                      onClick={() => deleteCategory(cat._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" align="center">
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
            { length: Math.ceil(filteredCategory.length / itemsPerPage) },
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
          heading="Add Category"
          selectOptions={[
            {
              title: "Status",
              name: "status",
              id: "status",
              initialOption: "Choose status",
              options: [
                { id: 1, name: "Active", value: 1 },
                { id: 2, name: "Inactive", value: 0 },
              ],
              onChange: handleInputChange,
              value: status,
              required: true,
            },
          ]}
          inputs={[
            {
              name: "name",
              title: "Name",
              id: "name",
              type: "text",
              value: name,
              onChange: handleInputChange,
              required: true,
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
export default Category;
