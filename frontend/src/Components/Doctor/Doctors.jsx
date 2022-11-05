import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import DoctorCard from "./DoctorCard.jsx";
import { clearErrors, getDoctor } from "../../actions/DoctorAction";
import Pagination from "react-js-pagination";
import "../Products/Products.css"
import Typography from"@material-ui/core/Typography"
import MetaData from "../../more/Metadata";
import { useParams } from "react-router-dom";
import Bounce from 'react-reveal/Bounce';



const categories = [
  "Dhaka",
  "Rangpur",
  "Barisal",
  "Rajshahi",
  "Khulna",
  "Chittagong",
  "Mymansingh",
  
]

const Doctors = ( ) => {
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const {
    doctors,
    loading,
    error,
    doctorsCount,
    resultPerPage,
  } = useSelector((state) => state.doctors);

  const { keyword} =useParams();
  

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
      if(error){
          alert(error);
          dispatch(clearErrors())
      }
    dispatch(getDoctor( keyword ,currentPage,category));
  }, [dispatch,keyword ,currentPage,category,error]); 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Doctors" />
        
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
            Doctors
          </h2>
           
            <div className="sidebar__product" style={{
                display:"flex",
                flex:1,
            }}>
                <Bounce right>
                <div className="sidebar__products" style={{
                  border: "1px solid #999",
                  margin:"1vmax",
                  flex:".177"
              }}>
                  <Typography style={{fontSize:"1.2vmax",padding:"5px"}}>CHOOSE LOCATION</Typography>
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
                
              </div>
                </Bounce>
            <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {doctors &&
               doctors.map((doctor) => (
                <Bounce left>
                 <DoctorCard key={doctor.id} doctor={doctor} />
                 </Bounce>
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
                  totalItemsCount={doctorsCount}
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

export default Doctors;