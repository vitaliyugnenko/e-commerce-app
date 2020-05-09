import React, { Component } from "react";

export default class Card extends Component {
  componentDidMount() {
    const { GetTops } = this.props;

    GetTops();
  }

  render() {
    let {
      Goods,
      user,
      loading,
      mix,
      addToCart,
      purchase_button,
      processing_card,
    } = this.props;

    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }

    if (mix) Goods.sort(compareRandom);

    let cards = loading ? (
      <div className='loader'></div>
    ) : user ? (
      <div className='cards'>
        {Goods.map((product) => (
          <div className='card' key={product._id} data-id={product._id}>
            <img src={product.img} alt='' />
            <div className='info'>
              <h1 className='title'>
                {product.brand} {product.model}
              </h1>
              <div className='desc'>
                <div>
                  <br />
                  <p>
                    Display: {product.display_type} {product.display_size}{" "}
                    {product.display_res}
                  </p>
                  <p>CPU: {product.cpu}</p>
                  <p>RAM: {product.ram}</p>
                  <p>RAM: {product.rom}</p>
                  <p>BATTERY: {product.battery}</p>
                </div>
                <div>
                  <h3 style={{ display: "inline-block", marginRight: "5%" }}>
                    Price:{" "}
                  </h3>
                  <h3
                    style={{ display: "inline-block" }}
                  >{`$${product.price}`}</h3>
                </div>
              </div>
            </div>
            {!purchase_button && processing_card.id === product._id ? (
              <button className={`button inactive-card`}>Added</button>
            ) : (
              <button
                className='button'
                onClick={() => addToCart({ id: product._id })}
              >
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className='cards'>
        {Goods.map((product) => (
          <div className='card' key={product._id}>
            <img src={product.img} alt='' />
            <div className='info'>
              <h1 className='title'>
                {product.brand} {product.model}
              </h1>
              <div className='desc'>
                <div>
                  <br />
                  <p>
                    Display: {product.display_type} {product.display_size}{" "}
                    {product.display_res}
                  </p>
                  <p>CPU: {product.cpu}</p>
                  <p>RAM: {product.ram}</p>
                  <p>RAM: {product.rom}</p>
                  <p>BATTERY: {product.battery}</p>
                </div>
                <div>
                  <h3 style={{ display: "inline-block", marginRight: "5%" }}>
                    Price:{" "}
                  </h3>
                  <h3
                    style={{ display: "inline-block" }}
                  >{`$${product.price}`}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    return <>{cards}</>;
  }
}
