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
      <div className="header">
        <h1 className="text-4xl px-10 uppercase font-bold flex lg:py-3 hover:text-cyan-800 rounded-xl">
          Novel
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {NovelBook.map((item, index) => (
          <div key={index}>
            <img src={item.img} alt={`Novel-${index}`} className="mt-5 pl-2 w-40 h-auto ml-3" />
            <div className="">
              <h3 className="text-xl font-bold mb-2 ml-10">{item.title}</h3>
              <p className="text-sm mb-2 ml-10">{item.price}</p>
            </div>
            {/* Add your other Bacll-related content here */}
          </div>
        ))}
      </div>
    </section>
  );
};
