<template>
  <Preloader v-if="!locker.length" color="black" :scale="0.6" />
  <div class="main-display" v-else>
    <h1>{{station}}</h1>
    <hr class="my-3" />
    <p class="fs-5">กรุณาเลือกจักรยาน</p>
    <button
      :class="'btn btn-lg ' + (i != 0 ? 'btn-outline-success' : 'btn-outline-secondary') + ' mx-1 my-3'"
      style="height: 50vh; max-width: 5vw"
      v-for="i in locker"
    >
    </button>
  </div>
</template>

<script allowJs>
import database from "@/firebase";
import Preloader from '@/components/loading.vue'
import { ref, onValue } from "firebase/database";


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
  watch : {
    locker(temp){
      if(temp != this.locker){
        this.locker = temp.filter(q => typeof q == "number")
      }
    }
  },
  methods: {
    getValue(){
      onValue(ref(database, `/${this.station}`), (snapshot) => {
        this.locker = snapshot.val();
      });
    }
  }
  
}
</script>
