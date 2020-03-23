<template>
    <div class="container" @scroll="onScroll">
        <v-studio-list-header :shadow="scrolled">
            <slot name="header" />
        </v-studio-list-header>
        <ol class="studio-list" ref="list">
            <slot />
        </ol>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import StudioListHeader from "./StudioListHeader.vue";

@Component({
    components: {
        "v-studio-list-header": StudioListHeader
    }
})
export default class StudioList extends Vue {
    scrolled = false;

    onScroll(event: MouseEvent) {
        if (event.srcElement instanceof HTMLElement)
            event.srcElement.scrollTop > 0
                ? (this.scrolled = true)
                : (this.scrolled = false);
    }

    updated() {
        this.setUpEvents();
    }

    setUpEvents() {
        const list: HTMLOListElement = this.$refs.list as HTMLOListElement;
        list.childNodes.forEach(_child => {
            const child = _child as HTMLElement;
            child.addEventListener("mouseleave", this.mouseLeave);
            child.addEventListener("mouseenter", this.mouseEnter);
        });
    }

    cleanEvents() {
        const list: HTMLOListElement = this.$refs.list as HTMLOListElement;
        list.childNodes.forEach(child => {
            child.removeEventListener("mouseleave", this.mouseLeave);
            child.removeEventListener("mouseenter", this.mouseEnter);
        });
    }

    mouseEnter(event: Event) {
        if (event.srcElement instanceof HTMLElement) {
            this.$emit("active", event.srcElement.id);
        }
    }

    mouseLeave() {
        this.$emit("active", null);
    }
}
</script>

<style lang="sass" scoped>
@import '@/styles/variables'
.container
    overflow: auto
    position: relative
    height: 100vh

.studio-list
    margin: unset
    padding: unset
    display: flex
    flex-direction: column
</style>