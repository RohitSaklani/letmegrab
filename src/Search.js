import { useState } from "react";

export default function Search({ products, setProducts }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    let temp = products.filter(
      (ele) =>
        ele.title.search(search) >= 0 ||
        ele.title.toLowerCase().search(search) >= 0
    );
    setProducts(temp);

    if (search === "") {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          value={search}
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}
