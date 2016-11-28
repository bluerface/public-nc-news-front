## Spec

### Technologies Used;
ES6, babel  
Webpack  
node  

react  
redux  
react-redux  
redux-thunk  
GET, POST, PUT and DELETE requests  
react-router  

### Features implemented;
###### ArticleList view;  
- Displays all articles  
- Diplays articles by topic  
- **Can up and downvote articles (inc updating server)**
- Voting has responsive UI, limits user to one vote  
- Article previews have working links to user and topic pages  

###### Article page;  
- Displays article and comments  
- Working links to user and topic pages  

###### Comments  
- Displays comments ordered by most recent  
- **Displays time since comment was posted**, up to a week ago, after which a date is displayed  
- Link to user profile  
- **Can up and downvote comments (inc updating server)**  
- Voting has responsive UI, limits user to one vote  
- **Can post new comments (inc updating server)**  
- UI signals that comment is being posted while waiting for server response  
- **New lines in comments** are handled so they display correctly (uses `<br/>`)  
- **Text surrounded by asterixes is displayed as bold**
- **User can delete comments posted by northcoder**  
- Delete UI (X) displays only on hover and only for   northcoder posts  


## Known issues;
- API requests do not set a 'loading' flag (loading screens are rendered conditionally on presence of non-empty data)  
- API errors are not handled (failed get request results in infinite loading screen rather than error message or retry etc)  
- Articles and user pages temporarily display most recently accessed page while data is loading (data should be destroyed on unmount or a loading flag set on mount / request)  
- Reducer and components are not tested  
- Voting updates UI state and server state bypassing application state  
- If a new comment is posted, UI signaling voting state ends up on the wrong comment  


##Wants;
- grey out comment form while submitting  
