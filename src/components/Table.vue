<template>
    <div>
        <el-table
                ref="tableRef"
                :data="tableData"
                style="width: 100%"
                highlight-current-row
                @row-click="showPopUp"
                v-loading="isPending"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column
                    label="Name"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Borough"
                    prop="borough">
            </el-table-column>
            <el-table-column
                    label="Cuisine"
                    prop="cuisine">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="{}">
                    <el-input
                            v-model="query"
                            @input="debouncedDispatchGetRestaurantsAction"
                            size="mini"
                            placeholder="Type to search"/>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="sizes, prev, pager, next"
                :current-page.sync="page"
                :page-size.sync="pageSize"
                :page-sizes="[10, 20, 30, 40, 60, 70, 80, 90, 100]"
                :total.sync="count"
                :hide-on-single-page="true"
                @current-change="dispatchGetRestaurantsAction"
                @size-change="dispatchGetRestaurantsAction">
        </el-pagination>

        <el-dialog title="Modify restaurant" :visible.sync="popupModify">
            <el-form :model="newRestaurant">
                <el-form-item label="Restaurant name">
                    <el-input v-model="newRestaurant.name"/>
                </el-form-item>
                <el-form-item label="Borough ">
                    <el-input v-model="newRestaurant.borough"/>
                </el-form-item>
                <el-select v-model="newRestaurant.cuisine" placeholder="Select">
                    <el-option-group
                            v-for="group in options"
                            :key="group.label"
                            :label="group.label">
                        <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            <span style="float: left">{{ item.value }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="popupModify = false">Cancel</el-button>
                <el-button type="primary" @click="popupModify = false">Confirm</el-button>
            </span>

        </el-dialog>

        <template>
            <el-drawer
                    :title=currentRestaurant.name
                    :visible.sync="popupDialog"
                    :direction=direction
                    :before-close="closePopUp">
                <span class="italic">{{currentRestaurant.cuisine}} food   <el-rate
                        v-model="currentRestaurant.grades[0].score"
                        disabled
                >
                    </el-rate>

                </span>
                <GmapMap
                        :center="{lat:currentRestaurant.address.coord[1], lng:currentRestaurant.address.coord[0]}"
                        :zoom="15"
                        map-type-id="terrain"
                        class="map">
                    <GmapMarker
                            :position="{lat:currentRestaurant.address.coord[1], lng:currentRestaurant.address.coord[0]}"
                            @click="center = m.position"
                    />
                </GmapMap>
                <span>{{currentRestaurant.address.street}} <span class="important">{{currentRestaurant.borough.toUpperCase()}}</span></span>
                <template>

                    <el-button @click="showModify(currentRestaurant)" class="seeMoreButtons" v-if="isAdminMode">
                        Modify this place
                    </el-button>
                    <el-button @click="deleteClick(currentRestaurant)" v-if="isAdminMode">
                        Delete this place
                    </el-button>
                </template>


                <h2>Best of 3 dishes</h2>
                <el-collapse v-for="index in 3" :key="index" accordion>
                    <el-collapse-item
                            :title=currentRestaurant.menu[index].name
                    >
                        <img class="menuImg" :src="currentRestaurant.menu[index].picture"/>
                        <h3> For $ {{currentRestaurant.menu[index].price}}</h3>
                        Ingredients :
                        <span v-for="ingredientIndex in  5 " :key="ingredientIndex">
                            <el-tag v-if="ingredientIndex<=4"> {{currentRestaurant.menu[index].ingredients[ingredientIndex]}}</el-tag>
                            <el-badge v-if="ingredientIndex === 5" type="primary"
                                      :value="currentRestaurant.menu[index].ingredients.length"> <el-button
                                    @click="alertIngredients(Array.from(currentRestaurant.menu[index].ingredients))">See more</el-button></el-badge>
                    </span>
                    </el-collapse-item>
                </el-collapse>
                <el-button class="seeMoreButtons" @click="$router.push({name: 'DetailsPage'})">
                    More about this place
                </el-button>
            </el-drawer>
        </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import _ from 'lodash'

    export default {
        name: "Table",
        computed: mapState({
            tableData: state => state.restaurants.restaurants,
            count: state => state.restaurants.count,
            isPending: state => state.restaurants.isPending,
            currentRestaurant: state => state.restaurants.currentRestaurant,
            isAdminMode: state => state.user.isAdmin,
            isFailure: state => state.restaurants.isFailure
        }),
        data: function () {
            return {
                page: 1,
                pageSize: 10,
                query: '',
                popupDialog: false,
                popupModify: false,
                direction: "ltr",
                grade: '',
                newRestaurant: {
                    name: '',
                    borough: '',
                    cuisine: ''
                },
                options: [
                    {label: 'European cuisines',
                        options: [
                            {value: 'Albanian',
                                label: 'Albania'
                            },
                            {value: 'British',
                                label: 'English'
                            },
                            {value: 'French',
                                label: 'France'
                            },
                            {value: 'Greek',
                                label: 'Greece'
                            },
                            {value: 'Italian',
                                label: 'Italy'
                            },
                            {value: 'Portuguese',
                                label: 'Portugal'
                            },
                            {value: 'Spanish',
                                label: 'Spain'
                            }
                        ]
                    },
                    {label: 'African cuisines',
                        options: [
                            {value: 'Arab',
                                label: 'Arabs states'
                            },
                            {value: 'Jamaican',
                                label: 'Jamaica'
                            },
                            {value: 'Senegalese',
                                label: 'Senegal'
                            },
                            {value: 'Somali',
                                label: 'Somalia'
                            }
                        ]
                    },
                    {label: 'Asian cuisines',
                        options: [
                            {value: 'Ainu',
                                label: 'Japan'
                            },
                            {value: 'Chinese',
                                label: 'China'
                            },
                            {value: 'Indian',
                                label: 'India'
                            },
                            {value: 'Korean',
                                label: 'Korea'
                            },
                            {value: 'Russian',
                                label: 'Russia'
                            },
                            {value: 'Sri lankan',
                                label: 'Sri Lanka'
                            }
                        ]
                    },
                    {label: 'Oceanic cuisine',
                        options: [
                            {value: 'Hawaiin',
                                label: 'Hawaii'
                            },
                            {value: 'Malesian',
                                label: 'Malesia'
                            },
                            {value: 'Polynesian',
                                label: 'Polynesia'
                            }
                        ]
                    },
                    {label: 'Cuisines of the Americas',
                        options: [
                            {value: 'Argentine',
                                label: 'República Argentina'
                            },
                            {value: 'Brazilian',
                                label: 'Brazil'
                            },
                            {value: 'Mexican',
                                label: 'Mexico'
                            }
                        ]
                    },
                ],
                value: ''
            }
        },
        methods: {
            dispatchGetRestaurantsAction() {
                this.$store.dispatch('restaurants/getRestaurants', {
                    page: this.page,
                    pageSize: this.pageSize,
                    query: this.query
                });
            },
            debouncedDispatchGetRestaurantsAction: _.debounce(function () {
                this.dispatchGetRestaurantsAction()
            }, 300),
            closePopUp() {
                this.$refs.tableRef.setCurrentRow();
                this.popupDialog = false;
            },
            showPopUp(restaurant) {
                this.$store.commit('restaurants/setCurrentRestaurant', restaurant);
                this.popupDialog = true;
            },
            alertIngredients(restaurant) {
                alert('Ingredients : \n \n ' + restaurant);
            },
            async deleteClick(restaurant) {
                this.popupDialog = false;
                await this.$store.dispatch('restaurants/deleteRestaurant', {restaurantId: restaurant._id});
                if (this.isFailure)
                    this.$message({
                        message: restaurant.name + ' has been deleted.',
                        type: 'success'
                    });
                else
                    this.$message.error(restaurant.name + 'hasn\'t been deleted.');
            },
            showModify(restaurant) {
                console.log(this.newRestaurant.name);
                this.popupDialog = false;
                this.popupModify = true;
                this.newRestaurant.name = restaurant.name;
                this.newRestaurant.borough = restaurant.borough;
                this.newRestaurant.cuisine = restaurant.cuisine;
            }
        },
        created() {
            this.dispatchGetRestaurantsAction()
        },
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");

    .important {
        font-weight: bold;
    }

    .el-rate {
        display: inline;
    }

    .el-collapse-item {
        margin: auto;
        width: 90%;
    }

    .el-collapse-item__header {
        font-weight: bold;
    }

    .menuImg {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5%;
        width: 20%;
    }

    .italic {
        font-style: italic;
    }

    .map {
        width: 90%;
        height: 40%;
        margin-top: 5%;
        margin-left: auto;
        margin-right: auto;
    }

    .seeMoreButtons {
        display: block;
        margin: 5% auto;
    }

    .el-table {
        margin-bottom: 1rem;
    }

</style>
