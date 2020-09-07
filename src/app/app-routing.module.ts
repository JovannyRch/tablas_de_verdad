import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '/',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'contenido/:indice/:tema',
    loadChildren: () => import('./pages/contenido/contenido.module').then(m => m.ContenidoPageModule)
  },
  {
    path: 'memoria',
    loadChildren: () => import('./pages/memoria/memoria.module').then(m => m.MemoriaPageModule)
  },
  {
    path: 'repositorio',
    loadChildren: () => import('./pages/repositorio/repositorio.module').then(m => m.RepositorioPageModule)
  },
  {
    path: 'resultado',
    loadChildren: () => import('./pages/resultado/resultado.module').then(m => m.ResultadoPageModule)
  },
  {
    path: 'resultado/:desc',
    loadChildren: () => import('./pages/resultado/resultado.module').then(m => m.ResultadoPageModule)
  },
  {
    path: 'temas',
    loadChildren: () => import('./pages/temas/temas.module').then(m => m.TemasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
