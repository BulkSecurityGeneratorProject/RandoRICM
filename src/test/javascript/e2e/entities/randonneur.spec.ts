import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Randonneur e2e test', () => {

    let navBarPage: NavBarPage;
    let randonneurDialogPage: RandonneurDialogPage;
    let randonneurComponentsPage: RandonneurComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Randonneurs', () => {
        navBarPage.goToEntity('randonneur');
        randonneurComponentsPage = new RandonneurComponentsPage();
        expect(randonneurComponentsPage.getTitle())
            .toMatch(/randoRicmApp.randonneur.home.title/);

    });

    it('should load create Randonneur dialog', () => {
        randonneurComponentsPage.clickOnCreateButton();
        randonneurDialogPage = new RandonneurDialogPage();
        expect(randonneurDialogPage.getModalTitle())
            .toMatch(/randoRicmApp.randonneur.home.createOrEditLabel/);
        randonneurDialogPage.close();
    });

    it('should create and save Randonneurs', () => {
        randonneurComponentsPage.clickOnCreateButton();
        randonneurDialogPage.setPrenomInput('prenom');
        expect(randonneurDialogPage.getPrenomInput()).toMatch('prenom');
        randonneurDialogPage.setNomInput('nom');
        expect(randonneurDialogPage.getNomInput()).toMatch('nom');
        randonneurDialogPage.sexeSelectLastOption();
        randonneurDialogPage.setDateDeNaissanceInput(12310020012301);
        expect(randonneurDialogPage.getDateDeNaissanceInput()).toMatch('2001-12-31T02:30');
        randonneurDialogPage.setTelInput('tel');
        expect(randonneurDialogPage.getTelInput()).toMatch('tel');
        randonneurDialogPage.setVmaInput('5');
        expect(randonneurDialogPage.getVmaInput()).toMatch('5');
        randonneurDialogPage.setPoidsInput('5');
        expect(randonneurDialogPage.getPoidsInput()).toMatch('5');
        randonneurDialogPage.participantSelectLastOption();
        // randonneurDialogPage.marcheurSelectLastOption();
        // randonneurDialogPage.envoyeurSelectLastOption();
        randonneurDialogPage.save();
        expect(randonneurDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RandonneurComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-randonneur div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RandonneurDialogPage {
    modalTitle = element(by.css('h4#myRandonneurLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    prenomInput = element(by.css('input#field_prenom'));
    nomInput = element(by.css('input#field_nom'));
    sexeSelect = element(by.css('select#field_sexe'));
    dateDeNaissanceInput = element(by.css('input#field_dateDeNaissance'));
    telInput = element(by.css('input#field_tel'));
    vmaInput = element(by.css('input#field_vma'));
    poidsInput = element(by.css('input#field_poids'));
    participantSelect = element(by.css('select#field_participant'));
    marcheurSelect = element(by.css('select#field_marcheur'));
    envoyeurSelect = element(by.css('select#field_envoyeur'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPrenomInput = function(prenom) {
        this.prenomInput.sendKeys(prenom);
    };

    getPrenomInput = function() {
        return this.prenomInput.getAttribute('value');
    };

    setNomInput = function(nom) {
        this.nomInput.sendKeys(nom);
    };

    getNomInput = function() {
        return this.nomInput.getAttribute('value');
    };

    setSexeSelect = function(sexe) {
        this.sexeSelect.sendKeys(sexe);
    };

    getSexeSelect = function() {
        return this.sexeSelect.element(by.css('option:checked')).getText();
    };

    sexeSelectLastOption = function() {
        this.sexeSelect.all(by.tagName('option')).last().click();
    };
    setDateDeNaissanceInput = function(dateDeNaissance) {
        this.dateDeNaissanceInput.sendKeys(dateDeNaissance);
    };

    getDateDeNaissanceInput = function() {
        return this.dateDeNaissanceInput.getAttribute('value');
    };

    setTelInput = function(tel) {
        this.telInput.sendKeys(tel);
    };

    getTelInput = function() {
        return this.telInput.getAttribute('value');
    };

    setVmaInput = function(vma) {
        this.vmaInput.sendKeys(vma);
    };

    getVmaInput = function() {
        return this.vmaInput.getAttribute('value');
    };

    setPoidsInput = function(poids) {
        this.poidsInput.sendKeys(poids);
    };

    getPoidsInput = function() {
        return this.poidsInput.getAttribute('value');
    };

    participantSelectLastOption = function() {
        this.participantSelect.all(by.tagName('option')).last().click();
    };

    participantSelectOption = function(option) {
        this.participantSelect.sendKeys(option);
    };

    getParticipantSelect = function() {
        return this.participantSelect;
    };

    getParticipantSelectedOption = function() {
        return this.participantSelect.element(by.css('option:checked')).getText();
    };

    marcheurSelectLastOption = function() {
        this.marcheurSelect.all(by.tagName('option')).last().click();
    };

    marcheurSelectOption = function(option) {
        this.marcheurSelect.sendKeys(option);
    };

    getMarcheurSelect = function() {
        return this.marcheurSelect;
    };

    getMarcheurSelectedOption = function() {
        return this.marcheurSelect.element(by.css('option:checked')).getText();
    };

    envoyeurSelectLastOption = function() {
        this.envoyeurSelect.all(by.tagName('option')).last().click();
    };

    envoyeurSelectOption = function(option) {
        this.envoyeurSelect.sendKeys(option);
    };

    getEnvoyeurSelect = function() {
        return this.envoyeurSelect;
    };

    getEnvoyeurSelectedOption = function() {
        return this.envoyeurSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
