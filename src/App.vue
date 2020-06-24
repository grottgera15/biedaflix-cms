<template>
    <v-app>
        <v-navigation-drawer clipped app permanent>
            <v-list dense>
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

        <v-app-bar clipped-left app color="white" class="elevation-1">
            <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
            <v-toolbar-title>Biedaflix Panel</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { navigationDrawer } from '@/constants/navigationDrawer';

@Component
export default class App extends Vue {
    // private drawer = true;
    private navigation = navigationDrawer;
}
</script>