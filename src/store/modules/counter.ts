// src/store/counter.ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore(
    "counter",
    () => {
        // ref变量 → state 属性
        const count = ref(0);
        // computed计算属性 → getters
        const double = computed(() => {
            return count.value * 2;
        });
        // function函数 → actions
        function increment() {
            count.value++;
        }

        return { count, double, increment };
    },
    {
        persist: {
            storage: localStorage, // 可以是 localStorage, sessionStorage 或 window.localStorage
            pick: ["count"], // 数据持久化数组
            key: "useCounterStore", // 状态的键名
        },
    },
);