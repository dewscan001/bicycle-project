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
      employee: localStorage.getItem("employee") != 'undefined' ? localStorage.getItem("employee") : '',
      history_key: '/B_HISTORY'
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
      onValue(ref(database, `/${this.history_key}`), (snapshot) => {
        let allAccess = Object.entries(snapshot.toJSON()).filter(([key, item]) => item.name === this.employee);
        if(allAccess.length){
          let lastAccess = allAccess[allAccess.length - 1][1];
          console.log(lastAccess)
          this.status = lastAccess.status === 'ยืม' ? 'คืน' : 'ยืม';
          this.using_bicycle = lastAccess.bicycle;
        }
      });
      
    },
    writeData(index, bicycle) {
      console.log(this.status, this.using_bicycle);
      set(ref(database, `/${this.station}/${index}`), this.status === 'คืน' ? this.using_bicycle : 0);
      if(bicycle !== 0){
        this.using_bicycle = bicycle;
      } 
      this.updateHistory();
    },
    updateHistory(){
      let historyObj = {
        name: this.employee,
        bicycle: this.using_bicycle,
        status: this.status
      }
      push(ref(database, `/${this.history_key}`), historyObj);
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
