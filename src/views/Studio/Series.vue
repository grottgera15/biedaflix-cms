<template>
    <div>
        <ul class="series-list">
            <div class="series-list__header">
                <div class="series-list__header__info" @click="titleSorting = !titleSorting">
                    Tytuł
                    <v-material-icon>sort</v-material-icon>
                </div>
                <div class="series-list__header__status">Status</div>
                <div class="series-list__header__episodes">Odcinki</div>
            </div>
            <li
                class="series-list__element"
                :class="{'series-list__element--not-active': (activeSeries !== null && _series.id !== activeSeries)}"
                v-for="_series in seriesSorted"
                :key="_series.id"
                @mouseenter="activeSeries=_series.id"
                @mouseleave="activeSeries=null"
            >
                <div class="series-list__element__info">
                    <div class="series-list__element__info__name">{{_series.name}}</div>
                    <div
                        class="series-list__element__info__description"
                    >{{_series.shortDescription}}</div>
                </div>
                <div class="series-list__element__status">{{_series.seriesStatus}}</div>
                <div
                    class="series-list__element__episodes"
                >{{_series.availableEpisodes}} / {{_series.allEpisodes}}</div>
                <div>
                    <i class="material-icons" style="font-size: 1em">edit</i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import seriesService from "@/services/seriesService";
import { AxiosResponse } from "axios";
import SeriesData, { SeriesDataInterface } from "../../classes/SeriesData";
import ServiceError from "../../services/errors/ServiceError";
import { Route, NavigationGuard, Next } from "vue-router";
import SeriesStatus from "@/enums/SeriesStatus";
import { LoadingBus } from "@/events/eventBus";

import MaterialIcon from "@/components/Icons/MaterialIcon.vue";

@Component({
    components: {
        "v-material-icon": MaterialIcon
    },
    computed: {
        seriesSorted(): Array<SeriesData> {
            if (this.titleSorting)
                return this.series.sort((a, b) => a.name.localeCompare(b.name));
            else
                return this.series.sort((a, b) => b.name.localeCompare(a.name));
        }
    },
    async beforeRouteEnter(to: Route, from: Route, next: Next<StudioSeries>) {
        LoadingBus.$emit("open");
        await seriesService.getAll(
            { showSeasons: true },
            (response: AxiosResponse) => {
                const array = new Array<SeriesData>();
                response.data.forEach((series: SeriesDataInterface) => {
                    array.push(new SeriesData(series));
                });
                next(vm => (vm.$data.series = array));
                LoadingBus.$emit("close");
            },
            (error: AxiosResponse) => {
                next(vm =>
                    vm.$data.errors.push(undefined, error.data as ServiceError)
                );
                LoadingBus.$emit("close");
            }
        );
    }
})
export default class StudioSeries extends Vue {
    series = new Array<SeriesData>();
    errors = new Array<ServiceError>();
    SeriesStatus = SeriesStatus;
    activeSeries: number | null = null;
    titleSorting = true;

    setData(series: SeriesData[], error: ServiceError) {
        error ? this.errors.push(error) : (this.series = series);
    }
}
</script>

<style lang="sass" scoped>
@import '@/styles/variables'

.series-list
    margin: unset
    padding: unset
    display: flex
    flex-direction: column
    overflow: auto
    height: 100vh
    position: relative

    &__header
        position: sticky
        padding: .75em 2em !important
        color: $white-second-color
        background-color: $dark-color !important
        top: 0
        z-index: 999

        &__info
            display: flex
            align-items: center
            font-weight: bolder
            color: $white-color
            cursor: pointer

    &__element
        transition-duration: .2s

    &__element--not-active
        opacity: .5

    &__element, 
    &__header
        padding: 1.5em 2em
        border-bottom: 1px solid $gray-color
        display: flex
        flex-direction: row
        list-style: none
        width: calc(100% - 2 * 2em)

        &__info
            width: calc(30% - 2em)
            margin-right: 2em

            @media (max-width: $query-1200)
                width: calc(50% - 1em)
                margin-right: 1em

            &__name
                display: block
                margin: 0
                padding: 0
                margin-bottom: 1em
                color: $white-color

            &__description
                line-height: 1.5em
                display: block
                font-weight: lighter
                color: $white-second-color
                font-size: .9em

        &__status
            min-width: 10%

        &__episodes
            min-width: 10%
</style>