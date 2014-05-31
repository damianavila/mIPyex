// we want strict javascript that fails
// on ambiguous syntax
"using strict";

// to prevent timeout
requirejs.config({
    waitSeconds: 60
});

// do not use notebook loaded  event as it is re-triggerd on
// revert to checkpoint but this allow extension to be loaded
// late enough to work.

$([IPython.events]).on('app_initialized.NotebookApp', function(){

     require(['custom/loader/main'],function(loader){
       // loader.parameters('just a dummy argument to pass if necessary');
       loader.parameters('dummy');
       console.log('Loader extension loaded correctly');
     });

     require(['custom/writer/main'],function(writer){
       // writer.parameters('header');
       writer.parameters(true);
       console.log('Writer extension loaded correctly');
     });

     require(['custom/spellchecker/main'],function(spellchecker){
       // spellchecker.parameters('just a dummy argument to pass if necessary');
       spellchecker.parameters('dummy');
       console.log('Spellcheck extension loaded correctly');
     });

     require(['custom/tweet_me/main'],function(tweet_me){
       // tweet_me.parameters('twitter helper function directory');
       tweet_me.parameters('/home/damian/.ipython/profile_myext/static/custom/tweet_me');
       console.log('Tweet me extension loaded correctly');
     });

     require(['custom/nikola_deploy/main'],function(nikola_deploy){
       // nikola_deploy.parameters('posts directory', 'cleaner');
       nikola_deploy.parameters('/media/datos/Desarrollos/damian_blog','True');
       console.log('Nikola deploy extension loaded correctly');
     });

     require(['custom/zenmode/main'],function(zenmode){
       // zenmode.parameters(figure);
       zenmode.parameters('images/back12.jpg');
       console.log('Zenmode extension loaded correctly');
     });

});
