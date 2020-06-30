Feature: Using data-snap-target on a form makes it load the result of an action inside the current page
  As a developer
  I want to change the behavior of a form
  So that they load the result of an action inside the current page instead of loading another page in user browser

  Scenario: Using data-snap-target on a form to load the result of an action on the current page
    Given the page has a form with data-snap-target "#load-here" and method "GET"
    And the form has an "message" text input with value "hello"
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I submit the form
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
    And the form submission method is "GET"
    And the form submission data contains message=hello

  Scenario: Using data-snap-target on a form to load the result of an action on the current page
    Given the page has a form with data-snap-target "#load-here" and method "POST"
    And the form has an "message" text input with value "hello"
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I submit the form
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
    And the form submission method is "POST"
    And the form submission data contains name="message"
    And the form submission data contains hello
