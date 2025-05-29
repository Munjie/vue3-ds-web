
import { ComponentCustomProperties } from 'vue';
import HttpClient from '@/utils/http';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        // @ts-ignore
        $http: HttpClient;
    }
}
