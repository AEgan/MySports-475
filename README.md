MySports-475
============

A sports dashboard web applcication developed by Alex Egan, Jon Lazarowicz, and Varun Murali
as a final project for 67-475, the senior capstone project course for the Information Systems
program at Carnegie Mellon University.

It is a Sinatra web application that uses MongoDB to cache responses from SportsData LLC's APIs.
To start the app, run

```
bundle exec ruby app.rb
```

as running wihtout bundle exec may not use the correst sports_data_api gem.

This uses a fork of the sports_data_api ruby gem, which can be found [here](https://github.com/AEgan/sports_data_api)
This project will eventually be using a separate ruby gem to get the sports statistics.

