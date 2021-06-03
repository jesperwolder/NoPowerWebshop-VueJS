<template>
<!----------------- Home page/landing------------------> 
	<div class="home mx-auto mw">
	<v-card class="pa-5">
	<v-carousel hide-delimiters height="auto">
    <v-responsive :aspect-ratio="30/9">
      <v-carousel-item>
       <v-img contain src="~@/assets/images/Home/Sommertilbud1.png" :aspect-ratio="30/9"></v-img>
       
      </v-carousel-item>
      
      <v-carousel-item>

         <v-img contain src="~@/assets/images/Home/SommerTilbud.png" :aspect-ratio="30/9"></v-img>
        
        
         
        
      </v-carousel-item>
</v-responsive>
    </v-carousel>

	 <v-row no-gutters>
        <v-col :cols="12">
          <v-divider class="pb-3 mt-4"></v-divider>
            <div class="col-12 pa-0 d-flex justify-space-between"> 
                
                
                
                <v-btn class="buttons" depressed text mr-2 >
                    <v-icon left>mdi-desktop-classic </v-icon>
                    Pc og tablets
                    </v-btn>

                       <v-btn class="buttons" depressed text mr-2>
                    <v-icon left>mdi-expansion-card</v-icon>
                     Hardware
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2>
                    <v-icon left>mdi-cellphone</v-icon>
                    Mobil
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2>
                    <v-icon left>mdi-television</v-icon>
                    Tv 
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2>
                    <v-icon left>mdi-camera</v-icon>
                    Foto og video
                    </v-btn>

                        <v-btn class="buttons" depressed text mr-2>
                    <v-icon left>mdi-home-city</v-icon>
                    Bolig og hårdehvidvare
                    </v-btn>

                  
            </div>
      

			<!-- desktop-classic // cellphone // television // camera // home-city // expansion-card-->
            <v-divider></v-divider>
			
		</v-col>
    </v-row>

	<v-container fluid>
      <v-row no-gutters>
        <v-col :cols="12">
          
            <v-card-title class="subheading ">Mest populære katogorier</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                >
                  <v-img
                    class="white--text align-end"
                   src="~@/assets/images/Home/hardware2.png"
                   :aspect-ratio="5/3" 
                  >
                    <v-card-title >Hardware </v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div>Se vores ortimant alt fra</div>
                    <div>GrafikKort, Cpu og meget mere...</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn
                      href="/"
                      class="ma-2"
                      outlined
                      color="#F7941D"
                    >
                      Udforsk
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                  <v-img
                    class="white--text align-end"
                     src="~@/assets/images/Home/Gaming.png" 
                     :aspect-ratio="5/3"
                  >
                    <v-card-title>Stationær,Laptops og skærme </v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div>Se vores ortimant alt fra</div>
                    <div>Gaming-pc - bærbar, Apple og meget mere....</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn href="/"
                      class="ma-2"
                      outlined
                      color="#F7941D"
                    >
                      Udforsk
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                  <v-img
                    class="white--text align-end"
                     src="~@/assets/images/Home/mobile.png" 
                     :aspect-ratio="5/3"
                  >
                    <v-card-title>Mobil og tablets </v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div>Se vores ortimant alt fra</div>
                    <div>Apple, samsung, Størrer kamera - Sony, Cannon...</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn href="/"
                      class="ma-2"
                      outlined
                     	color="#F7941D"
                    >
                     Udforsk
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                  <v-img
                    class="white--text align-end"
                     src="~@/assets/images/Home/getimage.png" 
                     :aspect-ratio="5/3"
                  >
                    <v-card-title>Fritid og hårdehvidvare </v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div>Se vores ortimant alt fra</div>
                    <div>Fritid og hårde hvidvare fra køkkenet til stuen...</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn href="/"
                      class="ma-2"
                      outlined
                      color="#F7941D"
                    >
                      Udforsk
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
            </div>
          
        </v-col>
      </v-row>
    </v-container>
  <v-divider></v-divider>
	 <v-row no-gutters>
        <v-col :cols="12">
         
            <v-card-title class="subheading ">Ugens tilbud</v-card-title>
            <v-divider></v-divider>
			
		</v-col>
    </v-row>

	 <v-row no-gutters>
        <v-col :cols="12">
         
            <v-card-title class="subheading ">Mest Solgte</v-card-title>
            <v-divider></v-divider>
			
		</v-col>
    </v-row>

    <v-card  class="orange" >
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2 pt-3">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light pt-3">TUR - RETUR</h3>
                              <p class="font-weight-thin">Gratis fragt over 500 kroner</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2 pt-3">mdi-cash-usd</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light pt-3">Fortrydelse ret</h3>
                <p class="font-weight-thin">14 dages fortrydelses ret</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2 pt-3">mdi-headset</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light pt-3">20-76-43-10</h3>
                <p class="font-weight-thin">24/7 Tilstede support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
		</v-card>
	</div>
</template>

<script>


export default {
	name: 'Home',
	components: {
		
	}
}
</script>
