
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// INITIALIZATION QUERIES

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var dropTablesStr =
`DROP TABLE reply;
DROP TABLE thread;
DROP TABLE message;
DROP TABLE subscribed_to;
DROP TABLE moderates;
DROP TABLE account;
DROP TABLE subforum;`;

var initTablesStr =
`CREATE TABLE account(
email VARCHAR(100) PRIMARY KEY,
username VARCHAR(20),
password VARCHAR(20),
age INTEGER,
banana_score INTEGER,
isadmin BIT(1)
CHECK (age >= 13));

CREATE TABLE subforum(
name VARCHAR(50) PRIMARY KEY);

CREATE TABLE thread(
name VARCHAR(50),
id INTEGER,
title VARCHAR(50) NOT NULL,
textbody VARCHAR(2000),
date_posted DATE,
email VARCHAR(100),

PRIMARY KEY(id),
FOREIGN KEY (name) REFERENCES subforum (name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (email) REFERENCES account(email) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE reply(
id_num INTEGER,
thread_id_num INTEGER,
name VARCHAR(50),
body VARCHAR(2000) NOT NULL,
date_posted DATE,
email VARCHAR(100),

PRIMARY KEY(id_num, thread_id_num, name),
FOREIGN KEY (thread_id_num) REFERENCES thread(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (name) REFERENCES subforum(name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (email) REFERENCES account(email) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE message(
id_num INTEGER PRIMARY KEY,
body VARCHAR(2000),
date_sent DATE,
sent_email VARCHAR(100),
received_email VARCHAR(100),

FOREIGN KEY (sent_email) REFERENCES account(email) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (received_email) REFERENCES account(email) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE subscribed_to(
email VARCHAR(100),
name VARCHAR(50),

PRIMARY KEY(name,email),
FOREIGN KEY (name) REFERENCES subforum(name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (email) REFERENCES account(email) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE moderates(
email VARCHAR(100),
name VARCHAR(50),

PRIMARY KEY(name,email),
FOREIGN KEY (name) REFERENCES subforum(name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (email) REFERENCES account(email) ON DELETE CASCADE ON UPDATE CASCADE);


insert into account
values('vybaby@gmail.com', 'vybaby', 'pblover97', 21, 20, 0);

insert into account
values('mad@yahoo.ca', 'madiman', 'bmbot2k18', 23, 25, 0);

insert into account
values('catdog@gmail.com', 'dog', 'cat', 20, 75, 0);

insert into account
values('json@hotmail.com', 'json', 'java', 20, 30, 0);

insert into account
values('nabstua@gmail.com', 'nabstua', 'school', 23, 45, 0);

insert into account
values('superfoody@live.com', 'quinoa', 'couscous', 25, 50, 1);

insert into account
values('greenearth@yahoo.ca', 'recycleboi', 'psycho', 21, 60, 1);

insert into account
values('snowstorm@outlook.com', 'penguin', 'blizzard', 25, 75, 1);

insert into account
values('itsdatboi@gmail.com', 'datboi', 'ohsnapwhaddup', 15, 20, 1);

insert into account
values('deskrage@gmail.com', 'angrypaperclip', 'officesupplies', 21, 0, 1);


insert into subforum
values('Food');

insert into subforum
values('Movies/Television');

insert into subforum
values('Music');

insert into subforum
values('Sports');

insert into subforum
values('Gaming');


insert into thread
values('Food', 17, 'Crunchy or Smooth Peanut Butter?', 'What is your favourite? #nojudgezone', '2018-06-01', 'vybaby@gmail.com');

insert into thread
values('Movies/Television', 1, 'Air Bud', 'Best movie of all time do not even @ me.', '2018-06-02', 'catdog@gmail.com');

insert into thread
values('Music', 4, 'Selling Extra Killers Concert Ticket', 'My friend ditched me at the last minute. Anybody looking to go? DM me for ticket prices.', '2018-06-03', 'mad@yahoo.ca');

insert into thread
values('Gaming', 5, 'Nintendo at E3', 'Let Us Go Pikachu had too much water. 7/10.', '2018-06-04', 'catdog@gmail.com');

insert into thread
values('Sports', 2, 'World Cup Fever', 'Who else is counting down the days? My bodle cannot handle the hype.', '2018-06-05', 'json@hotmail.com');


insert into reply
values(1, 17, 'Food', 'Does not matter what it is. As long as it is green and gluten-free my tummy is happy.', '2018-06-01', 'superfoody@live.com');

insert into reply
values(2, 17, 'Food', 'Gotta be crunchy. Need something to take my anger out on. Those peanut bits help.', '2018-06-02', 'deskrage@gmail.com');

insert into reply
values(3, 17, 'Food', 'Only nerds get crunchy. Smooth all the way.', '2018-06-03', 'mad@yahoo.ca');

insert into reply
values(1, 4, 'Music', 'Me please! I can give you three fiddy and a handful of almonds.', '2018-06-04', 'json@hotmail.com');

insert into reply
values(4, 17, 'Food', 'Honestly anyone who answered smooth is dead to me. #lowkeyjudging', '2018-06-05', 'vybaby@gmail.com');

insert into reply
values(1, 5, 'Gaming', 'Honestly though? Not enough water. 3/10.', '2018-06-06', 'nabstua@gmail.com');

insert into reply
values(1, 2, 'Sports', 'I heard Queens Park Rangers are gonna be there.', '2018-06-07','nabstua@gmail.com');

insert into reply
values(2, 2, 'Sports', 'Italy for me!', '2018-06-08', 'itsdatboi@gmail.com');

insert into reply
values(3, 2, 'Sports', 'Greenland OBVIOUSLY.', '2018-06-09', 'greenearth@yahoo.ca');

insert into reply
values(4, 2, 'Sports', 'USA is in it this year right?', '2018-06-10', 'superfoody@live.com');

insert into reply
values(1, 1, 'Movies/Television', 'Hiss.', '2018-06-11', 'snowstorm@outlook.com');

insert into reply
values(2, 5, 'Gaming', 'UGH. They did not add Swampert. Hate it.', '2018-06-12', 'mad@yahoo.ca');

insert into reply
values(2, 1, 'Movies/Television', 'Meow.', '2018-06-13', 'deskrage@gmail.com');

insert into reply
values(2, 4, 'Music', 'I can give you three fiddy one and two handfuls of almonds.', '2018-06-14', 'catdog@gmail.com');


insert into subscribed_to
values('superfoody@live.com', 'Food');

insert into subscribed_to
values('deskrage@gmail.com', 'Sports');

insert into subscribed_to
values('mad@yahoo.ca', 'Music');

insert into subscribed_to
values('vybaby@gmail.com', 'Movies/Television');

insert into subscribed_to
values('json@hotmail.com', 'Gaming');

insert into subscribed_to
values('deskrage@gmail.com', 'Gaming');

insert into subscribed_to
values('deskrage@gmail.com', 'Movies/Television');

insert into subscribed_to
values('deskrage@gmail.com', 'Music');

insert into subscribed_to
values('deskrage@gmail.com', 'Food');

insert into subscribed_to
values('vybaby@gmail.com', 'Food');

insert into subscribed_to
values('vybaby@gmail.com', 'Gaming');

insert into subscribed_to
values('vybaby@gmail.com', 'Music');

insert into subscribed_to
values('vybaby@gmail.com', 'Sports');



insert into moderates
values('deskrage@gmail.com', 'Sports');

insert into moderates
values('snowstorm@outlook.com', 'Movies/Television');

insert into moderates
values('json@hotmail.com', 'Gaming');

insert into moderates
values('mad@yahoo.ca', 'Music');

insert into moderates
values('itsdatboi@gmail.com', 'Food');



insert into message
values(1, 'Nice made-up story about having friends.', '2018-06-01', 'nabstua@gmail.com', 'mad@yahoo.ca');

insert into message
values(2, 'WooOoooooOooooow.', '2018-06-02', 'mad@yahoo.ca', 'nabstua@gmail.com');

insert into message
values(3, 'I can offer you cashews instead if that changes anything.', '2018-06-03', 'json@hotmail.com', 'mad@yahoo.ca');

insert into message
values(4, 'I will sell you tickets for just the almonds, as long as they are activated.', '2018-06-04', 'superfoody@live.com', 'catdog@gmail.com');

insert into message
values(5, 'I am actively repulsed by dogs and cats.', '2018-06-05', 'deskrage@gmail.com', 'catdog@gmail.com');


insert into thread values('Food',6,'RIP Anthony Bourdain','https://www.cnn.com/2018/06/08/us/anthony-bourdain-obit/index.html  A mix of a storyteller and a che','2018-6-4', 'mad@yahoo.ca');
insert into thread values('Food',7,'So, after I made a post on r/eatcheapandhealt','EDIT: [WE HAVE RECIPES.](https://missmedlandtaylor.com/)  [Yesterdays post](https://www.reddit.com/','2018-1-14', 'snowstorm@outlook.com');
insert into thread values('Food',8,'Get your turkey out to thaw if its 200lbs or','','2018-3-22', 'vybaby@gmail.com');
insert into thread values('Food',9,'Alton Brown announces the return of Good Eat','https://twitter.com/altonbrown/status/904449569127370753','2018-5-1', 'deskrage@gmail.com');
insert into thread values('Food',10,'As if 2016 couldnt get any worse, I just saw','','2018-4-17', 'json@hotmail.com');
insert into thread values('Food',11,'Getting sick of the way online recipes are be','Does anyone have any idea why for the love of all things amazing that people who are writing online ','2018-1-6', 'json@hotmail.com');
insert into thread values('Food',12,'I never thought it would happen to me, but it','I spent three hours making a Korean bone broth soup. Once all of the bones were finally clean of all','2018-3-3', 'deskrage@gmail.com');
insert into thread values('Food',13,'Is anyone else fully sick of recipe sites tha','It just pisses me off; Im not even sure if anyone bothers to read the mountain of text before the r','2018-5-15', 'mad@yahoo.ca');
insert into thread values('Food',14,'Is anyone else considered the chef or pers','I guess Im a decent cook, but Im always baffled when I make a dish and people ask me where I learn','2018-5-2', 'deskrage@gmail.com');
insert into thread values('Food',15,'A friend of mine told me Cooking alone for y','Sorry if this post isnt allowed - I couldnt tell from the Rules. Technically this post is permitte','2018-5-2', 'vybaby@gmail.com');

insert into thread values('Movies/Television',16,'YouTube channel Every Frame a Painting anno','Co-Creators Tony Zhou and Taylor Ramos officially announced there wont be any new EFAP videos comin','2018-6-5', 'mad@yahoo.ca');
insert into thread values('Movies/Television',18,'I am Tony Zhou, creator of the “Every Frame a','First off, thanks to your mod bulcmlifeurt for putting this together.  So I am Tony Zhou. I’m a film','2018-4-25', 'deskrage@gmail.com');
insert into thread values('Movies/Television',19,'Wonder Woman really isnt that great','I recently watched Wonder Woman for the second time since seeing it in theatre and now that the dust','2018-4-17', 'mad@yahoo.ca');
insert into thread values('Movies/Television',20,'The Last Jedi is Poor Storytelling: How Episo','**[Spoilers follow]**  Although critics praise director Rian Johnson for taking Star Wars in a bold ','2018-2-22', 'deskrage@gmail.com');
insert into thread values('Movies/Television',21,'RESULTS: /r/TrueFilms favorite films of 2014','','2018-3-19', 'deskrage@gmail.com');
insert into thread values('Movies/Television',22,'500 Days of Summers color palette (theory). W','To preface, I have seen this movie maybe five or six times now and love everything about it. However','2018-2-6', 'deskrage@gmail.com');
insert into thread values('Movies/Television',23,'As a Mexican I am emotionally overwhelmed & s','I was already excited for this movie due to Pixars reputation & the fact that our Mexican heritage ','2018-4-17', 'json@hotmail.com');
insert into thread values('Movies/Television',24,'Childish Gambino - This is America Analysis','If I posted in the wrong sub, I apologize, please do message me the right sub to post this in.  I en','2018-2-11', 'deskrage@gmail.com');
insert into thread values('Movies/Television',25,'[RESULTS] R/TRUEFILMS FAVORITE FILMS OF 2017','','2018-1-11', 'vybaby@gmail.com');
insert into thread values('Movies/Television',26,'Alan Rickman, star of stage and screen has di','http://www.bbc.co.uk/news/entertainment-arts-35313604  Most well known for playing Severus Snape in ','2018-4-17', 'json@hotmail.com');

insert into thread values('Sports',27,'CHIEFS -7 UPVOTE PARTY','WHAT A WAY TO COVER LMAO','2018-3-9', 'json@hotmail.com');
insert into thread values('Sports',28,'U.S. Supreme Court rules federal ban on state','Time for all states to finally allow sports betting!','2018-2-26', 'mad@yahoo.ca');
insert into thread values('Sports',29,'Super Bowl Live Betting Strategy Thread','it is what it says. nba finals we had some awesome updates and discussion, me and /u/sab3r even caug','2018-4-27', 'deskrage@gmail.com');
insert into thread values('Sports',30,'Lets put on money on Net Neutrality. Go to th','https://www.battleforthenet.com/?utm_source=AN&utm_medium=email&utm_campaign=BFTNCallTool&utm_conten','2018-1-3', 'mad@yahoo.ca');
insert into thread values('Sports',31,'News years resolution was no more online spor','','2018-5-25', 'snowstorm@outlook.com');
insert into thread values('Sports',32,'DO NOT USE BETONLINE - CAUGHT CHEATING AT BLA','I know this sub is about sports betting but BetOnline was caught red handed cheating in blackjack by','2018-4-7', 'itsdatboi@gmail.com');
insert into thread values('Sports',33,'RP-Excel Wk 5 Algorithmic Predictions | The M','Hey Guys!   Romeo (aka RP-Excel) here again with my weekly RP1 algorithmic picks!    **Last weeks p','2018-5-4', 'mad@yahoo.ca');
insert into thread values('Sports',34,'HOW TO BET THE NHL PLAYOFFS (a study by Profe','Hello everyone!    With the 2017 NHL playoffs set to begin tomorrow night, I figured I would revisit','2018-6-4', 'deskrage@gmail.com');
insert into thread values('Sports',35,'I followed eight professional tipsters of a p','Hey guys,  The title probably says it all  https://cognitivefootball.wordpress.com/2018/03/04/the-il','2018-1-13', 'deskrage@gmail.com');
insert into thread values('Sports',36,'I hope he didnt max bet that 100% lock...','https://www.reddit.com/r/sportsbook/comments/78q2ng/is_this_the_first_legitimate_100_lock_youve/  > ','2018-1-27', 'deskrage@gmail.com');

insert into thread values('Gaming',37,'John @Totalbiscuit Bain July 8, 1984 - May 24','','2018-1-13', 'mad@yahoo.ca');
insert into thread values('Gaming',38,'Belgium says loot boxes are gambling, wants t','','2018-1-6', 'itsdatboi@gmail.com');
insert into thread values('Gaming',39,'The ONLY way a large company such as EA will ','I feel like I should make this reality clear to everyone who is rightfully annoyed and upset by the ','2018-3-17', 'deskrage@gmail.com');
insert into thread values('Gaming',40,'Titanfall 2 will not have a season pass, all ','','2018-4-11', 'vybaby@gmail.com');
insert into thread values('Gaming',41,'Totalbiscuit hospitalized, his cancer is spre','','2018-4-12', 'mad@yahoo.ca');
insert into thread values('Gaming',42,'[E3 2018] Cyberpunk 2077','**Name: Cyberpunk 2077**  **Platforms: PC, Xbox, Playstation**  **Genre: RPG.**  **Release Date: TBA','2018-5-21', 'superfoody@live.com');
insert into thread values('Gaming',43,'EA fired Plants VS Zombies creator for object','','2018-3-11', 'snowstorm@outlook.com');
insert into thread values('Gaming',44,'Sony faces growing Fortnite backlash at E3','','2018-1-25', 'deskrage@gmail.com');
insert into thread values('Gaming',45,'Later today, Red Dead 2 gets a new trailer. B','The hypetrain is about to start for Rockstar and Take2s next AAA title Red Dead Redemption 2. I hope','2018-2-24', 'superfoody@live.com');
insert into thread values('Gaming',46,'First Look at Nintendo Switch','','2018-5-25', 'mad@yahoo.ca');

insert into thread values('Music',47,'Lets Talk: Songs that are good introductions','On a couple other subs theres been a couple discussions recently about songs that work as good intr','2018-5-16', 'deskrage@gmail.com');
insert into thread values('Music',48,'Hi, Im Max Landis and I wrote a 150 page ess','https://www.youtube.com/watch?v=jCFh0lJ-WAg  This is the gateway video, but the site itself, featuri','2018-5-23', 'deskrage@gmail.com');
insert into thread values('Music',49,'We need to get rid of the false idea that cla','Haydn was a self-taught peasant. Beethoven came from a down-and-out family and his dad was always in','2018-3-25', 'deskrage@gmail.com');
insert into thread values('Music',50,'Could Trump Presidency Spell Resurgence for P','The bread and butter of a lot of Punk music is political unrest from the left. Many are calling Trum','2018-3-11', 'deskrage@gmail.com');
insert into thread values('Music',51,'ALRIGHT GUYS. ITS TIME TO GO FULL MUSIC SNOB.','We always see those posts about poorly regarded albums that you like, where youre meant to explai','2018-2-22', 'deskrage@gmail.com');
insert into thread values('Music',52,'A Personal Farewell to Pitchfork','I’m slightly ashamed that I’m writing this but it’s for good reason. I say without any hesitation th','2018-6-8', 'deskrage@gmail.com');
insert into thread values('Music',53,'K-pop is exploitative as a industry, and blan','IMO, I am sickened by K-Pop both as a industry and as a genre of music.  It is the ONLY genre of mus','2018-4-8', 'itsdatboi@gmail.com');
insert into thread values('Music',54,'So hip-hop got To Pimp a Butterfly. Can roc','Needless to say this is just speculating, but speculating is part of what makes music discussion fun','2018-5-9', 'deskrage@gmail.com');
insert into thread values('Music',55,'What albums have the craziest back-stories?','(Hopefully this is an acceptable post, if it isnt then please delete!)  Im currently beginning wor','2018-3-15', 'deskrage@gmail.com');
insert into thread values('Music',56,'Lets talk Arcade Fire, Reflektor','The album just leaked and because of the excitement surrounding this release, I thought we could sta','2018-2-23', 'json@hotmail.com');

insert into reply values(5,6, 'Food','“It is indeed, marvelous. An irony-free zone, where everything is beautiful and nothing hurts. Where','2018-6-13','mad@yahoo.ca');
insert into reply values(6,6, 'Food','Watching No Reservations was one of my favourite things to do with my grandpa before he passed away.','2018-6-11','mad@yahoo.ca');
insert into reply values(7,6, 'Food','Kitchen confidential inspired me to be a chef. We have lost one of the greats. ','2018-6-27','json@hotmail.com');
insert into reply values(8,6, 'Food','Literally a man living the best life I could ever imagine. Were just being shown time and time agai','2018-6-8','json@hotmail.com');
insert into reply values(9,6, 'Food','Found by Eric Ripert too, wow this just ruined my day.','2018-6-15','snowstorm@outlook.com');
insert into reply values(10,6, 'Food','I know this sounds superficial, but like, I follow him on Instagram and just a week ago or something','2018-6-6','snowstorm@outlook.com');
insert into reply values(11,6, 'Food',' My favorite quote of his\- I understand theres a guy inside me who wants to lay in bed, smoke wee','2018-6-18','json@hotmail.com');
insert into reply values(12,6, 'Food','This one hurts. ','2018-6-20','snowstorm@outlook.com');
insert into reply values(13,6, 'Food','This is just such a huge blow to me. I came in so giddy today and then bam, its like someone just s','2018-6-4','json@hotmail.com');

insert into reply values(5,7, 'Food','I find crock pot cooking to be really helpful in case you want to explore that avenue. I can just du','2018-1-25','vybaby@gmail.com');
insert into reply values(6,7, 'Food','This is a great idea. I think moving forward, you could even think of including some very simple rec','2018-1-17','superfoody@live.com');
insert into reply values(7,7, 'Food','Maybe Im missing something, but I dont see any actual recipes, just the shopping list post.','2018-1-20','snowstorm@outlook.com');
insert into reply values(8,7, 'Food','Youre amazing. Its been 4 months since my first breakup, and literally my first trip to any grocer','2018-1-22','snowstorm@outlook.com');
insert into reply values(9,7, 'Food','I really need this right now. Thanks','2018-1-25','deskrage@gmail.com');
insert into reply values(10,7, 'Food','As some one with a severe fatigue disorder who counts her spoons so carefully, this blog will be awe','2018-1-25','deskrage@gmail.com');
insert into reply values(11,7, 'Food','I guess Im lucky that cooking helps my depressed self feel happy and far less depressed/stressed th','2018-1-25','mad@yahoo.ca');
insert into reply values(12,7, 'Food','This is huge! I commend you for making a blog like this. You should look into making an app that all','2018-1-26','deskrage@gmail.com');
insert into reply values(13,7, 'Food','Omg. Omg. I just went on antidepressants last week. My dad died last Christmas after suffering from ','2018-1-15','json@hotmail.com');

insert into reply values(5,8, 'Food','if google is telling me the truth, the largest turkey was 86 pounds, and thawing a turkey requires 2','2018-3-27','mad@yahoo.ca');
insert into reply values(6,8, 'Food','High quality Turkey Day Shitpost.','2018-3-26','mad@yahoo.ca');
insert into reply values(7,8, 'Food','bruh i just slow smoke my 200lbs turkeys for 3 weeks straight, no need to thaw','2018-3-23','vybaby@gmail.com');
insert into reply values(8,8, 'Food','How long before I take out the 150lb duck that Ill stuff inside the turkey?','2018-3-25','deskrage@gmail.com');
insert into reply values(9,8, 'Food','Pff, Ill be frying my turkey. I figure the oil is so hot it doesnt matter if my bird is still froz','2018-3-26','deskrage@gmail.com');
insert into reply values(10,8, 'Food','As a european I have no idea if this reasonable advice or not','2018-3-27','superfoody@live.com');
insert into reply values(11,8, 'Food','If you forget to thaw your turkey on the day of Thanksgiving, it *will* seem like a 200 pound bird.','2018-3-26','superfoody@live.com');
insert into reply values(12,8, 'Food','So glad were not cooking a Turkey this year, I hate busting out the dolly to move the turkey from my','2018-3-25','snowstorm@outlook.com');
insert into reply values(13,8, 'Food','If you have a 200lb turkey that needs 21 days to thaw, wouldnt the outside start going bad before t','2018-3-25','deskrage@gmail.com');

insert into reply values(5,9, 'Food','Im really excited because I love the show, but Im a little sad its under Food Network. Its great','2018-5-3','superfoody@live.com');
insert into reply values(6,9, 'Food','Alton Brown is a conundrum to me. His delivery would normally be irritating to me but any show hoste','2018-5-13','deskrage@gmail.com');
insert into reply values(7,9, 'Food','Excited about the announcement but its still so far away. Oh well, Ive waited this long, I can wai','2018-5-19','deskrage@gmail.com');
insert into reply values(8,9, 'Food','♫ Return of the Eats (Once again!)♫ Return of the Eats (Pump up the world!)♫ Return of the Eats ','2018-5-9','vybaby@gmail.com');
insert into reply values(9,9, 'Food','One show I actually enjoy and look forward to watch on food network','2018-5-5','deskrage@gmail.com');
insert into reply values(10,9, 'Food','If they film in the Atlanta area again, and why wouldnt since AB is based there, hopefully Lucky Ya','2018-5-17','vybaby@gmail.com');
insert into reply values(11,9, 'Food','Heres the announcement [recorded at Dragon Con](https://youtu.be/pS3e4Y9NOtc) ','2018-5-24','json@hotmail.com');
insert into reply values(12,9, 'Food','I love Good Eats, so I realllly hope this doesnt turn out to be another Bill Nye Saves the World.','2018-5-7','vybaby@gmail.com');
insert into reply values(13,9, 'Food','He wasnt kidding about DDD.  I went to visit my parents for a week in August and decided to watch s','2018-5-12','json@hotmail.com');

insert into reply values(5,10, 'Food','Wait til you hear that a lot of people mash up peas and put them in guac.','2018-4-20','superfoody@live.com');
insert into reply values(6,10, 'Food','my sister did this.  she also thinks garlic salt is the same thing as garlic powder.','2018-4-17','mad@yahoo.ca');
insert into reply values(7,10, 'Food','That shit is delicious on a turkey sandwich but even a mayo dumpster like me would never eat that on','2018-4-25','json@hotmail.com');
insert into reply values(8,10, 'Food','Eww gross.  Sounds like shes used to the cheap guac thats actually just 2% avocado...','2018-4-26','superfoody@live.com');
insert into reply values(9,10, 'Food','Pretty sure this constitutes a hostile work environment.','2018-4-24','snowstorm@outlook.com');
insert into reply values(10,10, 'Food','OH GOD NO','2018-4-25','mad@yahoo.ca');
insert into reply values(11,10, 'Food','This is the worst thing I have read in 2016.','2018-4-28','vybaby@gmail.com');
insert into reply values(12,10, 'Food','My German roommate made guac once. It was half Creme fraiche and half avocado. ','2018-4-18','json@hotmail.com');
insert into reply values(13,10, 'Food','THATS IT! Everyone pack it up were just gonna end the universe now before it gets any worse.','2018-4-21','mad@yahoo.ca');
insert into reply values(14,10, 'Food','As someone who loves avocados and guacamole but hates mayo, god damn this.','2018-4-24','snowstorm@outlook.com');

insert into reply values(5,11, 'Food','https://galpalactic.tumblr.com/post/134577149346/me-googles-how-to-mash-potatoes-some-food','2018-1-24','json@hotmail.com');
insert into reply values(6,11, 'Food','Its because by writing it that way Google considers it unique and original and rates it higher.','2018-1-20','json@hotmail.com');
insert into reply values(7,11, 'Food','[Heres a starter pack I made a while back](https://i.redd.it/8l6cp7icadyy.png)','2018-1-18','snowstorm@outlook.com');
insert into reply values(8,11, 'Food','Something that grates on me as well is how they advertise a recipe as having only 3 steps! or what','2018-1-25','vybaby@gmail.com');
insert into reply values(9,11, 'Food','While I dont hate this style of recipe blogging as much as others, I do get annoyed when the short ','2018-1-28','snowstorm@outlook.com');
insert into reply values(10,11, 'Food','Its because, well Ill tell you a story about how while I was at the dentists office the woman at ','2018-1-20','mad@yahoo.ca');
insert into reply values(11,11, 'Food','Because recipe blogs are supported by ad revenue.If you only publish recipes, then you only get re','2018-1-18','superfoody@live.com');
insert into reply values(12,11, 'Food','Totally agree. I would much rather enjoy reading history about the ingredients, a discussion about h','2018-1-26','superfoody@live.com');
insert into reply values(13,11, 'Food','At least the stories are skippable.  As someone with little cooking skill and patience, what really ','2018-1-20','json@hotmail.com');
insert into reply values(14,11, 'Food','They need a button at the top that lets you skip to the recipe. Then those that want a mile long jou','2018-1-24','superfoody@live.com');

insert into reply values(5,12, 'Food','I once strained a can of pineapple juice into the sink thinking it was pineapple chunks.','2018-3-23','mad@yahoo.ca');
insert into reply values(6,12, 'Food','I peeled 5 pounds of shrimp while talking to my wife one night, only to realize I tossed the shells ','2018-3-5','mad@yahoo.ca');
insert into reply values(7,12, 'Food','I put a pot of chicken stock in the sink with cold water running around it to cool down faster, the ','2018-3-20','deskrage@gmail.com');
insert into reply values(8,12, 'Food','I once spent forever taking the meat off of a cooked chicken to store for various dishes. I was putt','2018-3-8','superfoody@live.com');
insert into reply values(9,12, 'Food','Sleep it off with a running fan.','2018-3-22','mad@yahoo.ca');
insert into reply values(10,12, 'Food','spent hours making chicken broth once. strained it into a pot in the sink, then left it to cool. 5 m','2018-3-18','json@hotmail.com');
insert into reply values(11,12, 'Food','Dont feel bad! Its embarrassing now, but the OMG Im dumb feeling is your brains way of helping','2018-3-5','deskrage@gmail.com');
insert into reply values(12,12, 'Food','This is about as bad as the first time I used my blender, which also happened to be on Thanksgiving.','2018-3-16','deskrage@gmail.com');
insert into reply values(13,12, 'Food','Cracked an egg into the compost, and put the shells in the frying pan. Our brains are such dicks som','2018-3-5','json@hotmail.com');
insert into reply values(14,12, 'Food','One time in college I went to a fast food place, ordered, paid for my food, then drove off without g','2018-3-17','deskrage@gmail.com');

insert into reply values(5,13, 'Food','That, and the following comments raving about how great the recipe is, followed by the.mountain of c','2018-5-27','vybaby@gmail.com');
insert into reply values(6,13, 'Food','I started a small baking blog at one point, and I got an e-mail after a little while saying that I w','2018-5-26','mad@yahoo.ca');
insert into reply values(7,13, 'Food','I dont mind the story. I dont like in that example that all the photos of the process of making th','2018-5-24','deskrage@gmail.com');
insert into reply values(8,13, 'Food','It actually has nothing to do with validation, its an SEO (search engine optimization) tactic. The ','2018-5-23','superfoody@live.com');
insert into reply values(9,13, 'Food','I just wish that the recipe came first, then the photo recipe, and if they want to put their 5 page ','2018-5-23','deskrage@gmail.com');
insert into reply values(10,13, 'Food','It depends, honestly a lot of times it is less story and more discussion of a specific ingredient, o','2018-5-28','deskrage@gmail.com');
insert into reply values(11,13, 'Food','and my husband doesnt even like X but he ate all of these and I had to make them again later in th','2018-5-23','snowstorm@outlook.com');
insert into reply values(12,13, 'Food','Serious eats/ rasamalaysia have it right, put the recipe and story on a different page, so you can b','2018-5-23','mad@yahoo.ca');

insert into reply values(5,14, 'Food','I never knew how to cook, not even for myself... then I got a job at a fast food pizza place so I wa','2018-5-3','superfoody@live.com');
insert into reply values(6,14, 'Food','Im that person, but I dont follow the recipes to a T anymore. The recipes are more like loose guid','2018-5-3','mad@yahoo.ca');
insert into reply values(7,14, 'Food','I just look up whatever I want to make on Serious Eats. ','2018-5-21','snowstorm@outlook.com');
insert into reply values(8,14, 'Food','When people ask where I learned to cook my go-to response is that I live alone and love good food. I','2018-5-27','superfoody@live.com');
insert into reply values(9,14, 'Food','People rave about my BBQ sauce.  Its just 3 parts sweet baby rays bbq sauce to one part sweet baby r','2018-5-2','vybaby@gmail.com');
insert into reply values(10,14, 'Food','Youd be surprised how many people are completely incapable of following instructions to a T. Cook ','2018-5-14','superfoody@live.com');
insert into reply values(11,14, 'Food','Yeah Im a great cook who mostly just looks up good shit, or remembers how to make something I onc','2018-5-9','mad@yahoo.ca');
insert into reply values(12,14, 'Food','Ill stick relatively close to the recipe the first time I make something. I know what tastes I like','2018-5-2','vybaby@gmail.com');
insert into reply values(13,14, 'Food','I can easily follow any recipe to perfection but to follow a recipe you need to know how to cook. No','2018-5-17','json@hotmail.com');
insert into reply values(14,14, 'Food','I think you are selling yourself short. I used to think that way. Like I felt some imposter syndrome','2018-5-18','deskrage@gmail.com');

insert into reply values(5,15, 'Food','Cooking alone for oneself is kind of a necessity for survival so I wouldnt call it sad. I like cook','2018-5-17','mad@yahoo.ca');
insert into reply values(6,15, 'Food','Thats a stupid sentiment. How do you eat then if you live alone?','2018-5-26','vybaby@gmail.com');
insert into reply values(7,15, 'Food','Cooking for yourself is NOT sad.Microwave dinners and having to order take out all the time becaus','2018-5-15','deskrage@gmail.com');
insert into reply values(8,15, 'Food','Ive been told eating my work lunch by myself is sad. TBH theres nothing better than a half hour no','2018-5-3','mad@yahoo.ca');
insert into reply values(9,15, 'Food','I love cooking...period.  It doesnt matter if Im cooking for me, for me and my husband, or a group','2018-5-25','itsdatboi@gmail.com');
insert into reply values(10,15, 'Food','Cooking for myself is *playtime*!Its when I can try wild and often ill-advised flavor combination','2018-5-2','json@hotmail.com');
insert into reply values(11,15, 'Food','I like cooking by myself. I live alone for quite a time, I am used to it, and to eat alone. If I am','2018-5-13','superfoody@live.com');
insert into reply values(12,15, 'Food','Cooking for myself isnt sad. I like it because I can do whatever I want with my food while cooking ','2018-5-21','deskrage@gmail.com');
insert into reply values(13,15, 'Food','I’m scared to go out and eat alone because someone might think I’m lonely and come sit with me and t','2018-5-8','deskrage@gmail.com');
insert into reply values(14,15, 'Food','I like cooking alone because no one can see me flounder in the kitchen. ','2018-5-21','mad@yahoo.ca');

insert into reply values(5,16, 'Movies/Television','Heres the link [on Medium.](https://medium.com/@tonyszhou/postmortem-1b338537fabc) The article it','2018-6-27','mad@yahoo.ca');
insert into reply values(6,16, 'Movies/Television','One of the few legitimately informative and interesting  movie-based YouTube channels. It’s a shame.','2018-6-16','vybaby@gmail.com');
insert into reply values(7,16, 'Movies/Television','Oh no! That channel was so excellent. I hope its ending because they got an offer to make it a TV s','2018-6-9','itsdatboi@gmail.com');
insert into reply values(8,16, 'Movies/Television','Id recommend Lessons from the Screenplay for anyone looking for a channel along the same lines with','2018-6-10','json@hotmail.com');
insert into reply values(9,16, 'Movies/Television','Some channels I follow that can maybe fill the void - [kaptainkristian](https://www.youtube.com/chan','2018-6-21','itsdatboi@gmail.com');
insert into reply values(10,16, 'Movies/Television','~~I thought it ended a long time ago, it has been an year since their last vido.~~ At least some clo','2018-6-11','json@hotmail.com');
insert into reply values(11,16, 'Movies/Television','One of the best YouTube channels in YouTubes short history. I seriously hope they continue doing si','2018-6-7','deskrage@gmail.com');
insert into reply values(12,16, 'Movies/Television','I cant believe its been more than a year since their last video. Nothing else on YouTube comes clo','2018-6-20','json@hotmail.com');
insert into reply values(13,16, 'Movies/Television','This channel has made me look at the screen with greater attention to detail and introduced me to Bu','2018-6-20','deskrage@gmail.com');
insert into reply values(14,16, 'Movies/Television','>For instance, we’d always wanted to talk about Tarkovsky, but it’s impossible to talk about how he ','2018-6-9','deskrage@gmail.com');

insert into reply values(5,18, 'Movies/Television','Okay I stuck around till 7 p.m. Phew I am exhausted. Thank you all for participating in this. It was','2018-4-25','deskrage@gmail.com');
insert into reply values(6,18, 'Movies/Television','Hi Tony,Im trying to understand better the differences that editing makes in film versus the actu','2018-4-28','itsdatboi@gmail.com');
insert into reply values(7,18, 'Movies/Television','Hey Mr. Zhou, My question is how do pick the topics/ subject matter for your videos? is it somethin','2018-4-28','deskrage@gmail.com');
insert into reply values(8,18, 'Movies/Television','Hi Tony, thanks once again from me, the mods of /r/truefilm and the community for doing this. I ha','2018-4-25','deskrage@gmail.com');
insert into reply values(9,18, 'Movies/Television','Tony, I just wanted to say a few things.First as a young filmmaker, your videos have been like an ','2018-4-28','itsdatboi@gmail.com');
insert into reply values(10,18, 'Movies/Television','Hey! Almost forgot this AMA was happening, glad I didnt!1. Is Every Frame a Painting your current','2018-4-25','mad@yahoo.ca');
insert into reply values(11,18, 'Movies/Television','Tony, any movie podcast you could recommend? or any other channel or analysis series that doesnt ','2018-4-25','vybaby@gmail.com');
insert into reply values(12,18, 'Movies/Television','Are there any current Western directors who you think shoot and edit action properly, as outlined in','2018-4-25','snowstorm@outlook.com');
insert into reply values(13,18, 'Movies/Television','Hi Tony! Heres something /u/Carpeaux wanted to ask you:Im awful at showing up in time for this s','2018-4-28','itsdatboi@gmail.com');
insert into reply values(14,18, 'Movies/Television','Tony, where did you learn to analyze film the way you did.  Is it just repeated observation or were ','2018-4-27','deskrage@gmail.com');

insert into reply values(5,19, 'Movies/Television','The movie depicts the Germans so much as the bad guys that I literally thought the story took place ','2018-4-28','vybaby@gmail.com');
insert into reply values(6,19, 'Movies/Television','All these are valid criticisms. The biggest issue with this movie for me is something you touch upon','2018-4-21','json@hotmail.com');
insert into reply values(7,19, 'Movies/Television','I just got around to seeing it a couple of nights ago, you know not being in any rush to see it beca','2018-4-20','superfoody@live.com');
insert into reply values(8,19, 'Movies/Television','I couldnt agree with some of these more.  I didnt have issue with the opening scene, but after tha','2018-4-26','itsdatboi@gmail.com');
insert into reply values(9,19, 'Movies/Television','I always find it hilarious when people in /r/TrueFilm critique Hollywood blockbusters like WW (or an','2018-4-28','json@hotmail.com');
insert into reply values(10,19, 'Movies/Television','Not to mention the completely insensitive manner they deal with PTSD. Ewan Bremners character is cl','2018-4-21','deskrage@gmail.com');
insert into reply values(11,19, 'Movies/Television','Superhero movies in general arent that great. Theres not a one that isnt heavily dependent on the','2018-4-28','superfoody@live.com');
insert into reply values(12,19, 'Movies/Television','The bell tower jump was rad.  That jump was novel superhero movie physics.You do a good service wi','2018-4-24','json@hotmail.com');
insert into reply values(13,19, 'Movies/Television','Wonder Woman is a fantasy about having power to act on your compassion without fear.Its most power','2018-4-22','mad@yahoo.ca');

insert into reply values(5,20, 'Movies/Television','How do you feel about the fact that half of the movie was an inconsequential arc regarding the light','2018-2-28','vybaby@gmail.com');
insert into reply values(6,20, 'Movies/Television','I will watch your career with great interest.Thanks for the piece. I dont understand how there ca','2018-2-24','mad@yahoo.ca');
insert into reply values(7,20, 'Movies/Television','I agree with the vast majority of what you have said, but just wanted to touch on this:>  progress','2018-2-28','json@hotmail.com');
insert into reply values(8,20, 'Movies/Television','I agree with a lot of this, especially these two points. >* a lot happens. But not a lot happens f','2018-2-24','itsdatboi@gmail.com');
insert into reply values(9,20, 'Movies/Television','Good post! I agree with much of this, but I think certain elements are wrong in important ways.  And','2018-2-28','mad@yahoo.ca');
insert into reply values(10,20, 'Movies/Television','It annoys me to no end when people defend this film by acting like the only reason I dont like it i','2018-2-26','deskrage@gmail.com');
insert into reply values(11,20, 'Movies/Television','I feel like you enjoyed TFA a lot more than I did.. Particularly the JJ Abrams mysteries such as R','2018-2-28','json@hotmail.com');
insert into reply values(12,20, 'Movies/Television','I have started nurturing a pet theory that Johnson is making a comment on interminable blockbuster s','2018-2-26','deskrage@gmail.com');
insert into reply values(13,20, 'Movies/Television','I agree with a good chunk of your commentary as well as the other points raised here, but also take ','2018-2-26','snowstorm@outlook.com');
insert into reply values(14,20, 'Movies/Television','I think critical reception was positive because this was a Star Wars film that really had something ','2018-2-24','superfoody@live.com');

insert into reply values(5,21, 'Movies/Television','Bonus! /u/pastypilgrim kindly ran your choices through an algorithm that produced a visual represent','2018-3-27','mad@yahoo.ca');
insert into reply values(6,21, 'Movies/Television','Wow, Nightcrawler did really poorly in the box office','2018-3-20','snowstorm@outlook.com');
insert into reply values(7,21, 'Movies/Television','Goodness! Thank you for putting it together like this. Im already looking forward to several movies','2018-3-24','json@hotmail.com');
insert into reply values(8,21, 'Movies/Television','Honestly, I am very disappointed seeing Mr. Turner way down on #47. I felt it was excellent on all l','2018-3-25','json@hotmail.com');
insert into reply values(9,21, 'Movies/Television','Quite disappointed in myself as to how few of these Ive seen. Time to start watching!','2018-3-20','json@hotmail.com');
insert into reply values(10,21, 'Movies/Television','Ive really wanted to try Goodbye to Language, but I know its in 3D and since its Godard, I feel l','2018-3-25','deskrage@gmail.com');
insert into reply values(11,21, 'Movies/Television','Im so happy to see The Rover included in the list. I was truly surprised and thrilled by that film.','2018-3-19','json@hotmail.com');
insert into reply values(12,21, 'Movies/Television','Extremely surprised that John Wick did not make it on to this list. Next to Calvary and Ida, it was ','2018-3-21','mad@yahoo.ca');
insert into reply values(13,21, 'Movies/Television','This is great. So many movies that I missed. Is there a thread like this for 2013? ','2018-3-22','deskrage@gmail.com');

insert into reply values(5,22, 'Movies/Television','In case anyone is interested here is a [movie barcode] (http://41.media.tumblr.com/tumblr_lpnkkgv275','2018-2-26','snowstorm@outlook.com');
insert into reply values(6,22, 'Movies/Television','Really nicely structured piece, dude. Its the subtle (or in this case fairly unsubtle, but still su','2018-2-22','superfoody@live.com');
insert into reply values(7,22, 'Movies/Television','I also love this film, and have always admired its use of colour both for aesthetic reasons and for ','2018-2-9','json@hotmail.com');
insert into reply values(8,22, 'Movies/Television','This is a really convincing theory that I hadnt really thought of before for this film. It is actua','2018-2-18','snowstorm@outlook.com');
insert into reply values(9,22, 'Movies/Television','Production Designers really dont get enough credit. I mean, sure, on *Star Wars* or *Lord of the Ri','2018-2-25','deskrage@gmail.com');
insert into reply values(10,22, 'Movies/Television','Really good observation. I think the theme of the movie is the balance between passion and pragmat','2018-2-24','mad@yahoo.ca');
insert into reply values(11,22, 'Movies/Television','This is not at all on topic, but until your analysis, I never noticed that the architectural firm To','2018-2-9','itsdatboi@gmail.com');
insert into reply values(12,22, 'Movies/Television','Message of the film: stick to your own color. Gotcha.But in all seriousness, I clicked on this thi','2018-2-12','mad@yahoo.ca');
insert into reply values(13,22, 'Movies/Television','That is amazing. Its this kind of stuff thats right in front of your damn face but so little of us','2018-2-14','mad@yahoo.ca');
insert into reply values(14,22, 'Movies/Television','i love this i was a little aware of the colors after like 6 times of watching this movie.is my favo','2018-2-17','itsdatboi@gmail.com');

insert into reply values(5,23, 'Movies/Television','As a Lithuanian living in the US, I was shocked to see how similar Mexican values are to ours. Not t','2018-4-24','superfoody@live.com');
insert into reply values(6,23, 'Movies/Television','Saw it last week and was overwhelmed by how unique it was, might even go so far as to call it odd on','2018-4-27','mad@yahoo.ca');
insert into reply values(7,23, 'Movies/Television','Mexican here: it was alright. I do agree with you that it’s nice having some semblance of Mexican cu','2018-4-21','deskrage@gmail.com');
insert into reply values(8,23, 'Movies/Television','There’s been a lot of controversy surrounding this movie and The Book of Life. If you’ve seen The Bo','2018-4-18','mad@yahoo.ca');
insert into reply values(9,23, 'Movies/Television','Hey, this post makes me super happy for all the obvious reasons, but I just wanted to say thanks for','2018-4-25','deskrage@gmail.com');
insert into reply values(10,23, 'Movies/Television','I liked much of the inner values of this film, but it also raises a big single flag to me.  The conc','2018-4-24','vybaby@gmail.com');
insert into reply values(11,23, 'Movies/Television','I agree 110%. I was so afraid of this movie portraying Mexican heritage in a whitewashed, try-hard H','2018-4-23','deskrage@gmail.com');
insert into reply values(12,23, 'Movies/Television','~~Pixar~~ Disney puts together heritage councils and the creators take lots of field trips.https:/','2018-4-20','mad@yahoo.ca');
insert into reply values(13,23, 'Movies/Television','Going by reviews Ive been reading from Latino critics, I am so freaking happy at how I, frankly, ca','2018-4-18','mad@yahoo.ca');
insert into reply values(14,23, 'Movies/Television','So glad that there are other people feeling like this. Its been a week since Ive watched Coco and ','2018-4-17','vybaby@gmail.com');

insert into reply values(5,24, 'Movies/Television','Dont forget the pale horse rider passing in the background, the literal symbol of death and the apo','2018-2-19','snowstorm@outlook.com');
insert into reply values(6,24, 'Movies/Television','I immediately associated the man shot in the beginning with the blues. Older black man sitting down ','2018-2-18','superfoody@live.com');
insert into reply values(7,24, 'Movies/Television','I think in some ways youre missing the forest for the trees with your analysis.  Theres a lot of b','2018-2-26','itsdatboi@gmail.com');
insert into reply values(8,24, 'Movies/Television','Solid analysis.To address your hunned bands question, its common slang for bands to mean $1000.','2018-2-18','deskrage@gmail.com');
insert into reply values(9,24, 'Movies/Television','>He is run after by a mob of white people.This has a double meaning of white people consuming blac','2018-2-12','vybaby@gmail.com');
insert into reply values(10,24, 'Movies/Television','> This is reinforced by how the corners are rounded and cut off, quite telling that he wants an Anal','2018-2-20','vybaby@gmail.com');
insert into reply values(11,24, 'Movies/Television','The fake gun throws me for a loop. While I would posit that it likely is a reference to police shoot','2018-2-16','snowstorm@outlook.com');
insert into reply values(12,24, 'Movies/Television','Good work, you definitely got a lot of good details in your post. Id say I agree with [Genius](http','2018-2-16','deskrage@gmail.com');
insert into reply values(13,24, 'Movies/Television','Feels more like a meta-commentary on the fetishizing of drugs and violence in hip-hop. We did someth','2018-2-24','itsdatboi@gmail.com');
insert into reply values(14,24, 'Movies/Television','Well put. First time I see the teacher interpretation and I like it. As a white person I relate to t','2018-2-19','superfoody@live.com');

insert into reply values(5,25, 'Movies/Television','Number of Submissions: 80Number of Films Submitted: 87Number of Documentaries: 6 (7 if you count','2018-1-20','mad@yahoo.ca');
insert into reply values(6,25, 'Movies/Television','Interesting to see Ladybird over CMBYN. While I generally enjoyed Ladybird, the film seemed like a f','2018-1-24','itsdatboi@gmail.com');
insert into reply values(7,25, 'Movies/Television','This is a good list (I’m especially happy that Blade Runner 2049 and Phantom Thread, my two favorite','2018-1-26','deskrage@gmail.com');
insert into reply values(8,25, 'Movies/Television','Ah, to bad I missed the cut off, I had a few more movies I wanted to catch before voting!Really ha','2018-1-26','mad@yahoo.ca');
insert into reply values(9,25, 'Movies/Television','Can someone explain to me why Wind River hasnt gotten more love? I genuinely think it is one of the','2018-1-22','json@hotmail.com');
insert into reply values(10,25, 'Movies/Television','Why no love for Logan Lucky?  I think its a very well made modern day heist film with a twist in ','2018-1-20','json@hotmail.com');
insert into reply values(11,25, 'Movies/Television','Biggest omission by far is *I Dont Feel at Home in This World Anymore*. Went from Grand Jury Prize ','2018-1-15','deskrage@gmail.com');
insert into reply values(12,25, 'Movies/Television','Solid list','2018-1-19','deskrage@gmail.com');
insert into reply values(13,25, 'Movies/Television','I do think that over time, people will start to appreciate 3 Billboards for what it is. A lot of peo','2018-1-13','json@hotmail.com');
insert into reply values(14,25, 'Movies/Television','It Comes at Night not in Top 10???Thats one of the best films Ive seen in recent years.','2018-1-11','snowstorm@outlook.com');

insert into reply values(5,26, 'Movies/Television','*Snow Cake*, which Rickman stars in, is a film thats really close to my heart. I never really knew ','2018-4-20','itsdatboi@gmail.com');
insert into reply values(6,26, 'Movies/Television','This makes me incredibly sad. I absolutely loved him in Galaxy Quest, such a funny part he played in','2018-4-19','vybaby@gmail.com');
insert into reply values(7,26, 'Movies/Television','By Grabthars Hammer, this is sad news.','2018-4-21','deskrage@gmail.com');
insert into reply values(8,26, 'Movies/Television','The first performance that I ever actually *loved* was Rickman as the Sheriff of Nottingham in Robin','2018-4-24','snowstorm@outlook.com');
insert into reply values(9,26, 'Movies/Television','Ok, the day before Bowie died I watched Basquiat and yesterday I watched Sweeney Todd. WHAT IS HAP','2018-4-19','json@hotmail.com');
insert into reply values(10,26, 'Movies/Television','this is just a terrible week.  I recently watched CBGB, he was great in that.  RIP Alan. ','2018-4-20','mad@yahoo.ca');
insert into reply values(11,26, 'Movies/Television','Devastating news.  I feel like someone cut my heart out with a spoon.','2018-4-17','deskrage@gmail.com');
insert into reply values(12,26, 'Movies/Television','[How I feel about this new](https://media2.giphy.com/media/qOVZOYP1d2zBu/giphy.gif)Edit: [Source](','2018-4-24','mad@yahoo.ca');
insert into reply values(13,26, 'Movies/Television','To me he will always be the sad ghostly husband from Truly Madly Deeply.','2018-4-22','mad@yahoo.ca');
insert into reply values(14,26, 'Movies/Television','“Look...at...me... he whispered. The green eyes found the black, but after a second, something in t','2018-4-22','superfoody@live.com');

insert into reply values(5,27, 'Sports','Parlayed the Chiefs and the over. Woke my wife and daughter up lol','2018-3-21','superfoody@live.com');
insert into reply values(6,27, 'Sports','WAS +7 and Under 48 SADNESS PARTY, FOLLOW ME!','2018-3-9','vybaby@gmail.com');
insert into reply values(7,27, 'Sports','The gods have smiled upon me tonight.  My picks were as follows.  I only lost one. 1)Parlay Over ','2018-3-17','mad@yahoo.ca');
insert into reply values(8,27, 'Sports','32 upvotes for Chiefs -7 but dont forget fellow parlay MVP over 48.5','2018-3-18','mad@yahoo.ca');
insert into reply values(9,27, 'Sports','Justin houston knew the spread, or just wanted that TD cash money','2018-3-22','snowstorm@outlook.com');
insert into reply values(10,27, 'Sports','Holy Shit! I had Chiefs -7, Over 48 & small parlay of both. That was the luckiest play in my betting','2018-3-14','superfoody@live.com');
insert into reply values(11,27, 'Sports','I’m disgusted I bet Chiefs -7 and won. lol','2018-3-18','snowstorm@outlook.com');
insert into reply values(12,27, 'Sports','Had the skins+7 and Pryor over 4 catches. Was hoping theyd toss the garbage pass to him so it count','2018-3-27','itsdatboi@gmail.com');
insert into reply values(13,27, 'Sports','imma need a link to that logic song asap','2018-3-22','deskrage@gmail.com');
insert into reply values(14,27, 'Sports','https://nitrogensports.eu/betslip/bbc311cekRoRitJOG5KWFVwN3ViQXptS0JUZz0just saw this online. now ','2018-3-13','json@hotmail.com');

insert into reply values(5,28, 'Sports','Fading the public has never been more prosperous.','2018-2-28','superfoody@live.com');
insert into reply values(6,28, 'Sports','well, I dont feel cool anymore. Bye guys..','2018-2-26','json@hotmail.com');
insert into reply values(7,28, 'Sports','Wasn’t going to bet today but it feels like a national holiday','2018-2-26','json@hotmail.com');
insert into reply values(8,28, 'Sports','Everyone prepare for the flood of new highly sophisticated American bettors here.','2018-2-27','itsdatboi@gmail.com');
insert into reply values(9,28, 'Sports','Its a holiday for the degens!','2018-2-28','deskrage@gmail.com');
insert into reply values(10,28, 'Sports','Now, I can lose a shit ton to MGM and Westgate from Massachusetts, instead of having to fly out.','2018-2-27','snowstorm@outlook.com');
insert into reply values(11,28, 'Sports','What does this mean for betting from home. Now can use American versions of betting sites instead of','2018-2-27','superfoody@live.com');
insert into reply values(12,28, 'Sports','Green Bay -3.5 -125Seattle +2.5 -125','2018-2-27','itsdatboi@gmail.com');
insert into reply values(13,28, 'Sports','what a glorious time to be alive. ','2018-2-26','deskrage@gmail.com');

insert into reply values(5,29, 'Sports','Im new to betting...Im using bovada and getting lost in it. Whats an insanely high risk/high rewa','2018-4-27','mad@yahoo.ca');
insert into reply values(6,29, 'Sports','May I recommend that we include the game clock or something? Itll just make it easier to follow, im','2018-4-27','itsdatboi@gmail.com');
insert into reply values(7,29, 'Sports','Not a live bet but does anyone fancy a small wager on the ML at -102/-102  the small vig is just t','2018-4-28','mad@yahoo.ca');
insert into reply values(8,29, 'Sports','Jesus. The Broncos are getting destroyed. Will they even score a TD?','2018-4-28','vybaby@gmail.com');
insert into reply values(9,29, 'Sports','Thank god the broncos went for it. Saved my under 23.5 and Seattle 1st half parlay ','2018-4-28','itsdatboi@gmail.com');
insert into reply values(10,29, 'Sports','Anybody got a count on the Omahas? ','2018-4-27','json@hotmail.com');
insert into reply values(11,29, 'Sports','This is ridiculous. Is there a prop bet on the Broncos getting shut out?','2018-4-28','json@hotmail.com');
insert into reply values(12,29, 'Sports','Whats the best site for live betting?Id like to try to trade on individual plays (so, place a be','2018-4-28','json@hotmail.com');
insert into reply values(13,29, 'Sports','Denver +3.5?','2018-4-28','mad@yahoo.ca');
insert into reply values(14,29, 'Sports','anyone wanna bet if guys from south park are going to make an episode out of this great game? my bet','2018-4-27','snowstorm@outlook.com');

insert into reply values(5,30, 'Sports','Side note, has anyone found a book where we can bet on if it will be repealed or not?','2018-1-6','vybaby@gmail.com');
insert into reply values(6,30, 'Sports','Very true. Everyone should contact their state senator immediately. 12/14/17 is the day of the vote.','2018-1-27','json@hotmail.com');
insert into reply values(7,30, 'Sports','For the lazy who dont want to speak:International: https://www.savetheinternet.com/sti-homeUS: ','2018-1-18','deskrage@gmail.com');
insert into reply values(8,30, 'Sports','go to the website, you put in your number and it calls for you. its worth the time, we have lost a l','2018-1-15','vybaby@gmail.com');
insert into reply values(9,30, 'Sports','Is this US only?','2018-1-3','mad@yahoo.ca');
insert into reply values(10,30, 'Sports','Its true. Imagine the sportsbook package well have to pay for if sports betting becomes legal in','2018-1-21','json@hotmail.com');
insert into reply values(11,30, 'Sports','I could be wrong here, but Im a little concerned about ISPs outright blocking online gambling websi','2018-1-22','vybaby@gmail.com');
insert into reply values(12,30, 'Sports','Internet is already fucked. We don’t need NN. ','2018-1-5','vybaby@gmail.com');
insert into reply values(13,30, 'Sports','Will this affect nitrogens sports book??','2018-1-23','mad@yahoo.ca');
insert into reply values(14,30, 'Sports','The government is ridiculous, soon they will be charging us for oxygen. ','2018-1-15','mad@yahoo.ca');

insert into reply values(5,31, 'Sports','which way you leaning i wanna tail','2018-5-28','vybaby@gmail.com');
insert into reply values(6,31, 'Sports','Lol this is great.','2018-5-27','superfoody@live.com');
insert into reply values(7,31, 'Sports','Trailing! BOL!!!','2018-5-25','mad@yahoo.ca');
insert into reply values(8,31, 'Sports','I know right...sometimes Norwegian volleyball be poppin off','2018-5-27','itsdatboi@gmail.com');
insert into reply values(9,31, 'Sports','Fantastic, let me know and Ill tail with you. ','2018-5-28','json@hotmail.com');
insert into reply values(10,31, 'Sports','Do it bud','2018-5-28','itsdatboi@gmail.com');
insert into reply values(11,31, 'Sports','Chinese Womens Tennis is my late night weakness.','2018-5-27','deskrage@gmail.com');
insert into reply values(12,31, 'Sports','I swear to god that was mine too... I stopped for 5 days and then one night and 3 am loaded up and t','2018-5-25','itsdatboi@gmail.com');
insert into reply values(13,31, 'Sports','im a degen with ya and unsubscribing from this sub is probably the best thing to do if you are serio','2018-5-27','json@hotmail.com');
insert into reply values(14,31, 'Sports','what you thinking??','2018-5-27','mad@yahoo.ca');

insert into reply values(5,32, 'Sports','During the superbowl I deposited $400 with BetOnline and the god damn site showed Declined but of ','2018-4-22','json@hotmail.com');
insert into reply values(6,32, 'Sports','What the dicks?  Usually Im skeptical of claims of house cheating because theres literally nothing','2018-4-17','json@hotmail.com');
insert into reply values(7,32, 'Sports','Thats horrible, in a perfect world theyd lose all their business. And theyll probably be fine.','2018-4-25','deskrage@gmail.com');
insert into reply values(8,32, 'Sports','Dont play online blackjack in the first place. This card counter should know that. Only half pene','2018-4-14','mad@yahoo.ca');
insert into reply values(9,32, 'Sports','Can somebody explain to me how the dealer could effectively know that the second card would be the o','2018-4-8','vybaby@gmail.com');
insert into reply values(10,32, 'Sports','5dimes uses this same online casino. These dealers are based in Costa Rica.','2018-4-20','deskrage@gmail.com');
insert into reply values(11,32, 'Sports','I like real titties, not some fake shit. LMAO','2018-4-12','vybaby@gmail.com');
insert into reply values(12,32, 'Sports','SBR going to bump Betonline to #1 Sportsbook rankings.','2018-4-19','mad@yahoo.ca');
insert into reply values(13,32, 'Sports','amazingly obvious, somebody can legally file a claim against them','2018-4-22','mad@yahoo.ca');
insert into reply values(14,32, 'Sports','wow','2018-4-24','itsdatboi@gmail.com');

insert into reply values(5,33, 'Sports','Just wanted to say thank you for doing this and for sharing it for free. You rock, seriously.','2018-5-14','mad@yahoo.ca');
insert into reply values(6,33, 'Sports','Yes','2018-5-24','mad@yahoo.ca');
insert into reply values(7,33, 'Sports','Is your Oakland by 19 prediction including the fact that Carr is kill? ','2018-5-25','deskrage@gmail.com');
insert into reply values(8,33, 'Sports','Awesome job! One thing that sticks out to me this week as compared to others, is that the Trends/Tre','2018-5-5','mad@yahoo.ca');
insert into reply values(9,33, 'Sports','Thanks for all the info. What do you recommend when there is conflict between the rp1 and the trend ','2018-5-28','json@hotmail.com');
insert into reply values(10,33, 'Sports','> It uses a combination of neural networks, genetic algorithms, and Monte Carlo simulations to predi','2018-5-9','snowstorm@outlook.com');
insert into reply values(11,33, 'Sports','Parlaying them together minus Dallas, wish me luck. ','2018-5-17','itsdatboi@gmail.com');
insert into reply values(12,33, 'Sports','Damn close prediction on the Pats/Bucs. Impressive , thanks!','2018-5-19','json@hotmail.com');
insert into reply values(13,33, 'Sports','So it looks like NY Giants and Oakland are your best bets meaning those two are what you are the mos','2018-5-15','mad@yahoo.ca');
insert into reply values(14,33, 'Sports','Hey man, i know this man be dumb and sorry if I go off topic but I really wanna try using your site ','2018-5-18','mad@yahoo.ca');

insert into reply values(5,34, 'Sports','the crowd chants MVP MVP MVPthanks alot really appreciate reading your posts.','2018-6-26','mad@yahoo.ca');
insert into reply values(6,34, 'Sports','While I am not a very successfull gambler and as such my opinion will not be taken very highly, I am','2018-6-10','mad@yahoo.ca');
insert into reply values(7,34, 'Sports','thanks teach!','2018-6-26','mad@yahoo.ca');
insert into reply values(8,34, 'Sports','Beautiful... just beautiful *applause*','2018-6-4','vybaby@gmail.com');
insert into reply values(9,34, 'Sports','Great read, looks like I know what to bet on Friday!','2018-6-6','json@hotmail.com');
insert into reply values(10,34, 'Sports','Yup, printed this out and put it on my desk. Will follow every game of the playoffs, cuz yolo.','2018-6-7','deskrage@gmail.com');
insert into reply values(11,34, 'Sports','You da man as always prof!Always enjoy reading these brilliant write ups. ','2018-6-7','json@hotmail.com');
insert into reply values(12,34, 'Sports','great post. you should get in on the Bracket challenge, wed love to have you.','2018-6-20','deskrage@gmail.com');
insert into reply values(13,34, 'Sports','Wow this is incredibly interesting! Keep up the amazing work my friend, we all appreciate it.','2018-6-19','vybaby@gmail.com');
insert into reply values(14,34, 'Sports','Thank you for this, great post.  I have only one question.  Who do I bet in game 1?Cant wait for ','2018-6-4','snowstorm@outlook.com');

insert into reply values(5,35, 'Sports','Fascinating article, gonna be clicking around your website for a while. Thanks for posting!','2018-1-15','mad@yahoo.ca');
insert into reply values(6,35, 'Sports','My problem with this article is how bookies change lines.  IIRC, they dont change lines just becaus','2018-1-15','mad@yahoo.ca');
insert into reply values(7,35, 'Sports','Very nice job. I’ve got a question about the methodology though:You say that the Tipsters used dif','2018-1-18','itsdatboi@gmail.com');
insert into reply values(8,35, 'Sports','Good piece, thanks. Not to hijack but Pregame is often linked here. This piece is a bit more in dept','2018-1-21','snowstorm@outlook.com');
insert into reply values(9,35, 'Sports','This is great.  This is the type of information people like that dude who posted the AMA cuz he was ','2018-1-23','vybaby@gmail.com');
insert into reply values(10,35, 'Sports','Great article! Reading through your other articles and love the bojack horseman reference ','2018-1-25','json@hotmail.com');
insert into reply values(11,35, 'Sports','That’s good work and an interesting read. I appreciate it.','2018-1-25','json@hotmail.com');
insert into reply values(12,35, 'Sports','This is some really interesting stuff, thank you!','2018-1-18','vybaby@gmail.com');
insert into reply values(13,35, 'Sports','Really good read, very enjoyable and well written. You’re going places OP, keep doing what you’re do','2018-1-17','json@hotmail.com');
insert into reply values(14,35, 'Sports','The question really is, are these losing bettors who ran hot for a year, or winning bettors who won ','2018-1-20','deskrage@gmail.com');

insert into reply values(5,36, 'Sports','Immediately thought about that post when i saw the rankings, insane','2018-1-28','vybaby@gmail.com');
insert into reply values(6,36, 'Sports','He didnt.','2018-1-27','vybaby@gmail.com');
insert into reply values(7,36, 'Sports','Something similar happened with someone asking about the -400 lock on USA qualifying for the World C','2018-1-27','snowstorm@outlook.com');
insert into reply values(8,36, 'Sports','Question: are there actually that many people on this sub that even bet on lines like -4000?','2018-1-27','json@hotmail.com');
insert into reply values(9,36, 'Sports','Curious, what was the line for no?','2018-1-28','mad@yahoo.ca');
insert into reply values(10,36, 'Sports','/u/Jewbear3','2018-1-28','deskrage@gmail.com');
insert into reply values(11,36, 'Sports','Immediately thought of this and tried to find it. Thanks for re-posting! Hope he didnt lose his hou','2018-1-28','deskrage@gmail.com');
insert into reply values(12,36, 'Sports','New lock of the Century: Saban is going to use this a disrespect to roll UGA in the SEC championship','2018-1-27','deskrage@gmail.com');
insert into reply values(13,36, 'Sports','I would never put money on that committee. They clearly have a strategy in how they rank the teams t','2018-1-28','json@hotmail.com');
insert into reply values(14,36, 'Sports','The reddit curse is real. ','2018-1-28','json@hotmail.com');

insert into reply values(5,37, 'Gaming','This is tragic news, and we wish for the best for his family. There will be no tolerance for any i','2018-1-28','json@hotmail.com');
insert into reply values(6,37, 'Gaming','Damn, hed just been talking about how he was retiring from criticism but had plans to do some more ','2018-1-13','json@hotmail.com');
insert into reply values(7,37, 'Gaming','He did so much for so many small indie games and made me discover tons of amazing cool stuff, RIP','2018-1-20','deskrage@gmail.com');
insert into reply values(8,37, 'Gaming','Damn. His last tweet said he was feeling better but needed more time to recover mentally. Guess it t','2018-1-13','mad@yahoo.ca');
insert into reply values(9,37, 'Gaming','I didn’t expect this to happen so suddenlyI just want to say that his latest update is what got me','2018-1-27','mad@yahoo.ca');
insert into reply values(10,37, 'Gaming','Ugh this is too much, I used to always watch his WTF is series','2018-1-15','itsdatboi@gmail.com');
insert into reply values(11,37, 'Gaming','This one hurts.','2018-1-27','json@hotmail.com');
insert into reply values(12,37, 'Gaming','I respected this man more than most people in the industry. He always fought for the consumer, alway','2018-1-23','deskrage@gmail.com');
insert into reply values(13,37, 'Gaming','Dosent feel real','2018-1-15','deskrage@gmail.com');
insert into reply values(14,37, 'Gaming','TotalBiscuit made huge strides in the PC gaming community and the Starcraft 2 eSports. Even with his','2018-1-24','deskrage@gmail.com');

insert into reply values(5,38, 'Gaming','Im Dutch and this is my translation of [the article they used](https://nieuws.vtm.be/vtm-nieuws/bin','2018-1-16','snowstorm@outlook.com');
insert into reply values(6,38, 'Gaming','Its weird to see our government on the frontpage of reddit, lol. Never thought Id see our minister','2018-1-22','snowstorm@outlook.com');
insert into reply values(7,38, 'Gaming','Im sure Activision-Blizzard, Valve, Riot and basically every other publisher are very thankful to E','2018-1-10','json@hotmail.com');
insert into reply values(8,38, 'Gaming','Oh man Disney are gonna lose their shit with EA after this. Their biggest property is being directly','2018-1-18','json@hotmail.com');
insert into reply values(9,38, 'Gaming','Most mobile games are gambling, they literally have themed versions of wheel of fortune, slots, roul','2018-1-25','json@hotmail.com');
insert into reply values(10,38, 'Gaming','From Gamasutras [article](https://www.gamasutra.com/view/news/310188/Belgian_officials_decide_yes_lo','2018-1-23','mad@yahoo.ca');
insert into reply values(11,38, 'Gaming','Assuming this even leads to an EU wide ban on lootboxes, I am going to make a prediction right now. ','2018-1-17','json@hotmail.com');
insert into reply values(12,38, 'Gaming','Classic EA. This is without a doubt the most expensive PR failure in the history of technology and g','2018-1-8','vybaby@gmail.com');
insert into reply values(13,38, 'Gaming','oooohhhhhh this is getting damned interesting. Now the big question will be are they going to stop t','2018-1-21','superfoody@live.com');
insert into reply values(14,38, 'Gaming','More importantly, how do we contact the Minister of Justice there and give him/her our support?','2018-1-11','json@hotmail.com');

insert into reply values(5,39, 'Gaming','I wont buy it, seemed fun but Im not interested in such a heavy money or time investment. A lot of ','2018-3-28','itsdatboi@gmail.com');
insert into reply values(6,39, 'Gaming','Dont stop buying EAs games to make them change.    Stop buying EAs games *because* theyre neve','2018-3-17','itsdatboi@gmail.com');
insert into reply values(7,39, 'Gaming','Cancelled my preorder this morning. I’m sad because I’ve wanted a game like this my whole life, but ','2018-3-22','vybaby@gmail.com');
insert into reply values(8,39, 'Gaming','Fully on board. I want to kill this loot box problem dead. I actually loved the free2play model on g','2018-3-24','deskrage@gmail.com');
insert into reply values(9,39, 'Gaming','While I agree, we have to be realistic about this.Reddit gamers are such a tiny, tiny fraction of ','2018-3-24','itsdatboi@gmail.com');
insert into reply values(10,39, 'Gaming','Nothing will change. We go through this every big game. Everyone goes up in arms, but the game sells','2018-3-24','mad@yahoo.ca');
insert into reply values(11,39, 'Gaming','Wheres this most downvoted comment in Reddit history?','2018-3-28','mad@yahoo.ca');
insert into reply values(12,39, 'Gaming','Real talk - anyone who has a passing interest in video games and is on r/Games ***already knows this','2018-3-21','mad@yahoo.ca');
insert into reply values(13,39, 'Gaming','Someone else did the math and figured out that about 50% of the money spent on microtransactions is ','2018-3-27','deskrage@gmail.com');
insert into reply values(14,39, 'Gaming','Star Wars is a *Disney* IP.*Disney* cares a *lot* about their public image.Pissed off Star Wars ','2018-3-27','deskrage@gmail.com');

insert into reply values(5,40, 'Gaming','This statement alone might get me to buy the game, if just to support the practice.Good on Respawn','2018-4-11','json@hotmail.com');
insert into reply values(6,40, 'Gaming','As someone that usually thinks eh Ill wait for GOTY with all the DLC bundled and then in half the','2018-4-24','snowstorm@outlook.com');
insert into reply values(7,40, 'Gaming','Looks like the gaming industry still has a little bit of soul left. I almost want to buy the game ju','2018-4-17','json@hotmail.com');
insert into reply values(8,40, 'Gaming','Looks to be an amazing game already, so this is just the icing on the cake.Plus, theres no bullsh','2018-4-16','superfoody@live.com');
insert into reply values(9,40, 'Gaming','Am I crazy or was this known a very long time ago? I recall Vince saying it shortly after developmen','2018-4-19','json@hotmail.com');
insert into reply values(10,40, 'Gaming','Damn, even the reviews have been excellent. I am really tempted to pick this up ,especially, since I','2018-4-17','json@hotmail.com');
insert into reply values(11,40, 'Gaming','I was still a little on the fence, but now I want this game. Would you recommend the PC or PS4 versi','2018-4-14','mad@yahoo.ca');
insert into reply values(12,40, 'Gaming','Whoa this is huge! One commonly cited reason for Titanfalls failure was the splitting of its player','2018-4-17','deskrage@gmail.com');
insert into reply values(13,40, 'Gaming','What a fucking massive win for the industry. Dunno abut the guys behind this title, but from this fa','2018-4-20','json@hotmail.com');
insert into reply values(14,40, 'Gaming','Dang, Titanfall 2 really seems like its knocking things out of the park lately. Major focus on sing','2018-4-18','deskrage@gmail.com');

insert into reply values(5,41, 'Gaming','Judging by the almost two-dozen reports and significant number of rule-breaking comments, this is co','2018-4-14','superfoody@live.com');
insert into reply values(6,41, 'Gaming','Hes only 33 and has been dealing with this cancer for 4 years now. He has a wife and son. Devastati','2018-4-26','mad@yahoo.ca');
insert into reply values(7,41, 'Gaming','I used to watch Totalbiscuit a ton when I was younger, really sad to hear this. From looking at his ','2018-4-27','json@hotmail.com');
insert into reply values(8,41, 'Gaming','I have followed this man closely for years. Ive watched his Cataclsym wow videos religiously when I','2018-4-13','itsdatboi@gmail.com');
insert into reply values(9,41, 'Gaming','Man this sucks. The co-optional podcast for the longest time has been a highlight of the week for me','2018-4-19','json@hotmail.com');
insert into reply values(10,41, 'Gaming','Ive gone through school, college, uni and even started working all while listening and watching his','2018-4-22','vybaby@gmail.com');
insert into reply values(11,41, 'Gaming','Damn things are looking grim. Hope he somehow makes it through....Also, let’s try and stay respect','2018-4-19','json@hotmail.com');
insert into reply values(12,41, 'Gaming','That headline hit me a lot harder then I thought it would.I havent kept up with TB in a long time','2018-4-26','itsdatboi@gmail.com');
insert into reply values(13,41, 'Gaming','Hes put up one hell of a fight for the last several years hes had cancer. I lost my mom to cancer,','2018-4-28','itsdatboi@gmail.com');
insert into reply values(14,41, 'Gaming','Ive been following him on twitter and YouTube since I was 14. Its really flooring to think he coul','2018-4-23','mad@yahoo.ca');

insert into reply values(5,42, 'Gaming','There is a [secret message](https://i.imgur.com/sYWoSV4.png) (better version from /u/Arvi833) right ','2018-5-21','vybaby@gmail.com');
insert into reply values(6,42, 'Gaming','Pretending to end the conference and then surprising me just when I thought Cyberpunk wouldnt show ','2018-5-22','mad@yahoo.ca');
insert into reply values(7,42, 'Gaming','Ive become a sucker for Synthwave, Outrun and all that stuff in the recent months.And holy, this ','2018-5-21','superfoody@live.com');
insert into reply values(8,42, 'Gaming','BORN TOO LATE TO EXPLORE EARTHBORN TOO EARLY TO EXPLORE THE UNIVERSEBORN JUST IN TIME FOR CYBERP','2018-5-23','deskrage@gmail.com');
insert into reply values(9,42, 'Gaming','The codes shown on the video were codes for [The Witcher 3 + Expansions](https://cdn.discordapp.com/','2018-5-26','superfoody@live.com');
insert into reply values(10,42, 'Gaming','Looks more Transmetropolitan than Blade Runner, which I like. Almost everything cyberpunk goes the n','2018-5-27','deskrage@gmail.com');
insert into reply values(11,42, 'Gaming','So does this game have a custom protagonist? That dude seemed pretty set in stone, unless this is a ','2018-5-24','json@hotmail.com');
insert into reply values(12,42, 'Gaming','No release date. Bummer. Well it certainly looks very impressive. They definitely nailed the cyberpu','2018-5-21','json@hotmail.com');
insert into reply values(13,42, 'Gaming','That looked more colorful than I expected. I was imagining something in line with Blade Runner. That','2018-5-27','deskrage@gmail.com');
insert into reply values(14,42, 'Gaming','This looks like CDPR is finally ready to put the punk back into the cyberpunk genre. I dont know ','2018-5-22','mad@yahoo.ca');

insert into reply values(5,43, 'Gaming','There was a brief time between PopCaps early days and PvZ2 & Co when casual games were actually p','2018-3-23','deskrage@gmail.com');
insert into reply values(6,43, 'Gaming','Thats something that has bothered me for a while now. Devs, especially in AAA are usually unknown b','2018-3-24','json@hotmail.com');
insert into reply values(7,43, 'Gaming','Plants vs. Zombies 2 was awful.  It was technically possible to do f2p but there was a serious grind','2018-3-17','json@hotmail.com');
insert into reply values(8,43, 'Gaming','I will never forgive them for what they did to PvZ 2.I used to play the first one for hours with m','2018-3-20','superfoody@live.com');
insert into reply values(9,43, 'Gaming','I had such fond memories of Plants vs. Zombies. I played it for quite a while.When Plants vs. Zomb','2018-3-27','mad@yahoo.ca');
insert into reply values(10,43, 'Gaming','A bonus middle finger goes to them for removing the original, IAP-free version of PvZ from the iOS A','2018-3-18','deskrage@gmail.com');
insert into reply values(11,43, 'Gaming','Where in the video is that?','2018-3-11','json@hotmail.com');
insert into reply values(12,43, 'Gaming','https://twitter.com/octogeddonGeorge Fans new game coming is an immediate purchase for me.  I LOV','2018-3-19','json@hotmail.com');
insert into reply values(13,43, 'Gaming','PvZ 2 had less than half of the content of the first game at launch.And I checked few years later,','2018-3-11','deskrage@gmail.com');
insert into reply values(14,43, 'Gaming','If you have time and like PC gaming and indie games I highly suggest listening to the whole podcast.','2018-3-11','json@hotmail.com');

insert into reply values(5,44, 'Gaming','So if you log into fortnite on PS4, it locks that account to only be played on PS4? ','2018-1-26','vybaby@gmail.com');
insert into reply values(6,44, 'Gaming','my favorite part of this is that i have never played an epic game on PS4, but im also blocked becaus','2018-1-26','json@hotmail.com');
insert into reply values(7,44, 'Gaming','Not a Fortnite player but I really hope this story continues to gain traction, while blocking cross ','2018-1-25','snowstorm@outlook.com');
insert into reply values(8,44, 'Gaming','I get that people are upset about the lack of cross-play, but thats not even the biggest issue. The','2018-1-27','deskrage@gmail.com');
insert into reply values(9,44, 'Gaming','When even Nintendo agrees to crossplay, you have to know you’re doing something wrong when you block','2018-1-27','deskrage@gmail.com');
insert into reply values(10,44, 'Gaming','As they absolutely fucken should. Its absolutely crazy that they can hold you Epic account hostage.','2018-1-26','itsdatboi@gmail.com');
insert into reply values(11,44, 'Gaming','The most scummy part of this whole thing is that PlayStation released a free exclusive skin *the* da','2018-1-27','deskrage@gmail.com');
insert into reply values(12,44, 'Gaming','I honestly do hope this is where cracks begin to form in the dam that is Sonys bewildering desire t','2018-1-28','json@hotmail.com');
insert into reply values(13,44, 'Gaming','I just think it’s ridiculous that the PS4 started this generation so “for the gamer” and capitalized','2018-1-27','snowstorm@outlook.com');
insert into reply values(14,44, 'Gaming','Sony won a console generation by telling kids theyd still be able to trade in their games at gamest','2018-1-28','json@hotmail.com');

insert into reply values(5,45, 'Gaming','Dont forget that Benzies is also gone. Apparently he saved the first RDR. > When Red Dead Redem','2018-2-28','mad@yahoo.ca');
insert into reply values(6,45, 'Gaming','Not to de-rail the point of this post, but my honest lead concern with the game is the working condi','2018-2-24','deskrage@gmail.com');
insert into reply values(7,45, 'Gaming','Ive never played GTA Online, honestly, and I will never play it. If the single player is good, Ill','2018-2-24','vybaby@gmail.com');
insert into reply values(8,45, 'Gaming','Of all the game devs that get hate for their practices, Rockstar doesnt get their fair share.They','2018-2-27','itsdatboi@gmail.com');
insert into reply values(9,45, 'Gaming','I loved GTAV, and while I was interested in the multiplayer portion of it, I didnt end up playing i','2018-2-25','vybaby@gmail.com');
insert into reply values(10,45, 'Gaming','You could add to your list that they fake sales to get onto Steam Sales.They keep the price of the','2018-2-28','snowstorm@outlook.com');
insert into reply values(11,45, 'Gaming','I think its very interesting to see the Im not interested in Online so it doesnt bother me ment','2018-2-27','vybaby@gmail.com');
insert into reply values(12,45, 'Gaming','its funny that rockstar gets to sidestep all the controversies that plague other top companies. ea/','2018-2-27','json@hotmail.com');
insert into reply values(13,45, 'Gaming','Late to the thread but Ive had meetings with Strauss Zelnick. The dude is a prick. Corporate, not a','2018-2-26','deskrage@gmail.com');
insert into reply values(14,45, 'Gaming','I paid $60 on day one for Gtav, I didnt even know there was an online mode coming.  The hours lost','2018-2-28','superfoody@live.com');

insert into reply values(5,46, 'Gaming','They need to make online effortless. I mean no friend codes. No accounts locked to the device. Just ','2018-5-27','mad@yahoo.ca');
insert into reply values(6,46, 'Gaming','Fuck the Switch. I want these peoples lives.Come on bring your video games to our roof party!','2018-5-25','json@hotmail.com');
insert into reply values(7,46, 'Gaming','Didnt think it would happen so soon.https://www.reddit.com/r/Games/comments/1c6itx/eas_montreal_o','2018-5-25','json@hotmail.com');
insert into reply values(8,46, 'Gaming','I think the best thing to take away from this is that Nintendo is no longer going to have to split d','2018-5-28','json@hotmail.com');
insert into reply values(9,46, 'Gaming','My main concern with this is what is the battery life like on the tablet? If its anything like the ','2018-5-27','superfoody@live.com');
insert into reply values(10,46, 'Gaming','You know what. I like the name. Its not stupid, easy to say and it actually makes sense. Not sure','2018-5-27','deskrage@gmail.com');
insert into reply values(11,46, 'Gaming','The amount of times they show the name/logo in this trailer shows theyve learned from the WiiU mark','2018-5-28','vybaby@gmail.com');
insert into reply values(12,46, 'Gaming','I damn near died laughing when they showed skyrim on it. There is no way anyone saw that coming. Swi','2018-5-27','superfoody@live.com');
insert into reply values(13,46, 'Gaming','Will it have more cpu/gpu power when plugged into the base? Are the slide out controllers motion ena','2018-5-25','mad@yahoo.ca');

insert into reply values(5,47, 'Music','To help kick the discussion off some, I wrote up a list of songs that I felt make good entryways int','2018-5-26','superfoody@live.com');
insert into reply values(6,47, 'Music','Thought I would breakdown some hip-hop subgenres since no one else has gone much in depth with it.','2018-5-25','superfoody@live.com');
insert into reply values(7,47, 'Music','THE HIGH BAROQUE (about 1690-1750)Before I talk too much - consider who this music was written for','2018-5-22','mad@yahoo.ca');
insert into reply values(8,47, 'Music','Trip Hop: Massive Attack - [Inertia Creeps](https://www.youtube.com/watch?v=sE7xyn28wjg)Combines e','2018-5-28','json@hotmail.com');
insert into reply values(9,47, 'Music','I find post rock to be very interesting as a genre. Sure a lot of it is crescendocore like God is ','2018-5-26','itsdatboi@gmail.com');
insert into reply values(10,47, 'Music','Black Metal: Bathory - [Enter the Eternal Fire](http://www.youtube.com/watch?v=hS8yDlAUzRA) (1987)','2018-5-24','vybaby@gmail.com');
insert into reply values(11,47, 'Music','I think probably the most important thing is for the song to be something pretty universally relatab','2018-5-23','mad@yahoo.ca');
insert into reply values(12,47, 'Music','Boards of Canada - Dayvan Cowboy got me into whatever genre they are. Electronica maybe? (ambient ','2018-5-25','mad@yahoo.ca');
insert into reply values(13,47, 'Music','To introduce someone to **Americana** music, Id probably start with [Lucinda Williams Car Wheels ','2018-5-17','json@hotmail.com');
insert into reply values(14,47, 'Music','Deepest thanks, coffeezombie and to everyone who contributed to this.  Ive been looking for a list ','2018-5-16','itsdatboi@gmail.com');

insert into reply values(5,48, 'Music','If the essay doesnt end with Carly revealing who killed Tupac I will be sorely disappointed.','2018-5-24','itsdatboi@gmail.com');
insert into reply values(6,48, 'Music','Im at Part 5 Epilogue and itching to write an SCP about a pop singer stuck in thematic purgatory.','2018-5-25','deskrage@gmail.com');
insert into reply values(7,48, 'Music','There. I did it. I read the whole thing.Okay. Where does that leave me?I talked about it with ot','2018-5-28','vybaby@gmail.com');
insert into reply values(8,48, 'Music','Fucking hell, dude. That was a god-damned wild ride.I actually am very familiar with your stuff, a','2018-5-25','superfoody@live.com');
insert into reply values(9,48, 'Music','Abandon all hope, Ye who enter here.— Saint Pablo Tour Description','2018-5-28','itsdatboi@gmail.com');
insert into reply values(10,48, 'Music','As someone who does not really like pop music, reading this much about Carly Rae Jepsen is not how I','2018-5-26','itsdatboi@gmail.com');
insert into reply values(11,48, 'Music','Apart from being one of the most gratifying experiences I have ever been lucky enough to stumble upo','2018-5-28','json@hotmail.com');
insert into reply values(12,48, 'Music','Is this like an AMA or something? Cause youre asking me to read a *lot* to be able to even ask you','2018-5-28','json@hotmail.com');
insert into reply values(13,48, 'Music','Alright, I just want to say that this incredible essay has consumed basically my entire life for my ','2018-5-27','snowstorm@outlook.com');
insert into reply values(14,48, 'Music','Lasciate ogne speranza, voi chintrate is Italian (Florentine dialect), not Latin. ','2018-5-28','vybaby@gmail.com');

insert into reply values(5,49, 'Music','You covered the by part. These composers were basically servants of the nobility/aristocracy, defi','2018-3-25','superfoody@live.com');
insert into reply values(6,49, 'Music','Who can afford to hire a live ensemble to play this music?Youre fooling yourself. Without rich pa','2018-3-27','deskrage@gmail.com');
insert into reply values(7,49, 'Music','Honestly I had no idea about the lives of those composers until I read what you just wrote. Thinking','2018-3-25','vybaby@gmail.com');
insert into reply values(8,49, 'Music','The problem i have seen is that, in order to become a musician worth your salt, most of the time, es','2018-3-25','mad@yahoo.ca');
insert into reply values(9,49, 'Music','Classical music was gentrified long ago and most recently so was Jazz. Eventually, so will Rock musi','2018-3-26','itsdatboi@gmail.com');
insert into reply values(10,49, 'Music','I seem to recall that the film *Amadeus* did touch upon the popularity of Mozarts work with the wor','2018-3-27','json@hotmail.com');
insert into reply values(11,49, 'Music','I go to opera and symphony performances here occasionally and a good proportion of people are *so pr','2018-3-25','deskrage@gmail.com');
insert into reply values(12,49, 'Music','First, I think youre certainly on to something.  There are many working class pursuits that now s','2018-3-25','snowstorm@outlook.com');
insert into reply values(13,49, 'Music','>User Reports>1) Nobody gives a shitthats the spirit','2018-3-26','mad@yahoo.ca');
insert into reply values(14,49, 'Music','>Yes, rich people might have paid for a lot of it, but it tells the emotions and hardships of ordina','2018-3-26','superfoody@live.com');

insert into reply values(5,50, 'Music','Know any punk albums that deal with politics?Check out this weeks [Album Discussion Club category]','2018-3-16','deskrage@gmail.com');
insert into reply values(6,50, 'Music','This was the first thing I thought when I woke up to the news this morning. Ive been waiting for an','2018-3-26','deskrage@gmail.com');
insert into reply values(7,50, 'Music','Not punk *rock* but I think plenty of music thats new nowadays is rife with aggressive social comme','2018-3-11','vybaby@gmail.com');
insert into reply values(8,50, 'Music','God I fucking HOPE SO. It doesnt have to be punk but it needs to be angry, smart, and have attitude','2018-3-22','vybaby@gmail.com');
insert into reply values(9,50, 'Music','Id say no, at least not in the mainstream. American Idiot was a great politically charged Pop-Punk ','2018-3-18','json@hotmail.com');
insert into reply values(10,50, 'Music','Lame attempts at political punk will probably go up but there are already bands like Night Birds and','2018-3-22','json@hotmail.com');
insert into reply values(11,50, 'Music','It didnt happen during Bush Jrs presidency so I doubt it will happen for this. But I did have th','2018-3-22','json@hotmail.com');
insert into reply values(12,50, 'Music','I hope not. Punk was protest music for the end of the 70s.Lets have kids in 2016 protest with th','2018-3-21','json@hotmail.com');
insert into reply values(13,50, 'Music','I think a Trump presidency gives us a very real chance of the new SOAD album being great. ','2018-3-24','json@hotmail.com');
insert into reply values(14,50, 'Music','If he does, itll only be because this idea has been spread around as a joke, moreso since last nigh','2018-3-23','snowstorm@outlook.com');

insert into reply values(5,51, 'Music','One of my favorite albums of all time is **Revolutionary Pekinese Opera Ver. 1.28 by Ground Zero**, ','2018-2-26','deskrage@gmail.com');
insert into reply values(6,51, 'Music','To be fair, you have to have a very high IQ to understand Big Blacks Atomizer. The music is extreme','2018-2-27','itsdatboi@gmail.com');
insert into reply values(7,51, 'Music','**Tales From Topographic Oceans** by Yes.There are a lot of pretentious albums out there that get ','2018-2-25','deskrage@gmail.com');
insert into reply values(8,51, 'Music','**A Rainbow In Curved Air** by **Terry Riley** is probably too sophisticated for anyone here to have','2018-2-26','vybaby@gmail.com');
insert into reply values(9,51, 'Music','**The Death Defying Unicorn - A Fanciful and Fairly Far-Out Musical Fable** by **Motorpsycho** in co','2018-2-25','json@hotmail.com');
insert into reply values(10,51, 'Music','I listen to algorithmically composed melodies based on probability distributions. My favorite algori','2018-2-27','json@hotmail.com');
insert into reply values(11,51, 'Music','[Naked City - Torture Garden](https://m.youtube.com/watch?v=AZSw73DLq-0)John Zorn, an avant garde ','2018-2-23','superfoody@live.com');
insert into reply values(12,51, 'Music','Uh, that would be Maggie Björklunds _Shaken_. (Yes, with the umlauts, you fucking philistine). If y','2018-2-27','vybaby@gmail.com');
insert into reply values(13,51, 'Music','This thread is a goldmine of amazingly pretentious and/or obscure music. Youre all gloriously filth','2018-2-23','deskrage@gmail.com');
insert into reply values(14,51, 'Music','Trout Mask Replica. Its the pinnacle of music as an art form. From the composition, the recording p','2018-2-23','vybaby@gmail.com');

insert into reply values(5,52, 'Music','This is a good thing. I never liked Pitchfork. They are way too holier-than-thou and their reviews a','2018-6-16','vybaby@gmail.com');
insert into reply values(6,52, 'Music','People saying that Pitchfork has stayed more or less the same sound like they’ve not followed Pitchf','2018-6-23','superfoody@live.com');
insert into reply values(7,52, 'Music','The trajectory of moving on from Pitchfork and into Chris Otts Shallow Rewards is quite well worn. ','2018-6-15','json@hotmail.com');
insert into reply values(8,52, 'Music','> What do you use to find your music? What review sites do you think still have integrity?[Rate Yo','2018-6-8','vybaby@gmail.com');
insert into reply values(9,52, 'Music','I started reading Pitchfork around 2009-2010 as a sophomore in high school and had much the same rea','2018-6-18','mad@yahoo.ca');
insert into reply values(10,52, 'Music','People here are going to try to make you out to be a lunatic but Pitchfork definitely did change pos','2018-6-8','mad@yahoo.ca');
insert into reply values(11,52, 'Music','So this is what it’s come down to, huh? With the crowning of “Bodak Yellow” as 2017’s single greates','2018-6-16','mad@yahoo.ca');
insert into reply values(12,52, 'Music','There is a lot to unpack here. First off Pitchfork has always been what it is (they once gave the ba','2018-6-12','superfoody@live.com');
insert into reply values(13,52, 'Music','The best way I can summarize my thoughts on P4k is the following: the publication began and grew as ','2018-6-25','snowstorm@outlook.com');
insert into reply values(14,52, 'Music','I use pitchfork as a news source and have for years. That is: I go on there every week to check what','2018-6-21','deskrage@gmail.com');

insert into reply values(5,53, 'Music','Easy. They dont care. Its happening far away.My girlfriend is in it for the pretty boys, well ch','2018-4-9','json@hotmail.com');
insert into reply values(6,53, 'Music','K-pop is just following the same trends of western pop music. Not sure whether its more or less exp','2018-4-26','vybaby@gmail.com');
insert into reply values(7,53, 'Music','Devils advocate probably but people arent listening to k-pop because they think its soulful, and ','2018-4-8','mad@yahoo.ca');
insert into reply values(8,53, 'Music','When you hear kpop fans talk about their music, how often do you actually hear them say good things','2018-4-23','deskrage@gmail.com');
insert into reply values(9,53, 'Music','/u/-weeg, is that you?J-Pop is worse. If youre a teen boy and want to be a singer, you have to go','2018-4-10','superfoody@live.com');
insert into reply values(10,53, 'Music','This is fascinating. I had no idea kpop had any foothold on english speaking populations. Where are ','2018-4-20','json@hotmail.com');
insert into reply values(11,53, 'Music','i totally agree with you on your first point. the kpop industry is pretty fucked, ethically. the who','2018-4-10','json@hotmail.com');
insert into reply values(12,53, 'Music','I dont necessarily have a pessimistic world view, but I think its not entirely wrong to say ethica','2018-4-27','superfoody@live.com');
insert into reply values(13,53, 'Music','I say good things about the songwriting.On this sub about a month ago I mentioned kpop, and how so','2018-4-24','snowstorm@outlook.com');
insert into reply values(14,53, 'Music','Kpop is not worse than american pop to me. Is it possible that you have a bias because of your own c','2018-4-12','mad@yahoo.ca');

insert into reply values(5,54, 'Music','I think that we probably arent going to get our rock answer to To Pimp a Butterfly but that isnt a','2018-5-17','snowstorm@outlook.com');
insert into reply values(6,54, 'Music','I think there were a lot of signs that To Pimp a Butterfly would elevate the competition. In intervi','2018-5-21','deskrage@gmail.com');
insert into reply values(7,54, 'Music','There are a lot of exciting and fresh releases in the last 5 years in the rock/indie/post-rock world','2018-5-11','deskrage@gmail.com');
insert into reply values(8,54, 'Music','I would consider the last 2 Swans albums to be close to classics. For comparison, Merriweather has','2018-5-17','snowstorm@outlook.com');
insert into reply values(9,54, 'Music','Unfortunately, we have to go pretty far back to find rock albums with the same level of cultural rel','2018-5-22','mad@yahoo.ca');
insert into reply values(10,54, 'Music','Id like to say that 2010 saw the release of The Monitor by Titus Andronicus which is an odd kind ','2018-5-19','mad@yahoo.ca');
insert into reply values(11,54, 'Music','Personally, if theres gonna be a To Pimp a Butterfly from rock this decade, I think it has to come ','2018-5-12','deskrage@gmail.com');
insert into reply values(12,54, 'Music','Thats kind of an interesting point. There hasnt really been an album that defines a new flavor or ','2018-5-12','deskrage@gmail.com');
insert into reply values(13,54, 'Music','>Will Tame Impala step it up (once more) and give us a masterpiece with their third LP this year?i','2018-5-26','json@hotmail.com');

insert into reply values(5,55, 'Music','Station To Station by David Bowie was recorded at the height of his cocaine addiction, when he survi','2018-3-15','superfoody@live.com');
insert into reply values(6,55, 'Music','Mayhems black metal classic De Mysteriis Dom Sathanas takes the cake here I feel.Lyricist Dead ','2018-3-22','mad@yahoo.ca');
insert into reply values(7,55, 'Music','Smile by The Beach Boys. Basically came about in the midst of a Brian Wilson mental breakdown. I bel','2018-3-22','itsdatboi@gmail.com');
insert into reply values(8,55, 'Music','Misfits - Static Age. They were given free recording studio time in exchange for the rights of the','2018-3-25','superfoody@live.com');
insert into reply values(9,55, 'Music','Theres the classic story of Sleeps *Dopesmoker* where the record label gave them something like $5','2018-3-27','json@hotmail.com');
insert into reply values(10,55, 'Music','Nick Drake is a classic story - he was great in the studio, working with members of Fairport Convent','2018-3-25','mad@yahoo.ca');
insert into reply values(11,55, 'Music','Mayhems De Mysteriis Dom Sathanas (1994).Why is it crazy?The to-be lead singer shot himself p','2018-3-26','vybaby@gmail.com');
insert into reply values(12,55, 'Music','https://en.wikipedia.org/wiki/The_Bedlam_in_Goliathtl:dr: They bought a cursed Ouija board and cra','2018-3-21','json@hotmail.com');
insert into reply values(13,55, 'Music','Bill Holts Dreamies has always fascinated me. Had a cookie-cutter life and worked as a junior exec ','2018-3-20','json@hotmail.com');
insert into reply values(14,55, 'Music','Manic Street PreachersLeading up to their “breakthrough” album (*Everything Must Go*), the Manics ','2018-3-25','mad@yahoo.ca');

insert into reply values(5,56, 'Music','I just finished my first listen and really enjoyed it. Unfortunately I felt that the 10 minute rever','2018-2-23','json@hotmail.com');
insert into reply values(6,56, 'Music','Am I the only long time fan to find this album boring and a little on the pretentious side?','2018-2-28','itsdatboi@gmail.com');
insert into reply values(7,56, 'Music','Thanks for pointing out a new album was out, Ill have to give it a listen... I was disappointed by ','2018-2-26','mad@yahoo.ca');
insert into reply values(8,56, 'Music','Just finishing up side 1. I am truly amazed so far. The darker tone, the hooks are catchier, James M','2018-2-23','mad@yahoo.ca');
insert into reply values(9,56, 'Music','A lot of the lyrics, while good in isolation as poetry, dont sound right when sang. Theyre a bit s','2018-2-25','itsdatboi@gmail.com');
insert into reply values(10,56, 'Music','I havent listened yet, but I have REALLY high expectations. Im trying not to, but with Funeral, Ne','2018-2-27','itsdatboi@gmail.com');
insert into reply values(11,56, 'Music','100% FLAC went up on what just after I left for work...knew I should have left a little later for th','2018-2-26','vybaby@gmail.com');
insert into reply values(12,56, 'Music','One thing that Im grateful for is that you still will never hear a thinking person say that Arcade ','2018-2-24','vybaby@gmail.com');
`;





