describe('Note app', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Administrator',
      username: 'admin',
      password: 'admin'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Notes');
    cy.contains('A study app, by Samuel Martins');
  });

  it('login form can be opened', () => {
    cy.contains('Sign In').click();
  });

  it('user can login', () => {
    cy.contains('Sign In').click();
    cy.get('#username').type('admin');
    cy.get('#password').type('admin');
    cy.get('#login-button').click();

    cy.contains('Login Successfull');
  });

  it('user cant login', () => {
    cy.contains('Sign In').click();
    cy.get('#username').type('gibberish');
    cy.get('#password').type('lololol');
    cy.get('#login-button').click();

    cy.contains('Login error.');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'admin', password: 'admin' });
    });

    it('a new note can be created', () => {
      cy.contains('Create Note').click();
      cy.get('#note-content-input').type('a note created by cypress');
      cy.get('#save-note-button').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'another note cypress', important: false });
      });

      it('it can be made important', () => {
        cy.contains('another note cypress')
          .contains('Set Important')
          .click();

        cy.contains('another note cypress')
          .contains('Set NOT Important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note')
          .contains('Set Important')
          .click();

        cy.contains('second note')
          .contains('Set NOT Important');
      });
    });
  });
});