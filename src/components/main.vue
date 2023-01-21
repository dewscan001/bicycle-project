<template>
  <Preloader v-if="!Object.keys(locker).length" color="black" :scale="0.6" />
  <div class="main-display" v-else>
    <h5>{{status === 'ยืม' ? 'กรุณาเลือกจักรยานที่ต้องการยืม' : 'กรุณาเลือกช่องที่จอดเพื่อล็อคจักรยาน'}}</h5>
    <button
      :class="'btn btn-lg px-3 ' + updateStyle(bicycle) + ' mx-1 my-3 bg-gradient'"
      :disabled="disabledBtn(bicycle)"
      style="height: 50vh;"
      v-for="(bicycle,index) in locker"
      @click="writeData(index, bicycle)"
    >
    {{bicycle}}
    </button>
  </div>
</template>

<script>
import database from "@/firebase";
import Preloader from '@/components/loading.vue'
import { ref, onValue, set, push } from "firebase/database";


export default {
  data() {
    return {
      station: '',
      locker: [],
      using_bicycle: 0,
      status: 'ยืม',
      employee: localStorage.getItem("employee") != 'undefined' ? localStorage.getItem("employee") : ''
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
    writeData(index, bicycle) {
      console.log(this.status, this.using_bicycle);
      set(ref(database, `/${this.station}/${index}`), this.using_bicycle);
      if(bicycle !== 0){
        this.using_bicycle = bicycle;
      } 
      this.updateHistory()
      if(this.status === 'ยืม'){
        this.status = 'คืน';
      } else {
        this.using_bicycle = 0;
        this.status = 'ยืม';
      }
    },
    updateHistory(){
      let historyObj = {
        name: this.employee,
        bicycle: this.using_bicycle,
        status: this.status
      }
      push(ref(database, `/B_HISTORY`), historyObj);
    },
    updateStyle(bicycle){
      if(this.status === 'ยืม'){
        return (bicycle !== 0 ? 'btn-outline-success' : 'btn-outline-secondary');
      }else{
        return (bicycle === 0 ? 'btn-outline-secondary' : 'btn-secondary');
      }
    },
    disabledBtn(bicycle){
      if(this.status === 'ยืม'){
        return (bicycle !== 0 ? false : true);
      }else{
        return (bicycle === 0 ? false : true);
      }
    }
  }
  
}
</script>
