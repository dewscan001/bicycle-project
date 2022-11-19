<template>
    <div id="main">
        <h1>Station 1</h1>
        <hr class="my-5"/>
        <img class="text-center" src="@/assets/bicycle.svg" height="150" style="max-width: 70vw;"/>
        <p class="fs-1 mt-3">bicycle 1</p>
        <hr class="my-5"/>
        <button class="btn btn-lg btn-outline-secondary mx-1 my-3" style="height:15vh; max-width: 15vw;" v-for="i in [1, 2, 3, 4, 5]">{{i}}</button>
    </div>
</template>