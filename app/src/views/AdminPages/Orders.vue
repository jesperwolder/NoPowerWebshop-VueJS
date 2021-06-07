<template>
    <v-card class="mx-auto mw pa-5">
        <h1 class="font-weight-regular">{{ meta.title }}</h1>
        
        <v-divider class="mt-5 pb-5"></v-divider>

        <v-data-table
            :headers="Headers"
            :items="Orders"
        >

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>
                        Ordre oversigt
                    </v-toolbar-title>
                </v-toolbar>

                <v-dialog
                    v-model="Dialog"
                    max-width="600px"
                >
                    <v-card class="mb-0">
                        <v-card-title class="font-weight-regular text--primary">Ordre {{ EditedItem._id }}</v-card-title>

                        <v-card-text>
                            <v-select
                                v-model="EditedItem.Status"
                                :items="Statuses"
                                label="Sæt ordre status"
                            ></v-select>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="red"
                                text
                                @click="Close()"
                            >
                                Annuller
                            </v-btn>
                            <v-btn
                                color="green"
                                text
                                @click="Save()"
                            >
                                Opdater
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>


            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    @click="ManageOrder( item )"
                >
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { GetAllOrdersBody, UpdateOrderStatusBody } from '@/Services/OrdersApi';

export default {
    data() {
        return {
            meta: this.$route.meta,
            Headers: [
                { text: "Id", align: "start", value: "_id" },
                { text: "Status", value: "Status" },
                { text: "Kunde navn", value: "Fullname" },
                { text: "Samlet beløb", value: "Price" },
                { text: "Administrer", value: "actions" },
            ],
            Orders: [],
            Dialog: false,
            EditedItem: {
                Status: '',
                _id: ''
            },
            DefaultItem: {
                Status: '',
                _id: ''
            },
            EditedIndex: -1,
            Statuses: [
                'Under håndtering',
                'Betalt',
                'Afsendt',
                'Annulleret',
                'Fejl'
            ]
        }
    },
    mounted: function() {
        GetAllOrdersBody( this.$cookies.get( 'jwt' ) )
        .then( res => {
            res.Orders.forEach( el => {
                let total = 0;

                el.Products.forEach( p => {
                    total += ( p.Price * p.Quantity )
                })

                this.Orders.push({
                    _id: el._id,
                    Status: el.Status,
                    Fullname: el.Billing.Fullname,
                    Price: total + ' kr'
                });
            })
        })
        .catch( err => {
            console.log( err.response )
        })
    },
    methods: {
        ManageOrder: function( item ) {
            this.EditedIndex = this.Orders.indexOf( item );
            this.EditedItem = Object.assign( {}, item )

            this.Dialog = true;
        },
        Close: function() {
            this.Dialog = false;

            this.$nextTick( () => {
                this.EditedItem = Object.assign( {}, this.DefaultItem );
                this.EditedIndex = -1;
            })
        },
        Save: function() {
            if( this.EditedIndex > -1 ) {
                const body = {
                    Order: {
                        _id: this.EditedItem._id,
                        Status: this.EditedItem.Status
                    }
                }

                UpdateOrderStatusBody( body, this.$cookies.get( 'jwt' ) )
                .then( res => {
                    console.log( res )
                    this.Close();
                })
                .catch( err => {
                    console.log( err.response );
                })

                Object.assign( this.Orders[this.EditedIndex], this.EditedItem );
            } else {
                this.Orders.push( this.EditedItem );
            }
        }
    }
}
</script>