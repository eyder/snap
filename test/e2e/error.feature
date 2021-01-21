Feature: Using data-snap-error-target on a link to show error feedback on the current page

  Scenario: Using data-snap-error-target on a link to load error content on the current page
    Given the page has a link with data-snap-target "#load-here" and data-snap-error-target "#error-here"
    And the page has a "load-here" div with content "initial content"
    And the page has a "error-here" div
    And the server response has a "p" with content "Sorry, something went wrong..."
    And the server response status is 500
    When I visit the page
    And I click on the link
    Then I see a "div" with content "initial content"
    And I see a "p" with content "Sorry, something went wrong..." as the "last" child of "error-here"

  Scenario: When there is no data-snap-error-target on a link, error content is not loaded
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div with content "initial content"
    And the server response has a "p" with content "Sorry, something went wrong..."
    And the server response status is 500
    When I visit the page
    And I click on the link
    Then I see a "div" with content "initial content"
    And I don't see a "p"

