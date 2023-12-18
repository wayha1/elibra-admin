import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const SearchAuthor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorList, setAuthorList] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    const searchAuthor = async () => {
      try {
        if (searchQuery === "") {
          setAuthorList([]);
          return;
        }

        const authorsCollection = collection(db, "Author");
        const tempQuery = query(
          authorsCollection,
          where("authName", ">=", searchQuery),
          where("authName", "<=", searchQuery + "\uf8ff"),
          orderBy("authName")
        );

        const querySnapshot = await getDocs(tempQuery);

        if (querySnapshot.docs.length > 0) {
          const authors = querySnapshot.docs.map((doc) => doc.data());
          setAuthorList(authors);
        } else {
          setAuthorList([]);
        }
      } catch (error) {
        console.error("Error searching for authors:", error.message);
      }
    };

    // Call the search function when the searchQuery changes
    searchAuthor();
  }, [searchQuery]);

  const handleAuthorSelection = (author) => {
    setSelectedAuthor(author);
    setSearchQuery(author.authName);
  };
  const handleSearch = async () => {
    try {
      if (searchQuery === "") {
        setAuthorList([]);
        return;
      }
  
      const authorsCollection = collection(db, "Author");
      const tempQuery = query(
        authorsCollection,
        where("authName", ">=", searchQuery),
        where("authName", "<=", searchQuery + "\uf8ff"),
        orderBy("authName")
      );
  
      const querySnapshot = await getDocs(tempQuery);
  
      if (querySnapshot.docs.length > 0) {
        const authors = querySnapshot.docs.map((doc) => doc.data());
        setAuthorList(authors);
      } else {
        setAuthorList([]);
      }
    } catch (error) {
      console.error("Error searching for authors:", error.message);
    }
  };
  return (
    <div className="container mx-auto p-2 relative">
      <div className="my-2 flex relative">
        <input
          type="text"
          placeholder="Search author"
          className="border p-2 rounded-md w-full focus:ring focus:border-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleSearch}>
          Search
        </button>
        {authorList.length > 0 && (
          <div className="absolute bg-white border rounded mt-5 w-full shadow-md">
            {authorList.map((author) => (
              <div
                key={author.authName}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleAuthorSelection(author)}
              >
                {author.authName}
              </div>
            ))}
          </div>
        )}
        <button
          className="ml-2 bg-red-500 text-white p-2 rounded"
          onClick={() => {
            setSelectedAuthor(null);
            setSearchQuery("");
          }}
        >
          Clear
        </button>
      </div>

      {selectedAuthor ? (
        <div className="border p-2 mt-2 bg-white rounded-lg flex items-center">
          <img
            src={selectedAuthor.imgAuth}
            alt={selectedAuthor.authName}
            className="w-48 h-40 object-cover mb-2 rounded"
          />
          <div className="ml-4">
            <p className="text-lg font-bold">{selectedAuthor.authName}</p>
            <p className="text-sm">{selectedAuthor.Gender}</p>
            <p className="text-sm">{selectedAuthor.DOB}</p>
            {/* Add other fields as needed */}
          </div>
        </div>
      ) : (
        <p className="text-red-500"></p>
      )}
    </div>
  );
};

export default SearchAuthor;
