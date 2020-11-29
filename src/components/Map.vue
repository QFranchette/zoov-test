<template>
  <div>
    <GmapMap
      :center="{lat:48.7723, lng:2.24356}"
      :zoom="10"
      map-type-id="terrain"
      :style="'width:'+$zds.clientWitdh+'; height: 500px'"
      class="mx-2 my-2"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="m.icon"
        @click="toggleInfoWindow(m,index)"
      />
      <GmapInfoWindow  
        :options="infoWinOptions"
        :position="infoWinPosition"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false">
        <BikeDetailWindow :bike="currentBike"/>
      </GmapInfoWindow>
    </GmapMap>
    <!-- <pre>{{bikes}}</pre>
    <pre>{{markers}}</pre> -->
  </div>
</template>

<script>
import APIWrapper from "@/utils/APIWrapper.js";
import BikeDetailWindow from "@/components/BikeDetailWindow";
import BIKE_RENTAL_STATE from "@/enums/BIKE_RENTAL_STATE.js";

export default {
  name: 'Map',
  components: {
    BikeDetailWindow
  },
  data: function () {
    return {
      infoWinOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        },
      },
      infoWinOpen: false,
      infoWinPosition: null,
      currentMidx : null,
      currentBike : null
    }
  },
  computed: {
    bikes : function() {
      return this.$store.state.bikes;
    },
    markers: function () {
      return this.bikes.map((bike) => {
        return { 
          position : {lat : bike.location.coordinates[1], lng : bike.location.coordinates[0] },
          name : bike.serial_number,
          icon : bike.service_status === BIKE_RENTAL_STATE.FREE ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : 
                 ( bike.service_status === BIKE_RENTAL_STATE.BOOKED ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : 
                 ( bike.service_status === BIKE_RENTAL_STATE.IN_USE ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : ""
                 )),
          bike : bike
        };
      })
    }
  },
  mounted () {
    APIWrapper.fetchBikes()
      .then((bikes) => {
        this.$store.commit("majBikes",bikes);
      });
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWinPosition = marker.position;
      this.currentBike = marker.bike;
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  }
}
</script>

<style>
.vue-map {
  border-radius: 10px;
}
</style>
