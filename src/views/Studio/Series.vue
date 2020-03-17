<template>
    <div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import seriesService from "@/services/seriesService";
import { AxiosResponse } from "axios";
import SeriesData from "../../classes/SeriesData";
import ServiceError from "../../services/errors/ServiceError";
import { Route, NavigationGuard, Next } from "vue-router";

@Component({
    async beforeRouteEnter(to: Route, from: Route, next: Next<StudioSeries>) {
        await seriesService.getAll(
            { showSeasons: true },
            (response: AxiosResponse) => {
                next(vm => (vm.$data.series = response.data as SeriesData[]));
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

    created() {
        console.log("Created");
    }

    setData(series: SeriesData[], error: ServiceError) {
        error ? this.errors.push(error) : (this.series = series);
    }
}
</script>