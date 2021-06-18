Feature: Navs

  Scenario: SNAP works on navs as if it was added to their links
    Given the page has a nav with data-append-to "#load-here" and a link inside
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
