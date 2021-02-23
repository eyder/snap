Feature: Adding css classes to target and trigger elements for loading feedback

  Scenario: While waiting for response, the trigger and target elements receive a loading css class
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    Then I see that the link has the class "snap-loading"
    And I see that "#load-here" has the class "snap-loading"

  Scenario: When two triggers point to the same target, only the last one keeps the loading css class
    Given the page has a link with data-snap-target "#load-here"
    Given the page has a form with data-snap-target "#load-here" and method "GET"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    And I submit the form
    Then I see that the link doesn't have the class "snap-loading"
    Then I see that the form has the class "snap-loading"
    And I see that "#load-here" has the class "snap-loading"

  Scenario: When two triggers point to different targets, both keep the loading css class
    Given the page has a link with data-snap-target "#load-here1"
    Given the page has a form with data-snap-target "#load-here2" and method "GET"
    And the page has a "load-here1" div
    And the page has a "load-here2" div
    And the server response has the text "text loaded by SNAP!"
    And the response takes too long
    When I visit the page
    And I click on the link
    And I submit the form
    Then I see that the link has the class "snap-loading"
    Then I see that the form has the class "snap-loading"
    And I see that "#load-here1" has the class "snap-loading"
    And I see that "#load-here2" has the class "snap-loading"

  Scenario: When loading completes, the loading css class should not be present in trigger and target elements
    Given the page has a link with data-snap-target "#load-here"
    And the page has a "load-here" div
    And the server response has the text "text loaded by SNAP!"
    When I visit the page
    And I click on the link
    Then I see that the link doesn't have the class "snap-loading"
    And I see that "#load-here" doesn't have the class "snap-loading"
