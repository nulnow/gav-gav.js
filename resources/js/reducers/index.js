import {ADD_ARTICLE} from '../constants/action-types';

const initialState = {
    articles: [
        {
            title: 'first article'
        }
    ]
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return {
            ...state,
            articles: [
                ...state.articles,
                action.payload
            ]
        }
    }
    return state;
};

export default rootReducer;