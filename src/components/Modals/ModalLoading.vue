<template>
    <transition name="slide">
        <div class="modal-loading" v-show="isOpen">Wczytywanie...</div>
    </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { LoadingBus } from "@/events/eventBus";

@Component
export default class ModalLoading extends Vue {
    isOpen = false;

    created() {
        LoadingBus.$on("open", () => {
            this.isOpen = true;
        });
        LoadingBus.$on("close", () => {
            this.isOpen = false;
        });
    }
}
</script>

<style lang="sass" scoped>
@import "@/styles/variables"

.modal-loading
    border: 1px solid $gray-color
    border-radius: 4px
    background-color: $dark-color
    position: fixed
    padding: 1em 3em
    bottom: 2em
    left: 2em

.slide-enter-active, .slide-leave-active
    transition-duration: .5s
    opacity: 1
    left: 2em

.slide-enter, .slide-leave-to
    opacity: 0
    left: 0em
</style>