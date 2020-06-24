<template>
    <v-form>
        <div class="d-flex">
            <v-text-field
                class="flex-grow-1"
                style="width: 60%"
                outlined
                :value="series.name"
                :rules="[lengthRule]"
                :label="form.textFieldTitle"
                :placeholder="form.textFieldTitlePlaceholder"
            />
            <v-combobox
                class="ml-6 flex-shrink-1"
                outlined
                :value="series.status"
                :items="seriesStatus"
                :label="form.comboBoxStatus"
            />
            <v-combobox
                class="ml-6 flex-shrink-1"
                outlined
                :value="series.status"
                :items="seriesStatus"
                :label="form.comboBoxSources"
            />
        </div>
        <v-textarea
            outlined
            :value="series.description"
            :label="form.textAreaDescription"
            :placeholder="form.textAreaDescriptionPlaceholder"
            auto-grow
            :counter="form.textAreaDescriptionCharCounter"
        />
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

    @Prop({required: true, type: Object})
    readonly series!: FullSeriesResponse;

    lengthRule(s: string) {
        if (s.length === 0) return 'Tytuł jest polem wymaganym!';
        return true;
    }

}
</script>