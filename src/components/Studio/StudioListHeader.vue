<template>
    <header class="studio-list-header" :class="{'studio-list-header--shadow': shadow}">
        <slot />
    </header>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    props: {
        shadow: {
            type: Boolean,
            required: true
        }
    }
})
export default class StudioListHeader extends Vue {
}
</script>

<style lang="sass" scoped>
@import '@/styles/variables'
.studio-list-header
    transition-duration: .2s
    position: sticky
    padding: .75em 2em !important
    color: $white-second-color
    background-color: $dark-color !important
    border-bottom: 1px solid $gray-color
    top: 0
    z-index: 999

.studio-list-header--shadow
    box-shadow: 0 0 5px $gray-color
</style>