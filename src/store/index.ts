import { createStore } from 'vuex'

export const store = createStore({
  state: () => ({
    example: 'Hello from Vuex!',
  }),
  mutations: {
    setExample (state, payload: string) {
      state.example = payload
    },
  },
})
