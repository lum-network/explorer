import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { ApiSearch } from '../../../api';

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
        resetSearch(state) {
            return {
                ...state,
                type: null,
                data: null,
            };
        },

        setSearchResult(state, payload?: { type: string; data: string }) {
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

        setSearchText(state, searchText: string) {
            return {
                ...state,
                searchText,
            };
        },
    },
    effects: (dispatch) => ({
        async getSearch(text: string) {
            dispatch.search.resetSearch();
            dispatch.search.setSearchText(text);

            try {
                const result = await ApiSearch.search(text);

                if (result) {
                    dispatch.search.setSearchResult(result);
                } else {
                    dispatch.search.setSearchResult();
                }
            } catch (e) {}
        },
    }),
});

export default search;
