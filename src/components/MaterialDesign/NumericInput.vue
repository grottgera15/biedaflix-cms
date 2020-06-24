<template>
    <v-input class = "d-flex justify-space-around" :label="label">
        <template>
            <v-btn icon @click="changeValue(false)">
                <v-icon>remove</v-icon>
            </v-btn>
            <div style="position: relative">
                <v-slide-y-transition leave-absolute>
                    <span :key="value" class="text-body-1">{{value}}</span>
                </v-slide-y-transition>
            </div>
            <v-btn icon @click="changeValue()">
                <v-icon>add</v-icon>
            </v-btn>
        </template>
    </v-input>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class NumericInput extends Vue {
    value = 0;
    change = 1;

    @Prop({required: false, default: "", type: String})
    readonly label!: string;

    private changeValue(add = true) {
        const direction = add ? 1 : -1;
        this.value += this.change * direction;
    }
}
</script>