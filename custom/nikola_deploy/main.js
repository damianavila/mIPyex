/*
* ----------------------------------------------------------------------------
* Copyright (c) 2013 - Damián Avila
*
* Distributed under the terms of the Modified BSD License.
*
* A little extension to deploy a nikola site/blog from the IPython notebook.
* -----------------------------------------------------------------------------
*/

function messager() {
  var message = $('<div/>').append(
                  $("<p/></p>").addClass('dialog').html(
                    "Your ipynb-based site/blog post is being deployed now..."
                    )
                ).append(
                  $("<p/></p>").addClass('dialog').html(
                    "We clean (configurable), build and deploy your Nikola " +
                    "site/blog for you!"
                    )
                );

  IPython.dialog.modal({
    title : "Nikola deployment",
    body : message,
    buttons : {
        OK : {class: "btn-danger"}
    }
  });

}

function nikolaDeploy(path, clean) {
  IPython.notebook.kernel.execute('%bookmark root');
  IPython.notebook.kernel.execute('%cd ' + path);
  if (clean=="True") {
    IPython.notebook.kernel.execute('!nikola clean');
  }
  IPython.notebook.kernel.execute('!nikola build');
  IPython.notebook.kernel.execute('!nikola deploy');
  IPython.notebook.kernel.execute('%cd -b root');
  messager();
}

define(function() {
  return {
    parameters: function setup(param1, param2) {
      IPython.toolbar.add_buttons_group([
        {
        'label'   : 'Deploy Nikola site/blog',
        'icon'    : 'icon-upload-alt',
        'callback': function(){nikolaDeploy(param1, param2)},
        'id'      : 'start_nikola_deploy'
        },
      ])
    }
  }
});
