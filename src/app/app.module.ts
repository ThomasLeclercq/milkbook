import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Directives
import { LazyLoadingDirective } from './directives/lazy-loading.directive';

// Pages
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

// Components
import { AppComponent } from './app.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutListComponent } from './components/layout-list/layout-list.component';
import { LayoutsTypeSelectorComponent } from './components/layouts-type-selector/layouts-type-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSelectorComponent,
    LayoutComponent,
    DashboardPageComponent,
    LayoutListComponent,
    LayoutsTypeSelectorComponent,
    LazyLoadingDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
