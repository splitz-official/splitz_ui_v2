## Project structure

We will be following the basic react native structure defined on this webpage (https://www.waldo.com/blog/react-native-project-structure)

1. UI or Presentation Layer. Represents all the components or UI elements the user interacts with like buttons, popups, text, etc.
2. Logic Layer. Responsible for maintaining your core business logic. It's also responsible for all the events and managing the interactions with the presentation layer.
3. API Layer. Responsible for all the back-end interactions. This is where your app makes API calls to a database server or an external web service.

### Basically how to do this is simple:

1. you first define a visual UI component that you want the user to interact with.
2. next you define the logic that will be executed when the user interacts with the UI component. This is usually done in the form of a function that is called when the user interacts with the UI component (button press, text input, etc).
3. finally, you define the API call that will be made when a certain piece of logic is executed. This is usually done in the form of a function that is called when the logic is executed.

### So the flow is like this:

1. The user interacts with ui component
2. logic is executed
3. API call is made

Notice how you can mix and match the UI components, logic, and API calls to create a complex app. **_We want to minimize the amount of repeated code and maximize the amount of reusable code._**
