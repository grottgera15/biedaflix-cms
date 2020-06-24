<template>
    <v-container fluid v-if="series !== null">
        <v-row>
            <v-col>
                <h5 class="text-h5 font-weight-bold">{{seriesAddEpisode.headline}}</h5>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                        :value="series.name"
                        outlined
                        readonly
                        :label="form.textFieldSeriesName"
                    />

                    <v-text-field
                        outlined
                        :label="form.textFieldEpisodeName"
                        v-model="episodeRequest.name"
                        :rules="[nameRule]"
                    />

                    <v-container fluid class="pa-0">
                        <v-row>
                            <v-col>
                                <v-date-input
                                    v-model="episodeRequest.releaseDate"
                                    :label="form.dateInputReleaseDate"
                                    :rules="[dateRule]"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    :label="form.textFieldSeasonNumber"
                                    outlined
                                    type="number"
                                    v-model="episodeRequest.seasonNumber"
                                    :rules="[seasonRule]"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    :label="form.textFieldEpisodeNumber"
                                    outlined
                                    type="number"
                                    v-model="episodeRequest.episodeNumber"
                                    :rules="[episodeRule]"
                                />
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-textarea
                        auto-grow
                        outlined
                        :label="form.textAreaMagnetLink"
                        :hint="form.textAreaMagnetLinkHint"
                        v-model="episodeRequest.magnetLink"
                        :rules="[magnetRule, magnetRuleLength]"
                    ></v-textarea>

                    <v-btn outlined @click="submit">Dodaj</v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-divider />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { seriesAddEpisode } from '@/constants/seriesAddEpisode/seriesAddEpisode';
import { form } from '@/constants/seriesEpisode/seriesEpisodeForm';

import { get } from '@/services/seriesService';
import { create } from '@/services/episodeService';
import { FullSeriesResponse } from '@/classes/Responses/SeriesResponse';

import {
    lengthRuleFactory,
    numericRuleFactory,
    magnetLinkRuleFactory
} from '@/methods/rulesFactory';
import { EpisodeRequestBody } from '@/classes/Responses/EpisodeResponses';

@Component
export default class SeriesAddEpisode extends Vue {
    private readonly form = form;
    private readonly seriesAddEpisode = seriesAddEpisode;

    private series: FullSeriesResponse | null = null;
    private episodeRequest: EpisodeRequestBody | null = null;

    private valid = false;

    private menu = false;
    private date = '';

    nameRule = lengthRuleFactory(form.textFieldEpisodeNameEmptyRule);
    dateRule = lengthRuleFactory(form.dateInputReleaseDateEmptyRule);
    seasonRule = numericRuleFactory(form.textFieldSeasonNumberLimitRule, 1);
    episodeRule = numericRuleFactory(form.textFieldEpisodeNumberLimitRule, 0);
    magnetRule = magnetLinkRuleFactory(form.textAreaMagnetLinkValidationRule);
    magnetRuleLength = lengthRuleFactory(form.textAreaMagnetLinkEmptyRule);

    async mounted() {
        this.series = await get(this.$route.params.seriesId, {
            showSeasons: false
        });
        this.episodeRequest = {
            seriesId: this.series.id,
            name: '',
            episodeNumber: 1,
            seasonNumber: 1,
            releaseDate: '',
            magnetLink: ''
        };
    }

    private async submit() {
        const canSubmit = (this.$refs.form as any).validate();
        if (!canSubmit || this.episodeRequest === null) return;
        try {
            const episode = await create(this.episodeRequest);
        } catch (e) {
            console.error(e);
        }
    }
}
</script>