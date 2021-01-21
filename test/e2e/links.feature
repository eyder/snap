Feature: Using data-snap-target on a link makes it load content on the current page

  Scenario: Using data-snap-target on a link to load content on the current page
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When data-snap-target points to more than one element, the content is loaded on the first one
    Given the page has a link with data-snap-target ".load-here"
    And the page has a "div-one" div with class "load-here"
    And the page has a "div-two" div with class "load-here"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "div-one"

  Scenario: Invalid data-snap-target makes no change on the current page
    Given the page has a link with data-snap-target "#load-nowhere"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I don't see a "p"
    And I see a "div" with content "initial content"

  Scenario: When the user clicks on a child of the link, it works as if the click was on the link
    Given the page has a link with data-snap-target "#load-here"
    And the link has a span inside
    And the page has a "load-here" div
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the span
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"
