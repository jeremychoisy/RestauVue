<template>
    <div>
        <el-page-header @back="goBack()">
        </el-page-header>
        <el-container style="height: 500px;border: 1px solid #eee">
            <el-aside width="300px">
                <el-menu :unique-opened="true">
                    <el-submenu
                            v-for="(menu, index) in currentRestaurant.menus"
                            :key="menu._id"
                            :index="'submenu-' + index">
                        <template slot="title">{{menu.name}}</template>
                        <el-menu-item-group title="Starters">
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menus[index]['starters']"
                                    :key="menuItem._id"
                                    :index="'starters-' + indexItem"
                                    @click="setSelectedDish(menuItem)" >
                                {{menuItem.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Main courses">
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menus[index]['main_courses']"
                                    :key="menuItem._id"
                                    :index="'main_courses-' + indexItem"
                                    @click="setSelectedDish(menuItem)">
                                {{menuItem.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Desserts">
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menus[index]['desserts']"
                                    :key="menuItem._id"
                                    :index="'desserts-' + indexItem"
                                    @click="setSelectedDish(menuItem)">
                                {{menuItem.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu
                            :index="'a-la-carte'">
                        <template slot="title">A la Carte</template>
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menu"
                                    :key="menuItem._id"
                                    :index="'dish-' + indexItem"
                                    @click="setSelectedDish(menuItem)">
                                {{menuItem.name}}
                            </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>


                <el-main>
                    <el-container v-if="selectedDish">
                        <el-header>
                            {{selectedDish.name}}
                        </el-header>
                        <el-main>
                            <img class="dish-img" :src="selectedDish.picture"/>
                            <h3> For $ {{selectedDish.price}}</h3>
                            Ingredients :
                            <span v-for="ingredient in  selectedDish.ingredients.filter((el) => !!el) " :key="ingredient._id">
                                {{ingredient}}
                            </span>
                        </el-main>
                    </el-container>
                    <el-container v-else>
                        <el-main>
                            Click on a dish in the left navigation panel to get more details about it.
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    export default {
        name: "DetailsPage",
        computed: mapState({
            currentRestaurant: state => state.restaurants.currentRestaurant
        }),
        data(){
            return {
                selectedDish: undefined,
            }
        },
        methods: {
            setSelectedDish(selectedDish) {
                this.selectedDish = selectedDish;
            },
            goBack(){
               this.$router.push({name: 'MainPage'});
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #fff;
        color: #464646;
        line-height: 60px;
    }

    .el-aside {
        background-color: white;
    }

    .dish-img {
        width: 15rem;
        height: 15rem;
    }
</style>
