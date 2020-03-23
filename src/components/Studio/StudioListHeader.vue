<template>
    <header class="studio-list-header">
        <slot />
    </header>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class StudioListHeader extends Vue {}
</script>

<style lang="sass" scoped>
@import '@/styles/variables'
.studio-list-header
    display: grid
    position: sticky
    padding: .75em 2em !important
    color: $white-second-color
    background-color: $dark-color !important
    top: 0
    z-index: 999
</style>