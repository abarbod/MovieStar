import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent  {
  movies = [{title: 'test'}];
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;  
  isMovieClicked = false; 
  selectedMovie;

  constructor(private api: ApiService) {
    this.getMovies();
    this.selectedMovie = {id: -1, title: '' , desc: '', year: '' };
    
  }
  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  movieClicked = (movie) => {
    this.api.getOneMovie(movie.id).subscribe(
      data => {
        this.selectedMovie = data;
        this.isMovieClicked = true; 


      },
      error => {
        console.log(error);
      }
    );
  }
  updateMovie = () => {
    this.api.updateMovie(this.selectedMovie).subscribe(
      data => {
        this.getMovies();
        this.onClear();
        this.isMovieClicked = false; 

      },
      error => {
        console.log(error);
      }
    );
  }
  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe(
      data => {
        this.movies.push(data);
        this.onClear();
        this.isMovieClicked = false; 

      },
      error => {
        console.log(error);
      }
    );
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.isMovieClicked = false; 

  }

  deleteMovie = () => {
    this.api.deleteMovie(this.selectedMovie.id).subscribe(
      data => {
        this.getMovies();
        this.onClear();
        this.isMovieClicked = false; 

      },
      error => {
        console.log(error);
      }
    );
  }
  
}

