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

  Scenario: When data-snap-target points to more than one element, the first one is returned as the target
    Given the page has a link with data-snap-target ".load-here"
    And the page has a "div-one" div with class "load-here"
    And the page has a "div-two" div with class "load-here"
    When I visit the page
    And I ask for the target of the link
    Then I get a "div" with id "div-one" as result

  Scenario: A link with data-snap-mode prepend returns prepend mode
    Given the page has a link with data-snap-target "#load-here" and data-snap-mode "prepend"
    And the page has a "load-here" div
    When I visit the page
    And I ask for the mode of the link
    Then I get "prepend" as result
