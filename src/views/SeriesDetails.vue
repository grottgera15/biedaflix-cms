<template>
    <article class="px-3" v-if="series !== null">
        <h5 class="text-h5 font-weight-bold py-3">{{page.name}}</h5>
        <v-tabs>
            <v-tab v-for="(tab, i) in page.tabs" :key="i" :to="tab.to">
                {{tab.name}}
            </v-tab>

            <v-tab-item>
                <section class="my-6">
                    <v-series-details-form :series="series" />
                </section>
            </v-tab-item>

            <v-tab-item>
                <section class="my-6">
                    <v-series-details-episodes :episodes="series.episodes" />
                </section>
            </v-tab-item>
        </v-tabs>
    </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { get } from '@/services/seriesService';
import { FullSeriesResponse } from '@/classes/Responses/SeriesResponse';

import { seriesDetails } from '@/constants/seriesDetails/seriesDetails';

import SeriesDetailsForm from '@/components/SeriesDetails/SeriesDetailsForm.vue';
import SeriesDetailsEpisodes from '@/components/SeriesDetails/SeriesDetailsEpisodes.vue';

@Component({
    components: {
        'v-series-details-form': SeriesDetailsForm,
        'v-series-details-episodes': SeriesDetailsEpisodes
    }
})
export default class SeriesDetails extends Vue {
    private page = seriesDetails;

    private series: FullSeriesResponse | null = null;

    async mounted() {
        const param = this.$route.params['seriesId'];
        try {
            const series = await get(param, {});
            this.series = series;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>