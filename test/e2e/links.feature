Feature: Links with data-snap-target attribute load content on the current page
  As a developer
  I want to change the behavior of links on a page
  So that they load content inside the current page instead of loading another page in user browser

  Scenario: Using data-snap-target on a link to load content on the current page
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the link response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the last child of "load-here"
