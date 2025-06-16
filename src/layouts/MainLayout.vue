<template>
    <div class="main-layout">
        <!-- <header class="main-header">
            <slot name="header">
                <h1>Chat App</h1>
            </slot>
        </header> -->
        <main class="md:grid grid-cols-[0.2fr_1fr] sm:flex p-4">
            <slot />
        </main>
    </div>
</template>

<script setup>
    // No script logic needed for basic layout
</script>

<style scoped></style>
