import { BaseEntity, User } from './../../shared';

export const enum Sexe {
    'MASCULIN',
    'FEMININ',
    'AUTRE'
}

export class Randonneur implements BaseEntity {
    constructor(
        public id?: number,
        public prenom?: string,
        public nom?: string,
        public sexe?: Sexe,
        public dateDeNaissance?: any,
        public tel?: string,
        public vma?: number,
        public poids?: number,
        public participant?: User,
        public marcheurs?: BaseEntity[],
        public envoyeurs?: BaseEntity[],
    ) {
    }
}
