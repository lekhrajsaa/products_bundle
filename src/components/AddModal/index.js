import React, { useEffect, useReducer, useState } from "react";
import "./Modal.css";
import { Modal } from "@mui/material";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { addReducer } from "../../reducer/AddReducer";

const AddModal = ({
  open,
  product,
  setOpen,
  setArr,
  arr,
  clicked,
  variant,
  setVariant,
}) => {
  const [state, dispatch] = useReducer(addReducer, {
    products: [],
    add_id: true,
  });
  const [result, setResult] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [product_fetch, setProduct] = useState(null);
  const handleInput = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      searchProduct();
    }, 800);
  };

  const searchProduct = () => {
    const url = `https://stageapibc.monkcommerce.app/admin/shop/product?search=${search}&page=${page}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAllCheck = (e, ele) => {
    {
      if (e.target.checked === true) {
        dispatch({ type: "ADD_ALL", payload: { ele, clicked } });
        for (
          let index = 0;
          index < document.getElementsByClassName("check-" + ele.id).length;
          index++
        ) {
          document.getElementsByClassName("check-" + ele.id)[
            index
          ].checked = true;
        }
      } else {
        dispatch({ type: "REMOVE_ALL", payload: { ele } });
        for (
          let index = 0;
          index < document.getElementsByClassName("check-" + ele.id).length;
          index++
        ) {
          document.getElementsByClassName("check-" + ele.id)[
            index
          ].checked = false;
        }
      }
    }
  };

  const handlecancelProduct = () => {
    dispatch({ type: "cancel" });
    setOpen(false);
  };

  const handleAddProduct = () => {
    if (state?.products.length) {
      console.log(state.products);

      let temparr = arr.filter((item) => item.add_id !== clicked.add_id);
      setArr([...temparr, ...state.products]);
      console.log(arr);
      dispatch({ type: "cancel" });
    } else {
      console.log("nothing");
    }
    setOpen(false);
  };

  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="modal">
        <div className="searchBox">
          <div className="searchHeading_container">
            <h1>search products</h1>
            <MdOutlineCancel
              className="cancel_util"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="search_container">
            <AiOutlineSearch />
            <input
              type="text"
              onChange={handleInput}
              value={search}
              placeholder="search products"
            />
          </div>
        </div>
        <div className="contentShow">
          {result?.map((ele) => {
            return (
              <div
                key={ele.id}
                onClick={() => {
                  setProduct({ id: ele.id, title: ele.title, img: ele.img });
                }}
              >
                <div className="HeadItemContainer">
                  <div className="HeadItem_first">
                    {" "}
                    <input
                      type="checkbox"
                      className="checkbox_add"
                      onChange={(e) => handleAllCheck(e, ele)}
                      style={{ backgroundColor: "green" }}
                      id={`check-${ele.id}`}
                    />
                    <img
                      src={ele?.image?.src}
                      className="head_img"
                      alt={ele.title}
                    />
                  </div>
                  <h1 className="head_title">{ele.title}</h1>
                </div>
                {ele?.variants &&
                  ele.variants.map((elem) => {
                    return (
                      <div key={elem.id} className="variant_container">
                        <div className="first_section_variant">
                          <input
                            type="checkbox"
                            className={"check-" + ele.id}
                            onChange={(e) => {
                              if (e.target.checked === true) {
                                dispatch({
                                  type: "ADD_ONE",
                                  payload: { ele, elem, clicked },
                                });

                                document.getElementById(
                                  `check-${ele.id}`
                                ).checked = true;
                              } else if (e.target.checked === false) {
                                dispatch({
                                  type: "REMOVE_ONE",
                                  payload: { ele, elem },
                                });
                                let a = state.products.findIndex(
                                  (item) => item.id === ele.id
                                );
                                console.log(a);
                                if (state.products[a].variants.length === 1) {
                                  document.getElementById(
                                    `check-${ele.id}`
                                  ).checked = false;
                                }
                              }
                            }}
                          />
                          <div>{elem.title}</div>
                        </div>
                        <div className="second_section_variant">
                          <div>{elem.inventory_quantity} available</div>
                          <div>$ {elem.price}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div className="endBox">
          <h4>{state?.products.length || "0"} products selected</h4>
          <div className="btn_container">
            <div onClick={handlecancelProduct} className="btn_cancel">
              cancel
            </div>
            <button onClick={handleAddProduct} className="btn_add">
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
