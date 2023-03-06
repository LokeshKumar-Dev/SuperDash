import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoriesTable = () => {

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {
            categories?.map((category) => {
              return (
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </td>
                  <td>{category.id}</td>
                  <td>
                    <b>{category.name}</b>
                  </td>
                  <td>{category.description}</td>
                  <td className="text-end">
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        className="btn btn-light"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </Link>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="#">
                          Edit info
                        </Link>
                        <Link className="dropdown-item text-danger" to="#">
                          Delete
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
