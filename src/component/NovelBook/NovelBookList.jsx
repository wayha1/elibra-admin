import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const NovelBookList = () => {
  const [bacData, setBacData] = useState([]);
  const [NovelBook, setNovelBook] = useState([]);

  useEffect(() => {
    const getBacData = async () => {
      try {
        const contain = collection(db, "Books");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
        setBacData(data);
        console.log(data);
        const bookDataPromises = data.map(async (elem) => {
          try {
            const BookPop = collection(db, `Books/${elem.id}/Novel`);
            const DataBooks = await getDocs(BookPop);
            const BookData = DataBooks.docs.map((bookDoc) => ({
              ...bookDoc.data(),
              id: bookDoc.id,
            }));
            return BookData;
          } catch (error) {
            console.error(`Error fetching book data for ${elem.id}:`, error);
            return null;
          }
        });

        const bookData = (await Promise.all(bookDataPromises)).flatMap((data) => data || []);
        setNovelBook(bookData);
        console.log(bookData);
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBacData();
  }, []);
  return (
    <section>
      <div className="container w-auto">
        {NovelBook.map((item, index) => (
          <div key={index} className="flex items-center mb-4 p-4 bg-white rounded-lg ">
            <img src={item.img} alt={`Novel-${index}`} className="w-40 h-50" />
            <div className="flex ml-4 w-full">
              <div className="text-lg font-bold">
                <h3 className="">{item.title}</h3>
                <p className="">{item.price}</p>
              </div>
              <div className="ml-auto flex">
            <button
              className="mr-2 bg-red-500 text-white active:bg-blue-500 p-2 rounded"
              onClick={() => handleDelete(author.id, author.imgAuth)}
            >
              Delete
            </button>
            <button className="bg-green-500 text-white p-2 active:bg-blue-500 rounded" onClick={() => {}}>
              Update
            </button>
          </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
