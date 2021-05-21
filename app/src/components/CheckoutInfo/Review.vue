<template>
	<v-stepper-content step="4">
		<v-list
			disabled
			dense
		>
			<v-list-item-group color="primary">
				<v-list-item
					v-for="(value, name) in data"
					:key="name"
				>
					<v-list-item-content>
						<v-list-item-title>
							{{ name }}: {{ value }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<v-btn
			color="primary"
			@click="submitOrder"
		>
			Betal
		</v-btn>

		<v-btn text @click="previous">
			Tilbage
		</v-btn>

		<div class="pb-5"></div>
	</v-stepper-content>
</template>

<script>
export default {
	props: {
		previous: Function,
		submitOrder: Function,
		data: Object
	}
}
</script>