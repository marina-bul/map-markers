import { createStore } from 'vuex'
import markers from './modules/markers'

export default createStore({
  modules: {
    markers,
  },
})
