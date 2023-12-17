describe('test burger constructor', () => {
  //loading page
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('should open ingredient details and show correct data in modal then close', () => {
    // "Краторная булка N-200i"
    cy.get('[data-test-id="643d69a5c3f7b9001cfa093c"]').click('center');
    cy.get('[data-test="modal"]').should('exist');
    cy.url().should('contain', '/ingredients/643d69a5c3f7b9001cfa093c');
    cy.get('[data-test="ingredient-details-image"]').should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02-large.png');
    cy.get('[data-test="ingredient-details-name"]').should('have.text', 'Краторная булка N-200i');
    cy.get('[data-test="ingredient-details-calories"]').should('have.text', '420');
    cy.get('[data-test="ingredient-details-proteins"]').should('have.text', '80');
    cy.get('[data-test="ingredient-details-fat"]').should('have.text', '24');
    cy.get('[data-test="ingredient-details-carbohydrates"]').should('have.text', '53');
    cy.get('[data-test="modal-close-btn"]').click('center');
    cy.get('[data-test="modal"]').should('not.exist');
  });


  it('should drag and drop ingredients into constructor and send order', () => {
    const dataTransfer = new DataTransfer();

    // Конструктор
    cy.get('[data-test="constructor"]').as('constructor');
    // "Краторная булка N-200i"
    cy.get('[data-test-id="643d69a5c3f7b9001cfa093c"]').as('bunA');
    // "Соус традиционный галактический"
    cy.get('[data-test-id="643d69a5c3f7b9001cfa0944"]').as('ingredientA');
    // "Говяжий метеорит (отбивная)"
    cy.get('[data-test-id="643d69a5c3f7b9001cfa0940"]').as('ingredientB');
    // "Сыр с астероидной плесенью"
    cy.get('[data-test-id="643d69a5c3f7b9001cfa094a"]').as('ingredientC');


    // Перетаскиваем bunA в конструктор
    cy.get('@bunA').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    // Перетаскиваем ingredientA в конструктор
    cy.get('@ingredientA').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    // Перетаскиваем ingredientB в конструктор
    cy.get('@ingredientB').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    // Перетаскиваем ingredientC в конструктор
    cy.get('@ingredientC').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    // Проверка суммы заказа
    cy.get('[data-test="total-cost"]').should('contain.text', '9667');
    // Кнопка должна быть активной
    cy.get('[data-test="place-order"]').find('button').as('place-order-btn');
    cy.get('@place-order-btn').should('not.be.disabled');
    // Нажатие на кнопку перенаправляет на страницу авторизации
    cy.get('@place-order-btn').click('center');
    cy.url().should('contain', '/login');
    // Вводим E-mail
    cy.get('input[name=email]').type('shadowscorpion@inbox.ru');
    // Вводим пароль
    cy.get('input[name=password]').type('derparol');
    // Нажатие на кнопку Войти перенаправляет на страницу конструктора
    cy.get('[data-test="login-form"]').find('button').click('center');
    cy.location().should((loc) => expect(loc.pathname).to.eq('/'));
    cy.get('@place-order-btn').click('center');
    // Должно открыться модальное окно с номером заказа
    cy.get('[data-test="modal"]', { timeout: 21000 }).should('exist');
    cy.get('[data-test="order-number"]', { timeout: 21000 }).should('exist');
    cy.get('[data-test="modal-close-btn"]').click('center');
    cy.get('[data-test="modal"]').should('not.exist');
    // Сумма заказа должна быть 0
    cy.get('[data-test="total-cost"]').should('contain.text', '0');
    // Кнопка должна быть заблокированной
    cy.get('[data-test="place-order"]').find('button').should('be.disabled');
  });

})