import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const AuthorList = () => {
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    const value = collection(db, "Author");
    const getAuthors = async () => {
      const authVal = await getDocs(value);
      setAuthorList(authVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(authVal);
    };
    getAuthors();
  }, []);

  return (
    <div className="container w-auto">
      {authorList.map((author) => (
        <div key={author.id} className="flex items-center mb-4 p-4 bg-white rounded-lg">
          <div className="">
            <img src={author.imgAuth} alt={author.authName} className="w-40 h-50" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-bold">{author.authName}</p>
            <p>{author.Gender}</p>
            <p>{author.decs}</p>
            <p>{author.DOB}</p>
          </div>
          <div className="ml-auto flex">
            <button className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded">Delete</button>
            <button className="bg-green-500 text-white p-2 active:bg-blue-500 rounded">Update</button>
          </div>
        </div>
      ))}
    </div>
  );
};
