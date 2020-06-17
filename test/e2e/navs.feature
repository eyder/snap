Feature: Using data-snap-target on a nav makes it's links load content inside the current page
  As a developer
  I want to change the behavior of every link inside a nav
  So that they load content inside the current page instead of loading another page in user browser

  Scenario: Using data-snap-target on a nav so that it's links load content on the current page
    Given the page has a nav with data-snap-target "#load-here" and a link inside
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
