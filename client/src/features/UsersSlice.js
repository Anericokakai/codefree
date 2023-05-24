import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  token: "",
  refreshToken:"",
  admin:false,
};

const userslice = createSlice({
  name: "userloged",
  initialState,
  reducers: {
    userdetails: (state, action) => {
      state.token = action.payload;
      console.log(action.payload);
    },
    username:(state,action)=>{
        state.userName=action.payload
        console.log(action.payload)
    },
    refreshtoken:(state,action)=>{
      state.refreshToken=action.payload
    },
    logInadmin:(state,action)=>{
      state.admin=true
    },
    Logout:(state)=>{
      state.userName=''
      state.token=''
      state.refreshToken=''
      state.admin=false
    }
  },
});
export default userslice.reducer;
export const { userdetails,username,Logout ,refreshtoken,logInadmin} = userslice.actions;
