<template>
    <v-data-table :headers="headers" :items="series">
        <!-- DESCRIPTION -->
        <template v-slot:item.name="{ item }">
            <div class="py-2">
                <h6 class="text-h6">{{item.name}}</h6>
                <span class="text-caption grey--text text--darken-1">{{item.description}}</span>
            </div>
        </template>

        <!-- ACTIONS -->
        <template v-slot:item.actions>
            <v-tooltip bottom>
                <template v-slot:activator="{on, attrs}">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>create</v-icon>
                    </v-btn>
                </template>
                <span>Szczegóły</span>
            </v-tooltip>
        </template>

        <!-- EPISODE AMOUNT -->
        <template v-slot:item.episodes="{ item }">{{item.episodes.length}}</template>
    </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { headers } from '@/constants/series/headers';

import {
    LightSeriesResponse,
    FullSeriesResponse
} from '@/classes/Responses/SeriesResponse';
import { getAll } from '@/services/seriesService';

@Component
export default class Series extends Vue {
    private readonly headers = headers;
    private series: Array<FullSeriesResponse> = [];

    async mounted() {
        try {
            const data = await getAll({ showSeasons: true });
            this.series = data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>