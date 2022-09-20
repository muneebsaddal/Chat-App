const num = Math.floor(Math.random() * 10000 + 1);
const username = "test".concat(num);
const email = "test".concat(num).concat("@gmail.com");

/* eslint-disable no-undef */
describe("Register, Set Avatar and Login user", () => {
	it("Register User", () => {
		cy.visit("http://localhost:3000/register");
		cy.get("input#username").type(username);
		cy.get("input#email").type(email);
		cy.get("input#password").type("qweqweqwe");
		cy.get("input#confirmPassword").type("qweqweqwe");
		cy.get("button#register-button").click();
	});

	it("Set Avatar", () => {
		cy.get(".avatar").first().click();
		cy.get("button#submitButton").click();
		cy.get("button#submitButton").click();
	});

	it("Logout User", () => {
		cy.get(".contact").first().click();
		cy.get("button#logoutButton").click();
		cy.visit("http://localhost:3000/");
		cy.url().should("eq", "http://localhost:3000/login");
	});

	it("Login User", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("input#username").type(username);
		cy.get("input#password").type("qweqweqwe");
		cy.get("button#loginButton").click();
		cy.get(".contact").first().click();
		cy.get("button#logoutButton").click();
	});
});
