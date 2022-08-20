## NOTES

- Lambdas are in amplify/backend/function/XXX
- To update the cloud: `amplify push`
- To create a new API: `amplify add api`
- To develop Lambda functions locally via the console: `amplify function invoke bggApiLambda`
- It will use the `amplify/backend/function/bggApiLambda/src/event.json`

---

## Todo

- Figure out how to run Lambdas locally here for development
- How does the template.json match with the template.yml?
- DONE Add bggApi API: Will be for doing the calls to the BGG API
- Add bggwanttoplayAPI API: Will be for all things that I want to do after the BGG API, includes connecction to the DB that I setup.
- Figure out how to connect the DB into bggHelperApi
