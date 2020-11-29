<template>
  <div v-if="bike">
    <ZCard >
      <template slot:header>
        <div class="typography--heading ">Bike State</div >
      </template>
      <ZDivider/>

      <div class="typography--body text--left">
        Serial number : {{bike.serial_number}}
      </div>
      <div class="typography--body text--left">
        Latitude : {{bike.location.coordinates[1]}}
      </div>
      <div class="typography--body text--left">
       Longitude : {{bike.location.coordinates[0]}}
      </div>
      <div class="typography--body text--left">
       In order : {{bike.in_order}}
      </div>
      <div class="typography--body text--left">
        Battery : {{bike.battery_level}} %
      </div>

      <template slot:footer>
        <template v-if="!bike.in_order">
           <ZDivider/>
          <div class="typography--body text--left">Bike not in order</div>
        </template>
        <template v-else-if="waitForAPI">
          <ZLoader/>
        </template>
        <template v-else-if="bike.service_status === BIKE_RENTAL_STATE.FREE">
          <div class="typography--body text--left">State : Free</div>
          <ZDivider/>

          <ZButton class="mx-1 primary" @click="changeBikeRentalState(BIKE_RENTAL_STATE.BOOKED)">Book</ZButton>
        </template>
        <template v-else-if="bike.service_status === BIKE_RENTAL_STATE.BOOKED">
          <div class="typography--body text--left">State : Booked</div>
          <ZDivider/>

          <ZButton class="mx-1 primary" @click="changeBikeRentalState(BIKE_RENTAL_STATE.IN_USE)">Use</ZButton>   
          <ZButton class="mx-1 secondary" @click="changeBikeRentalState(BIKE_RENTAL_STATE.FREE)">Free</ZButton>   
        </template>
        <template v-else-if="bike.service_status === BIKE_RENTAL_STATE.IN_USE">
          <div class="typography--body text--left">State : In use</div>
          <ZDivider/>
          <ZButton class="mx-1 primary" @click="changeBikeRentalState(BIKE_RENTAL_STATE.FREE)">Free</ZButton>  
        </template>
      </template>
    </ZCard>
  </div>
</template>

<script>
import BIKE_RENTAL_STATE from "@/enums/BIKE_RENTAL_STATE.js";
import APIWrapper from "@/utils/APIWrapper.js";

export default {
  name: 'BikeDetailWindow',
  props :['bike'],
  data: function () {
    return {
      BIKE_RENTAL_STATE : BIKE_RENTAL_STATE,
      waitForAPI : false
    }
  },
  computed: {
   
  },

  methods: {
    changeBikeRentalState: function (newState) {
      this.waitForAPI = true;
      //Create a deep copy to wait until the API call is passed before really updating the bike status
      const newBike = JSON.parse(JSON.stringify(this.bike));
      newBike.service_status = newState;
      APIWrapper.updateBike(this.bike, newBike)
        .then(() => {
          this.bike.service_status = newState;
          this.waitForAPI = false;
        })
        .catch(() => {
          this.waitForAPI = false;
        })
    },
  }
}
</script>

<style scoped>

</style>
