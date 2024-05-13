# VotingApplication

The task is to create voting app (as per mock). User should be able to add candidates and voters and then select candidate & voter in order to cast a vote.
FE part can be done in any way (web, desktop or even a console, functionality matters) - for BE devs
FE part should contain functionalities as visible on mock - might look completely different though - for fullstack devs
The two sections can be either on single page or separate ones. Important part is to make sure that both tables and dropdowns are always up to date - eg. when casting a vote the Votes counter should be updated and 'has voted' flag for a proper voter should be changed as well.
Please push and publish your complited task to GitHub and share it with us.

UI: http://localhost:4200/
API: https:localhost:7133/

Database is written in MySQL. Need to run migration 
Add-Migration InitialMigration
Update-Database

To run UI: 
npm install
ng serve
