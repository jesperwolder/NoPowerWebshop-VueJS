<template>
    <div class="text-center d-flex align-center">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
        <h2 class="font-weight-regular">
            Logger ud
        </h2>
    </div>
</template>

<script>
export default {
    methods: {
        logout: function() {
			CurrentSession.isLoggedIn = false;
			CurrentSession.isAdmin = false;
			this.$cookies.remove("jwt");
			this.$router.push("/");
		},
    }
}
</script>

<style>

</style>