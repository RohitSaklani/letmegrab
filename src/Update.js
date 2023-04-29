import { useEffect, useState } from "react";

export default function Update({
  id,
  dispatch,
  product,
  products,
  setProducts,
}) {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCat(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const temp = e.target;

    let p = products;

    let i = p.findIndex((ele) => ele.id === id);

    p[i] = {
      ...p[i],
      title: temp.title.value ? temp.title.value : product.title,
      category: temp.category.value,
      description: temp.description.value
        ? temp.description.value
        : product.description,
      price: temp.price.value ? temp.price.value : product.price,
      rating: {
        ...p[i].rating,
        rate: temp.rating.value ? temp.rating.value : product.rating.rate,
      },
    };

    setProducts(p);
    alert("UPDATING : " + JSON.stringify(p[i]));
  }

  return (
    <div className="update">
      <button
        className="cancel-btn"
        onClick={() => dispatch({ type: "CANCEL" })}
      >
        &#10006;
      </button>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder={product.title}></input>
        <select name="category" placeholder={product.category}>
          {cat.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <input name="description" placeholder={product.description}></input>
        <input name="price" placeholder={product.price}></input>

        <input name="rating" placeholder={product.rating?.rate}></input>
        <button>update</button>
      </form>
    </div>
  );
}
