/*
La página https://petstore.swagger.io/ proporciona la documetación sobre apis de una "PetStore".
Utilizando un software para pruebas de servicio REST realiza las siguientes pruebas,
identificando las entradas, capturando las salidas, test, variables, etc, en cada uno de los siguientes casos:

1. Añadir una mascota a la tienda.
2. Consultar la mascota ingresada previamente (Busqueda por ID)
3. Actualizar el nombre de la mascota y el estatus de la mascota a "sold"
4. Consultar la mascota modificada por estatus (Busqueda por estatus)
*/

describe("PetStore", () => {
  it ("POST /pet", () => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/pet",
      body: {
        id: 1,
        name: "Dog",
        photoUrls: [],
        tags: [],
        status: "available"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.name).to.eq("Dog");
      expect(response.body.status).to.eq("available");
    });
  });

  it ("GET /pet/{petId}", () => {
    cy.request("GET", "https://petstore.swagger.io/v2/pet/1").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.name).to.eq("Dog");
      expect(response.body.status).to.eq("available");
    });
  });

  it ("PUT /pet", () => {
    cy.request({
      method: "PUT",
      url: "https://petstore.swagger.io/v2/pet",
      body: {
        id: 1,
        name: "Dunkan",
        photoUrls: [],
        tags: [],
        status: "sold"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.name).to.eq("Dunkan");
      expect(response.body.status).to.eq("sold");
    });
  });

  it("GET /pet/{petId}", () => {
    cy.request("GET", "https://petstore.swagger.io/v2/pet/1").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(1);
        expect(response.body.name).to.eq("Dunkan");
        expect(response.body.status).to.eq("sold");
      }
    );
  });

  it("GET /pet/findByStatus", () => {
    cy.request(
      "GET",
      "https://petstore.swagger.io/v2/pet/findByStatus?status=sold"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
      const soldPet = response.body.find((pet) => pet.status === "sold");
      expect(soldPet).to.exist;
      expect(soldPet.id).to.eq(1);
      expect(soldPet.name).to.eq("Dunkan");
      expect(soldPet.status).to.eq("sold");
    });
  });
});
