Feature: Loading different types of HTML content inside the current page
  As a developer
  I want to load any kind of HTML node in the current page

  Scenario: When server response has a body tag with a text node, the text is loaded
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see the text "text loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has a body tag with a comment node, the comment is loaded
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has a comment "comment loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see the comment "comment loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has no body tag, no changes are made on the current page
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div with content "initial content"
    And the server response is "<p>invalid HTML</p>"
    When I visit the page
    And I click on the link
    Then I see a "div" with content "initial content"
    And I don't see a "p"
