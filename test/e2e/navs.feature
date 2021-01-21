Feature: Using data-snap-target on a nav makes it's links load content inside the current page

  Scenario: Using data-snap-target on a nav so that it's links load content on the current page
    Given the page has a nav with data-snap-target "#load-here" and a link inside
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
