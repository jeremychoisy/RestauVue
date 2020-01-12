<template>
    <el-card>
        <Table/>
    </el-card>
</template>

<script>
    import Table from '../components/Table'

    export default {
        name: "mainPage",
        components: {
            Table
        }
    }
</script>

<style scoped>
 .el-card {
     background-color: #fff;
 }
</style>
