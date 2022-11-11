import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getDoctorDetails } from '../../actions/DoctorAction';
import {addDoctorAppoin} from '../../actions/AppointmentAction';
import MetaData from '../../more/Metadata';
import Footer from '../Footer/Footer';
import "../Products/ProductDetails.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';

const DoctorDetails = () => {
    // const navigate = useNavigate();
    const dispatch =useDispatch();
    const { doctor, error } = useSelector(
        (state) => state.doctorDetails
      );



  const {id} =useParams();
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }

        dispatch(getDoctorDetails(id));
      }, [dispatch,id,error]);

      const addToDoctorHandler = () => {
       
          dispatch(addDoctorAppoin(id));
          toast.success("Get Doctor Appointment ");
       
      };

    return (
      <>
       <MetaData title={`${doctor.name}`} /> 
         
       <div className="ProductDetails">
            <div className="first__varse">
            <Zoom Zoom top >
            <div className="caro">
               
               <img
                 className="CarouselImage"
                 src={doctor.avatar}
                 alt={doctor.name}
               />
           
         </div>
            </Zoom>
            </div>
            <div className="varse__2">
             <Roll right>
             <div className="detailsBlock-1">
                <h2>{doctor.name}</h2>
              </div>
             </Roll>
              
              <div className="detailsBlock">
                <Roll left>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>{`${doctor.degree}`}</h1>
                 
                </div>
                </Roll>
               <Roll right>
               <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>{`${doctor.university}`}</h1>
                
                 
                </div>
               </Roll>
                <Roll left>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>Specilized : {`${doctor.category}`}</h1>
                
                 
                </div>
                </Roll>
              
               <div>
                <table className="produttable">
                         <tbody className="tbody">
                           <Roll left cascade>
                           <tr className="trow">
                            <td className="tdb">Registration No</td>
                            <td className="tdb">{doctor.registration}</td>
                           </tr>
                           </Roll>
                           <Roll right cascade>
                           <tr className="trow">
                            <td className="tdb">Location</td>
                            <td className="tdb">{doctor.location}</td>
                           </tr>
                           </Roll>
                           <Roll left cascade>
                           <tr className="trow">
                            <td className="tdb">Email</td>
                            <td className="tdb">{doctor.email}</td>
                           </tr>
                           </Roll>
                           < Roll right cascade>
                           <tr className="trow">
                            <td className="tdb">Nationality</td>
                            <td className="tdb">{doctor.nationality}</td>
                           </tr>
                           </Roll>
                          <Roll left cascade>
                          <tr className="trow">
                            <td className="tdb">Religion</td>
                            <td className="tdb">{doctor.religion}</td>
                           </tr>
                          </Roll>
                           
                          
                         </tbody>
                    </table>
                </div>
               
               
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                
                <Zoom bottom>
                <div
                    className="pointer flex"
                    style={{
                      padding: "10px 5px",
                      alignItems: "center",
                      backgroundColor: "#E4EAEC",
                    }}
                    onClick={addToDoctorHandler}
                   
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <button
                      className="cartBtn"
                      style={{
                        opacity: 0.7,
                        padding: "0px 5px",
                        border: "none",
                        cursor: "pointer",
                        background: "none",
                      }}
                    >
                      Get Appointment
                    </button>
                  </div>
                </Zoom>
                </div>
              </div>
            </div>
          </div>
          
          
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Footer />

      </>  
    )
};

export default DoctorDetails; 