import { Routes } from "@angular/router";
import { SearchFlight } from "./pages/search-flight/search-flight";
import { BookFlight } from "./pages/book-flight/book-flight";

export const FLIGHT_ROUTES: Routes = [
  { 
    path: 'search', 
    component: SearchFlight
  },
  { 
    path: 'book/:id', 
    component: BookFlight 
  }
];