///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// GENERAL QUERIES
// - All functions in this section return strings containing the SQL query

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


/** Selects the username and password of a specific user. Can be used for logging in.
 * @param {string} username
 */
function getUserInfo(username) {
  return 'SELECT username, password FROM account WHERE account.username = "' + username + '";';
}


/** Allows user to add a reply to a thread.
 * @param {int} commentId - the ID of the comment (should be calculated front end? idk)
 * @param {int} threadId
 * @param {string} subforumName
 * @param {string} textBody
 * @param {string} date - format "YYYY-MM-DD"
 * @param {string} accountEmail
 */
function insertReply(commentId, threadId, subforumName, textBody, date, accountEmail) {
  return 'INSERT INTO reply values('+commentId+','+threadId+',"'+subforumName+'","'+textBody+'","'+date+'","'+accountEmail+'")';
}

/** Allow user to delete their own reply in a thread
 * @param {string} accountEmail
 * @param {int} commentId
 * @param {int} threadId
 */
function deleteReply(accountEmail, commentId, threadId) {
  return 'DELETE FROM reply WHERE email = "'+accountEmail+'" AND id_num = '+commentId+' AND thread_id_num = '+threadId+';';
}


/** Allow user to create a thread
 * @param {string} subforumName
 * @param {int} threadId
 * @param {string} title
 * @param {string} textBody
 * @param {string} date - format "YYYY-MM-DD"
 * @param {string} email
 */
