import React, { useEffect, useState } from "react";
import {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../api/bookService";
import "./BookList.css";

function BookList({ onLogout }) {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);

  // ===== DYNAMIC ROLE CHECK =====
  const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // roles from JWT token
      const roles = payload.roles || payload.authorities || [];
      const role = roles["roleName"];
  return role.includes("Admin");
     
    } catch (error) {
      return false;
    }
  };
  const admin = isAdmin();
  // ==============================

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateBook(editId, form);
    } else {
      await addBook(form);
    }

    resetForm();
    loadBooks();
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description,
      price: book.price,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await deleteBook(id);
      loadBooks();
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      category: "",
      description: "",
      price: "",
    });
    setEditId(null);
  };

  return (
    <div className="book-container">
      <div className="top-bar">
        <h2>📚 Online Bookstore</h2>
      </div>

      {/* ADMIN ONLY FORM */}
      {admin && (
        <form className="book-form" onSubmit={handleSubmit}>
          <h3>{editId ? "Update Book" : "Add New Book"}</h3>

          <div className="form-grid">
            <input
              placeholder="Title"
              value={form.title}
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Author"
              value={form.author}
              required
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />

            <input
              placeholder="Category"
              value={form.category}
              required
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              required
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Description"
            value={form.description}
            required
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button type="submit">
            {editId ? "Update Book" : "Add Book"}
          </button>
        </form>
      )}

      {/* BOOK GRID */}
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h4>{book.title}</h4>

            <p className="author">✍ {book.author}</p>
            <span className="category">{book.category}</span>

            <p className="description">{book.description}</p>

            <p className="price">₹ {book.price}</p>

            {admin && (
              <div className="action-btns">
                <button className="edit-btn" onClick={() => handleEdit(book)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!admin && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#64748b" }}>
          Login as <b>Admin</b> to manage books
        </p>
      )}
    </div>
  );
}

export default BookList;
