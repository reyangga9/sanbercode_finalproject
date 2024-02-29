import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "../utils";

export const useBookStore = defineStore("book", () => {
  const books: any = ref([]);
  const booksFiction: any = ref([]);
  const booksBiografi: any = ref([]);
  const booksByCategory: any = ref([]);
  const book: any = ref(null);

  const fetchBooks = async () => {
    const { data } = await axios.get(`${API_URL}/products`);
    books.value = data.data;
  };

  const fetchBooksBiografi = async () => {
    const { data } = await axios.get(
      `${API_URL}/products?page=1&limit=4&category=Biografi`
    );
    booksBiografi.value = data.data;
  };

  const fetchBooksFiction = async () => {
    const { data } = await axios.get(
      `${API_URL}/products?page=1&limit=4&category=Fiksi`
    );
    booksFiction.value = data.data;
  };

  const fetchBook = async (id: any) => {
    book.value = null;
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    book.value = data.data;
  };

  const fetchBooksByCategory = async (id = 1, category: any = "") => {
    const { data } = await axios.get(
      `${API_URL}/products?page=${id}%limit20&category=${category}`
    );
    booksByCategory.value = data.data;
  };

  return {
    books,
    booksBiografi,
    booksFiction,
    book,
    fetchBooks,
    fetchBooksBiografi,
    fetchBooksFiction,
    fetchBook,
    fetchBooksByCategory,
    booksByCategory,
  };
});
