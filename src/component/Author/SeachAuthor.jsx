import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const SeachAuthor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [authorData, setAuthorData] = useState(null);

  const handleSearch = async () => {
    try {
      const authorsCollection = collection(db, 'Author');
      const q = query(authorsCollection, where('authName', '==', searchQuery));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 1) {
        const author = querySnapshot.docs[0].data();
        setAuthorData(author);
      } else {
        // Reset authorData if no or multiple authors found
        setAuthorData(null);
      }
    } catch (error) {
      console.error('Error searching for author:', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search author"
          className="border p-2 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {authorData ? (
        <div className="border p-2 mt-2 bg-white rounded-lg flex items-center">
        <img src={authorData.imgAuth} alt={authorData.authName} className="w-48 h-40 object-cover mb-2 rounded" />
        <div className="ml-4">
          <p className="text-lg font-bold">{authorData.authName}</p>
          <p className="text-sm">{authorData.Gender}</p>
          <p className="text-sm">{authorData.DOB}</p>
          {/* Add other fields as needed */}
        </div>
      </div>
      
      ) : (
        <p className="text-red-500">Author not found</p>
      )}
    </div>
  );
};

export default SeachAuthor;
