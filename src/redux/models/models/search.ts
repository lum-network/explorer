import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { ApiSearch } from 'api';

interface SearchState {
    data: string | null;
    type: string | null;
    searchText: string;
}

const search = createModel<RootModel>()({
    state: {
        data: null,
        type: null,
        searchText: '',
    } as SearchState,
    reducers: {
        RESET_SEARCH(state) {
            return {
                ...state,
                type: null,
                data: null,
            };
        },

        SET_SEARCH_RESULT(state, payload?: { type: string; data: string }) {
            if (!payload) {
                return {
                    ...state,
                    type: null,
                    data: null,
                };
            }

            const { type, data } = payload;

            return {
                ...state,
                type,
                data,
            };
        },

        SET_SEARCH_TEXT(state, searchText: string) {
            return {
                ...state,
                searchText,
            };
        },
    },
    effects: (dispatch) => ({
        async getSearch(text: string) {
            dispatch.search.RESET_SEARCH();
            dispatch.search.SET_SEARCH_TEXT(text);

            try {
                const result = await ApiSearch.search(text);

                if (result) {
                    dispatch.search.SET_SEARCH_RESULT(result);

                    return result;
                } else {
                    dispatch.search.SET_SEARCH_RESULT();
                }
            } catch (e) {}
        },
    }),
});

export default search;
