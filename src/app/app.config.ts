import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';

import { routes } from './app.routes';
import {ApolloClient, ApolloClientOptions, HttpLink, InMemoryCache} from '@apollo/client';
import {HttpClient} from '@angular/common/http';

const uri = 'https://www.dnd5eapi.co/api/monsters'; // Replace with the GraphQL endpoint

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}
@NgModule({
  imports: [
    HttpClient,
    ApolloClient
  ],

})
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
