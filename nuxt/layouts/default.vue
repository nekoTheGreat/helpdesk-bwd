<template>
    <ClientOnly>
        <NavBar></NavBar>
        <template #fallback>
            <!-- this will be rendered on server side -->
            <div class="w-100 bg-primary text-center text-white">Loading navbar...</div>
        </template>
    </ClientOnly>
    <div class="container-fluid">
        <slot />
    </div>
</template>