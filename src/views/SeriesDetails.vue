<template>
    <v-container fluid v-if="series !== null">
        <v-row>
            <v-col>
                <h5 class="text-h5 font-weight-bold">{{page.name}}</h5>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-tabs>
                    <v-tab v-for="(tab, i) in page.tabs" :key="i" :to="tab.to">{{tab.name}}</v-tab>

                    <v-tab-item>
                        <v-series-details-form :series="series" />
                    </v-tab-item>

                    <v-tab-item>
                        <v-series-details-episodes :episodes="series.episodes" />
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
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