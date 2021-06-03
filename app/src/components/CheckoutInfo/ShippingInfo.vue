<template>
<!-- shippinginfo with rules  -->
	<v-stepper-content step="2">
		<v-text-field
			v-model="data.Street"
			label="Adresse"
			required
		/>

		<v-text-field
			v-model="data.Zip"
			label="Postnummer"
			:rules="[rules.required, rules.Zip]"
			required
		/>

		<v-text-field
			v-model="data.City"
			label="By"
			required
		/> 

		<v-text-field
			v-model="data.State"
			label="Region"
			required
		/>

		<v-btn
			color="primary"
			@click="next"
		>
			Næste
		</v-btn>

		<v-btn text @click="previous">
			Tilbage
		</v-btn>

		<div class="pb-5"></div>
	</v-stepper-content>
</template>

<script>
export default {
	//data from checkout
	props: {
		next: Function,
		previous: Function,
		rules: Object,
		data: Object
	}
}
</script>