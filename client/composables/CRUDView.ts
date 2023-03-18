import BaseApiService from "~~/services/BaseApiService";
import { usePendingStore } from "~~/stores/pageSettings";
import { ApiError, PagingConfig } from "~~/types/api";
import { Dict } from "~~/types/datastructures";

export function useListDestroyView<T>(service: BaseApiService){
    const items = ref<T[]>([]);
    const filters = ref<Dict>();
    const paging = ref<PagingConfig>({page: 1, perPage: undefined});
    const sortBy = ref<Dict>();
    const pendingStore = usePendingStore();
    const errorInfo = ref<ApiError | undefined>();

    const getData = async () => {
        try{
            errorInfo.value = undefined;
            pendingStore.sub();
            const { data } = await service.list(filters.value, paging.value, sortBy.value);
            items.value = data;
        }catch(e){
            errorInfo.value = e as ApiError;
        }finally{
            pendingStore.unsub();
        }
    }

    const deleteData = async (id: any) => {
        try{
            errorInfo.value = undefined;
            pendingStore.sub();
            await service.destroy(id);
            
            const index = items.value.findIndex(it => it.id == id);
            if(index > -1) items.value.splice(index, 1);
        }catch(e){
            errorInfo.value = e as ApiError;
        }finally{
            pendingStore.unsub();
        }
    }

    return { items, pending: pendingStore.pending, errorInfo, getData, deleteData, paging, sortBy };
}