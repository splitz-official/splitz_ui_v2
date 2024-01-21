# Splitz UI V2

This is just a re-do of the splitz v1 UI because the code is was really messy. There was no structure.

## Project structure

In this version I will be following the ui -> logic -> api structure.

We will be following the basic react native structure defined on this webpage (https://www.waldo.com/blog/react-native-project-structure)

1. UI or Presentation Layer. Represents all the components or UI elements the user interacts with like buttons, popups, text, etc.
2. Logic Layer. Responsible for maintaining your core business logic. It's also responsible for all the events and managing the interactions with the presentation layer.
3. API Layer. Responsible for all the back-end interactions. This is where your app makes API calls to a database server or an external web service.

### Basically how to do this is simple:

1. you first define a visual ui component that you want the user to interact with.
2. next you define the logic that will be executed when the user interacts with the ui component. This is usally done in the form of a function that is called when the user interacts with the ui component (button press, text input, etc).
3. finally, you define the api call that will be made when a certain peice of logic is executed. This is usally done in the form of a function that is called when the logic is executed.

### So the flow is like this:

1. user interacts with ui component
2. logic is executed
3. api call is made

Notice how you can mix and match the ui components, logic, and api calls to create a complex app. **_We want to minimize the amount of repeated code and maximize the amount of reusable code._**
