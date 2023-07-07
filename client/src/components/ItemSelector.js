import React, { useState, useEffect } from "react";

export const ItemSelector = () => {
  const [product, setProduct] = useState("");
  const [savedId, setSavedId] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://b0aa-182-48-213-9.in.ngrok.io");
      const products = await response.json();
      const title = products[0];
      console.log("Fetched Data: ", products);
      setProduct(title);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const saveProduct = async () => {
    const payload = { product };
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      setSavedId(data["message"]);
    } catch (error) {
      console.log("Error saving product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <button onClick={saveProduct}>{product}</button>
      <br></br>
      {savedId}
    </>
  );
};
