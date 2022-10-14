<template>
    <h1 class="author">Jacem Chaieb {{ counter }} </h1>
</template>

<script setup lang="ts">

import { useState, useCookie } from "nuxt/app";

const counter = useState('counter', () => 1)
const colorMode = useCookie<String>('color-mode');

alert(colorMode || "default");
alert(counter);
</script>
