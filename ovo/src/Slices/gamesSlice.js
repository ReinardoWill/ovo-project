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
        console.log(action.payload)
        state.selectedGames = action.payload;
    },
    resetSelectedGames: (state, action) => {
        state.selectedGames = [];
    },
    setInitCreators: (state, action) => {
        state.initCreators = action.payload;
    },
    setSelectedCreators: (state, action) => {
        state.selectedCreators = action.payload;
    }
  },
});

export const { setInitGames,setSelectedGames,resetSelectedGames,setInitCreators,setSelectedCreators } = gamesSlice.actions;

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
export const selectedGamesAsync = query => dispatch => {
    rawg.searchGames(query).then((data) => {
        dispatch(setSelectedGames(data));
    }).catch((err) => {
        console.log(err)
    });
};

export const initCreatorsAsync = () => dispatch => {
    rawg.initCreator().then((data) => {
        dispatch(setInitCreators(data));
    }).catch((err) => {
        console.log(err)
    });
    
};
export const setSelectedCreatorsAsync = query => dispatch => {
    rawg.searchCreator(query).then((data) => {
        dispatch(setSelectedCreators(data));
    }).catch((err) => {
        console.log(err)
    });
};




export default gamesSlice.reducer;