function createThread(subforumName, threadId, title, textBody, date, email) {
  return 'INSERT INTO thread values("'+subforumName+'",'+threadId+',"'+title+'", "'+textBody+'", "'+date+'", "'+email+'");';
}


/** Allow user to delete a thread they made
 * @param {string} email
 * @param {int} threadId
 */
function deleteThread(email, threadId) {
  return 'DELETE FROM thread WHERE email = "'+email+'" AND id = '+threadId+';';
}


/** Allow user to send a message to another user
 * @param {int} messageId
 * @param {string} messageBody
 * @param {string} date - format "YYYY-MM-DD"
 * @param {string} fromEmail
 * @param {string} toEmail
 */
function sendMessage(messageId, messageBody, date, fromEmail, toEmail) {
  return 'INSERT INTO message values('+messageId+', "'+messageBody+'", "'+date+'", "'+fromEmail+'", "'+toEmail+'");';
}


/** Allow user to subscribe to a forum
 * @param {string} email
 * @param {string} subforumName
 */
function subscribeTo(email, subforumName) {
  return 'INSERT INTO subscribed_to values("'+email+'","'+subforumName+'");';
}


/** Allow user to unsubscibe from a subforum
 * @param {string} email
 * @param {string} subforumName
 */
function unsubscribeFrom(email, subforumName) {
  return 'DELETE FROM subscribed_to WHERE email = "'+email+'" AND name = "'+subforumName+'";';
}


