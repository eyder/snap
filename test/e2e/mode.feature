Feature: Using data-snap-mode to specify the position where content should be loaded
  As a developer
  I want to be able to specify the position where content should be loaded relative to target element
  So that I can decide how the current page should be changed after user interactions

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

  Scenario: Invalid data-snap-mode on a link makes no change on the current page
    Given the page has a link with data-snap-target "#load-here" and data-snap-mode "invalid"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "div" with content "initial content"
    And I don't see a "p"
