<template>
    <div>
        <slot name="header" />
        <ol ref="list">
            <slot />
        </ol>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class StudioList extends Vue {
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
        if (event.srcElement instanceof HTMLElement)
            this.$emit("active", event.srcElement.id);
    }

    mouseLeave() {
        this.$emit("active", null);
    }
}
</script>

<style lang="sass" scoped>
ol
    margin: 0
    padding: 0
</style>