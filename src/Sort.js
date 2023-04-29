export default function Sort({ products, setProducts }) {
  function getSortedData(value) {
    fetch("https://fakestoreapi.com/products?sort=" + value)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  return (
    <div className="sort">
      <select onChange={(e) => getSortedData(e.target.value)}>
        <option></option>
        <option value="aesc">aesc</option>
        <option value="desc">desc</option>
      </select>
    </div>
  );
}
