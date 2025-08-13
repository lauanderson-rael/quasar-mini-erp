import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "painel",
        component: () => import("pages/IndexPage.vue"),
      },

      {
        path: "/categorias",
        name: "categorias",
        component: () => import("pages/categorias/Categorias.vue"),
      },
      // rotas clientes
      {
        path: "/clientes",
        name: "clientes",
        component: () => import("pages/clientes/Clientes.vue"),
      },

      {
        path: "/cliente/novo",
        component: () => import("pages/clientes/NewCliente.vue"),
      },
      {
        path: "cliente/editar/:id",
        component: () => import("pages/clientes/EditCliente.vue"),
      },
      // rotas fornecedores
      {
        path: "/fornecedores",
        component: () => import("pages/fornecedores/Fornecedores.vue"),
      },
      {
        path: "/fornecedor/novo",
        component: () => import("pages/fornecedores/NewFornecedor.vue"),
      },
      {
        path: "fornecedor/editar/:id",
        component: () => import("pages/fornecedores/EditFornecedor.vue"),
      },
      // rotas produtos
       {
        path: "/produtos",
        component: () => import("pages/produtos/Produtos.vue"),
      },
      {
        path: "/produto/novo",
        component: () => import("pages/produtos/NewProduto.vue"),
      },
      {
        path: "produto/editar/:id",
        component: () => import("pages/produtos/EditProduto.vue"),
      },
      // rotas notas saida
      {
        path: "/notas_saida",
        component: () => import("pages/notas_saida/NotasSaida.vue"),
      },

      {
        path: "/nota_saida/nova",
        component: () => import("pages/notas_saida/NewNotaSaida.vue"),
      },
      {
        path: "/nota_saida/editar/:id",
        component: () => import("pages/notas_saida/EditNotaSaida.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/login/Login.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
