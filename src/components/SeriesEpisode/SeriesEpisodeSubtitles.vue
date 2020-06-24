<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-toolbar flat dense>
                    <v-btn icon>
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="subtitles"
                    hide-default-footer
                    disable-pagination
                >
                    <template v-slot:item.actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Usuń</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-divider />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { headers } from '@/constants/seriesEpisode/seriesEpisodeSubtitlesTableHeaders';
import { Prop } from 'vue-property-decorator';
import { FullEpisodeResponse } from '../../classes/Responses/EpisodeResponses';

@Component
export default class SeriesEpisodeSubtitles extends Vue {
    private headers = headers;

    @Prop({ required: true, type: Object })
    readonly episode!: FullEpisodeResponse;

    private get subtitles(): Array<{ language: string }> {
        return Object.keys(this.episode.subtitles).map(language => {
            return { ['language']: language };
        });
    }
}
</script>