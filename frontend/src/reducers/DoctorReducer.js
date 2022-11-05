import { ALL_DOCTORS_FAIL, ALL_DOCTORS_REQUEST, ALL_DOCTORS_SUCCESS, CLEAR_ERRORS, DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS, DOCTOR_DETAILS_FAIL } from "../constants/DoctorConstants";

export const doctorsReducer = (state = { doctors: [] }, action) => {
    switch (action.type) {
      case ALL_DOCTORS_REQUEST:
     
        return {
          loading: true,
          doctors: [],
        };
      case ALL_DOCTORS_SUCCESS:
        return {
          loading: false,
          doctors: action.payload.doctors,
          doctorsCount: action.payload.doctorsCount,
          resultPerPage: action.payload.resultPerPage,
          filteredDoctorsCount: action.payload.filteredDoctorsCount,
        };
    
        case ALL_DOCTORS_FAIL:
            return {
                loading: false,
                error: action.payload,
              };
    
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

// doctor detals reducer 
  export const doctorDetailsReducer = (state = { doctor: {} }, action) => {
    switch (action.type) {
      case DOCTOR_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case DOCTOR_DETAILS_SUCCESS:
        return {
          loading: false,
          doctor: action.payload,
        };
      case DOCTOR_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };