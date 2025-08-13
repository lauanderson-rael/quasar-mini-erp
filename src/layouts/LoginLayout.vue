<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="container fluid">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>


<script>

import { defineComponent } from 'vue';

defineComponent({
  name: 'LoginLayout'
});

</script>
