import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const SearchBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookData, setBookData] = useState(null);

  const handleSearch = async () => {
    try {
      const booksCollection = collection(db, "Books", "All_Genre", "KhmerBook");
      const q = query(booksCollection, where("title", "==", searchQuery));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 1) {
        const book = querySnapshot.docs[0].data();
        setBookData(book);
      } else {
        // Reset bookData if no or multiple books found
        setBookData(null);
      }
    } catch (error) {
      console.error("Error searching for book:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className="my-2 flex">
        <input
          type="text"
          placeholder="Search book"
          className="border p-2 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleSearch}>
          Search
        </button>
      </div>

      {bookData ? (
        <div className="border p-2 mt-2 bg-white rounded-lg flex items-center">
          <img src={bookData.img} alt={bookData.title} className="w-48 h-40 object-cover mb-2 rounded" />
          <div className="ml-4">
            <p className="text-lg font-bold">{bookData.title}</p>
            <p className="text-sm">{bookData.price}</p>
            <p className="text-sm">{bookData.date}</p>
            {/* Add other fields as needed */}
          </div>
        </div>
      ) : (
        <p className="text-red-500"></p>
      )}
    </div>
  );
};

export default SearchBook;
