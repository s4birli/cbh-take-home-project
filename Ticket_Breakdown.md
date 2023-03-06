# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**** Assumption DataBase is MSSQL ****

- Ticket 1: Agent Model should be modify
New field should be implanted to Agent Model in the code. New property name should called CustomAgentId. It has to be string value. (So facilities can given any value to agents). This new property is required. 

Estimated Point: 2 points.
Acceptance Criteria: Database schema should be able to save custom agent id.

Acceptance Criteria: New property in the Agent model is required, therefore validation should be added to property and property type set string with maximum length 20. 



- Ticket 2: Modify Agent Table in Database
Add a new column to Agent Table in Database with CustomAgentId. Since we add new nullable column to Agent Table, please put space ("") to all rows.

Estimated Point: 2 points.

Acceptance Criteria: Database schema should be able to save custom agent id with unique value.



- Ticket 3: Modify Agent Save Function
We need to change our data saving function to accepting CustomAgentId and saves the database (Agent Table).

Estimated Point: 3 points.

Acceptance Criteria: CustomAgentId is required value. We should make sure that CustomAgentId can not be null value. We need to add validation on the code. Since Old Agents data have no custom agent id, with new custom agent id provided we should update the agent data. 



- Ticket 4: Modify `getShiftsByFacility`
Modify the `getShiftsByFacility` to make sure new column (CustomAgentId) data is included in.

Estimated Point: 2 points.

Acceptance Criteria: When `getShiftsByFacility` function is called make sure include the CustomAgentId data in the return data.




- Ticket 5: Modify `generateReport`
Modify the `generateReport` to make sure new column (CustomAgentId) data is included in.

Estimated Point: 2 points.

Acceptance Criteria: We need new column (CustomAgentId) data in the `generateReport` function to print the reports with new information.




- Ticket 6: Modify Data Save UI.
We need to modify Agent Data Saving Screen. When facility is saving agent information, they should add their own custom agent id in. 

Estimated Point: 3 points.

Acceptance Criteria: This new input should have validation so it can not be null value. Also we should make sure this new data sends to backend to call function properly. 
