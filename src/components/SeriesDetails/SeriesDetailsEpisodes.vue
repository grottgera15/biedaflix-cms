<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="episodes"
                    disable-pagination
                    hide-default-footer
                >
                    <template v-slot:item.actions="{item}">
                        <v-btn icon :to="getLocation(item.id)">
                            <v-icon>create</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:item.releaseDate="{item}">{{item.releaseDate | epochToDate}}</template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-divider />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { headers } from '@/constants/seriesDetails/episodeTableHeaders';
import { Prop } from 'vue-property-decorator';
import { LightEpisodeResponse } from '@/classes/Responses/EpisodeResponses';
import { RawLocation } from 'vue-router';

@Component({
    filters: {
        epochToDate(value: number | string): string {
            if (typeof value === 'string') value = parseInt(value);
            const date = new Date(0);
            date.setUTCSeconds(value);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        }
    }
})
export default class SeriesDetailsEpisodes extends Vue {
    private readonly headers = headers;

    @Prop({ required: true, type: Array })
    readonly episodes!: Array<LightEpisodeResponse>;

    getLocation(episodeId: string): RawLocation {
        return {
            name: 'SeriesEpisode',
            params: {
                episodeId: episodeId
            }
        };
    }
}
</script>