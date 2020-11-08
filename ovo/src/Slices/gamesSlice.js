import { createSlice } from '@reduxjs/toolkit';
import rawgService from '../Services/rawgApi';

const rawg= new rawgService();
export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    initGames: [],
    selectedGames:[],
    initCreators :[],
    selectedCreators:[],
    hasMoreGamesUrl:null,
    hasMoreCreatorsUrl:null
  },
  reducers: {
    setInitGames: (state, action) => {
        state.initGames = action.payload;
    },
    setSelectedGames: (state, action) => {
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
    },
    setHasMoreGamesUrl: (state, action) => {
        state.hasMoreGamesUrl = action.payload;
    },
    setHasMoreCreatorsUrl: (state, action) => {
        state.hasMoreCreatorsUrl = action.payload;
    },
  },
});

export const { setInitGames,setSelectedGames,resetSelectedGames,setInitCreators,setSelectedCreators,setHasMoreGamesUrl,setHasMoreCreatorsUrl } = gamesSlice.actions;

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

export const queryGamesCreatorsAsync = query => dispatch => {
    rawg.searchGamesByQuery(query).then((data) => {
        dispatch(setSelectedGames(data.data));
        dispatch(setHasMoreGamesUrl(data.hasMore));
        rawg.searchCreatorByQuery(query).then((data) => {
            dispatch(setSelectedCreators(data.data));
            dispatch(setHasMoreCreatorsUrl(data.hasMore));
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err)
    });
};




export default gamesSlice.reducer;
