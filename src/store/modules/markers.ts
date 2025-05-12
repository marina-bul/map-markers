import type { Module } from 'vuex';
import { backendService } from '@/services/BackendService';
import type { Marker } from '@/types/types';

interface MarkersState {
  markers: Record<string, Marker>;
  selectedMarkerId: string | null;
}

type RootState = Record<string, unknown>;

const markers: Module<MarkersState, RootState> = {
  namespaced: true,

  state: () => ({
    markers: {},
    selectedMarkerId: null,
  }),

  mutations: {
    SET_MARKERS (state: MarkersState, markers: Record<string, Marker>) {
      state.markers = markers;
    },
    ADD_MARKER (state: MarkersState, marker: Marker) {
      state.markers[marker.id] = marker;
    },
    SET_SELECTED_MARKER (state: MarkersState, markerId: string | null) {
      state.selectedMarkerId = markerId;
    },
  },

  actions: {
    async loadMarkers ({ commit }) {
      const markers = await backendService.getMarkers();
      const markersMap = markers.reduce((acc, marker) => {
        acc[marker.id] = marker;
        return acc;
      }, {} as Record<string, Marker>);

      commit('SET_MARKERS', markersMap);
    },

    async addMarker ({ commit }, marker: Marker) {
      await backendService.saveMarker(marker);
      commit('ADD_MARKER', marker);
    },

    selectMarker ({ commit }, markerId: string) {
      commit('SET_SELECTED_MARKER', markerId);
    },
  },

  getters: {
    markersList: (state: MarkersState) => Object.values(state.markers),
    selectedMarker: (state: MarkersState) => state.selectedMarkerId ? state.markers[state.selectedMarkerId] : null,
  },
};

export default markers;
