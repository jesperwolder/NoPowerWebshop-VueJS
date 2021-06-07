<template>
<!----------------- Home page/landing------------------> 
	<div class="home mx-auto mw">
		<v-card class="pa-0">
			<v-carousel hide-delimiters height="auto">
				<v-responsive :aspect-ratio="30/9">
					<v-carousel-item>
						<v-img contain src="~@/assets/images/Home/Covers/first.png" :aspect-ratio="30/9"></v-img>
					</v-carousel-item>

					<v-carousel-item>
						<v-img contain src="~@/assets/images/Home/Covers/second.png" :aspect-ratio="30/9"></v-img>
					</v-carousel-item>
				</v-responsive>
			</v-carousel>
			
			<div class="pa-5">
				<v-card-title class="font-weight-regular">Mest populære kategorier</v-card-title>

				<v-row no-gutters>
					<CategoryCardItem 
						v-for="( item, index ) in PopularCategories"
						:key="index"
						:data="item"
					/>
				</v-row><br>

				<v-card-title class="font-weight-regular">Mest solgte produkter</v-card-title>

				<v-row no-gutters>
					<ProductItem 
						v-for="( item, index ) in 6"
						:key="index"
						:data="item"
					/>
				</v-row><br>
			</div>

			<BottomContainer />
		</v-card>
	</div>
</template>

<script>
import ProductItem from '@/components/Products/ProductItem';
import CategoryCardItem from './CategoryCardItem';
import BottomContainer from './BottomContainer';

export default {
	name: 'Home',
	components: {
		ProductItem,
		CategoryCardItem,
		BottomContainer
	},
	data() {
		return {
			PopularCategories: [
				{
					Title: "Hardware",
					Description: "Se vores sortimant alt fra Grafikkort, Cpu og meget mere...",
					Image: "http://images.bit-tech.net/content_images/2010/08/evga-classified-sr-2-review/scansr2bundle.jpg",
					Route: "/products/categories/Hardware"
				},
				{
					Title: "Stationær, Laptops og skærme",
					Description: "Se vores ortimant alt fra Gaming-pc - bærbar, Apple og meget mere...",
					Image: "https://i.cdn.newsbytesapp.com/images/l233_6511617279400.jpg",
					Route: "/products/"
				},
				{
					Title: "Mobil og tablets",
					Description: "Se vores ortimant alt fra Apple, samsung, Størrer kamera - Sony, Cannon...",
					Image: "https://imenhamrah.ir/wp-content/uploads/2020/11/%D8%B1%D9%88%D9%86%D8%AF-%D8%AE%D8%B1%DB%8C%D8%AF-%DA%A9%D8%A7%D9%84%D8%A7%DB%8C-%D9%82%D8%B3%D8%B7%DB%8C.jpg",
					Route: "/products/categories/Mobil"
				},
				{
					Title: "Fritid og hårdehvidvare",
					Description: "Se vores ortimant alt fra Fritid og hårde hvidvare fra køkkenet til stuen...",
					Image: "https://d1g4hm1sjefa2b.cloudfront.net/admin/public/getimage.ashx?image=/Files/Images/Hvidevareland/Topbilleder/Topbilleder-Mobil/mobiltopbanner-alle-hvidevarer-min.jpg&crop=0&fix=br&Width=620&",
					Route: "/products/"
				}
			]
		}
	}
}
</script>
