<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
        />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title>Wolfiex Transport</q-toolbar-title>

        <q-btn flat round>
          <q-avatar size="42px">
            <img
              src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FAC32106A784964476DEBAA3A4E0978A8C6C88F76195AC4F83DBFCD232991ECD/scale?width=96&format=png"
            />
          </q-avatar>
          <q-menu fit max-height="100%">
            <div class="row no-wrap q-pa-md items-center">
              <q-avatar>
                <img
                  src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FAC32106A784964476DEBAA3A4E0978A8C6C88F76195AC4F83DBFCD232991ECD/scale?width=96&format=png"
                />
              </q-avatar>

              <div class="text-subtitle1 q-pl-md">Walfen</div>
            </div>
            <q-separator />
            <q-list style="min-width: 250px">
              <q-item clickable v-close-popup to="/account">
                <q-item-section avatar>
                  <q-icon color="primary" name="account_circle" />
                </q-item-section>

                <q-item-section>Mi cuenta</q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="dark_mode" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Modo oscuro</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle
                    color="blue"
                    v-model="darkMode"
                    @update:model-value="updateDarkMode"
                    val="dark-mode"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon color="primary" name="logout" />
                </q-item-section>

                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!--      Sidebar        -->

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <div class="q-pa-md" style="max-width: 350px">
        <q-toolbar class="bg-red text-white shadow-2">
          <q-toolbar-title>TMB</q-toolbar-title>
        </q-toolbar>

        <q-list bordered>
          <q-item class="q-my-sm" clickable v-ripple to="/tmb/metro">
            <q-item-section avatar>
              <q-avatar size="50px" text-color="white" icon="subway" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Metro</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple to="/bus">
            <q-item-section avatar>
              <q-avatar size="50px" text-color="white" icon="directions_bus" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Bus</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    let darkModeEnabled = $q.dark.isActive;
    if ($q.localStorage.has("darkMode")) {
      const darkModeStorage = $q.localStorage.getItem("darkMode");
      darkModeEnabled = darkModeStorage;
      $q.dark.set(darkModeEnabled);
    } else {
      $q.localStorage.set("darkMode", $q.dark.isActive);
    }

    const darkMode = ref(darkModeEnabled);

    function updateDarkMode() {
      $q.dark.set(darkMode.value);
      $q.localStorage.set("darkMode", darkMode.value);
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      darkMode,
      updateDarkMode,
    };
  },
};
</script>
