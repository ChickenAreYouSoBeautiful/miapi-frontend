export default [
  {icon: 'table', name: '接口文档列表', path: '/index', component: './User/Index'},
  {name: '接口详情',hideInMenu: true, path: '/index/InterfaceInfo/:id', component: './User/InterfaceInfo', routes: [{layout: false}]},
  {path: '/user', name: '用户', layout: false, routes: [{path: '/user/login', component: './User/Login'}]},
  {path: '/account', routes: [{path: '/account/center', component: './User/Center'}]},
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理页',
    routes: [
      {path: '/admin/InterFaceList' ,name: '接口管理', component: './Admin/InterfaceList'},
      {path: '/admin/analyse', name: '接口分析', component: './Admin/Analyse'},
    ],
  },
  {path: '/', name: '接口文档列表', redirect: '/index', layout: false},
  {path: '*', layout: false, component: './404'},
];
