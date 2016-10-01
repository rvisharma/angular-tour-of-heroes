import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

    private heroesurl = 'app/heroes';

    getHeroes = (): Promise<Hero[]> => {
        return this.http.get(this.heroesurl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    };

    private handleError(ex) {
        console.log('Error Occured', ex);
        return Promise.reject(ex.error || ex);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }

    getHero = (id: number): Promise<Hero> => {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    update = (hero: Hero) => {
        const url = `${this.heroesurl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    };

    create = (name: string): Promise<Hero> => { 
        return this.http.post(this.heroesurl, JSON.stringify({ name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    };

    delete = (heroID: number) => { 
        const url = `${this.heroesurl}/${heroID}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    constructor(private http: Http) {
        console.log('HeroService init');
    }
}