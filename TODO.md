## NOTES

- Lambdas are in amplify/backend/function/XXX
- To update the cloud: `amplify push`
- To create a new API: `amplify add api`
- To develop Lambda functions locally via the console: `amplify function invoke bggApiLambda`
- It will use the `amplify/backend/function/bggApiLambda/src/event.json`
- Real DB: wantToPlayDynDb with table wantToPlayTbl

---

## Todo

- DONE Figure out how to run Lambdas locally here for development
- DONE How does the template.json match with the template.yml?
- DONE Add bggApi API: Will be for doing the calls to the BGG API
- Wanted to remove the old DynamoDB called wantToPlayDynamo but couldn't figure it out quickly
- Add wantToPlayAPI API: Will be for all things that I want to do after the BGG API, includes connecction to the DB that I setup.
- DONE POST Endpoint
  - isPlayed: boolean
  - bggId: string
  - notes: string
  - playDate: string
  - userId: string
- In UI for POST, get rid of dummy data
- PATCH endpoint (scoped by user)
  - Payload will allowed to be isPlayed, bggId, notes, playDate
  - Get current item in the DB by bggId and userId === context.userId
- DELETE endpoint (scoped by user)
- DONE GET one endpoint (scoped by user)
- DONE GET ALL endpoint (scoped by user)
- DONE Figure out how to connect the DB into wantToPlayAPI: want-to-play is path
- DONE How do I get a user ID that I can use in the app?
