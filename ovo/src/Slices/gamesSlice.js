import { createSlice } from '@reduxjs/toolkit';
import rawgService from '../Services/rawgApi'

const rawg= new rawgService();
export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    initGames: [],
    selectedGames:[],
    initCreators :[],
    selectedCreators:[],
  },
  reducers: {
    setInitGames: (state, action) => {
        state.initGames = action.payload;
    },
    setSelectedGames: (state, action) => {
        state.selectedGames = action.payload;
    },
    setInitCreators: (state, action) => {
        state.initCreators = action.payload;
    },
    setSelectedCreators: (state, action) => {
        state.selectedCreators = action.payload;
    }
  },
});

export const { setInitGames,setSelectedGames,setInitCreators,setSelectedCreators } = gamesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const initGamesAsync = () => dispatch => {
    rawg.initGames().then((data) => {
        dispatch(setInitGames(data));
    }).catch((err) => {
        console.log(err)
    });
    
};
export const selectedGamesAsync = game => dispatch => {
    dispatch(setSelectedGames(game));
};

export const initCreatorsAsync = () => dispatch => {
    rawg.initCreator().then((data) => {
        dispatch(setInitCreators(data));
    }).catch((err) => {
        console.log(err)
    });
    
};
export const setSelectedCreatorsAsync = creator => dispatch => {
    dispatch(setSelectedCreators(creator));
};




export default gamesSlice.reducer;
