<template>
  <v-stepper-content step="3">
    <v-text-field
      v-model="data.CardHolder"
      :rules="[rules.required]"
      label="Cardholder"
      required
    />

    <v-text-field
      v-model="data.CardNumber"
      :rules="[rules.required]"
      label="CardNumber"
      required
    />

     <v-text-field
      v-model="data.ExpDate"
      :rules="[rules.required]"
      label="ExpDate"
      required
    />

    <v-text-field
      v-model="data.LastThree"
      :rules="[rules.required]"
      label="AutCode"
      required
    />

    <v-btn
      color="primary"
      @click="next"
    >
      Continue
    </v-btn>
    <v-btn text @click="$router.replace({name: 'cart'})">
      Cancel
    </v-btn>
  </v-stepper-content>
</template>

<script>
export default {
  props: {
    next: Function,
    rules: Object,
    data: Object
  }
}
</script>