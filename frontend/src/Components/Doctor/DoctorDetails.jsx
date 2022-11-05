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
              <div className="caro">
               
                    <img
                      className="CarouselImage"
                      src={doctor.avatar}
                      alt={doctor.name}
                    />
                
              </div>
            </div>
            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{doctor.name}</h2>
              </div>
              
              <div className="detailsBlock">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>{`${doctor.degree}`}</h1>
                 
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>{`${doctor.university}`}</h1>
                 
                </div>
                <div>
                <table className="produttable">
                         <tbody className="tbody">
                         <tr className="trow">
                            <td className="tdb">Registration No</td>
                            <td className="tdb">{doctor.registration}</td>
                           </tr>
                           <tr className="trow">
                            <td className="tdb">Location</td>
                            <td className="tdb">{doctor.location}</td>
                           </tr>
                           <tr className="trow">
                            <td className="tdb">Email</td>
                            <td className="tdb">{doctor.email}</td>
                           </tr>
                           <tr className="trow">
                            <td className="tdb">Nationality</td>
                            <td className="tdb">{doctor.nationality}</td>
                           </tr>
                           <tr className="trow">
                            <td className="tdb">Religion</td>
                            <td className="tdb">{doctor.religion}</td>
                           </tr>
                           
                          
                         </tbody>
                    </table>
                </div>
               
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                
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
                      className="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
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