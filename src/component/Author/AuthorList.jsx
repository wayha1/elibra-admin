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
        <div key={author.id}>
          {author.authName} 
          {author.Gender}
          {author.decs}
          {author.DOB}
          <img src={author.imgAuth} />
        </div>
      ))}
    </div>
  );
};
