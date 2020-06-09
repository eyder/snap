Feature: Links with data-snap-target attribute load content on the current page
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

  Scenario: Using data-snap-mode on a link to prepend loaded content on target element
    Given the page has a link with data-snap-target "#load-here" and data-snap-mode "prepend"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "first" child of "load-here"
    And I see the text "initial content" as the "last" child of "load-here"

  Scenario: Using data-snap-mode on a link to append loaded content on target element
    Given the page has a link with data-snap-target "#load-here" and data-snap-mode "append"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see the text "initial content" as the "first" child of "load-here"
    And I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"

  Scenario: Using data-snap-mode on a link to replace the target element with the loaded content
    Given the page has a link with data-snap-target "#load-here" and data-snap-mode "replace"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!"
    And I don't see a "div"
