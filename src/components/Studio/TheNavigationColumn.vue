<template>
    <ul class="studio__navigation-column">
        <li
            class="studio__navigation-column__element"
            :class="{'studio__navigation-column__element--active': currentPath === path.route}"
            v-for="(path, i) in paths"
            :key="i"
        >
            <router-link class="studio__navigation-column__element__button" :to="path.route">
                <i
                    class="material-icons studio__navigation-column__element__button__icon"
                    v-html="path.icon"
                />
                <span class="studio__navigation-column__element__button__title">{{path.name}}</span>
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

interface Path {
    name: string;
    route: string;
    icon: string;
}

@Component({
    computed: {
        currentPath() {
            return this.$route.path;
        }
    }
})
export default class TheNavigationColumn extends Vue {
    paths: Array<Path> = [
        {
            name: "Seriale",
            route: "/studio/series",
            icon: "video_library"
        },
        {
            name: "Źródła",
            route: "/studio/sources",
            icon: "collections"
        },
        {
            name: "Użytkownicy",
            route: "/studio/users",
            icon: "group"
        },
        {
            name: "Role",
            route: "/studio/roles",
            icon: "folder_shared"
        }
    ];

    routePush(path: string): void {
        this.$router.push({ path: path });
    }
}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.studio__navigation-column
    margin: unset
    padding: unset
    display: flex
    flex-direction: column
    border-right: solid 1px $gray-color
    min-height: 100vh

    &__element
        list-style: none  
        cursor: pointer
        transition-duration: .2s
        color: $white-color
        opacity: .5
        position: relative

        &::before
            content: ""
            transition-duration: .2s
            opacity: 0
            width: 0px

        &__button
            padding: 1em 2em
            display: flex
            align-items: center

            &__icon
                margin-right: .5em
                @media (max-width: $query-768)
                    margin-right: unset

            &__title
                @media (max-width: $query-768)
                    display: none
        &:hover
            opacity: 1
            
    &__element--active
        opacity: 1

        &::before
            opacity: 1
            position: absolute
            content: ""
            height: 100%
            width: 4px
            background-color: $white-color

</style>