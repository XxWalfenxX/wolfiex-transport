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
          :visible-columns="['nombre', 'origen', 'destino']"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="onRowClick(props.row)">
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
              <q-td key="orden" :props="props">
                <div class="text-pre-wrap">
                  {{ props.row.properties.ORDRE_LINIA }}
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
import { getLineasMetro } from "src/TMB/Metro.js";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LineasMetro",

  setup() {
    const router = useRouter();
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
        {
          name: "orden",
          label: "orden",
          field: (rows) => rows.properties.ORDRE_LINIA,
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
      onRowClick: (row) => {
        router.push("/tmb/metro/" + row.properties.CODI_LINIA);
      },
      state,
      initialPagination: {
        sortBy: "orden",
      },
    };
  },
});
</script>
