const routes = [
  {
    title: "DogHub",
    component: "Home",
    path: "/",
    exact: true,
  },
  {
    title: "DogHub - Detalhes",
    component: "Post",
    path: "/visualizar/:id",
    exact: true,
  },
  {
    title: "DogHub - Minha lista de adoções",
    component: "AdoptionList",
    path: "/lista-adocao",
    exact: true,
  },
];

export default routes;
