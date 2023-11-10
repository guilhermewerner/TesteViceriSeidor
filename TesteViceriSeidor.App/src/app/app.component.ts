
import { Component, OnInit, QueryList, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Heroi } from './models/heroi.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { Superpoder } from './models/superpoder.model';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'TesteViceriSeidor.App';
    heroi: any;
    herois: any[];
    superpoderes: any[];
    heroiForm!: FormGroup;
    mensagemErro: string;

    modalRef: any;

    constructor(private backendApi: ApiService, private modalService: NgbModal, private formBuilder: FormBuilder) {
        this.herois = [];
        this.superpoderes = [];
        this.mensagemErro = "";
    }

    preencherFormularioComHeroi(heroi: Heroi) {
        this.heroiForm.patchValue({
            id: heroi.id,
            nome: heroi.nome,
            nomeHeroi: heroi.nomeHeroi,
            dataNascimento: heroi.dataNascimento,
            altura: heroi.altura,
            peso: heroi.peso,
        });

        this.superpoderes.forEach(superpoder => {
            const controle = this.heroiForm.get(`superpoder${superpoder.id}`);

            if (!controle) {
                this.heroiForm.addControl(`superpoder${superpoder.id}`, this.formBuilder.control(false, Validators.required));
            } else {
                controle.patchValue(false);
            }
        });

        if (heroi.superpoderes) {
            heroi.superpoderes.forEach(superpoder => {
                const controle = this.heroiForm.get(`superpoder${superpoder.id}`);

                if (controle) {
                    controle.patchValue(true);
                }
            });
        }
    }

    onSubmit() {
        let heroiData: Heroi = this.heroiForm.value;
        let poderesSelecionados: Superpoder[] = [];

        this.superpoderes.forEach(superpoder => {
            const controle = this.heroiForm.get(`superpoder${superpoder.id}`);
            if (controle && controle.value) {
                poderesSelecionados.push(superpoder);
            }
        });

        heroiData.superpoderes = poderesSelecionados;

        if (heroiData.id) {
            this.backendApi.atualizarHeroi(heroiData).subscribe({
                next: (heroi) => {
                    this.atualizarHerois();
                    this.fecharModals();
                },
                error: (erro) => { }
            });
        } else {
            this.backendApi.criarHeroi(heroiData).subscribe({
                next: (heroi) => {
                    this.heroi = heroi;
                    this.atualizarHerois();
                    this.fecharModals();
                },
                error: (erro) => { }
            });
        }
    }

    excluirHeroi(heroiId: number) {
        this.backendApi.excluirHeroi(heroiId).subscribe({
            next: (heroi) => {
                this.atualizarHerois();
            },
            error: (erro) => { }
        });
    }

    openModal(content: any, heroiId: number | null) {
        if (heroiId) {
            this.backendApi.obterHeroi(heroiId).subscribe((heroi) => {
                this.heroi = heroi;
                this.preencherFormularioComHeroi(this.heroi);
                this.modalRef = this.modalService.open(content, { centered: true, size: 'lg' });
            });
        } else {
            this.heroi = new Heroi();
            this.preencherFormularioComHeroi(this.heroi);
            this.modalRef = this.modalService.open(content, { centered: true, size: 'lg' });
        }
    }

    mostrarModalErro(mensagem: string) {
        this.mensagemErro = mensagem;
        this.modalService.open(undefined, { centered: true, size: 'sm' });
    }

    fecharModals() {
        this.modalService.dismissAll();
    }

    ngOnInit() {
        this.atualizarHerois();
        this.atualizarSuperpoderes();
    }

    atualizarSuperpoderes() {
        this.backendApi.obterPoderes().subscribe((superpoderes) => {
            this.superpoderes = superpoderes;

            const poderControls: any = {};

            this.superpoderes.forEach(superpoderes => {
                poderControls[`superpoder${superpoderes.id}`] = [false, Validators.required];
            });

            this.heroiForm = this.formBuilder.group({
                id: [null],
                nome: [null, Validators.required],
                nomeHeroi: [null, Validators.required],
                dataNascimento: [null, Validators.required],
                altura: [null, Validators.required],
                peso: [null, Validators.required],
                ...poderControls
            });
        });
    }

    atualizarHerois() {
        this.backendApi.obterHerois().subscribe((herois) => {
            this.herois = herois;
        });
    }
}
