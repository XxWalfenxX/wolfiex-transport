const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/tmb/metro",
        component: () => import("src/pages/TMB/LineasMetro.vue"),
      },
      {
        path: "/tmb/metro/:id",
        component: () => import("src/pages/TMB/DetalleLineaMetro.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
