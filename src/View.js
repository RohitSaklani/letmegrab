export default function View({ id, dispatch, product }) {
  return (
    <div className="view">
      <button
        className="cancel-btn"
        onClick={() => dispatch({ type: "CANCEL" })}
      >
        &#10006;
      </button>
      <div className="product-img">
        <img src={product?.image} alt="img"></img>
      </div>
      <div className="product-detail">
        <h2 className="product-title">{product?.title}</h2>
        <p className="product-cat">{product?.category}</p>
        <p className="product-desc">{product?.description}</p>
        <h3 className="product-price">&#8377; {product?.price}</h3>
        <p className="product-rating"> {product?.rating?.rate}</p>
      </div>
    </div>
  );
}
