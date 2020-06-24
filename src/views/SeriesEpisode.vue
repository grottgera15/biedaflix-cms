<template>
    <v-container fluid v-if="episode !== null">
        <v-row>
            <v-col>
                <h5 class="text-h5 font-weight-bold">Szczegóły odcinka</h5>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-tabs>
                    <v-tab>Podstawowe</v-tab>
                    <v-tab>Napisy</v-tab>

                    <v-tab-item>
                        <v-series-episode-form :episode="episode" />
                    </v-tab-item>
                    <v-tab-item>
                        <v-series-episode-subtitles :episode="episode" />
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { FullEpisodeResponse } from '@/classes/Responses/EpisodeResponses';

import { get } from '@/services/episodeService';

import SeriesEpisodeForm from '@/components/SeriesEpisode/SeriesEpisodeForm.vue';
import SeriesEpisodeSubtitles from '@/components/SeriesEpisode/SeriesEpisodeSubtitles.vue';

@Component({
    components: {
        'v-series-episode-form': SeriesEpisodeForm,
        'v-series-episode-subtitles': SeriesEpisodeSubtitles
    }
})
export default class SeriesEpisode extends Vue {
    private episode: FullEpisodeResponse | null = null;

    async mounted() {
        try {
            this.episode = await get(this.episodeId);
        } catch (e) {
            console.error(e);
        }
    }

    get episodeId(): string {
        return this.$route.params.episodeId;
    }
}
</script>