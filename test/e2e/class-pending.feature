Feature: Pending class

  Scenario: Pending is added to links while their requests are pending
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    Then I see that the link has the class "pending"

  Scenario: Pending is added to forms while their requests are pending
    Given the page has a form with data-append-to "#load-here" and method "GET"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I submit the form
    Then I see that the form has the class "pending"

  Scenario: Pending is removed from other previously pending links that load on the same element
    Given the page has a link with data-append-to "#load-here"
    Given the page has a form with data-append-to "#load-here" and method "GET"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    And I submit the form
    Then I see that the link doesn't have the class "pending"
    And I see that the form has the class "pending"

  Scenario: Pending is not removed from other previously pending links that load on a diferent element
    Given the page has a link with data-append-to "#load-here1"
    Given the page has a form with data-append-to "#load-here2" and method "GET"
    And the page has a "load-here1" div
    And the page has a "load-here2" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    And I submit the form
    Then I see that the link has the class "pending"
    And I see that the form has the class "pending"

  Scenario: Pending is removed when loading completes
    Given the page has a link with data-append-to "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see that the link doesn't have the class "pending"
