(function(eval, stringify) {

var Template = Package.templating.Template;

Template.load =
  function(name, url) {
    return $.ajax(
      {'url'      : url
      ,'type'     : 'get'
      ,'cache'    : true
      ,'dataType' : 'text'
      }
    )
    .done(function(templateText) {
      var code =
        Spacebars.compile(
          templateText
        , {'isTemplate' : true
          ,'sourceName' : 'Template "' + name + '"'
          }
        );
      debugger;
      eval("\nTemplate.__define__(" + stringify(name) + ", " + code + ");\n");
    })
    .fail(function() {
      alert('Template 「' + name + '」 載入失敗！')
    });
  }

}(window.eval, window.JSON.stringify));