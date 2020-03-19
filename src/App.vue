<template>
    <router-view></router-view>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class App extends Vue {

}
</script>

<style lang="sass">
@import "@/styles/variables.sass"
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900&display=swap')

body
    background-color: $dark-color
    color: $white-color
    font-family: 'Source Sans Pro', sans-serif
    margin: 0
    padding: 0  

a
    color: inherit
    text-decoration: unset
</style>
