Feature: data-load-on data tag

  Scenario: data-load-on replaces inner html of the element found with querySelector with the response
    Given the page has a link with data-load-on "#details"
    And the page has a "details" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see only a "p" with content "loaded by SNAP!" inside "details"

  Scenario: data-load-on loads only on the first element found with querySelector
    Given the page has a link with data-load-on ".load-here"
    And the page has a "div-one" div with class "load-here"
    And the page has a "div-two" div with class "load-here"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" as a child of "div-one"
    And I don't see a "p" as a child of "div-two"

  Scenario: data-load-on makes no change on the current page if nothing is found with querySelector
    Given the page has a link with data-load-on "#load-nowhere"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I don't see a "p"
    And I see a "div" with content "initial content"
