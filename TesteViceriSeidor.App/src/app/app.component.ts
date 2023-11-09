
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'TesteViceriSeidor.App';

    herois: any[];

    constructor(private backendApi: ApiService) {
        this.herois = [];
    }

    ngOnInit() {
        this.backendApi.obterHerois().subscribe((herois) => {
            this.herois = herois;
        });
    }
}
