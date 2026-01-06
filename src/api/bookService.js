import api from "./axiosConfig";

export const getAllBooks = async () => {
  const response = await api.get("/book/getallbooks");
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/book/getbookbyid${id}`);
  return response.data;
};

// Add a new book
export const addBook = async (book) => {
  const response = await api.post("/book/addbook",book);
  return response.data;
};

// Update an existing book
export const updateBook = async (id, book) => {
  const response = await api.put("book/updatebook",book);
  return response.data;
};

// Delete a book
export const deleteBook = async (id) => {
   const response = await api.delete(`/book/deletebook/${id}`);
  return response.data;
};