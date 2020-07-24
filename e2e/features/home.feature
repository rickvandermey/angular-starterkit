# Duration: 00:00:00.800

Feature: Hello world Feature

	A user should see the Hello World message

	Scenario: Hello world scenario
		Given User enters the flow

	@skip
	Scenario Outline: Server error: <description> for the Session call
		Given The "<scenario>" Scenario for "translations"
		When User enters the flow
		Then It should show an Error notification
		And Error Notification should contain "<message>"
		And It should show the 404 Page
		Examples:
			| scenario            | description     | message                                                    |
			| 400                 | Bad Request     | Unfortunately something went wrong. Please try again later |
			| 500                 | Server Error    | Unfortunately something went wrong. Please try again later |
			| 504                 | Gateway Timeout | Unfortunately something went wrong. Please try again later |
