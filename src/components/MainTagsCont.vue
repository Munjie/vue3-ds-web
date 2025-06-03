<template>
    <div class="tabs">
        <el-tag v-for="(item,index) in tabs"
                :key="index"
                :label="item.label"
                :name="item.index"
                :icon="item.icon"
                :path="item.path"
                :closable="item.index !== 'Home'"
                :effect="route.name===item.label?'dark':'plain'"
                @click="handleTagClick(item)"
                @close="handleTagClose(item,index)"
                round
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script lang="ts" setup>
import{ effect, ref ,computed} from "vue"
import { useRoute ,useRouter } from "vue-router";
import { useAllDataStore } from '@/store';



const store = useAllDataStore();

const tabs=computed(() => store.getTabsData());
const route=useRoute()
const router=useRouter()
const handleTagClick = (item) => {
    router.push(item.index)
    store.setTabsData(item);

};
const handleTagClose = (item,index) => {
    // pinia 删除数据
    store.removeTagsData(item);
    // 如果点击关闭不是当前标签，则不执行路由跳转
    if(route.name !==item.label){
        return
    }
    if(index===store.getTabsData().length)
    {
        router.push(store.getTabsData()[index-1].index)
    }
    else
    {
        router.push(store.getTabsData()[index].index)
    }


}


</script>
<style scoped>
.tabs{
    margin: 20px 0 0 20px;
}
.el-tag{
    margin-right: 10px;
}
</style>