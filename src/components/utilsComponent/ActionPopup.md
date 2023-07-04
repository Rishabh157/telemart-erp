# ........... ActionPopup used for........

# It seems like you're looking for documentation on how to implement an action popup in a listing view. Based on the information provided, here's a guide to help you with the implementation:

# Importing ActionPopover:

# In your code, make sure to import the necessary dependencies for ActionPopover. The specific import statement may vary depending on your framework or library. Here's an example:

# import { ActionPopover } from 'your-library';

# handleOnAction:

# This function is responsible for handling the click event when the three dots button is clicked. It should typically take an ID or some identifier for the clicked row as a parameter. You can implement it like this:

# const handleOnAction = () => {

# // Perform actions based on the clicked row ID

# // For example, open the action popover or trigger other functionality

# };

# isEdit:

# This prop is a boolean value indicating whether the "Edit" button should be shown in the action popover. If it's true, you need to define a handler function for the edit event. Here's an example:

# const isEdit = true;

# const handleEditActionButton = () => {

# // Handle the edit action for the row with the given ID

# };

# isView:

# Similar to isEdit, isView is a boolean prop that determines whether the "View" button should be displayed in the action popover. If it's true, you # should define a handler function for the view event. Here's an example:

# const isView = true;

# const handleViewActionButton = () => {

# // Handle the view action for the row with the given ID

# };

# Once you have defined the necessary functions and props, you can integrate them into your listing wrapper component. This could involve mapping over # your data and rendering the action popover for each row.

#

# Please note that the provided implementation is a general guide based on the information you provided. The specific implementation may vary depending on # your code structure, framework, or library you are using -->

# for example

# Based on the code snippet you provided, it seems like you are trying to implement an action popup in a listing view. Here's an explanation of the different parts of the code:

# isEdit: This is a boolean prop that determines whether the "Edit" button should be shown in the action popup. If it's true, the "Edit" button will be displayed.

# isDelete: This is another boolean prop that determines whether the "Delete" button should be shown in the action popup. If it's true, the "Delete" button will be displayed.

# handleEditActionButton: This is a function that is called when the "Edit" button is clicked in the action popup. In your provided code, it navigates to a specific scheme using navigate(/scheme/${currentId}).

# handleDeleteActionButton: This is a function that is called when the "Delete" button is clicked in the action popup. In your provided code, it shows a confirmation dialog and handles the delete action based on the user's response.

# handleOnAction: This is a function that is responsible for handling the click event when the three dots button (or any trigger for the action popup) is #clicked. In your provided code, it toggles the visibility of the action popup, sets the current ID, and performs any other necessary actions.
