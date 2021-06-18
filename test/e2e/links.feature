Feature: Links

  Scenario: When the user clicks on a child of a link, it works as if the click was on the link
    Given the page has a link with data-append-to "#load-here"
    And the link has a span inside
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the span
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
