<template>
<!----- Contactinfo fillout validation with rules  ------>
	<v-stepper-content step="1">
		<v-text-field
			v-model="data.Name"
			:rules="[rules.required]"
			label="Fulde navn"
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
			label="Telefonnummer"
			required
		/>

		<v-btn
			color="primary"
			@click="next"
		>
			Næste
		</v-btn>
		<v-btn text @click="$router.replace({})" title="does not work 🤌">
			Annuller
		</v-btn>
		
		<div class="pb-5"></div>
	</v-stepper-content>
</template>

<script>
export default {
	//data from checkout
	props: {
		next: Function,
		rules: Object,
		data: Object
	}
}
</script>