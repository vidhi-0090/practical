<template>
    <div>
        <select :id="selectId" ref="selectElement" multiple>
            <slot></slot>
        </select>
    </div>
</template>

<script setup>
import "select2/dist/css/select2.css";

import { ref, onMounted, defineProps } from "vue";


const { selectId } = defineProps(["selectId"]);
const selectElement = ref(null);

onMounted(() => {
    jQuery(selectElement.value).select2({
        placeholder: "Select an Interest",
        allowClear: true,
    });
});
</script>
