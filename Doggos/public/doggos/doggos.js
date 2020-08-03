$(document).ready(function() {
    var url = window.location.href;
    var pathArray = url.split("/");
    var id = pathArray[4];

    $.ajax({
        "url": "/doggos/collection/" + id,
        "type": "GET",
        "datatype": 'json',

        "success": function(x) {

            $('#doggos').DataTable({
                data: x.response,
                rowId: 'id',
                "ordering": false,
                "searching": true,

                "columnDefs": [{
                    "className": "dt-center",
                    "targets": "_all"
                }],
                columns: [

                    { data: 'id' },
                    { data: 'doggo' },
                    { data: 'age' },
                    { data: 'breed' },
                    { data: 'picture1',
                        "render": function(data, type, row) {
                            return '<img src="' + data + '" width="500" height="500"/>';
                        }
                    },

                ],
            });
            var table = $('#doggos').DataTable();
            $(document).on("click", "#doggos tr", function(e) {
                var id = table.row(this).id();
                window.location = "http://localhost:8888/doggos/" + id;
                //alert( 'Clicked row id ' + id );
            });
        }
    })
});

            
        // technika tworzenia aplikacji internetowych, w których interakcja użytkownika z serwerem odbywa się bez przeładowywania całego dokumentu, w sposób asynchroniczny.
        // Ma to umożliwiać bardziej dynamiczną interakcję z użytkownikiem niż w tradycyjnym modelu