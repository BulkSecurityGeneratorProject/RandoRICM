import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Randonnee e2e test', () => {

    let navBarPage: NavBarPage;
    let randonneeDialogPage: RandonneeDialogPage;
    let randonneeComponentsPage: RandonneeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Randonnees', () => {
        navBarPage.goToEntity('randonnee');
        randonneeComponentsPage = new RandonneeComponentsPage();
        expect(randonneeComponentsPage.getTitle())
            .toMatch(/randoRicmApp.randonnee.home.title/);

    });

    it('should load create Randonnee dialog', () => {
        randonneeComponentsPage.clickOnCreateButton();
        randonneeDialogPage = new RandonneeDialogPage();
        expect(randonneeDialogPage.getModalTitle())
            .toMatch(/randoRicmApp.randonnee.home.createOrEditLabel/);
        randonneeDialogPage.close();
    });

    it('should create and save Randonnees', () => {
        randonneeComponentsPage.clickOnCreateButton();
        randonneeDialogPage.setLieuDeRDVInput('lieuDeRDV');
        expect(randonneeDialogPage.getLieuDeRDVInput()).toMatch('lieuDeRDV');
        randonneeDialogPage.setDenivelePositifInput('5');
        expect(randonneeDialogPage.getDenivelePositifInput()).toMatch('5');
        randonneeDialogPage.setDureeInput('5');
        expect(randonneeDialogPage.getDureeInput()).toMatch('5');
        randonneeDialogPage.setDateInput(12310020012301);
        expect(randonneeDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        randonneeDialogPage.save();
        expect(randonneeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RandonneeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-randonnee div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RandonneeDialogPage {
    modalTitle = element(by.css('h4#myRandonneeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    lieuDeRDVInput = element(by.css('input#field_lieuDeRDV'));
    denivelePositifInput = element(by.css('input#field_denivelePositif'));
    dureeInput = element(by.css('input#field_duree'));
    dateInput = element(by.css('input#field_date'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLieuDeRDVInput = function(lieuDeRDV) {
        this.lieuDeRDVInput.sendKeys(lieuDeRDV);
    };

    getLieuDeRDVInput = function() {
        return this.lieuDeRDVInput.getAttribute('value');
    };

    setDenivelePositifInput = function(denivelePositif) {
        this.denivelePositifInput.sendKeys(denivelePositif);
    };

    getDenivelePositifInput = function() {
        return this.denivelePositifInput.getAttribute('value');
    };

    setDureeInput = function(duree) {
        this.dureeInput.sendKeys(duree);
    };

    getDureeInput = function() {
        return this.dureeInput.getAttribute('value');
    };

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
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
