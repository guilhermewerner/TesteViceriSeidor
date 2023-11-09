import { Superpoder } from "./superpoder.model";

export class Heroi {
    id: number | null;
    nome: string | null;
    nomeHeroi: string | null;
    dataNascimento: Date | null;
    altura: number | null;
    peso: number | null;
    superpoderes: Superpoder[];

    constructor() {
        this.id = null;
        this.nome = null;
        this.nomeHeroi = null;
        this.dataNascimento = null;
        this.altura = null;
        this.peso = null;
        this.superpoderes = [];
    }
}
