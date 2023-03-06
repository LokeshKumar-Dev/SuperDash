import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import * as filestack from 'filestack-js';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [load, setLoad] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(-1);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const client = filestack.init('AFmaRKROkSWypbC3kty3Az');
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setMin(0);
      setImage("");
      setPrice(0);
    }
  }, [product, dispatch]);


  const submitHandler = (e) => {
    e.preventDefault();
    const time = (hour !== 0 ? `${hour} hour ${min} min` : `${min} min`);
    setLoad(true)
    client.upload(image)
      .then(data => {
        setLoad(false)
        dispatch(createProduct({ name, price, category: value, image: data.url, time, description }));
      });
    // dispatch(createProduct({ name, price, category: value, image: 'dummy', time, description }));
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  {load && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <select value={value} onChange={handleChange} className="btn btn-light dropdown-toggle">
                      <option className="dropdown-item" value="-1" style={{ "color": "grey" }}>Select Category</option>
                      {
                        categories?.map((category) => {
                          return <option key={category.id} className="dropdown-item" value={category.id}>{category.name}</option>
                        })
                      }
                      {/* <option className="dropdown-item" value="0">Salon For women</option>
                      <option className="dropdown-item" value="1">hairservice For women</option>
                      <option className="dropdown-item" value="3">woman's therapies</option>
                      <option className="dropdown-item" value="4">Salon For men</option>//////
                      <option className="dropdown-item" value="5">men's therapies</option>
                      <option className="dropdown-item" value="6">ac appliances</option>
                      <option className="dropdown-item" value="7">home painting</option>/////
                      <option className="dropdown-item" value="8">Bathroom & Kitchen Cleaning</option>//////
                      <option className="dropdown-item" value="9">Disinfection Services</option>//////
                      <option className="dropdown-item" value="10">Full Home Cleaning</option>//////
                      <option className="dropdown-item" value="11">electricians</option>//////
                      <option className="dropdown-item" value="12">carpenters & plumbers</option> */}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="fkex" className="form-label">
                      Total Time
                    </label>
                    <br />
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="hour" className="form-label">
                        Hour:
                      </label>
                      <input
                        type="number"
                        placeholder="Hour"
                        className="form-control w-10 mx-3"
                        max="24"
                        min="0"
                        id="hour"
                        required
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                      />
                      <label htmlFor="Min" className="form-label">
                        Min:
                      </label>
                      <input
                        type="number"
                        placeholder="Min"
                        className="form-control w-10 mx-3"
                        max="60"
                        min="0"
                        id="Min"
                        required
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    /> */}
                    <input className="form-control mt-3" type="file" onChange={(e) => setImage(e.target.files[0])} required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
