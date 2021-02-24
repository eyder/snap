Feature: Loading class

  Scenario: Loading is added to the element loaded by a links while their requests are pending
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    And I see that "#load-here" has the class "loading"

  Scenario: Loading is added to the element loaded by forms while their requests are pending
    Given the page has a form with data-snap-target "#load-here" and method "GET"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I submit the form
    And I see that "#load-here" has the class "loading"

  Scenario: Loading is kept on the element when a second request is made while the first is pending
    Given the page has a link with data-snap-target "#load-here"
    Given the page has a form with data-snap-target "#load-here" and method "GET"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    And I submit the form
    And I see that "#load-here" has the class "loading"

  Scenario: Loading is removed when loading completes
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    When I visit the page
    And I click on the link
    And I see that "#load-here" doesn't have the class "loading"
