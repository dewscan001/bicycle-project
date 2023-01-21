<template>
  <!-- As a heading -->
  <nav class="navbar bg-light fixed-top">
    <div class="container-fluid">
      <div class="fs-4"><b>{{ station }}</b></div>
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-secondary fs-6 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{{employee.split(" ")[0]}}</button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item fs-6" @click="enterNewName()">เปลี่ยนชื่อผู้ใช้งาน</a></li>
          </ul>
      </div>
    </div>
  </nav>

<!-- Modal -->
<div class="modal fade show" v-if="flagModal" id="staticBackdrop" style="display:block;" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">กรุณาใส่ชื่อของคุณก่อนใช้งาน</h1>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">ชื่อ-สกุล</label>
          <input type="text" class="form-control" v-model="employeeTemp" id="exampleFormControlInput1">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="flagModal = false" v-if="employee">Cancel</button>
        <button type="button" @click="enterName(); flagModal = false" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
  data() {
    return {
      employeeTemp: '',
      employee: '',
      flagModal: false,
      station: ''
    }
  },
  created() {
    let params = new URLSearchParams(document.location.search);
    this.employee = localStorage.getItem("employee") != 'undefined' ? localStorage.getItem("employee") : '';
    this.station = params.get("st"); 
  },
  watch : {
    employee(){
      this.flagModal = !this.employee;
      this.employeeTemp = this.employee;
    }
  },
  methods : {
    enterName(){
      if(confirm(`ชื่อ-สกุลของคุณคือ ${this.employeeTemp} ?`)){
        localStorage.setItem("employee", this.employeeTemp);
        this.employee = this.employeeTemp;
      }
    },
    enterNewName(){
      if(confirm(`คุณต้องการเปลี่ยนชื่อผู้ใช้งาน ?`)){
        this.flagModal = true
      }
    }
  }
}
</script>