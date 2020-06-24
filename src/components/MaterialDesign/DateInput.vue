<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="25%"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="syncedValue"
                :label="label"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="syncedValue" no-title scrollable />
    </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { PropSync, Prop } from 'vue-property-decorator';

@Component
export default class DateInput extends Vue {
    private menu = false;

    @Prop({required: false, type: String, default: ''})
    readonly label!: string;

    @PropSync('value', {required: true, type: String})
    syncedValue!: string;
    
}
</script>