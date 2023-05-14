export default [
  {
    path: 'Rechatter',
    load: () => import(/* webpackChunkName: "p_rechatter" */ '@/pages/Rechatter'),
    componentName: 'rechatter',
    index: undefined,
    id: 'Rechatter',
    exact: true,
    exports: [],
  },{
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
