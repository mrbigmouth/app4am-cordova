DB = {};
DB.news = new Meteor.Collection('News');
Meteor.subscribe('unAssignNews');


Meteor.startup(function() {

  Template.load('test', 'template/test.html').done(function() {
    Template.test.helpers(
      {'list' :
          function() {
            return [
              {'name' : '測試一'}
            , {'name' : '測試二'}
            , {'name' : '測試三'}
            , {'name' : '測試四'}
            , {'name' : '測試五'}
            ]
          }
      }
    )
    
  });

});