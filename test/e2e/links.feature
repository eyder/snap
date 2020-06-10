Feature: Using data-snap-target on a link makes it load content inside the current page
  As a developer
  I want to change the behavior of links on a page
  So that they load content inside the current page instead of loading another page in user browser

  Scenario: Using data-snap-target on a link to load content on the current page
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"

  Scenario: Invalid data-snap-target makes no change on the current page
    Given the page has a link with data-snap-target "#load-nowhere"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I don't see a "p"
    And I see a "div" with content "initial content"
