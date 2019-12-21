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
                    title="Restaurant details"
                    :visible.sync="popupDialog"
                    :direction=direction
                    :before-close="closePopUp">
                <h3>Restaurant name:</h3> {{currentRestaurant.name}}
                <h3>Restaurant address: </h3>{{currentRestaurant.address.street}}
                <h3>Restaurant grades:</h3>{{currentRestaurant.grades[0].grade}}
                {{this.getGrade(currentRestaurant.grades[0].grade)}}
                <el-rate
                        v-model="grade"
                        disabled
                >
                </el-rate>
                <h3> Location : </h3>
                <GmapMap
                        :center="{lat:currentRestaurant.address.coord[1], lng:currentRestaurant.address.coord[0]}"
                        :zoom="15"
                        map-type-id="terrain"
                        style="width: 500px; height: 300px">
                    <GmapMarker
                            v-for="(m, index) in markers"
                            :key="index"
                            :position="m.position"
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
                grade: ''
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
            getGrade(grade) {
                switch (grade) {
                    case "A":
                        this.grade = 5;
                        return 5;
                    case" B ":
                        this.grade = 4;
                        return 4;
                    case "C" :
                        this.grade = 3;
                        return 3;
                    case "D" :
                        this.grade = 2;
                        return 2;
                    case "E" :
                        this.grade = 1;
                        return 1;
                    case "F" :
                        this.grade = 0.1;
                        return 0;
                    default:
                        this.grade = 0;
                        return "";
                }
            },
        },
        created() {
            this.dispatchGetRestaurantsAction()
        }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
</style>
