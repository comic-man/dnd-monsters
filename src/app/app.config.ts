import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './routing/routing.component';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';

const uri = 'https://www.dnd5eapi.co/graphql' ; // Replace with the GraphQL endpoint

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }]
  };



