import { NoteModificationComponent } from './note-de-frais/note-modification/note-modification.component';
import { MissionModifComponent } from './missions/mission-modif/mission-modif.component';
import { NatureMissionsComponent } from './nature-missions/nature-missions.component';
import { ValidationMissionsComponent } from './validation-missions/validation-missions.component';
import { MissionDemandeComponent } from './missions/mission-demande/mission-demande.component';
import { MissionsComponent } from './missions/missions.component';
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
  // /tech accessible uniquement si connecté
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] },
  { path: 'connexion', component: AuthComponent },
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService] },
  { path: 'planning-missions', component: PlanningMissionsComponent, canActivate: [StatutConnecteService] },
  { path: 'primes', component: PrimesComponent, canActivate: [StatutConnecteService] },
  { path: 'note-de-frais', component: NoteDeFraisComponent, canActivate: [StatutConnecteService] },
  // /validation-mission accessible si manager ou admin
  { path: 'validation-missions', component: ValidationMissionsComponent, canActivate: [StatutConnecteService] },
  // /nature-missions accessible si admin
  { path: 'nature-missions', component: NatureMissionsComponent, canActivate: [StatutConnecteService] },
  { path: 'gestion-missions', component: MissionsComponent, canActivate: [StatutConnecteService] },
  { path: 'traitement-missions', component: NatureMissionsComponent, canActivate: [StatutConnecteService] },
  { path: 'mission-demande', component: MissionDemandeComponent, canActivate: [StatutConnecteService] },
  { path: 'mission-modification', component: MissionModifComponent, canActivate: [StatutConnecteService] },
  { path: 'note-modification/:uuid', component: NoteModificationComponent, canActivate: [StatutConnecteService] },
  { path: '', redirectTo: '/tech', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
