<template>
  <div class="q-pa-md">
    <q-table
      title="Lineas de Metro"
      :rows="state.rows"
      :columns="state.columns"
      row-key="nombre"
    />
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import getLineasMetro from "src/TMB/Metro.js";

export default defineComponent({
  name: "LineasMetro",

  setup() {
    const state = reactive({
      rows: [],
      columns: [
        {
          name: "nombre",
          label: "Nombre de línea",
          field: (rows) => rows.properties.NOM_LINIA,
          align: "left",
          sortable: true,
          sortOrder: "ad",
        },
        {
          name: "origen",
          label: "Origen",
          field: (rows) => rows.properties.ORIGEN_LINIA,
          align: "left",
          sortable: true,
          sortOrder: "ad",
        },
        {
          name: "destino",
          label: "Destino",
          field: (rows) => rows.properties.DESTI_LINIA,
          align: "left",
          sortable: true,
          sortOrder: "ad",
        },
      ],
    });

    getLineasMetro().then((v) => {
      console.log(v.features);
      state.rows = v.features;
    });
    return {
      state,
    };
  },
});
</script>
