<template>
<!----- Payment dummy data this is not used because we suck at making stuff secure enough for it  ------>
	<v-stepper-content step="3">
		<v-text-field
			v-model="data.CardHolder"
			:rules="[rules.required]"
			label="Kortholders navn"
			required
		/>

		<v-text-field
			v-model="data.CardNumber"
			:rules="[rules.required]"
			label="Kortnummer"
			required
		/>

		 <v-text-field
			v-model="data.ExpDate"
			:rules="[rules.required]"
			label="Udløbsdato"
			required
		/>

		<v-text-field
			v-model="data.LastThree"
			:rules="[rules.required]"
			label="Sikkerhedsnummer"
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