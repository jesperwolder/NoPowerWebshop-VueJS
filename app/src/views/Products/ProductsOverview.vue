<template>
    <div>
        <ProductsOverview 
            title="Alle Produkter"
            :products="Products"
            :category="this.$route.params.category"
            class="mx-auto mw"
        />
    </div>
</template>

<script>
import ProductsOverview from '@/components/Products/ProductsOverview'
import { GetAllProductsBody } from '@/Services/ProductApi';

export default {
    components: {
        ProductsOverview
    },
    data() {
        return {
            Products: [],
        }
    },
    mounted: function() {
        GetAllProductsBody()
        .then( res => {
            const obj = res.Products;

            obj.forEach( element => {
                if( element.isActive ) {
                    //console.log(element.Categories.includes( this.$route.params.category ))
                    //if( element.Categories.includes( this.$route.params.category ) ) {
                        this.Products.push({
                            _id: element._id,
                            Stock: element.Stock,
                            Name: element.Name,
                            LowerHeader: element.LowerHeader,
                            Price: element.Price,
                            SalePercentage: element.SalePercentage,
                            Thumbnail: element.Thumbnail,
                            Categories: element.Categories.map(v => v.toLowerCase())
                        });
                    }
                //}
            });
        })
        .catch( err => {
            console.log( err.response.data.Message );
        });
    }
}
</script>

<style>

</style>