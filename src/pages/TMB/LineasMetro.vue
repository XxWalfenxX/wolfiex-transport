<template>
  <div class="q-pa-md">
    <div class="row flex-center q-gutter-md">
      <div class="col col-md-8">
        <q-table
          flat
          bordered
          title="Lineas de Metro"
          :rows="state.rows"
          :columns="state.columns"
          row-key="name"
          binary-state-sort
          :pagination="initialPagination"
          :grid="$q.screen.xs"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="this.$router.push('/tmb/metro/'+props.row.properties.NOM_LINIA)">
              <q-td key="nombre" :props="props">
                <q-avatar
                  font-size="19px"
                  rounded
                  text-color="white"
                  :style="
                    (background =
                      'background: #' +
                      props.row.properties.COLOR_LINIA +
                      ' !important')
                  "
                >
                  {{ props.row.properties.NOM_LINIA }}
                </q-avatar>
              </q-td>
              <q-td key="origen" :props="props">
                {{ props.row.properties.ORIGEN_LINIA }}
              </q-td>
              <q-td key="destino" :props="props">
                <div class="text-pre-wrap">
                  {{ props.row.properties.DESTI_LINIA }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col col-md-8" v-if="tablaInfo">
        <q-table
          flat
          bordered
          title="Lineas de Metro"
          :rows="state.rows"
          :columns="state.columns"
          row-key="name"
          binary-state-sort
          :pagination="initialPagination"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombre" :props="props">
                <q-avatar
                  font-size="19px"
                  rounded
                  text-color="white"
                  :style="
                    (background =
                      'background: #' +
                      props.row.properties.COLOR_LINIA +
                      ' !important')
                  "
                >
                  {{ props.row.properties.NOM_LINIA }}
                </q-avatar>
              </q-td>
              <q-td key="origen" :props="props">
                {{ props.row.properties.ORIGEN_LINIA }}
              </q-td>
              <q-td key="destino" :props="props">
                <div class="text-pre-wrap">
                  {{ props.row.properties.DESTI_LINIA }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import getLineasMetro from "src/TMB/Metro.js";

export default defineComponent({
  name: "LineasMetro",

  setup() {
    let tablaInfo = false
    const state = reactive({
      rows: [],
      columns: [
        {
          name: "nombre",
          label: "Nombre de línea",
          style: "min-width: 2em; width: 5em",
          field: (rows) => rows.properties.NOM_LINIA,
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10),
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
      state.rows = v.features;
    });

    return {
      tablaInfo,
      onRowClick: (row) => {
        alert(`${row.properties.NOM_LINIA} clicked`);
        tablaInfo = true
      },
      state,
      initialPagination: {
        sortBy: "nombre",
      },
    };
  },
});
</script>
