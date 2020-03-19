<template>
    <div class = "studio">
        <v-navigation-column class = "studio__navigation-column"/>
        <router-view class = "studio__views"/>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";


import TheNavigationColumn from '@/components/Studio/TheNavigationColumn.vue';
@Component({
    components: {
        'v-navigation-column': TheNavigationColumn
    }
})
export default class Studio extends Vue {}
</script>

<style lang="sass" scoped>
    .studio
        display: flex
        flex-direction: row

        &__navigation-column

        &__views
</style>