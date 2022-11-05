import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import MedicineCard from "./MedicineCard.jsx";
import { clearErrors, getMedicine } from "../../actions/MedicineAction";
import Pagination from "react-js-pagination";
import "./Medicines.css"
import Typography from"@material-ui/core/Typography"
import MetaData from "../../more/Metadata";
import { useParams } from "react-router-dom";


const categories = [
  "Feed Mix",
  "Cow Food",
  "Buffalo Food",
  "Goat Food",
  "Horse Food",
  "Cat Food",
  "Dog Food",
  "Fish Food",
  "Chicken Food",
]

const Medicines = ( ) => {
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const {
    medicines,
    loading,
    error,
    medicinesCount,
    resultPerPage,
  } = useSelector((state) => state.medicines);

  const { keyword} =useParams();
  

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
      if(error){
          alert(error);
          dispatch(clearErrors())
      }
    dispatch(getMedicine( keyword ,currentPage,category));
  }, [dispatch,keyword ,currentPage,category,error]); 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Medicines" />
        
          <div>
           
            <h2
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(21,21,21,0.5)",
              width: "20vmax",
              fontSize: "1.4vmax",
              fontFamily: "Poppins,sans-serif",
              margin: "3vmax auto",
              color: "rgb(0, 0, 0, 0.7)",
            }}
          >
            Featured Medicines
          </h2>
           
            <div className="sidebar__product" style={{
                display:"flex",
                flex:1,
            }}>
                <div className="sidebar__products" style={{
                  border: "1px solid #999",
                  margin:"1vmax",
                  flex:".177"
              }}>
                  <Typography style={{fontSize:"1.2vmax",padding:"5px"}}>CHOOSE CATEGORIES</Typography>
                  <ul className="categoryBox">
                      {categories.map((category) =>(
                          <li
                          className="category-link"
                          key={category}
                          onClick={() =>setCategory(category)}
                          type="checkbox">
                          {category}
                          </li> 
                      ))}
                  </ul>
                  <Typography style={{fontSize:"1.2vmax",padding:"5px"}}>QUICK LINKS</Typography>
                  <li className="category-link">
                      My Carts
                  </li>
                  <li className="category-link">
                      Favourites Items
                  </li>
                  <li className="category-link">
                      Go to Checkout
                  </li>
              </div>

             
              
             <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {medicines &&
               medicines.map((medicine) => (
                 <MedicineCard key={medicine.id} medicine={medicine} />
               ))}
           </div>
              
             
             </div>
           
              <div
                className="pagination__box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "6vmax",
                }}
              >
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={medicinesCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
              
          </div>
          <Footer />
          
        </>
      )}
    </>
  );
};

export default Medicines;