DB = {};
DB.news = new Meteor.Collection('news');
Meteor.subscribe('news');


Meteor.startup(function() {
  var $news = $('#news');

  $news.on('click', 'a', function() {
    var $this  = $(this)
      , id     = $this.closest('p').attr('data-id')
      , act    = $this.attr('data-act')
      , update = {}
      ;
    update[ act ] = 1;
    DB.news.update(id, {'$inc' : update});
  });

Deps.autorun(function () {
  var news = DB.news.find({}, {'sort' : {'error' : -1} })
    , html = ''
    ;

  news.forEach(function(doc) {
    html += '<li>' + doc.title + '</li>';
    html += '<p>違：' + doc.error + '，爆：' + doc.hot + '，打：' + doc.strike + '，評：' + doc.comment + '。</p>';
    html += '<p data-id="' + doc._id + '"><a href="javascript:" data-act="error">違</a><a href="javascript:" data-act="hot">爆</a><a href="javascript:" data-act="strike">打</a><a href="javascript:" data-act="comment">評</a></p>';
  });
  $('#news').html( html );
});

});