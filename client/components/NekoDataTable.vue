<script setup lang="ts">
import { NekoDataTableColumn } from '~~/types/neko-components';

interface Props {
    columns: NekoDataTableColumn[],
    hideHeader?: boolean,
    items?: any[],
    emptyItemsLabel?: string,
}
const props = withDefaults(defineProps<Props>(), {
    emptyItemsLabel: 'No records',
});
const attrs = useAttrs();
</script>
<template>
    <table v-bind="attrs" class="table table-bordered">
        <thead v-if="!props.hideHeader">
            <tr>
                <th v-for="column in props.columns" :class="column.class" :style="column.style">{{ column.label }}</th>
            </tr>
        </thead>
        <tbody v-if="props.items && props.items.length == 0">
            <tr>
                <td :colspan="props.columns.length" class="text-center">{{ props.emptyItemsLabel }}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr v-for="row in props.items" :key="row">
                <td v-for="column in props.columns" :key="row + column" :class="column.class" :style="column.style">
                    <template v-if="column.slot">
                        <slot :name="column.name" :data="row" :column="column"></slot>
                    </template>
                    <template v-else>{{ row[column.name] ?? '' }}</template>
                </td>
            </tr>
        </tbody>
    </table>
</template>