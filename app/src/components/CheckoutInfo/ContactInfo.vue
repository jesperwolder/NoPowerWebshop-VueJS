<template>
  <v-stepper-content step="1">
    <p>ContactInfo</p>
    <v-text-field
      v-model="data.Name"
      :rules="[rules.required]"
      label="Name"
      required
    />

    <v-text-field
      v-model="data.Email"
      :rules="[rules.required, rules.Email]"
      label="E-mail"
      required
    />

    <v-text-field
      v-model="data.Phone"
      :rules="[rules.required, rules.Phone]"
      label="Phone Number"
      required
    />

    <v-btn
      color="primary"
      @click="next"
    >
      Continue
    </v-btn>
    <v-btn text @click="$router.replace({})">
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