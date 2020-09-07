import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TechComponent } from './tech/tech.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuComponent } from './menu/menu.component';
import { PlanningMissionsComponent } from './planning-missions/planning-missions.component';
import { PrimesComponent } from './primes/primes.component';
import { NoteDeFraisComponent } from './note-de-frais/note-de-frais.component';
import { ValidationMissionsComponent } from './validation-missions/validation-missions.component';
import { NatureMissionsComponent } from './nature-missions/nature-missions.component';
import { MissionsComponent } from './missions/missions.component';
import { MissionDemandeComponent } from './missions/mission-demande/mission-demande.component';
import { MissionModifComponent } from './missions/mission-modif/mission-modif.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoteModificationComponent } from './note-de-frais/note-modification/note-modification.component';
import { LigneDeFraisComponent } from './note-de-frais/ligne-de-frais/ligne-de-frais.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LigneSuppressionComponent } from './note-de-frais/ligne-de-frais/ligne-suppression/ligne-suppression.component';
import { ChartsModule } from 'ng2-charts';

// Calendar
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    AccueilComponent,
    MenuComponent,
    PlanningMissionsComponent,
    PrimesComponent,
    NoteDeFraisComponent,
    ValidationMissionsComponent,
    NatureMissionsComponent,
    MissionsComponent,
    MissionDemandeComponent,
    MissionModifComponent,
    NoteModificationComponent,
    LigneDeFraisComponent,
    LigneSuppressionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MaterialModule,
    BrowserAnimationsModule,
    ChartsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [LigneDeFraisComponent, LigneSuppressionComponent]
})
export class AppModule {
}
