<template>
  <Preloader v-if="!Object.keys(locker).length" color="black" :scale="0.6" />
  <div class="main-display" v-else>
    <h1>{{station}}</h1>
    <hr class="my-3" />
    <p class="fs-5">กรุณาเลือกจักรยาน</p>
    <button
      :class="'btn btn-lg ' + (i != 0 ? 'btn-outline-success' : 'btn-outline-secondary') + ' mx-1 my-3'"
      style="height: 50vh; max-width: 5vw"
      v-for="(i,index) in locker"
      @click="writeData(index, i)"
    >
    {{i}}
    </button>
  </div>
</template>

<script>
import database from "@/firebase";
import Preloader from '@/components/loading.vue'
import { ref, onValue, set } from "firebase/database";


export default {
  data() {
    return {
      station: '',
      locker: []
    }
  },
  components: {
    Preloader
  },
  created() {
    let params = new URLSearchParams(document.location.search);
    let name = params.get("st"); 
    // this.station = atob(name);
    this.station = name;
    this.getValue();
  },
  methods: {
    getValue(){
      onValue(ref(database, `/${this.station}`), (snapshot) => {
        this.locker = snapshot.toJSON();
      });
    },
    writeData(index, value) {
      this.locker[index] = value !== 0 ? 0 : Math.floor(Math.random() * 10);
      set(ref(database, `/${this.station}`), this.locker);
    }
  }
  
}
</script>
