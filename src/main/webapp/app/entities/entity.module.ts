import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RandoRicmRandonneurModule } from './randonneur/randonneur.module';
import { RandoRicmMessageModule } from './message/message.module';
import { RandoRicmRandonneeModule } from './randonnee/randonnee.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RandoRicmRandonneurModule,
        RandoRicmMessageModule,
        RandoRicmRandonneeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RandoRicmEntityModule {}