/** Allows user to view the last 20 messages sent to their account.
 * @param {string} email - the email of the receiving user
 */
function getMessages(email) {
  return 'SELECT * FROM message WHERE received_email = "'+email+'" LIMIT 20;';
}


/** View threads on subforums by most commented on in the last week.
 * WARNING: DOES NOT INCLUDE THREADS WITH NO COMMENTS.
 * @param {string} subforumName
 */
function getMostCommentedThreads(subforumName) {
  return `SELECT COUNT(thread_id_num), thread_id_num
FROM reply
WHERE name = "`+subforumName+`" AND date_posted >= (CURDATE()-7)
GROUP BY thread_id_num
ORDER BY COUNT(thread_id_num) DESC;`;
}


/** Get all the replies to a given thread
 * @param {int} threadId
 */
function getReplies(threadId) {
  return 'SELECT * FROM reply WHERE thread_id_num = '+threadId+';';
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// EXPORT OBJECT

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = {
    // initTables and dropTables both return strings, the rest return functions
    initTables : initTablesStr,
    dropTables : dropTablesStr,
    getUserInfo : getUserInfo,
    insertReply : insertReply,
    deleteReply : deleteReply,
    createThread : createThread,
    deleteThread : deleteThread,
    sendMessage : sendMessage,
    subscribeTo : subscribeTo,
    unsubscribeFrom : unsubscribeFrom,
    getMessages : getMessages,
    getMostCommentedThreads : getMostCommentedThreads,
    getReplies : getReplies
};
