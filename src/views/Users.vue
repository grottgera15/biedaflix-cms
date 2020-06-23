<template>
    <v-data-table :headers="headers" :items="users" :loading="loading" :mobile-breakpoint="0">
        <!-- AVATAR -->
        <template v-slot:item.avatar="{item}">
            <v-avatar>
                <img :src="item.avatar" :alt="`${item.username} avatar`" />
            </v-avatar>
        </template>

        <!-- USERNAME -->
        <template v-slot:item.username="{item}">
            <div class="py-2">
                <h6 class="text-subtitle-2">{{item.username}}</h6>
                <span class="text-caption grey--text text--darken-1">{{item.email}}</span>
            </div>
        </template>

        <!-- ACCEPTED -->
        <template v-slot:item.accepted="{item}">
            <v-checkbox :input-value="item.accepted"/>
        </template>

        <!-- ROLES -->
        <template v-slot:item.roles="{item}">
            <v-chip-group>
                <v-chip v-for="(role, i) in item.roles" :key="i">
                    {{role.name}}
                </v-chip>
            </v-chip-group>
        </template>
    </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { headers } from '@/constants/users/headers';
import { getAll } from '@/services/usersAdminService';
import { AdministrativeUserResponse } from '@/classes/Responses/UserResponse';

@Component
export default class Users extends Vue {
    private readonly headers = headers;
    private users: Array<AdministrativeUserResponse> = [];
    private loading = true;

    async mounted() {
        try {
            const data = await getAll({});
            this.users = data;
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    }
}
</script>