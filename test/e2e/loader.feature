Feature: Loading different types of HTML content

  Scenario: When server response has a body tag with a text node, the text is loaded
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see the text "text loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has a body tag with a comment node, the comment is loaded
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div
    And the server response has a comment "comment loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see the comment "comment loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has no body tag, content is loaded correctly
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div with content "initial content"
    And the server response is "<p>loaded by SNAP!</p>"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has DOCTYPE, content is loaded correctly
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div with content "initial content"
    And the server response is "<!DOCTYPE html><html><body><p>loaded by SNAP!</p></body></html>"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has no DOCTYPE, content is loaded correctly
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div with content "initial content"
    And the server response is "<html><body><p>loaded by SNAP!</p></body></html>"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "loaded by SNAP!" as the "last" child of "load-here"

  Scenario: When server response has two elements, both are loaded correctly
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div with content ""
    And the server response has a "p" with content "p loaded by SNAP!"
    And the server response has a "div" with content "div loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see a "p" with content "p loaded by SNAP!" as the "first" child of "load-here"
    Then I see a "div" with content "div loaded by SNAP!" as the "last" child of "load-here"
