<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col col-md-6">
        <q-timeline color="secondary">
          <q-timeline-entry v-if="!state.loading" heading>
            <q-avatar
              size="100px"
              font-size="50px"
              text-color="white"
              :style="
                (background =
                  'background: #' +
                  state.parada[0].properties.COLOR_REC +
                  ' !important')
              "
            >
              {{ state.parada[0].properties.NOM_LINIA }}
            </q-avatar>
          </q-timeline-entry>
          <q-timeline-entry v-if="!state.loading" heading class="desc-linea">
            {{ state.parada[0].properties.DESC_LINIA }}
          </q-timeline-entry>

          <q-timeline-entry
            v-for="parada in state.parada.sort(
              (a, b) => a.properties.ORDRE - b.properties.ORDRE
            )"
            :key="parada.id"
            :title="parada.properties.NOM_PARADA"
            color="red"
          >
          <div class="q-pa-md q-gutter-sm">
            <template v-for="corresp in state.corresp" :key="corresp.id">
                <q-avatar
                v-if="
                  parada.properties.CODI_PARADA ===
                  corresp.properties.CODI_PARADA
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
import { getParadasBus, getCorrespParadasBus } from "src/TMB/Bus";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DetalleLineaBus",

  setup() {
    const route = useRoute();

    const state = reactive({
      parada: [],
      corresp: [],
      loading: true,
    });

    getParadasBus(route.params.id).then((v) => {
      state.parada = v.features;
      state.loading = false;
      console.log(v.features);
      getCorrespParadasBus(route.params.id).then((v) => {
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
