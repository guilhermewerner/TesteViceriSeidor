
import { Component, OnInit } from '@angular/core';
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
    heroiForm: FormGroup;
    mensagemErro: string;

    constructor(private backendApi: ApiService, private modalService: NgbModal, private formBuilder: FormBuilder) {
        this.herois = [];
        this.superpoderes = [];
        this.mensagemErro = "";

        this.heroiForm = this.formBuilder.group({
            id: [null],
            nome: [null, Validators.required],
            nomeHeroi: [null, Validators.required],
            dataNascimento: [null, Validators.required],
            altura: [null, Validators.required],
            peso: [null, Validators.required],
            superpoderes: this.formBuilder.array([]),
        });
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

        // Preencher os superpoderes individualmente
        const superpoderesFormArray = this.heroiForm.get('superpoderes') as FormArray;

        this.superpoderes.forEach(superpoder => {
            const temSuperpoder = heroi.superpoderes.some(sp => sp.id === superpoder.id);

            // Verifique se o FormControl já existe
            const superpoderControl = this.getSuperpoderControl(superpoder.id);

            if (superpoderControl) {
                superpoderControl.patchValue(temSuperpoder);
            } else {
                // Adicione um novo FormControl ao FormArray se ainda não existir
                superpoderesFormArray.push(this.formBuilder.control(temSuperpoder));
            }
        });
    }

    onSubmit() {
        const heroiData: Heroi = this.heroiForm.value;

        // Obtenha os superpoderes do formulário
        const superpoderesFormArray = this.heroiForm.get('superpoderes') as FormArray;
        const superpoderesSelecionados = this.superpoderes
            .filter((superpoder, index) => superpoderesFormArray.at(index).value);

        console.log({ superpoderesSelecionados });

        // Adicione os superpoderes selecionados ao herói
        heroiData.superpoderes = superpoderesSelecionados.map(superpoder => {
            return superpoder as Superpoder;
        });

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
                this.modalService.open(content, { centered: true, size: 'lg' });
            });
        } else {
            this.heroi = new Heroi();
            this.preencherFormularioComHeroi(this.heroi);
            this.modalService.open(content, { centered: true, size: 'lg' });
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
        this.heroiForm = this.formBuilder.group({
            id: [null],
            nome: [null, Validators.required],
            nomeHeroi: [null, Validators.required],
            dataNascimento: [null, Validators.required],
            altura: [null, Validators.required],
            peso: [null, Validators.required],
            superpoderes: this.formBuilder.array([]),
        });

        this.atualizarHerois();
        this.atualizarSuperpoderes();
        this.inicializarSuperpoderesFormArray();
    }

    atualizarSuperpoderes() {
        this.backendApi.obterPoderes().subscribe((superpoderes) => {
            this.superpoderes = superpoderes;
        });
    }

    atualizarHerois() {
        this.backendApi.obterHerois().subscribe((herois) => {
            this.herois = herois;
        });
    }

    inicializarSuperpoderesFormArray() {
        const superpoderesFormArray = this.heroiForm.get('superpoderes') as FormArray;

        this.superpoderes.forEach(superpoder => {
            superpoderesFormArray.push(this.formBuilder.control(false));
        });
    }

    getSuperpoderControl(superpoderId: number) {
        return (this.heroiForm.get('superpoderes') as FormGroup).get(superpoderId.toString()) as FormControl;
    }
}
