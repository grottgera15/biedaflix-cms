<template>
    <div>
        <ul class="series-list">
            <div class="series-list__header">
                <div class="series-list__header__info">Tytuł</div>
                <div class="series-list__header__status">Status</div>
                <div class="series-list__header__episodes">Odcinki</div>
            </div>
            <li
                class="series-list__element"
                :class="{'series-list__element--not-active': (activeSeries !== null && _series.id !== activeSeries)}"
                v-for="_series in series"
                :key="_series.id"
                @mouseenter="activeSeries=_series.id"
                @mouseleave="activeSeries=null"
            >
                <div class="series-list__element__info">
                    <h3 class="series-list__element__info__name">{{_series.name}}</h3>
                    <div
                        class="series-list__element__info__description"
                    >{{_series.shortDescription}}</div>
                </div>
                <div class="series-list__element__status">{{_series.seriesStatus}}</div>
                <div
                    class="series-list__element__episodes"
                >{{_series.availableEpisodes}} / {{_series.allEpisodes}}</div>
                <div>
                    <i class="material-icons">edit</i>
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
import { SeriesResponse } from "@/services/responseInteraces";
import ServiceError from "../../services/errors/ServiceError";
import { Route, NavigationGuard, Next } from "vue-router";
import SeriesStatus from "@/enums/SeriesStatus";

@Component({
    async beforeRouteEnter(to: Route, from: Route, next: Next<StudioSeries>) {
        await seriesService.getAll(
            { showSeasons: true },
            (response: AxiosResponse) => {
                const array = new Array<SeriesData>();
                response.data.forEach((series: SeriesDataInterface) => {
                    array.push(new SeriesData(series));
                });
                next(vm => (vm.$data.series = array));
            },
            (error: AxiosResponse) => {
                next(vm =>
                    vm.$data.errors.push(undefined, error.data as ServiceError)
                );
            }
        );
    }
})
export default class StudioSeries extends Vue {
    series = new Array<SeriesData>();
    errors = new Array<ServiceError>();
    SeriesStatus = SeriesStatus;
    activeSeries: number | null = null;

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

    &__header
        padding: .75em 2em !important
        color: $white-second-color

    &__element
        transition-duration: .2s
        cursor: default

    &__element--not-active
        opacity: .3

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
                letter-spacing: .05em
                display: block
                margin: 0
                padding: 0
                margin-bottom: .5em
                color: $white-color

            &__description
                display: block
                font-weight: lighter
                color: $white-second-color

        &__status
            min-width: 10%

        &__episodes
            min-width: 10%
</style>