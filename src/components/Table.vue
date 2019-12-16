<template>
    <div>
        <el-table
                ref="tableDataRef"
                v-if="!isPending"
                :data="tableData"
                style="width: 100%"
                highlight-current-row
                @current-change="showPopUp"
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
            <el-dialog
                    v-if="!isPending && this.$refs.tableDataRef "
                    title="Restaurant details"
                    :visible.sync="popupDialog"
                    center>
                <h2>Restaurant details </h2>

                <span>There is the row selected :  </span>
                <h3>Restaurant name:</h3> {{currentRestaurant.name}}
                <h3>Restaurant address: </h3>{{currentRestaurant.address.street}}
                <h3>Restaurant address:</h3>{{currentRestaurant}}
                <span slot="footer" class="dialog-footer">
                <el-button @click="closePopUp()">Close</el-button>
             </span>
            </el-dialog>
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
                this.popupDialog = false;
            },

            showPopUp(restaurant) {
                this.$store.commit('restaurants/setCurrentRestaurant', restaurant);
                this.popupDialog = true;
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
