export default [
  {
    path: 'Chatter',
    load: () => import(/* webpackChunkName: "p_chatter" */ '@/pages/Chatter'),
    componentName: 'chatter',
    index: undefined,
    id: 'Chatter',
    exact: true,
    exports: ["default"],
  },{
    path: '',
    load: () => import(/* webpackChunkName: "p_index" */ '@/pages/index'),
    componentName: 'index',
    index: true,
    id: 'index',
    exact: true,
    exports: ["default"],
  },
];
