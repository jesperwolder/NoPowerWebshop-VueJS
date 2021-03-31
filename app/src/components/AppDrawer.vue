<template>
    <v-card
        width="256"
        mx="auto"
    >
        <v-navigation-drawer permanet>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Produkter
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Vi har enormt mange produkter!
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                    v-for="item in drawerItems"
                    :key="item.title"
                    link
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    data: () => ({
		drawerItems: [
			{ title: 'Alle Produkter', path: '/' },
			{ title: 'Ingen produkter', path: '/' },
		]
	}),
}
</script>

<style>

</style>