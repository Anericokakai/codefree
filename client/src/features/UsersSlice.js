import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  token: "",
  refreshToken:"",
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
    Logout:(state)=>{
      state.userName=''
      state.token=''
      state.refreshToken=''
    }
  },
});
export default userslice.reducer;
export const { userdetails,username,Logout ,refreshtoken} = userslice.actions;
