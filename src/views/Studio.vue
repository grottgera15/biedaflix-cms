<template>
    <div class="studio">
        <v-navigation-column class="studio__navigation-column" />
        <router-view class="studio__views" />
        <v-modal-loading />
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";

import TheNavigationColumn from "@/components/Studio/TheNavigationColumn.vue";
import ModalLoading from "@/components/Modals/ModalLoading.vue";

@Component({
    components: {
        "v-navigation-column": TheNavigationColumn,
        "v-modal-loading": ModalLoading
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
        width: 100%
</style>