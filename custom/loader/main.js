/*
* ----------------------------------------------------------------------------
* Copyright (c) 2013 - Damián Avila
*
* Distributed under the terms of the Modified BSD License.
*
* A little extension to load (from a file) the current IPython notebook cell.
* ----------------------------------------------------------------------------
*/

function loaderCSS() {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = require.toUrl("./custom/loader/main.css");
    document.getElementsByTagName("head")[0].appendChild(link);
}

var i = IPython.notebook.get_selected_index()

function loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad_" + i).files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        IPython.notebook.get_selected_cell().set_text('name: ' + fileToLoad.name + '\n' +
                                                      'type: ' + fileToLoad.type + '\n' +
                                                      'size: ' + fileToLoad.size + ' bytes \n' +
                                                      '---- \n' + textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function loader(dummy) {

    loaderCSS();

    var textarea = $('<input/>')
        .attr('type','file')
        .attr('id','fileToLoad_' + i)
        .attr('name','file_source');

    var dialogform = $('<div/>')
        .append(
            $('<form/>').append(
                $('<fieldset/>').append(
                    $('<label/>')
                    .attr('for','file_source')
                    .text("You can actually load the content from a file " +
                    "into your selected cell.")
                    )
                    .append($('<br/>'))
                    .append(
                        textarea
                    )
                )
        );

    IPython.dialog.modal({
        title: "Upload and edit your file content",
        body: dialogform,
            buttons: {
                "OK": { class : "btn-primary",
                    click: function() {
                        loadFileAsText();
                }},
                Cancel: {}
            }
    });

}

define(function() {
  return {
    parameters: function setup(param1) {
      IPython.toolbar.add_buttons_group([
        {
        'label'   : '%load your selected file',
        'icon'    : 'icon-folder-open',
        'callback': function(){loader(param1)},
        'id'      : 'start_loadfile'
        },
      ]);
      var document_keydown = function(event) {
        if (event.which == 76 && event.altKey) {
          loader(param1);
          return false;
        };
        return true;
      };
      $(document).keydown(document_keydown);
    }
  }
});
