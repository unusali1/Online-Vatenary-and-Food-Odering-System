import axios from "axios";
import { ADMIN_DOCTOR_FAIL, ADMIN_DOCTOR_REQUEST, ADMIN_DOCTOR_SUCCESS, ALL_DOCTORS_FAIL, ALL_DOCTORS_REQUEST, ALL_DOCTORS_SUCCESS, CLEAR_ERRORS, DELETE_DOCTOR_FAIL, DELETE_DOCTOR_REQUEST, DELETE_DOCTOR_SUCCESS, DOCTOR_DETAILS_FAIL, DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS } from "../constants/DoctorConstants";


export const getDoctor= (keyword="",currentPage=1,category) => async (dispatch)=>{
    try {
        dispatch({
            type: ALL_DOCTORS_REQUEST
        });
  
       let link = `/api/v2/doctors?keyword=${keyword}&page=${currentPage}`;
        
       if(category){
        link = `/api/v2/admin/doctors?keyword=${keyword}&page=${currentPage}&category=${category}`;
       }
        const {data} = await axios.get(link);
  
        dispatch({
            type:ALL_DOCTORS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:ALL_DOCTORS_FAIL,
            payload: error.response.data.message,
        })
    }
  }; 

  // Doctor Details Reducer
  export const getDoctorDetails= (id) => async (dispatch)=>{
    try {
        dispatch({ type: DOCTOR_DETAILS_REQUEST });
    
        const { data } = await axios.get(`/api/v2/doctor/${id}`);
    
        dispatch({
          type: DOCTOR_DETAILS_SUCCESS,
          payload: data.doctor,
        });
      } catch (error) {
        dispatch({
          type: DOCTOR_DETAILS_FAIL,
          payload: error.response.message,
        });
      }
    };

    // Get Admin Products -----Admin
  export const getAdminDoctor = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_DOCTOR_REQUEST });
  
      const { data } = await axios.get("/api/v2/admin/doctors");
  
      dispatch({
        type: ADMIN_DOCTOR_SUCCESS,
        payload: data.doctors,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_DOCTOR_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  
  // Delete Product ------Admin
export const deleteDoctor = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DOCTOR_REQUEST });

    const { data } = await axios.delete(`/api/v2/doctor/${id}`);

    dispatch({
      type: DELETE_DOCTOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DOCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};
  
export const clearErrors= () => async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
  }