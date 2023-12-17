import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const SearchAuthor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorList, setAuthorList] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchIndex, setSearchIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownClosedDueToSelection = useRef(false);

  useEffect(() => {
    const searchAuthor = async () => {
      try {
        if (searchQuery === "") {
          setAuthorList([]);
          setShowDropdown(false);
          return;
        }

        const authorsCollection = collection(db, "Author");
        let tempQuery = query(
          authorsCollection,
          where("authName", ">=", searchQuery.slice(0, searchIndex + 1)),
          where("authName", "<=", searchQuery.slice(0, searchIndex + 1) + "\uf8ff")
        );

        if (!dropdownClosedDueToSelection.current) {
          const querySnapshot = await getDocs(tempQuery);

          if (querySnapshot.docs.length > 0) {
            const authors = querySnapshot.docs.map((doc) => doc.data());
            setAuthorList(authors);
            setShowDropdown(true);
          } else {
            setAuthorList([]);
            setShowDropdown(false);
          }
        } else {
          dropdownClosedDueToSelection.current = false;
        }
      } catch (error) {
        console.error("Error searching for authors:", error.message);
      }
    };

    // Call the search function when the searchQuery or searchIndex changes
    searchAuthor();
  }, [searchQuery, searchIndex]);

  const handleAuthorSelection = (author) => {
    setSelectedAuthor(author);
    setSearchQuery(author.authName);
    setAuthorList([]);
    setShowDropdown(false);
    dropdownClosedDueToSelection.current = true;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setAuthorList([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchIndex(value.length - 1);
  };

  return (
    <div className="container mx-auto p-2 relative">
      <div className="my-2 flex relative">
        <input
          type="text"
          placeholder="Search author"
          className="border p-2 rounded-md w-full focus:ring focus:border-blue-300"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {showDropdown && authorList.length > 0 && (
          <div ref={dropdownRef} className="absolute bg-white border rounded mt-5 w-full shadow-md">
            {authorList.map((author, index) => (
              <div
                key={author.authName}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleAuthorSelection(author)}
              >
                {`${index + 1}. ${author.authName}`}
              </div>
            ))}
          </div>
        )}
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            setSelectedAuthor(null);
            setSearchQuery(""); // Clear the search input
            setSearchIndex(0);
            setShowDropdown(false);
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
