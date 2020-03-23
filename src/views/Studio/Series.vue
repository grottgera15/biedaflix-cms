<template>
    <div>
        <v-studio-list @active="activeSeries = $event">
            <template v-slot:header>
                <div class="header">
                    <div class="header__info" @click="titleSorting = !titleSorting">
                        Tytuł
                        <v-material-icon>sort</v-material-icon>
                    </div>
                    <div class="header__status">Status</div>
                    <div class="header__episodes">Odcinki</div>
                </div>
            </template>
            <v-studio-list-element
                class="element"
                v-for="_series in seriesSorted"
                :key="_series.id"
                :id="_series.id"
                :active="activeSeries !== null ? activeSeries === _series.id : undefined"
            >
                <div class="element__info">
                    <div class="element__info__name">{{_series.name}}</div>
                    <div class="element__info__description">{{_series.shortDescription}}</div>
                </div>
                <div class="element__status">{{_series.seriesStatus}}</div>
                <div
                    class="element__episodes"
                >{{_series.availableEpisodes}} / {{_series.allEpisodes}}</div>
                <div class="element__buttons">
                    <i class="material-icons" style="font-size: 1em">edit</i>
                </div>
            </v-studio-list-element>
        </v-studio-list>
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
import StudioList from "@/components/Studio/StudioList.vue";
import StudioListElement from "@/components/Studio/StudioListElement.vue";

@Component({
    components: {
        "v-material-icon": MaterialIcon,
        "v-studio-list": StudioList,
        "v-studio-list-element": StudioListElement
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
    activeSeries: string | null = null;
    titleSorting = true;

    setData(series: SeriesData[], error: ServiceError) {
        error ? this.errors.push(error) : (this.series = series);
    }
}
</script>

<style lang="sass" scoped>
@import '@/styles/variables'
.header
    display: grid

.element,
.header
    grid-template-columns: 60% 10% 10% 1fr
    grid-template-areas: "info status episodes buttons"
    grid-column-gap: .5em
    grid-row-gap: .5em

    @media (max-width: $query-1200)
        grid-template-columns: 50% 20% 20% 1fr

    @media (max-width: $query-768)
        grid-template-columns: 40% 25% 25% 1fr

    @media (max-width: $query-512)
        grid-template-columns: 1fr
        grid-template-areas: "info" "buttons"

    &__info
        grid-area: info

    &__status
        grid-area: status
        @media (max-width: $query-512)
            display: none

    &__episodes
        grid-area: episodes
        @media (max-width: $query-512)
            display: none

    &__buttons
        grid-area: buttons

.element
    &__info

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
</style>