<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        outlined
                        :value="series.name"
                        :rules="[lengthRule]"
                        :label="form.textFieldTitle"
                        :placeholder="form.textFieldTitlePlaceholder"
                    />
                </v-col>

                <v-col cols="3">
                    <v-combobox
                        outlined
                        :value="series.status"
                        :items="seriesStatus"
                        :label="form.comboBoxStatus"
                    />
                </v-col>

                <v-col cols="3">
                    <v-combobox
                        outlined
                        :value="series.status"
                        :items="seriesStatus"
                        :label="form.comboBoxSources"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        outlined
                        :value="series.description"
                        :label="form.textAreaDescription"
                        :placeholder="form.textAreaDescriptionPlaceholder"
                        auto-grow
                        :counter="form.textAreaDescriptionCharCounter"
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

import { form } from '@/constants/seriesDetails/seriesDetailsForm';
import { Prop } from 'vue-property-decorator';
import { FullSeriesResponse } from '../../classes/Responses/SeriesResponse';

import { seriesStatus, seriesStatusComboBox } from '@/constants/seriesStatus';
import SeriesStatus from '@/enums/SeriesStatus';

@Component
export default class SeriesDetailsForm extends Vue {
    private readonly form = form;

    private seriesStatus = seriesStatusComboBox;

    @Prop({ required: true, type: Object })
    readonly series!: FullSeriesResponse;

    lengthRule(s: string) {
        if (s.length === 0) return 'Tytuł jest polem wymaganym!';
        return true;
    }
}
</script>