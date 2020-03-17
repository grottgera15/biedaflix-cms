<template>
    <div>
        Studio
        <router-link to='/studio/series'>Series</router-link>
        <router-view />
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Studio extends Vue {}
</script>

<style lang="sass" scoped>

</style>