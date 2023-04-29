import { useEffect, useState, useReducer } from "react";
import View from "./View";
import Update from "./Update";
import Search from "./Search";
import Sort from "./Sort";

function App() {
  const [products, setProducts] = useState([]);

  const [state, dispatch] = useReducer(reducer, {
    id: null,
    view: false,
    update: false,
  });
  function reducer(state, action) {
    if (action.type === "VIEW") {
      return { id: action.id, view: true, update: false, item: action.item };
    } else if (action.type === "UPDATE") {
      return { id: action.id, view: false, update: true, item: action.item };
    } else if (action.type === "CANCEL") {
      return { view: false, update: false };
    }
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="App">
      <div className="header">
        <Search products={products} setProducts={setProducts} />
        <Sort products={products} setProducts={setProducts} />
      </div>
      <table>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
        <tbody>
          {products.map((ele, index) => (
            <tr key={ele.id}>
              <td>{ele.title}</td>
              <td>{ele.price}</td>
              <td>{ele.description}</td>
              <td>{ele.category}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "VIEW", id: ele.id, item: ele })
                  }
                >
                  view
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "UPDATE", id: ele.id, item: ele })
                  }
                >
                  update
                </button>
              </td>
              <td>
                <button onClick={() => deleteProduct(ele)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopUp()}
    </div>
  );

  function showPopUp() {
    if (state.view) {
      return (
        <div className="pop-up">
          <View id={state.id} dispatch={dispatch} product={state.item} />
        </div>
      );
    } else if (state.update) {
      return (
        <div className="pop-up">
          <Update
            id={state.id}
            product={state.item}
            dispatch={dispatch}
            products={products}
            setProducts={setProducts}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  function deleteProduct(item) {
    let p = products.filter((ele) => ele.id !== item.id);

    setProducts(p);
    alert("DELETING  : " + JSON.stringify(item));
  }
}

export default App;
