import { NatureMissionsComponent } from './nature-missions/nature-missions.component';
import { ValidationMissionsComponent } from './validation-missions/validation-missions.component';
import { GestionMissionsComponent } from './gestion-missions/gestion-missions.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthComponent } from './auth/auth.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PlanningMissionsComponent } from './planning-missions/planning-missions.component';
import { PrimesComponent } from './primes/primes.component';
import { NoteDeFraisComponent } from './note-de-frais/note-de-frais.component';


const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'connexion', component: AuthComponent },
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService] },
  { path: 'gestion-missions', component: GestionMissionsComponent },
  { path: 'planning-missions', component: PlanningMissionsComponent },
  { path: 'primes', component: PrimesComponent },
  { path: 'note-de-frais', component: NoteDeFraisComponent },
  { path: 'validation-missions', component: ValidationMissionsComponent }, // /validation-mission accessible si manager
  { path: 'nature-missions', component: NatureMissionsComponent }, // /nature-missions accessible si admin
  { path: '', redirectTo: '/tech', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
