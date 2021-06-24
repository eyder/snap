Feature: Loding error HTML with error-bucket class

  Scenario: Errors are loaded in the first error-bucket inside the element where content would be loaded
    Given the page has a link with data-append-to pointing to the div
    And the page has a div with some initial content
    And the div has an error-bucket inside
    And the server response will be an error
    When I visit the page
    And I click on the link
    Then the error content is loaded on the error-bucket inside the div
    And the initial content is kept inside the div

  # Scenario: Errors are loaded in the first error-bucket sibling of the element where content would be loaded
  #  Then Fail

  # Scenario: Errors are loaded in the first error-bucket found on page
  #  Then Fail

  # Scenario: Errors are loaded in the first element with error-bucket class inside target element
  #  Then Fail
