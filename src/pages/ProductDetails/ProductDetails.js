import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import Comment from "../../components/Comment/Comment";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [commentList, setCommentList] = useState([]);
  console.log(commentList);
  const inputRef = useRef();
  const pushDB = async (value) => {
    try {
      const docRef = await addDoc(collection(db, "comment"), {
        product: location.state.item.productName,
        name: "Người dùng ẩn danh",
        comment: value,
        time: serverTimestamp(),
      });
      getData();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const getData = async () => {
    const commentCol = collection(db, "comment");
    const commentQuery = query(
      commentCol,
      where("product", "==", location.state.item.productName),
      orderBy("time", "desc")
    );
    const commentSnapshot = await getDocs(commentQuery);
    const commentList = commentSnapshot.docs.map((doc) => doc.data());
    setCommentList(commentList);
    return commentList;
  };
  const handleSubmit = () => {
    let value = inputRef.current.value;
    inputRef.current.value = "";
    pushDB(value);
  };
  useEffect(() => {
    setProductInfo(location.state.item);
    console.log(location.state.item.productName);
    setPrevLocation(location.pathname);
    getData();
  }, [location, productInfo]);
  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs
            title=""
            prevLocation={prevLocation}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <h3 className="text-center text-[24px] font-[600]">
          Đánh giá sản phẩm
        </h3>

        <div className="flex justify-end items-center bg-gray-100 py-[10px] px-[20px]">
          <div className="flex items-center min-w-[560px] justify-between   bg-white   px-[18px] py-[10px] rounded-md">
            <div className="flex flex-1">
              <img
                src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-1/153228756_422142489066403_163080274611275956_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGDOhEmcnPknLW3fC0OVPoIcoxI237tcPFyjEjbfu1w8UssIwBgu7tnl1BH8gOlPGdAuirNjTJg9BQBpKTaOoha&_nc_ohc=UTzhznKUMLQQ7kNvgFWYRHX&_nc_ht=scontent.fdad3-5.fna&_nc_gid=AHnkHD1zo_0kfruL0RsIlRl&oh=00_AYCh4NLhei7aTXuZW7cueOdg4xjqTm_b9yMCTLbkj7Z2IA&oe=67301419"
                className="rounded-full h-[40px] w-[40px]"
              />
              <div className="ml-[10px] flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-black ">Người dùng ẩn danh</h3>
                </div>
                <input
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  ref={inputRef}
                  placeholder="Để lại bình luận của bạn."
                  className="bg-gray-100 w-full rounded-md px-[4px] py-[2px]"
                  type="text"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="hover:opacity-60 ml-[10px] bg-gray-100 px-[14px] py-[4px] rounded-md"
            >
              Đăng
            </button>
          </div>
        </div>
        <div className="bg-gray-100 pb-[10px] h-[300px] overflow-auto">
          {commentList.map((obj) => {
            const date = obj.time.toDate();
            return (
              <Comment
                content={obj.comment}
                name={obj.name}
                timestamp={date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
