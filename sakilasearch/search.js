//Wait until the whole page is loaded before this is executed
$(function () {

    $("#searchterm").autocomplete({
        source: "search.php",
        minLength: 2,//search after two characters
        select: function (event, ui) {
            event.preventDefault();
            $("#searchterm").val(ui.item.id);
        }
    });

});