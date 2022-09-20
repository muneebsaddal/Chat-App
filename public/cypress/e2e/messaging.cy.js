/* eslint-disable no-undef */
describe("Message sync tests", () => {
	it("Login", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("input#username").type("messagingTester");
		cy.get("input#password").type("qweqweqwe");
		cy.get("button#loginButton").click();
	});

	it("Message sent test", () => {
		cy.get(".contact").contains("messageTester1").click();
		cy.get("input#inputMessage").type("test message");
		cy.get("button#sendMessage").click();
		cy.get(".content").last().contains("test message");
		cy.get("button#logoutButton").click();
	});

	it("Message received test", () => {
		cy.get("input#username").type("messageTester1");
		cy.get("input#password").type("qweqweqwe");
		cy.get("button#loginButton").click();
		cy.get(".contact").contains("messagingTester").click();
		cy.get(".content").last().contains("test message");
		cy.get("button#logoutButton").click();
	});
});
