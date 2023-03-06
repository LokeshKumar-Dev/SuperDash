import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

import { createCategory } from "./../../Redux/Actions/ProductActions";
import * as filestack from 'filestack-js';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const client = filestack.init('AFmaRKROkSWypbC3kty3Az');

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;

  useEffect(() => {
    if (category) {
      toast.success("Product Added", ToastObjects);
      setName("");
      setDescription("");
      setImage("");
    }
  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    client.upload(image)
      .then(data => {
        dispatch(createCategory({ id, name, image: data.url, description }));
      });
  };

  return (
    <div className="col-md-12 col-lg-4">
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            ID
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3" onClick={submitHandler}>Create category</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
