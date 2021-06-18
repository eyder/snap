Feature: Forms

  Scenario: SNAP works on forms with GET method
    Given the page has a form with data-append-to "#load-here" and method "GET"
    And the form has an "message" text input with value "hello"
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I submit the form
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
    And the form submission method is "GET"
    And the form submission data contains message=hello

  Scenario: SNAP works on forms with POST method
    Given the page has a form with data-append-to "#load-here" and method "POST"
    And the form has an "message" text input with value "hello"
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I submit the form
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
    And the form submission method is "POST"
    And the form submission data contains name="message"
    And the form submission data contains hello
