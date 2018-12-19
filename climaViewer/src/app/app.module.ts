import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TestTableComponent } from './test-table/test-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LiveWeatherComponent } from './live-weather/live-weather.component';
import { HistoricalComponent } from './historical/historical.component';
import { AboutComponent } from './about/about.component';
import { NewCityComponent } from './new-city/new-city.component';

// Restfull Service
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { LocationService } from './location.service';
import { WeatherRecordService } from './weather-record.service';
import { WeatherService } from './weather.service';

const appRoutes: Routes = [
  { path: 'liveWeather', component: LiveWeatherComponent },
  { path: 'historical', component: HistoricalComponent },
  { path: 'about', component: AboutComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TestTableComponent,
    DashboardComponent,
    LiveWeatherComponent,
    HistoricalComponent,
    AboutComponent,
    NewCityComponent,
    TestComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [LocationService, WeatherRecordService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
