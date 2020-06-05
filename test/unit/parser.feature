Feature: Parsing content received from server
  As a SNAP developer
  I want to ask for a list of nodes (elements, texts, comments) parsed from server response
  So that I can load them on a target

  Scenario: Server response has a body tag with one node
    Given the server response has a "p" with content "p loaded by SNAP!"
    When I visit a page
    And I ask for the parsed nodes of the server response
    Then I get 1 items as result
    And I get a "p" as item number 1

  Scenario: Server response has a body tag with all types of node
    Given the server response has a "p" with content "p loaded by SNAP!"
    And the server response has a comment "comment loaded by SNAP!"
    And the server response has the text "text loaded by SNAP!"
    When I visit a page
    And I ask for the parsed nodes of the server response
    Then I get 3 items as result
    And I get a "p" as item number 1
    And I get a comment as item number 2
    And I get a text as item number 3

  Scenario: Server response has no body tag
    Given the server response is "<html></html>"
    When I visit a page
    And I ask for the parsed nodes of the server response
    Then I get 0 items as result

  Scenario: Server response has only text
    Given the server response is "simple text"
    When I visit a page
    And I ask for the parsed nodes of the server response
    Then I get an error

  Scenario: Server response has no content
    Given the server response is ""
    When I visit a page
    And I ask for the parsed nodes of the server response
    Then I get an error
