import React, { useEffect, useState } from "react";
import { getAllBooks } from "../api/bookService";
import { placeOrder } from "../api/orderService";
import "./Orders.css";

function Orders() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getAllBooks().then(setBooks);
  }, []);

  const handleQtyChange = (bookId, value) => {
    setQuantities({
      ...quantities,
      [bookId]: Number(value),
    });
  };

  const handlePlaceOrder = async () => {
    const orderItems = Object.keys(quantities)
      .filter((bookId) => quantities[bookId] > 0)
      .map((bookId) => ({
        bookId: Number(bookId),
        quantity: quantities[bookId],
      }));

    if (orderItems.length === 0) {
      alert("Please select at least one book");
      return;
    }

    const orderPayload = {
      userId: 1, // replace with logged-in user id later
      orderItems,
    };

    try {
      await placeOrder(orderPayload);
      alert("Order placed successfully ✅");
      setQuantities({});
    } catch (error) {
      console.error(error);
      alert("Failed to place order ❌");
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Place Order</h2>

      <div className="orders-list">
        {books.map((book) => (
          <div className="order-card" key={book.id}>
            <h3>{book.title}</h3>
            <p className="amount">₹ {book.price}</p>

            <input
              type="number"
              min="0"
              placeholder="Qty"
              value={quantities[book.id] || ""}
              onChange={(e) => handleQtyChange(book.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Orders;
