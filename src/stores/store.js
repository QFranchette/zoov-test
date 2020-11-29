import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bikes: []
  },
  mutations: {
    majBikes (state, bikes) {
        state.bikes = bikes;
    },
    addBike (state, newBike) {
        state.bikes.push(newBike);
    },
    removeBike (state, oldBike) {
        if(oldBike) 
            state.bikes.splice(state.bikes.indexOf(oldBike),1);
    }
  }
});

export default store;
