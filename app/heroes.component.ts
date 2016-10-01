import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html'
})

export class HeroesComponent implements OnInit {
    selectedHero: Hero;
    heroes: Hero[];

    constructor(
        private heroService: HeroService,
        private router:Router
    ) {
        console.log('AppComponent init')
    }

    ngOnInit() {
        this.getHeroes();
        console.log('AppComponent.OnInit called');
    }

    onSelect = (hero: Hero): void => {
        this.selectedHero = hero;
    };

    add = (heroName: string) => { 
        heroName = heroName.trim();
        if (!heroName) return;
        this.heroService.create(heroName)
            .then(hero => { 
                this.heroes.push(hero);
                this.selectedHero = null;
            });

    };

    delete = (hero: Hero) => { 
        this.heroService.delete(hero.id)
            .then(() => { 
                this.heroes = this.heroes.filter(each => each.id !== hero.id);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    };

    getHeroes = (): void => {
        console.log('AppComponent.getHeroes called');
        this.heroService
            .getHeroes()
            .then(heroes => this.heroes = heroes);
    };

    gotoDetail = (): void => {
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    };

}