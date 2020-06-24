<template>
    <v-form>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="episode.name"
                        outlined
                        :label="form.textFieldEpisodeName"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-date-input v-model="episode.releaseDate" :label="form.dateInputReleaseDate" />
                </v-col>
                <v-col>
                    <v-text-field
                        type="number"
                        v-model="episode.seasonNumber"
                        outlined
                        :label="form.textFieldSeasonNumber"
                    />
                </v-col>
                <v-col>
                    <v-text-field
                        type="number"
                        v-model="episode.episodeNumber"
                        outlined
                        :label="form.textFieldEpisodeNumber"
                    />
                </v-col>
            </v-row>
            <v-divider />
        </v-container>
    </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FullEpisodeResponse } from '@/classes/Responses/EpisodeResponses';

import { form } from '@/constants/seriesEpisode/seriesEpisodeForm';

@Component
export default class SeriesEpisodeForm extends Vue {
    private form = form;

    @Prop({ required: true, type: Object })
    private episode!: FullEpisodeResponse;
}
</script>