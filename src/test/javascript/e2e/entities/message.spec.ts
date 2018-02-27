import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Message e2e test', () => {

    let navBarPage: NavBarPage;
    let messageDialogPage: MessageDialogPage;
    let messageComponentsPage: MessageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Messages', () => {
        navBarPage.goToEntity('message');
        messageComponentsPage = new MessageComponentsPage();
        expect(messageComponentsPage.getTitle())
            .toMatch(/randoRicmApp.message.home.title/);

    });

    it('should load create Message dialog', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage = new MessageDialogPage();
        expect(messageDialogPage.getModalTitle())
            .toMatch(/randoRicmApp.message.home.createOrEditLabel/);
        messageDialogPage.close();
    });

    it('should create and save Messages', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage.setIdRandonneeInput('5');
        expect(messageDialogPage.getIdRandonneeInput()).toMatch('5');
        messageDialogPage.setIdRandonneurInput('5');
        expect(messageDialogPage.getIdRandonneurInput()).toMatch('5');
        messageDialogPage.setLongitudeInput('5');
        expect(messageDialogPage.getLongitudeInput()).toMatch('5');
        messageDialogPage.setLatitudeInput('5');
        expect(messageDialogPage.getLatitudeInput()).toMatch('5');
        messageDialogPage.setDateHeureInput(12310020012301);
        expect(messageDialogPage.getDateHeureInput()).toMatch('2001-12-31T02:30');
        messageDialogPage.getSOSInput().isSelected().then((selected) => {
            if (selected) {
                messageDialogPage.getSOSInput().click();
                expect(messageDialogPage.getSOSInput().isSelected()).toBeFalsy();
            } else {
                messageDialogPage.getSOSInput().click();
                expect(messageDialogPage.getSOSInput().isSelected()).toBeTruthy();
            }
        });
        messageDialogPage.setFreqCardiaqueInput('5');
        expect(messageDialogPage.getFreqCardiaqueInput()).toMatch('5');
        messageDialogPage.save();
        expect(messageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MessageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-message div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MessageDialogPage {
    modalTitle = element(by.css('h4#myMessageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idRandonneeInput = element(by.css('input#field_idRandonnee'));
    idRandonneurInput = element(by.css('input#field_idRandonneur'));
    longitudeInput = element(by.css('input#field_longitude'));
    latitudeInput = element(by.css('input#field_latitude'));
    dateHeureInput = element(by.css('input#field_dateHeure'));
    sOSInput = element(by.css('input#field_sOS'));
    freqCardiaqueInput = element(by.css('input#field_freqCardiaque'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdRandonneeInput = function(idRandonnee) {
        this.idRandonneeInput.sendKeys(idRandonnee);
    };

    getIdRandonneeInput = function() {
        return this.idRandonneeInput.getAttribute('value');
    };

    setIdRandonneurInput = function(idRandonneur) {
        this.idRandonneurInput.sendKeys(idRandonneur);
    };

    getIdRandonneurInput = function() {
        return this.idRandonneurInput.getAttribute('value');
    };

    setLongitudeInput = function(longitude) {
        this.longitudeInput.sendKeys(longitude);
    };

    getLongitudeInput = function() {
        return this.longitudeInput.getAttribute('value');
    };

    setLatitudeInput = function(latitude) {
        this.latitudeInput.sendKeys(latitude);
    };

    getLatitudeInput = function() {
        return this.latitudeInput.getAttribute('value');
    };

    setDateHeureInput = function(dateHeure) {
        this.dateHeureInput.sendKeys(dateHeure);
    };

    getDateHeureInput = function() {
        return this.dateHeureInput.getAttribute('value');
    };

    getSOSInput = function() {
        return this.sOSInput;
    };
    setFreqCardiaqueInput = function(freqCardiaque) {
        this.freqCardiaqueInput.sendKeys(freqCardiaque);
    };

    getFreqCardiaqueInput = function() {
        return this.freqCardiaqueInput.getAttribute('value');
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
