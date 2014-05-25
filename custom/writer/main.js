/*
* ----------------------------------------------------------------------------
* Copyright (c) 2013 - Damián Avila
*
* Distributed under the terms of the Modified BSD License.
*
* A little extension to write (to a file) the current IPython notebook cell.
* ----------------------------------------------------------------------------
*/

function writerCSS() {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = require.toUrl("./custom/writer/main.css");
    document.getElementsByTagName("head")[0].appendChild(link);
}

function writer(header) {

    writerCSS();

    var preInput = IPython.notebook.get_selected_cell().get_text();
    if (header) {
        var input = preInput.split('\n').slice(4).join('\n');
    } else {
        var input = preInput;
    };

    var textarea = $('<textarea/>')
        .attr('rows','1')
        .attr('cols','80')
        .attr('name','cell_name');

    var dialogform = $('<div/>')
        .append(
            $('<form/>').append(
                $('<fieldset/>').append(
                    $('<label/>')
                    .attr('for','cell_name')
                    .text("A new file with your selected cell content" +
                    "will be created after you name the file.")
                    )
                    .append($('<br/>'))
                    .append(
                        textarea
                    )
                )
        );

    IPython.dialog.modal({
        title: "Create a file with your cell content",
        body: dialogform,
            buttons: {
                "OK": { class : "btn-primary",
                    click: function() {
                       var corr_input = "%%writefile " + $.trim($(textarea).val()) + 
                                        "\n" + input;
                       IPython.notebook.kernel.execute(corr_input);
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
        'label'   : '%%writefile your selected cell content',
        'icon'    : 'icon-pencil',
        'callback': function(){writer(param1)},
        'id'      : 'start_writefile'
        },
      ]);
      var document_keydown = function(event) {
        if (event.which == 87 && event.altKey) {
          writer(param1);
          return false;
        };
        return true;
      };
      $(document).keydown(document_keydown);
    }
  }
});
