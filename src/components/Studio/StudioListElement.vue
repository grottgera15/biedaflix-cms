<template>
    <li class="studio-list__element">
        <slot />
    </li>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

export default class StudioListElement extends Vue {}
</script>

<style lang="sass" scoped>
@import '@/styles/variables'

.studio-list__element
    padding: 1.5em 2em
    border-bottom: 1px solid $gray-color
    display: grid
    list-style: none
    width: calc(100% - 2 * 2em)
    opacity: 1
    transition-duration: .2s

.studio-list__element--not-active
    opacity: .5
</style>
