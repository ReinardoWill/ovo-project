import { createSlice } from '@reduxjs/toolkit';

export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    initGames: [],
    selectedGames:[],
    accToken:[]
  },
  reducers: {
    setInitGames: (state, action) => {
        state.initGames = action.payload;
    },
    setSelectedGames: (state, action) => {
        state.selectedGames = action.payload;
    },
    setAccToken : (state, action) => {
        state.accToken = action.payload;
    },
  },
});

export const { setInitGames,setSelectedGames,setAccToken } = gamesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const initGamesAsync = games => dispatch => {
  dispatch(setInitGames(games));
};
export const selectedGamesAsync = games => dispatch => {
  dispatch(setSelectedGames(games));
};




export default gamesSlice.reducer;
