<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
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
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import _ from 'lodash'

    export default {
        name:"Table",
        computed: mapState({
            tableData: state => state.restaurants.restaurants,
            resultsCount: state => state.restaurants.resultsCount,
            totalCount: state => state.restaurants.totalCount,
            isPending: state => state.restaurants.isPending,
        }),
        data: function (){
            return {
                page: 1,
                pageSize: 10,
                query: '',
            }
        },
        methods: {
            dispatchGetRestaurantsAction(){
                    this.$store.dispatch('restaurants/getRestaurants', {
                        page: this.page,
                        pageSize: this.pageSize,
                        query: this.query
                    });
                },
            debouncedDispatchGetRestaurantsAction: _.debounce(function(){
                this.dispatchGetRestaurantsAction()
            },300),
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
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
