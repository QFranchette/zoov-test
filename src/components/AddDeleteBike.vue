<template>
  <div class="mx-2 my-2" >
    <ZCard class="my-2 neutral--light-3">
    <template v-slot:header>
       <div class="typography--heading "> Delete bike </div>
    </template>
    <div class="z-input">
      <div class="z-input__label">
        <ZLabel>Select bike</ZLabel>
      </div>
      <select v-model="currentBikeToDelete" class="z-input__input pl-2">
        <option 
          :key="index"
          v-for="(b, index) in bikes"
          :value="b">
            {{b.serial_number}}
          </option>
      </select>
      </div>
      <template v-slot:footer>
        <ZButton class="mb-1 primary" @click="deleteBike" :disabled="waitForAPI">
          <ZLoader v-if="waitForAPI" />
          <template v-else>Delete</template>
        </ZButton>
      </template>
    </ZCard>
    
     <ZCard class="my-2 neutral--light-3">
        <template v-slot:header>
          <div class="typography--heading "> Add bike </div>
        </template>
        <ZInput :label="'serial_number'" :placeholder="'ABC123'"  v-model="newBike.serial_number"/>
        <ZInput :label="'longitude'" :placeholder="'42.42069'"  v-model="newBike.location.coordinates[0]"/>
        <ZInput :label="'lattitude'" :placeholder="'42.42069'"  v-model="newBike.location.coordinates[1]"/>
        <ZInput :type="'checkbox'" :label="'in_order'" v-model="newBike.in_order"/>
       <div class="z-input">
        <div class="z-input__label">
          <ZLabel>service_status</ZLabel>
        </div>
        <select v-model="newBike.service_status" class="z-input__input pl-2">
        <option 
          :key="index"
          v-for="(b, index) in BIKE_RENTAL_STATE"
          :value="b">
            {{index}}
          </option>
      </select>
      </div>
      <ZInput :label="'battery_level'" :placeholder="'42'" :type="'number'" min="0" max="100" :suffix="'%'" v-model="newBike.battery_level"/>
      <template v-slot:footer>

        <ZButton class="mb-1 primary" @click="addBike" :disabled="waitForAPI" >
          <ZLoader v-if="waitForAPI" />
          <template v-else>Add</template>
        </ZButton>
      </template>
    </ZCard>

  </div>
</template>

<script>
import APIWrapper from "@/utils/APIWrapper.js";
import BIKE_RENTAL_STATE from "@/enums/BIKE_RENTAL_STATE.js";


export default {
  name: 'AddDeleteBike',
  data: function () {
    return {
      BIKE_RENTAL_STATE : BIKE_RENTAL_STATE,
      waitForAPI : false,
      currentBikeToDelete : null,
      newBike : {
        serial_number: "ABC123",
        location: {
          type: "Point",
          coordinates: [2.24050, 48.7450], // longitude, lattitude
        },
        in_order: true,
        service_status: 1,
        battery_level: 100, // from 0 to 100%
      },
    }
  },
  computed: {
    bikes : function() {
      return this.$store.state.bikes;
    },
  },

  methods: {
    addBike: function () {
      this.waitForAPI = true;
      
      APIWrapper.addBike(this.newBike)
        .then((res) => {
          this.$store.commit("addBike", res)
          this.waitForAPI = false;
        })
        .catch(() => {
          this.waitForAPI = false;
        })
    },

    deleteBike: function () {
      this.waitForAPI = true;

      APIWrapper.deleteBike(this.currentBikeToDelete)
        .then(() => {
          this.$store.commit("removeBike", this.currentBikeToDelete)
          this.waitForAPI = false;
        })
        .catch(() => {
          this.waitForAPI = false;
        })    
    }
  }
}
</script>

<style scoped>

</style>
