import { FETCH_JOKES,ADD_JOKE,DELETE_JOKE,TOGGLE_FILTER,GET_COUNT,FETCH_CATEGORIES} from '../actions/types';
import {uuid} from 'uuidv4';

const initialState = {
    jokes: [],
    categories:[],
    count: 0,
    loading:false
}

//Checking the necessary actions

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_JOKES:
            console.log('FETCH_TODOs REDUCER')
            // console.log(action.payload)
            return {
                ...state,
                jokes: action.payload
            }
        case FETCH_CATEGORIES:
            console.log('FETCH_CATEGORIES REDUCER')
            // console.log(action.payload)
            return {
                ...state,
                categories: action.payload
            }
        case GET_COUNT:
            console.log('GET_COUNT REDUCER')
            console.log(action.payload)
            return {
                ...state,
                count: action.payload
            }
        case ADD_JOKE:
            // console.log('ADD_JOKE REDUCER')
            // console.log(action.payload)
            return {
                ...state,
                jokes: [action.payload,...state.jokes]
            }
        case TOGGLE_FILTER:
            console.log('TOGGLE_FILTER REDUCER')
            console.log(action.payload)
            // return state
            return{
                ...state,

                jokes:[...state.jokes.slice(0,action.payload),{...state.jokes[action.payload],completed:!state.jokes[action.payload].completed},...state.jokes.slice(action.payload+1),]
            };
        case DELETE_JOKE:
            console.log('DELETE_JOKE REDUCER')
            console.log(action.payload)
            // return state
            return{
                ...state,
                jokes:[...state.jokes.slice(0,action.payload),...state.jokes.slice(action.payload+1),]
            };


        default:
            return state;
    }
}
