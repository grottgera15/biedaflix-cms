<template>
    <v-app>
        <v-navigation-drawer clipped app permanent :mini-variant="small">
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for="(path, i) in navigation" :key="i" :to="path.path"> 
                        <v-list-item-icon>
                            <v-icon>{{path.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="path.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar clipped-left app>
            <v-app-bar-nav-icon @click.stop="small = !small"></v-app-bar-nav-icon>
            <v-toolbar-title>Biedaflix Panel</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { navigationDrawer } from '@/constants/navigationDrawer';

@Component
export default class App extends Vue {
    private small = true;
    private navigation = navigationDrawer;
}
</script>