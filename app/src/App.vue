<template>
  <v-app>
    <v-main>
      <navbar />
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import navbar from '@/components/navbar.vue';


export default {
  name: 'App',

  components: {
    navbar,
  },

  data: () => ({
    //
  }),
};
</script>
