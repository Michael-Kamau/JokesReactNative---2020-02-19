import {FETCH_JOKES, ADD_JOKE, DELETE_JOKE, TOGGLE_FILTER, GET_COUNT, FETCH_CATEGORIES} from './types';
import {uuid} from 'uuidv4';


export const fetchJokes = (explicitStatus) => dispatch => {
    let link = '';
    if (explicitStatus === true) {
        link = 'http://api.icndb.com/jokes/random/5';
    } else {
        link = 'https://api.icndb.com/jokes/random/5/?exclude=[explicit]';
    }
    fetch(link)
        .then(res => res.json())
        .then(jokes => dispatch({
            type: FETCH_JOKES,
            payload: jokes.value,
        }));
};

export const fetchCategories = () => dispatch => {
    console.log('fetching');
    fetch('https://api.chucknorris.io/jokes/categories')
        .then(res => res.json())
        .then(categories => dispatch({
            type: FETCH_CATEGORIES,
            payload: categories,
        }));
};

export const getJokesCount = () => dispatch => {
    console.log('fetching');
    fetch('http://api.icndb.com/jokes/count')
        .then(res => res.json())
        .then(jokes => dispatch({
            type: GET_COUNT,
            payload: jokes.value,
        }));
};


export const addJoke = (todoData) => dispatch => {
    const data = {
        id: Math.random(),
        title: todoData,
        completed: false,

    };
    dispatch(
        {
            type: ADD_JOKE,
            payload: data,
        },
    );
};

export const deleteJoke = (index) => dispatch => {
    dispatch(
        {
            type: DELETE_JOKE,
            payload: index,
        },
    );

};


export const toggleFilter = (index) => dispatch => {
    dispatch(
        {
            type: TOGGLE_FILTER,
            payload: index,
        },
    );
};
