import React, { useEffect } from "react";
import { Col, Row, Container } from "../Grid";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import "./styles.css";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const getProducts = () => {
    dispatch({ type: LOADING });
    API.getProducts().then(results => {
      console.log(results)
      dispatch({
        type: UPDATE_PRODUCTS,
        products: results.data
      })

    })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getProducts();
    console.log("PRODUCTS: ", state);
  }, []);

  return (
    <div>
      <h5 className="titleHeader">Products:</h5>
      {state.products.length ? (
        <Container fluid>
          <Row>
            {state.products.map((product, i) =>  (
              <Col size="md-3" key={i + "-products"}>
                <ProductItem
                  sku={product.sku}
                  thumbnailImage={product.largeImage}
                  name={product.name}
                  shortDescription={product.shortDescription}
                  salePrice={product.salePrice}
                />
              </Col>
            ) )}
          </Row>
        </Container>
      ) : (
          <h3>You haven't added any products yet!</h3>
        )}
      <div className="mt-5">
      </div>
    </div>
  );
}

export default ProductList;
