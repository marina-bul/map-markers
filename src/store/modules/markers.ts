import type { Module } from 'vuex';
import { backendService } from '@/services/BackendService';
import type { Marker } from '@/types/types';
import { geocodingService } from '@/services/GeocodingService';

interface MarkersState {
  markers: Map<string, Marker>;
  selectedMarkerId: string | null;
}

type RootState = Record<string, unknown>;

const markers: Module<MarkersState, RootState> = {
  namespaced: true,

  state: () => ({
    markers: new Map<string, Marker>(),
    selectedMarkerId: null,
  }),

  mutations: {
    SET_MARKERS (state: MarkersState, markers: Marker[]) {
      markers.forEach(marker => {
        state.markers.set(marker.id, marker)
      });
    },
    ADD_MARKER (state: MarkersState, marker: Marker) {
      state.markers.set(marker.id, marker);
      state.selectedMarkerId = marker.id
    },
    SET_SELECTED_MARKER (state: MarkersState, markerId: string | null) {
      state.selectedMarkerId = markerId;
    },
    REMOVE_MARKER (state: MarkersState, markerId: string) {
      state.markers.delete(markerId)
    },
  },

  actions: {
    async setMarkers ({ commit }) {
      const resp = await backendService.getMarkers();

      commit('SET_MARKERS', resp);
    },

    async addMarker ({ commit }, markerInfo: Omit<Marker, 'id' | 'address'>) {
      const markerAddress = await geocodingService.getAddressFromCoordinates(markerInfo.lat, markerInfo.lng);
      const newMarker: Omit<Marker, 'id'> = {
        name: markerInfo.name,
        lat: markerInfo.lat,
        lng: markerInfo.lng,
        address: markerAddress,
      };
      const backendResp = await backendService.saveMarker(newMarker);

      if(backendResp.status === 200) {
        const addedMarker: Marker = { ...newMarker, id: backendResp.data.id };
        commit('ADD_MARKER', addedMarker);

        return addedMarker
      } else {
        console.error('Error adding marker: ', backendResp.error)
      }
    },

    selectMarker ({ commit }, markerId: string) {
      commit('SET_SELECTED_MARKER', markerId);
    },

    async removeMarker ({ commit }, markerId: string) {
      await backendService.removeMarker(markerId);
      commit('REMOVE_MARKER', markerId);
    },
  },

  getters: {
    markersList: (state: MarkersState) => {
      return Array.from(state.markers.values())
    },
    selectedMarker: (state: MarkersState) => {
      return state.selectedMarkerId ? state.markers.get(state.selectedMarkerId) : null
    },
  },
};

export default markers;
