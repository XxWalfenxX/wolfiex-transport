<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col col-md-6">
        <q-timeline color="secondary">
          <q-timeline-entry v-if="!state.loading" heading>
            <q-avatar
              size="100px"
              font-size="50px"
              rounded
              text-color="white"
              :style="
                (background =
                  'background: #' +
                  state.linea[0].properties.COLOR_LINIA +
                  ' !important')
              "
            >
              {{ state.linea[0].properties.NOM_LINIA }}
            </q-avatar>
          </q-timeline-entry>
          <q-timeline-entry v-if="!state.loading" heading class="desc-linea">
            {{ state.linea[0].properties.DESC_SERVEI }}
          </q-timeline-entry>

          <q-timeline-entry
            v-for="parada in state.linea.sort(
              (a, b) => a.properties.ORDRE_ESTACIO - b.properties.ORDRE_ESTACIO
            )"
            :key="parada.id"
            :title="parada.properties.NOM_ESTACIO"
            color="red"
          >
          <div class="q-pa-md q-gutter-sm">
            <template v-for="corresp in state.corresp" :key="corresp.id">
                <q-avatar
                v-if="
                  parada.properties.CODI_ESTACIO ===
                  corresp.properties.CODI_ESTACIO
                "
                  size="30px"
                  font-size="15px"
                  rounded
                  text-color="white"
                  :style="
                    (background =
                      'background: #' +
                      corresp.properties.COLOR_LINIA +
                      ' !important')
                  "
                >
                  {{ corresp.properties.NOM_LINIA }}
                </q-avatar>
            </template>
          </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { getEstacionesMetro, getCorrespLineaMetro } from "src/TMB/Metro";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DetalleLineaMetro",

  setup() {
    const route = useRoute();

    const state = reactive({
      linea: [],
      corresp: [],
      loading: true,
    });

    getEstacionesMetro(route.params.id).then((v) => {
      state.linea = v.features;
      state.loading = false;
      getCorrespLineaMetro(route.params.id).then((v) => {
        state.corresp = v.features;
      });
    });

    return {
      state,
    };
  },
});
</script>
<style>
.desc-linea .q-timeline__heading-title {
  padding-top: 0;
}
</style>
