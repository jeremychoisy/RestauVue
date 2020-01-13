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
                        <template slot="title" >
                            <div class="menu-info">
                                <span class="name">{{menu.name}}</span>
                                <span class="price"> {{menu.price}}$</span>
                                <div v-if="isAdminMode">
                                    <el-button class="edit-button"
                                            @click.stop="updateMenu(menu)">
                                        <el-icon class="el-icon-edit-outline"/>
                                    </el-button>
                                    <el-popconfirm
                                            confirmButtonText='Yes'
                                            cancelButtonText='No'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="Are you sure to delete this?"
                                            @onConfirm="deleteMenu(menu)"
                                    >
                                        <el-button class="edit-button"
                                                    slot="reference"
                                                    @click.stop>
                                            <el-icon class="el-icon-delete"/>
                                        </el-button>
                                    </el-popconfirm>
                                </div>
                            </div>
                        </template>
                        <el-menu-item-group title="Starters">
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menus[index]['starters']"
                                    :key="menuItem._id"
                                    :index="'starters-' + indexItem"
                                    @click="setSelectedDish(menuItem)" >
                                <div class="item-info">
                                    <span >{{menuItem.name}}</span>
                                    <div v-if="isAdminMode">
                                        <el-button class="edit-button"
                                                   @click.stop="updateDishInMenu(menuItem, currentRestaurant.menus[index])">
                                            <el-icon class="el-icon-edit-outline"/>
                                        </el-button>
                                        <el-popconfirm
                                                confirmButtonText='Yes'
                                                cancelButtonText='No'
                                                icon="el-icon-info"
                                                iconColor="red"
                                                title="Are you sure to delete this?"
                                                @onConfirm="deleteDishFromMenu(menuItem, currentRestaurant.menus[index])">
                                            <el-button class="edit-button"
                                                       slot="reference"
                                                       @click.stop>
                                                <el-icon class="el-icon-delete"/>
                                            </el-button>
                                        </el-popconfirm>
                                    </div>
                                </div>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Main courses">
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menus[index]['main_courses']"
                                    :key="menuItem._id"
                                    :index="'main_courses-' + indexItem"
                                    @click="setSelectedDish(menuItem)">
                                <div class="item-info">
                                    <span >{{menuItem.name}}</span>
                                    <div v-if="isAdminMode">
                                        <el-button class="edit-button"
                                                   @click.stop="updateDishInMenu(menuItem, currentRestaurant.menus[index])">
                                            <el-icon class="el-icon-edit-outline"/>
                                        </el-button>
                                        <el-popconfirm
                                                confirmButtonText='Yes'
                                                cancelButtonText='No'
                                                icon="el-icon-info"
                                                iconColor="red"
                                                title="Are you sure to delete this?"
                                                @onConfirm="deleteDishFromMenu(menuItem, currentRestaurant.menus[index])">
                                            <el-button class="edit-button"
                                                       slot="reference"
                                                       @click.stop>
                                                <el-icon class="el-icon-delete"/>
                                            </el-button>
                                        </el-popconfirm>
                                    </div>
                                </div>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Desserts">
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menus[index]['desserts']"
                                    :key="menuItem._id"
                                    :index="'desserts-' + indexItem"
                                    @click="setSelectedDish(menuItem)">
                                <div class="item-info">
                                    <span >{{menuItem.name}}</span>
                                    <div v-if="isAdminMode">
                                        <el-button class="edit-button"
                                                   @click.stop="updateDishInMenu(menuItem, currentRestaurant.menus[index])">
                                            <el-icon class="el-icon-edit-outline"/>
                                        </el-button>
                                        <el-popconfirm
                                                confirmButtonText='Yes'
                                                cancelButtonText='No'
                                                icon="el-icon-info"
                                                iconColor="red"
                                                title="Are you sure to delete this?"
                                                @onConfirm="deleteDishFromMenu(menuItem, currentRestaurant.menus[index])">
                                            <el-button class="edit-button"
                                                       slot="reference"
                                                       @click.stop>
                                                <el-icon class="el-icon-delete"/>
                                            </el-button>
                                        </el-popconfirm>
                                    </div>
                                </div>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu :index="'a-la-carte'">
                        <template slot="title">A la Carte</template>
                            <el-menu-item
                                    v-for="(menuItem, indexItem) in currentRestaurant.menu"
                                    :key="menuItem._id"
                                    :index="'dish-' + indexItem"
                                    @click="setSelectedDish(menuItem)">
                                <div class="item-info">
                                    <span >{{menuItem.name}}</span>
                                    <div v-if="isAdminMode">
                                        <el-button class="edit-button"
                                                   @click.stop="updateDishInMenu(menuItem)">
                                            <el-icon class="el-icon-edit-outline"/>
                                        </el-button>
                                        <el-popconfirm
                                                confirmButtonText='Yes'
                                                cancelButtonText='No'
                                                icon="el-icon-info"
                                                iconColor="red"
                                                title="Are you sure to delete this?"
                                                @onConfirm="deleteDishFromMenu(menuItem)">
                                            <el-button class="edit-button"
                                                       slot="reference"
                                                       @click.stop>
                                                <el-icon class="el-icon-delete"/>
                                            </el-button>
                                        </el-popconfirm>
                                    </div>
                                </div>
                            </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-container class="dish-details-container" v-if="selectedDish">
                        <h2>{{selectedDish.name}}</h2>
                            <img class="dish-img" :src="selectedDish.picture" :alt="selectedDish.name"/>
                            <h3>{{selectedDish.price}}$ </h3>
                            Ingredients :
                            <ul>
                                <li v-for="ingredient in  selectedDish.ingredients.filter((el) => !!el) " :key="ingredient._id">{{ingredient}}</li>
                            </ul>
                    </el-container>
                    <el-container v-else>
                        <el-main>
                            Click on a dish in the left navigation panel to get more details about it.
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog
                :title="action === 'updateMenu' ? 'Update a menu' : 'Update a menu item'"
                :visible.sync="isDialogVisible"
                width="30%"
                @closed="resetIsFailure">
            <el-spinner v-if="isPending"/>
            <el-form v-if="action === 'updateMenu'" ref="menuForm" :model="menuUpdateForm" label-width="120px" :label-position="'left'">
                <el-form-item
                        :rules="[{ required: true, message: 'A name is required'},]"
                        label="Name"
                        prop="name">
                    <el-input v-model="menuUpdateForm.name"/>
                </el-form-item>
                <el-form-item label="Price"
                              :rules="[{ required: true, message: 'A price is required'},]"
                              prop="price">
                    <el-input v-model="menuUpdateForm.price"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('menuForm')">Submit</el-button>
                    <el-button @click="isDialogVisible = false">Cancel</el-button>
                </el-form-item>
            </el-form>
            <el-form v-else ref="menuItemForm" :model="menuItemUpdateForm" label-width="120px" :label-position="'left'">
                <el-form-item
                        :rules="[{ required: true, message: 'A name is required'},]"
                        label="Name"
                        prop="name">
                    <el-input v-model="menuItemUpdateForm.name"/>
                </el-form-item>
                <el-form-item label="Price"
                              :rules="[{ required: true, message: 'A price is required'},]"
                              prop="price">
                    <el-input v-model="menuItemUpdateForm.price"/>
                </el-form-item>
                <el-form-item label="Ingredients :">
                    <el-tag
                            :key="ingredient"
                            v-for="ingredient in menuItemUpdateForm.ingredients"
                            closable
                            :disable-transitions="false"
                            @close="handleDelete(ingredient)">
                        {{ingredient}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="isIngredientInputVisible"
                            v-model="ingredientInputValue"
                            placeholder="Press enter to add an ingredient"
                            ref="ingredientInput"
                            size="mini"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showIngredientInput">+ New ingredient</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('menuItemForm')">Submit</el-button>
                    <el-button @click="isDialogVisible = false">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    export default {
        name: "DetailsPage",
        computed: mapState({
            isAdminMode: state => state.user.isAdmin,
            currentRestaurant: state => state.restaurants.currentRestaurant,
            isPending: state => state.restaurants.isPending
        }),
        data(){
            return {
                selectedDish: undefined,
                isDialogVisible: false,
                currentMenu: undefined,
                currentDish: undefined,
                action: '',
                menuUpdateForm: {
                    name: '',
                    price: ''
                },
                menuItemUpdateForm: {
                    name: '',
                    price: '',
                    ingredients: ''
                },
                isIngredientInputVisible: false,
                ingredientInputValue: ''
            }
        },
        methods: {
            setSelectedDish(selectedDish) {
                this.selectedDish = selectedDish;
            },
            goBack(){
               this.$router.push({name: 'MainPage'});
            },
            updateMenu(menu){
                this.action = 'updateMenu';
                this.currentMenu = menu;
                this.menuUpdateForm.name = menu.name;
                this.menuUpdateForm.price = menu.price;
                this.isDialogVisible = true;
            },
            updateDishInMenu(dish, menu){
                this.action = 'updateDish';
                this.currentMenu = menu;
                this.currentDish = dish;
                this.menuItemUpdateForm.name = dish.name;
                this.menuItemUpdateForm.price = dish.price;
                this.menuItemUpdateForm.ingredients = dish.ingredients;
                this.isDialogVisible = true;
            },
            async deleteDishFromMenu(dish, menu){
                if(menu) {
                    await this.$store.dispatch('restaurants/deleteDishFromSpecificMenu', {
                        type: dish.type + 's',
                        dishId: dish._id,
                        restaurantId: this.currentRestaurant._id,
                        menuId: menu._id
                    });
                } else {
                    await this.$store.dispatch('restaurants/deleteDishFromGlobalMenu', {
                        dishId: dish._id,
                        restaurantId: this.currentRestaurant._id,
                    });
                }
            },
            showIngredientInput() {
                this.isIngredientInputVisible = true;
                this.$nextTick(() => {
                    this.$refs.ingredientInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                if (this.ingredientInputValue) {
                    this.menuItemUpdateForm.ingredients.push(this.ingredientInputValue);
                }
                this.isIngredientInputVisible = false;
                this.ingredientInputValue = '';
            },
            handleDelete(ingredients) {
                this.menuItemUpdateForm.ingredients.splice(this.menuItemUpdateForm.ingredients.indexOf(ingredients), 1);
            },
            resetIsFailure(){
                this.$store.commit('user/setIsFailure', '')
            },
            async deleteMenu(menu){
                await this.$store.dispatch('restaurants/deleteSpecificMenu', {
                    restaurantId: this.currentRestaurant._id,
                    menuId: menu._id});
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const payload = formName === 'menuForm' ?
                            {
                                menuUpdateForm: this.menuUpdateForm,
                                restaurantId: this.currentRestaurant._id,
                                menuId: this.currentMenu._id
                            } :
                            {
                                dishUpdateForm: this.menuItemUpdateForm,
                                type: this.currentDish.type +'s',
                                restaurantId: this.currentRestaurant._id,
                                menuId: this.currentMenu ? this.currentMenu._id : '',
                                dishId: this.currentDish._id
                            };
                        const actions = formName === 'menuForm' ? 'restaurants/UpdateSpecificMenu' : this.currentMenu ? 'restaurants/updateDishInSpecificMenu' :
                            'restaurants/updateDishInGlobalMenu';
                        await this.$store.dispatch(actions, payload);
                        if(!this.isFailure) {
                            if(this.currentMenu) {
                                let menuIndex = this.currentRestaurant.menus.findIndex((menu) => menu._id === this.currentMenu._id);
                                let dishIndex = this.currentRestaurant.menus[menuIndex][this.currentDish.type + 's'].findIndex((item) => item._id === this.currentDish._id);
                                this.selectedDish = this.currentRestaurant.menus[menuIndex][this.currentDish.type + 's'][dishIndex];
                            } else {
                                let dishIndex = this.currentRestaurant.menu.findIndex((item) => item._id === this.currentDish._id);
                                this.selectedDish = this.currentRestaurant.menu[dishIndex];
                            }
                            this.isDialogVisible = false;
                            this.$message.success({
                                duration: 2000,
                                showClose: true,
                                dangerouslyUseHTMLString: true,
                                message: '<span class="notification-message">Your item has been successfully updated</span>'
                            });
                        } else {
                            this.$message.error({
                                showClose: true,
                                dangerouslyUseHTMLString: true,
                                message: '<span class="notification-message">' + this.isFailure + '</span>'
                            });
                        }
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-aside {
        background-color: white;
    }

    .dish-img {
        width: 15rem;
        height: 15rem;
    }

    .dish-details-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .edit-button {
        background-color: black;
        padding: 0;
    }

    .el-container i {
        color: #16a32b;
        margin: 0;
    }

    .menu-info, .item-info {
        display: flex !important;
        justify-content: space-around;
        align-items: center;
    }

    .menu-info .name {
        font-weight: bold;
    }

    .menu-info .price {
        font-style: italic;
    }
</style>
