import { React, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    productName: "",
    price: "",
  });
  const [productData, setProductData] = useState([]);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewproduct")
      .then((response) => {
        console.log(response);
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/addproduct", data)
      .then((response) => {
        console.log(response);
        if (response) {
          axios
            .get("http://localhost:4000/viewproduct")
            .then((response) => {
              console.log(response);
              setProductData(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    axios
      .get(`http://localhost:4000/deleteproduct/${id}`)
      .then((response) => {
        console.log(response);
        setProductData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
          <form>
            <br />
            <label>
              Name : <input name="productName" type="text" onChange={inputChange}></input>
            </label>

            <br />
            <br />
            <label>
              Price : <input name="price" type="text" onChange={inputChange}></input>
            </label>
            <br />
            <br />
            <button onClick={submit}>Submit</button>
          </form>
        </div>

        <div
          style={{
            border: "1px solid black",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            width: "60%",
            textAlign: "center",
          }}
        >
          {productData.map((item) => (
            <div style={{ border: "1px solid black" }}>
              <p>{item.productName}</p>
              <p>{item.price}</p>
              <button
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
