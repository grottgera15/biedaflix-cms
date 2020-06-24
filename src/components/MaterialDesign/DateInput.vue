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
                :value="value"
                :label="label"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="rules"
                outlined
            ></v-text-field>
        </template>
        <v-date-picker :value="value" @change="$emit('change', $event)" no-title scrollable />
    </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop } from 'vue-property-decorator';

@Component({
    model: {
        prop: 'value',
        event: 'change'
    }
})
export default class DateInput extends Vue {
    private menu = false;

    @Prop({required: false, type: String, default: ''})
    readonly label!: string;

    @Prop({type: String, default: ""})
    value!: string;

    @Prop({type: Array, default: []})
    rules!: Array<Function>;
    
}
</script>