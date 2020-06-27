<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h5 class="text-h5 font-weight-bold">
                    <slot name="headline"/>
                </h5>
            </v-col>
        </v-row>
        <slot />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Default extends Vue {

}
</script>