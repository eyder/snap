Feature: Asking for the target of an element
  As a SNAP developer
  I want to ask for the target of an element
  So that I can change the target's content when data is received from the server

  Scenario: A link with data-snap-target pointing to a single element on the page
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "dont-load-here" div
    And the page has a "load-here" div
    When I visit the page
    And I ask for the target of the link
    Then I get a "div" with id "load-here" as result
