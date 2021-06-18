Feature: data-append-to data tag

  Scenario: data-append-to loads response as the last child of the element found with querySelector
    Given the page has a link with data-append-to "#comments"
    And the page has a "comments" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "comments"

  Scenario: data-append-to loads only on the first element found with querySelector
    Given the page has a link with data-append-to ".load-here"
    And the page has a "div-one" div with class "load-here"
    And the page has a "div-two" div with class "load-here"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" as a child of "div-one"
    And I don't see a "p" as a child of "div-two"

  Scenario: data-append-to makes no change on the current page if nothing is found with querySelector
    Given the page has a link with data-append-to "#load-nowhere"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I don't see a "p"
    And I see a "div" with content "initial content"
