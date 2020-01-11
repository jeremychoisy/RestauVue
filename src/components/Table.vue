<template>
    <div v-if="!isPending">
        <el-table
                ref="tableRef"
                :data="tableData"
                style="width: 100%"
                highlight-current-row
                @row-click="showPopUp"
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
                :total="resultsCount"
                :hide-on-single-page="true"
                @current-change="dispatchGetRestaurantsAction"
                @size-change="dispatchGetRestaurantsAction">
        </el-pagination>
        <template>
            <el-drawer
                    :title=currentRestaurant.name
                    :visible.sync="popupDialog"
                    :direction=direction
                    :before-close="closePopUp">
                <span class="italic">{{currentRestaurant.cuisine}} food</span>
                <span>{{currentRestaurant.address.street}} <span class="important">{{currentRestaurant.borough.toUpperCase()}}</span></span>
                <span>
                    <el-rate
                            v-model="currentRestaurant.grades[0].score"
                            disabled
                    >
                    </el-rate>
                </span>

                <span v-for="index in 3" :key="index">
                    <h3>{{currentRestaurant.menu[index].name}}  ${{currentRestaurant.menu[index].price}} </h3>
                    <img class="menuImg" :src="currentRestaurant.menu[index].picture"/>
                     Ingredients :
                    <span v-for="ingredientIndex in  5 " :key="ingredientIndex">
                        <el-tag v-if="ingredientIndex<=4"> {{currentRestaurant.menu[index].ingredients[ingredientIndex]}}</el-tag>
                        <el-badge v-if="ingredientIndex==5" type="primary"
                                  :value="currentRestaurant.menu[index].ingredients.length"> <el-button
                                class="el-tag"
                                onclick="alertIngredients(currentRestaurant.menu[index].ingredients)">See more</el-button></el-badge>
                    </span>

                </span>
                <GmapMap
                        :center="{lat:currentRestaurant.address.coord[1], lng:currentRestaurant.address.coord[0]}"
                        :zoom="15"
                        map-type-id="terrain"
                        class="map">
                    <GmapMarker
                            :key="index"
                            :position="{lat:currentRestaurant.address.coord[1], lng:currentRestaurant.address.coord[0]}"
                            @click="center = m.position"
                    />
                </GmapMap>
                <span slot="footer" class="dialog-footer">
                <el-button @click="closePopUp()">Close</el-button>
                </span>
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
            resultsCount: state => state.restaurants.resultsCount,
            totalCount: state => state.restaurants.totalCount,
            isPending: state => state.restaurants.isPending,
            currentRestaurant: state => state.restaurants.currentRestaurant
        }),
        data: function () {
            return {
                page: 1,
                pageSize: 10,
                query: '',
                popupDialog: false,
                direction: "ltr",
                grade: '',
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
        },
        created() {
            this.dispatchGetRestaurantsAction()
        },
        alertIngredients(restaurant) {
            alert('Ingredients : ' + restaurant);
        }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");

    .important {
        font-weight: bold;
    }

    .menuImg {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 20%;
    }

    .italic {
        font-style: italic;
    }

    .map {
        width: 350px;
        height: 300px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
